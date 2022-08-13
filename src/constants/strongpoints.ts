/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Map } from "@types";

/**
 * Always Axis -> Allies; Top -> Bottom or Left -> Right
 */
export const Strongpoints: Record<
  Map,
  [
    [string, string, string],
    [string, string, string],
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ]
> = {
  Carentan: [
    ["Canal locks", "Rail causeway", "La maison des ormes"],
    ["Customs", "Rail crossing", "Mont halais"],
    ["Canal crossing", "Town center", "Train station"],
    ["Pumping station", "Ruins", "Derailed train"],
    ["Blactot", "502nd start", "Farm ruins"],
  ],
  Foy: [
    ["Road to recogne", "Cobru approach", "Road to noville"],
    ["Cobru factory", "Foy", "Flak battery"],
    ["West bend", "Southern edge", "Dugout barn"],
    ["N30 highway", "Bizory-Foy road", "Eastern ourthe"],
    ["Road to bastogne", "Bois jacques", "Forest outskirts"],
  ],
  Hill: [
    ["Roer river crossing", "Zerkall", "Paper mill"],
    ["Eselsweg junction", "Eastern slope", "Train wreck"],
    ["Flak pits", "Hill 400", "Southern approach"],
    ["Roer river house", "Bergstein church", "Kirchweg"],
    ["Convoy ambush", "Ederhecke junction", "Stuckchen farm"],
  ],
  Hurtgen: [
    ["Grosshau approach", "Hurtgen approach", "Logging camp"],
    ["Hill 15", "Jacob's barn", "Salient 42"],
    ["North pass", "The scar", "The siegfried line"],
    ["Wehebach overlook", "kall trail", "The ruin"],
    ["The mausbach approach", "Reserve station", "Lumber yard"],
  ],
  Kursk: [
    ["Road to kursk", "Ammo dump", "Eastern position"],
    ["Rudno", "Destroyed battery", "The Muddy churn"],
    ["The windmills", "Yamki", "Oleg's house"],
    ["Panzer's end", "Defence in depth", "Listening post"],
    ["Artillery position", "Grushki", "Grushki flak"],
  ],
  PHL: [
    ["Ingouf crossroads", "Road to carentan", "Cabbage patch"],
    ["Madeleine farm", "Madeleine bridge", "Aid station"],
    ["Groult pillbox", "Carentan causeway", "Flak position"],
    ["Jourdan canal", "Douve bridge", "Douve river battery"],
    ["Bloody bend", "Dead man's corner", "Forward battery"],
  ],
  SMDM: [
    ["The corner", "Hill 6", "The fields"],
    ["Hugo's farm", "The hamlet", "St. Marie du Mont"],
    ["The dugout", "AA Network", "Pierre's farm"],
    ["Brecourt battery", "Cattlesheds", "Rue de la gare"],
    ["Winters landing", "Le grand chemin", "The barn"],
  ],
  SME: [
    ["Flak position", "Vaulaville", "La prairie"],
    ["Route du haras", "Western approach", "Rue de Gambosville"],
    ["Hospice", "St. Mere Eglise", "Checkpoint"],
    ["Artillery battery", "The cementry", "Maison du crique"],
    ["Les vieux vergers", "The draw", "Ruisseau de ferme"],
  ],
  Stalingrad: [
    ["Mameyev approach", "Nail factory", "City overlook"],
    ["Dolgiy ravine", "Yellow house", "Komsomol HQ"],
    ["Railway crossing", "Carriage depot", "Train station"],
    ["House of the workers", "Pavlov's house", "The Brewery"],
    ["L-shaped house", "Grudinin's Mill", "Volga banks"],
  ],
  Utah: [
    ["Mammut radar", "Flooded house", "Sainte marie approach"],
    ["Sunken bridge", "La grande crique", "Drowned fields"],
    ["WN4", "The chapel", "WN7"],
    ["AA battery", "Hill 5", "WN5"],
    ["Tare green", "Red roof house", "Uncle red"],
  ],
  Omaha: [
    ["Beaumont road", "Crossroads", "Les isles"],
    ["Rear battery", "Church road", "The orchards"],
    ["West Vierville", "Vierville sur mer", "Artillery battery"],
    ["WN73", "WN71", "WN70"],
    ["Dog green", "The draw", "Dog white"],
  ],
  Remagen: [
    ["Alte liebe barsch", "Bewaldet kreuzung", "Dan radart 512"],
    ["Erpel", "Erpeler ley", "Kasbach outlook"],
    ["St. Severin chapel", "Ludendorf bridge", "Bauernhof am Rhein"],
    ["Remagen", "Möbelfabrik", "Schliefen ausweg"],
    ["Waldburg", "Mühlenweg", "Hägelkreuz"],
  ],
};

type MapDirection = "ltr" | "rtl" | "ttb" | "btt";

export const MapDirections: Record<Map, MapDirection> = {
  Carentan: "rtl",
  Foy: "ttb",
  Hill: "rtl",
  Hurtgen: "rtl",
  Kursk: "btt",
  PHL: "btt",
  SMDM: "btt",
  SME: "ltr",
  Stalingrad: "ltr",
  Utah: "ltr",
  Omaha: "ltr",
  Remagen: "ttb",
};
