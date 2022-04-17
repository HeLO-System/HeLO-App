/* eslint-disable @next/next/no-img-element */
import { ShieldFilled, TrophyFilled } from "@fluentui/react-icons";
import { Clan } from "@types";
import { withOGImage } from "next-api-og-image";

export default withOGImage<"query", Clan>({
  template: {
    // include HTML template here
    react: ({ name, icon, score, num_matches, tag }) => (
      <div
        style={{
          //height: "350px",
          height: "100%",
          //width: "1200px",
          width: "100%",
          backgroundColor: "#121212",
          display: "flex",
          padding: "50px",
          margin: "-8",
          flexDirection: "column",
          color: "#dedede",
        }}
      >
        <span style={{ textAlign: "center", fontSize: "40px" }}>
          HelO-System - Hell Let Loose Competitive Clan Ranking
        </span>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            padding: "50px",
            gap: "50px",
            margin: "-8",
          }}
        >
          <div style={{ width: "200px" }}>
            <img
              src={icon || "http://helo-system.de/hll.png"}
              alt="Clan Logo"
              style={{ width: "100%", borderRadius: "1000px" }}
            />
          </div>
          <div style={{}}>
            <h1 style={{ fontSize: "50px", margin: "0" }}>{tag}</h1>
            <h2 style={{ fontSize: "30px" }}>{name}</h2>
            <div
              style={{
                fontSize: "50px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TrophyFilled style={{ color: "hsl(36, 100%, 50%)" }} />
              <span>{score}</span>
            </div>
            <div
              style={{
                fontSize: "50px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShieldFilled />
              <span>{num_matches}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  width: 1200,
  height: 450,
  cacheControl: "public, max-age=604800, immutable",
  dev: {
    inspectHtml: false,
  },
});
