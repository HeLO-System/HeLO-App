import { BackButton } from "@components/BackButton";
import { GlassPanel } from "@components/GlassPanel";
import { NextPage } from "next";

const About: NextPage = () => (
  <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
    <BackButton className="mt-10 ml-10" />
    <GlassPanel title="About" className="p-4 mx-10 pb-8 mb-20">
      <h1 className="text-2xl">HeLO-System</h1>

      <p>
        HeLO (Hell Let Loose Elo Score) is a system designed by Soxxes to rank
        competitive Clans playing the realistic multiplayer World War Two
        combined arms first person shooter{" "}
        <a
          href="https://store.steampowered.com/app/686810/Hell_Let_Loose/"
          target="_blank"
          rel="noreferrer"
          className="text-accent"
        >
          Hell Let Loose
        </a>
        .
      </p>
      <h2 className="text-xl mt-6">What is Elo?</h2>
      <p>
        The Elo rating system is a method to calculate the relative skill levels
        of players in zero-sum games such as chess. It is named after its
        creator Arpad Elo, a Hungarian-American physics professor. If you have
        ever played chess online or in a competitive tournament you might be
        familiar with the concept. If not, you can read more about the system on{" "}
        <a
          href="https://en.wikipedia.org/wiki/Elo_rating_system"
          target="_blank"
          rel="noreferrer"
          className="text-accent"
        >
          Wikipedia
        </a>
        .
      </p>
      <p>
        The system was adjusted slightly and adapted to rank clans in Hell Let
        Loose in a meaningful way.
      </p>
      <h2 className="text-xl mt-6">Which factors influence the HeLO Score?</h2>
      <p>
        In contrast to chess where you can either win, lose or draw, HLL offers
        additional outcomes determined by the amount of controlled cap points
        per team at the end of the match.
      </p>
      <p>There are three main factors influencing the HeLO-Score of a team:</p>
      <ol className="list-decimal pl-8">
        <li>Game results</li>
        <li>Number of players</li>
        <li>Match types (regular or competitive)</li>
      </ol>
      <h2 className="text-xl mt-6">
        How is the victory probability calculated?
      </h2>
      <h3 className="text-lg mt-2">Quick overview</h3>
      <p>
        The win probability is calculated using the score difference between
        both teams:
      </p>
      <p>
        For example, Team A has a score of 734 and Team B has a score of 579.
        The difference is D = 734 – 579 = 155. Plugging this value in our magic
        math black box leads to a win probability of 70.8% for Team A. The
        probability of Team B winning is simply the counter-probability: 1 –
        0.708 = 0.292 =&gt; 29.2%.
      </p>
      <h3 className="text-lg mt-4">Detailed explanation</h3>
      <p>
        The probability is calculated by an integral, which can be simplified to
        the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Error_function"
          target="_blank"
          rel="noreferrer"
          className="text-accent"
        >
          Gaussian error function
        </a>
        . I added 400 as denominator to cap the maximum probability of winning
        to be close to one at some value between a score difference of 400 and
        500. Otherwise the score gain or loss would be either too significant or
        irrelevant.
      </p>
      <h2 className="text-xl mt-6">How is the new HeLO-Score calculated?</h2>
      <p>
        The system adds points to the winning teams score and substracts points
        from the losing team. The number of points added/subtracted depends on
        the factors mentioned above. Let’s have a closer look at those:
      </p>
      <ol className="list-decimal pl-8">
        <li>
          <p>Game result</p>
          <p>
            The conquered strongpoints at the end of the game will be normalized
            by five. The goal of this is to map the original binary outcome of a
            chess game to a non-binary point system in HLL. You can find an
            example of this below.
          </p>
        </li>
        <li>
          <p>Number of players</p>
          <p>
            The number of players participating in a game is a logarithmically
            scaled factor, since missing a whole squad in a 30v30 match has a
            much bigger impact than missing a squad in a 50v50 match. Therefore,
            the factor does not scale linearly and decreases even heavier the
            more players are missing.
          </p>
        </li>
        <li>
          <p>Match type</p>
          <p>
            The system distinguishes between normal matches (a.k.a. friendlies),
            competitive matches and tournament matches. Every match type is
            represented by a factor: 0.8, 1.0 and 1.2, respectively.
            Additionally, matches can be weighted with another factor of 0.5 if
            they take place during holidays like Christmas, Easter, New Year’s
            Eve and summer break (July 1 until August 31).
          </p>
        </li>
        <li>
          <p>Number of played games</p>
          <p>
            The default factor for the number of matches played is 40. If a team
            played more than 30 games, this factor changes to 20. This factor
            hasn&#39;t been mentioned yet, since its only purpose is to
            accelerate the settling process in order to calculate a reliable
            score faster.
          </p>
        </li>
      </ol>
      <h3 className="text-lg mt-2">Guessing the HeLO Score of a new Team</h3>
      <p>
        New teams start with a HeLO Score of 600. In order to reduce the
        settling time, I might guess the strength of a team and assign them a
        score between 550 and 650. In this case the affected team will be
        informed about that.
      </p>
      <h2 className="text-xl mt-6">Full Example</h2>
      <p>
        Let’s have a look at a realistic example. Team A (746) plays a
        competitive match (tournament mode) against Team B (613). They play with
        45 players on each side. Team A already played more than 30 games, but
        Team B is relatively new (played less than 30 games). Team B wins with a
        game score of 5-0. Wow! What a match!
      </p>
      <ol className="list-decimal pl-8">
        <li>Calculate the difference: D = 746 – 613 = 133</li>
        <li>
          Calculate the probability of winning for Team A (magic math stuff
          happening here): P(121) = 0.681
        </li>
        <li>
          Calculate the probability of winning for Team B: 1 – P(121) = 0.319
        </li>
        <li>
          Summary of the factors: <p>Match type: 1.2</p>
          <div className="w-full overflow-auto">
            <table className="space-x-4">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Team A</th>
                  <th>Team B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Number of matches</td>
                  <td>20</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>Number of players</td>
                  <td>
                    log<sub>20</sub>(45/50)+1
                  </td>
                  <td>
                    log<sub>40</sub>(45/50)+1
                  </td>
                </tr>
                <tr>
                  <td>Game score (normalized)</td>
                  <td>0/5</td>
                  <td>5/5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li>
          <p>New scores:</p>
          <p>
            Team A: 746 + 20 * 1.2 * (log<sub>20</sub>(45/50)+1) * (0/5-0.681) ≈
            730
            <br />
            Team B: 613 + 40 * 1.2 * (log<sub>40</sub>(45/50)+1) * (5/5-0.681) ≈
            645
          </p>
        </li>
      </ol>
      <h2 className="text-xl mt-6">What if multiple teams play together?</h2>
      <p>
        This is called a cooperation. Cooperations can consist of teams fielding
        an equal amount of players, e.g. 25 each, or a different amount of
        players, e.g. 15 and 35.
      </p>
      <p>
        We have multiple options here. The most intuitive one is to assign the
        score changes of that specific game according to the player
        distributions. This is done by weighing the average. If the easier and
        less accurate option is used, the player distributions are ignored. The
        normal average is computed and score changes are shared equally among
        the participants of the cooperation. This will be used in case no player
        distributions are given.
      </p>
    </GlassPanel>
  </div>
);

export default About;
