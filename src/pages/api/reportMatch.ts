/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { MatchReportSchema } from "@schemas";
import { MatchReport, MatchReportClan } from "@types";
import { isoDateString } from "@util";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const joinClansForMatchId = (clans: MatchReportClan[]) =>
  clans.map((clan) => clan.tag).join("+");

const playerCount = (clans: MatchReportClan[]) =>
  clans.reduce((acc, cur) => acc + cur.players, 0);

const joinClansForFactions = (clans: MatchReportClan[]) =>
  clans.map(({ tag, players }) => `**${tag}** (${players})`).join(" & ") +
  (clans.length > 1 ? ` => ${playerCount(clans)}` : "");

const eventOrComment = (report: MatchReport) => {
  if (report.matchType === "Competitive" && report.event) {
    return ` (${report.event})`;
  }
  if (report.matchType === "Friendly" && report.comment) {
    return ` (${report.comment})`;
  }
  return "";
};

const buildPayload = (report: MatchReport, session: Session) => {
  const matchId = `${joinClansForMatchId(
    report.axisClans
  )}-${joinClansForMatchId(report.alliesClans)}-${
    new Date(report.date).toISOString().split("T")[0]
  }`;

  let { map } = report;
  if (report.attacker) map += ` (Offensive ${report.attacker})`;

  const fields: string[] = [
    `**${report.matchType}${eventOrComment(report)}**`,
    isoDateString(report.date),
    `Axis: ${joinClansForFactions(report.axisClans)}`,
    `Allies: ${joinClansForFactions(report.alliesClans)}`,
  ];

  const hasAxisOther = report.axisOther && report.axisOther.length > 0;
  const hasAlliesOther = report.alliesOther && report.alliesOther.length > 0;

  if (hasAxisOther)
    fields.push(
      `Axis (other): ${joinClansForFactions(report.axisOther || [])}`
    );

  if (hasAlliesOther)
    fields.push(
      `Allies (other): ${joinClansForFactions(report.alliesOther || [])}`
    );

  if (hasAxisOther || hasAlliesOther)
    fields.push(
      `Players: **${playerCount([
        ...report.axisClans,
        ...(report.axisOther || []),
      ])}** vs. **${playerCount([
        ...report.alliesClans,
        ...(report.alliesOther || []),
      ])}**`
    );

  fields.push(
    ...[
      `Result: **${report.result}** in **${report.time}min**`,
      `Map: **${map}**`,
      `Caps: ${report.caps
        .map((value, index) => (index === 2 ? `**${value}**` : value))
        .join("/")}`,
    ]
  );

  if (report.streamUrl) {
    fields.push(
      `Stream: [${new URL(report.streamUrl).host}](${report.streamUrl})`
    );
  }

  return {
    embeds: [
      {
        color: 16750848,
        author: {
          name: session.user.name,
          icon_url: session.user.image,
        },
        title: matchId,
        url: `https://helo-system.de/matches/${matchId}`,
        description: fields.join("\n"),
      },
    ],
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: "You need to login" });
  if (!session.user.isInGuild || !session.user.isTeamManager)
    return res.status(403).json({ message: "You are not a teammanager" });

  const result = MatchReportSchema.safeParse(req.body);
  if (!result.success)
    return res
      .status(400)
      .json({ message: "Please check your inputs", error: result.error });
  if (
    playerCount([...result.data.axisClans, ...(result.data.axisOther || [])]) >
      50 ||
    playerCount([
      ...result.data.alliesClans,
      ...(result.data.alliesOther || []),
    ]) > 50
  )
    return res.status(400).json({ message: "Too many players" });

  if (!process.env.DISCORD_REPORT_MATCH_WEBHOOK)
    return res.status(500).json({ message: "Please try again later" });

  console.log(result.data);
  try {
    await axios.post(
      process.env.DISCORD_REPORT_MATCH_WEBHOOK,
      buildPayload(result.data, session)
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({ message: "Success" });
};
