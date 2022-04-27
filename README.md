# HeLO-System

HeLO (Hell Let Loose Elo Score) is a system designed by Soxxes to rank competitive Clans playing the realistic multiplayer World War Two combined arms first person shooter [Hell Let Loose](https://store.steampowered.com/app/686810/Hell_Let_Loose/).

## What is Elo?

The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess. It is named after its creator Arpad Elo, a Hungarian-American physics professor.
If you have ever played chess online or in a competitive tournament you might be already familiar with the concept.
If not have you can read more about the system on [Wikipedia](https://en.wikipedia.org/wiki/Elo_rating_system).

The system was adjusted slightly and adapted to fit the requirements of ranking Hell Let Loose Clans.

## Which factors influence the HeLO Score?

In contrast to chess where you can either win, lose or draw, HLL offers additional outcomes determined by the amount of controlled cap points per team at the end of the match.

There are three main factors influencing the HeLO-Score of a team:

1. Game results
2. Number of players
3. Match types (regular or competitive)

## How is the victory probability calculated?

### Quick overview

The win probability is calculated using the score difference between both teams:

For example, team A has a score of 734 and team B has a score of 579.
The difference is D = 734 – 579 = 155. Plugging this value in our magic math
black box will lead to a probability of winning of 70.8% for team A. The
probability for team B is simply the counter-probability: 1 – 0.708 = 0.292 => 29.2%.

### Detailed explanation

The probability is calculated by an integral, which can be simplified
to the [Gaussian error function](https://en.wikipedia.org/wiki/Error_function). I added 400 as denominator to cap the maximum
probability of winning to be close to one at some value between a score
difference of 400 and 500. Otherwise the score gain or loss would be either
too significant or irrelevant.

## How is the new HeLO-Score calculated?

The system adds a number of points to the winning teams score and substracts points from the losing team. The number of points added/subtracted depends on the factors mentioned above. Let’s have a closer look at those:

1. Game result

   The conquered strongpoints at the end of the game will be
   normalized by five. This is supposed to map the original binary system
   from chess to a non-binary point system in HLL. You can find an example of this below

2. Number of players

   The number of players participating in a game is a logarithmic scaled factor, since
   missing a whole squad in a 30v30 match has a much bigger impact
   than missing a squad in a 50v50 match. Therefore, the factor does not scale
   linearly and decreases even heavier the more players are missing.

3. Match type

   The system distinguishes between normal matches (a.k.a. friendlies), competitive matches and tournament matches.
   Every match type is represented by a factor: 0.8, 1.0 and 1.2, respectively.
   Additionally, matches can be weighted with another factor of 0.5 if they take
   place during holidays like Christmas, Easter, New Year’s Eve and summer break (July
   1 until August 31).

4. Number of played games
   The default factor for the number of matches played is 40. If a team played more than 30 games, this factor changes to 20. This factor hasn't been mentioned yet, since its only purpose is to accelerate the settling process in order to receive a reliable score faster.

### Guessing the HeLO Score of a new Team

New teams start with a HeLO Score of 600. In order to reduce the settling time, I might guess the
strength of a team and assign them a score between 550 and 650. In this case the affected team will be informed about that.

## Full Example

Let’s have a look at a realistic example. Team A (746) plays a
competitive match (tournament mode) against Team B (613). They play with 45
players on each side. Team A already played more than 30 games, but Team B is
relatively new (played less than 30 games). Team B wins with a game score of 5-0.
Wow! What a match!

1. Calculate the difference: D = 746 – 613 = 133
2. Calculate the probability of winning for Team A (magic math stuff happening here): P(121) = 0.681
3. Calculate the probability of winning for Team B: 1 – P(121) = 0.319
4. Summary of the factors:
   Match type: 1.2
   Factor | Team A | Team B
   -------|--------|-------
   Number of matches | 20 | 40
   Number of players | log<sub>20</sub>(45/50)+1 | log<sub>40</sub>(45/50)+1
   Game score (normalized) | 0/5 | 5/5
5. New scores:

   Team A: 746 + 20 * 1.2 * (log<sub>20</sub>(45/50)+1) * (0/5-0.681) ≈ 730<br>
   Team B: 613 + 40 * 1.2 * (log<sub>40</sub>(45/50)+1) * (5/5-0.681) ≈ 645

## What if more than one team plays together?

This is called a cooperation. Cooperations can consist of teams fielding
the same amount of players, e.g. 25 each, or different amounts of players, e.g.
15 and 35.

We have multiple options here. The most intuitive one is to assign the
score gain or loss of that specific game according to the player distributions.
And that is exactly what a weighted average does. The second option, easier and
not so accurate, is leaving out the weights, computing a normal average and
share the gain/loss equally among the participants of the cooperation. This
will be used in case no player distributions are given.
