import type { Site, Scores, ScoreKey } from "./types";

export const SCORE_KEYS: { key: ScoreKey; label: string }[] = [
  { key: "restriction", label: "Closed access" },
  { key: "resources", label: "Locked resources" },
  { key: "missing", label: "Missing-persons anomaly" },
  { key: "subsurface", label: "Subsurface habitat" },
  { key: "uap", label: "UAP / sphere density" },
  { key: "darkness", label: "Low-light niche" },
];

export function overallScore(scores: Scores): number {
  return Math.round(
    scores.restriction * 0.24 +
      scores.resources * 0.18 +
      scores.missing * 0.14 +
      scores.subsurface * 0.18 +
      scores.uap * 0.16 +
      scores.darkness * 0.1,
  );
}

export const SITES: Site[] = [
  {
    id: "nttr",
    name: "Nevada Test and Training Range / Groom Lake",
    shortName: "NTTR / Groom Lake",
    region: "Lincoln & Nye Counties, Nevada",
    lat: 37.2431,
    lng: -115.793,
    primary: true,
    access: "military-lethal",
    acres: 2_949_603,
    acresLabel: "2.95 million acres withdrawn",
    restrictionNote:
      "The Nevada Test and Training Range is federal land withdrawn from public use and reserved for military testing. Groom Lake (Area 51) sits inside it. Armed patrols, electronic surveillance, and use-of-force authorizations keep civilians off the range. Overflight is restricted. Adjacent Nevada National Security Site adds a nuclear-test exclusion.",
    resources: [
      {
        commodity: "Gold / silver / lithium belt",
        status: "Mining excluded from the withdrawn range",
        estimate:
          "Sits in the Basin and Range mineral province; claims stop at the fence",
      },
      {
        commodity: "Groundwater / playa brines",
        status: "Not commercially developed on-range",
      },
    ],
    missing: {
      rateLabel: "Low count, extreme isolation",
      notes:
        "Few hikers are allowed near the fence, so case counts stay low. Disappearances concentrate instead in the public desert immediately outside — Death Valley, Tikaboo Valley approaches, and the Extraterrestrial Highway corridor.",
      anomaly: 42,
    },
    habitat: [
      "Dry-lake basins (Groom, Papoose)",
      "Alleged subsurface galleries at S-4 / Papoose",
      "Deep Basin and Range alluvium",
      "Permanent night operations, zero civilian light",
    ],
    uapLore:
      "The most cited keep-away in U.S. UAP lore. Bob Lazar’s S-4, the 1950s Eisenhower-era ‘treaty’ stories, and decades of witness reports along Groom Lake Road all treat this withdrawal as a negotiated no-go, not just a test range.",
    jacksonAngle:
      "A Type-1/Type-2 node sitting over alleged underground processing. Jackson’s model says the network is controlled from the ground up — this is the American desert expression of that architecture: lethal-force surface, hollow interior.",
    scores: {
      restriction: 100,
      resources: 72,
      missing: 42,
      subsurface: 78,
      uap: 96,
      darkness: 82,
    },
    nearby: ["Tonopah Test Range", "Nevada National Security Site", "Tikaboo Valley"],
    publicObservation:
      "Tikaboo Valley / White Sides and the public ET Highway only. Do not cross range markers. Observation from public land is the entire legal envelope.",
    sources: ["nttr-eis", "britannica-a51", "puthoff-2022"],
    summary:
      "The cleanest match for ‘humans not allowed without an official reason’: a 2.9-million-acre withdrawal sitting on a mineral province that is not mined on-range, wrapped in the densest American UAP folklore.",
  },
  {
    id: "dulce",
    name: "Archuleta Mesa / Dulce",
    shortName: "Archuleta Mesa",
    region: "Jicarilla Apache Nation, New Mexico",
    lat: 36.9334,
    lng: -106.9986,
    primary: true,
    access: "tribal-closed",
    acres: 879_917,
    acresLabel: "Jicarilla lands ~880,000 acres",
    restrictionNote:
      "Archuleta Mesa sits on Jicarilla Apache Nation land. It is not a public mountain. Access requires tribal authority; mesa roads and mesa-top areas are not a tourist circuit. The town of Dulce itself is inhabited — the keep-away is the mesa and the alleged interior, not Main Street.",
    resources: [
      {
        commodity: "San Juan Basin oil and gas",
        status: "Produced around the reservation; mesa interior not an open field",
        estimate: "One of the largest gas provinces in the U.S., wrapped around the site",
      },
      {
        commodity: "Grants uranium belt (regional)",
        status: "Historic boom to the south; not a public mine on the mesa",
      },
    ],
    missing: {
      rateLabel: "Four Corners high-strangeness belt",
      notes:
        "Cattle mutilation reports from the 1970s onward cluster here. Human missing-person counts are not Yosemite-scale, but the ranching corridor has a long record of unexplained livestock deaths and night activity that local ranchers still discuss.",
      anomaly: 58,
    },
    habitat: [
      "Mesa and sandstone cavern systems",
      "Alleged seven-level interior (Bennewitz / Schneider lore)",
      "Low-light subterranean niche — Jackson’s large-eye model",
      "Remote high desert, sparse lighting",
    ],
    uapLore:
      "Paul Bennewitz’s late-1970s intercepts, the Dulce Base legend, and Phil Schneider’s later (disputed) testimony all place a joint human–NHI underground facility here. Whether the seven-level map is disinformation or a garbled real site, this is the American cryptoterrestrial capital in the literature.",
    jacksonAngle:
      "Jackson has said ultraterrestrials live underground and ‘don’t like shaved monkeys damaging underground infrastructure.’ A mesa with oil/gas around it and a keep-off interior is exactly the pattern: harvest the basin, leave the hollow mountain.",
    scores: {
      restriction: 78,
      resources: 84,
      missing: 58,
      subsurface: 96,
      uap: 92,
      darkness: 76,
    },
    nearby: ["San Juan Basin", "Four Corners", "Aztec, NM"],
    publicObservation:
      "Stay in Dulce and on signed public / tribal-permitted roads. Do not climb Archuleta Mesa without authorization. Photograph the sky from town.",
    sources: ["dulce-wiki", "tonnies", "puthoff-2022"],
    summary:
      "The subterranean candidate: tribal-closed mesa, a giant gas basin around it, and the longest-running U.S. underground-base narrative — mapped onto Jackson’s operators-under-the-network model.",
  },
  {
    id: "white-sands",
    name: "White Sands Missile Range",
    shortName: "White Sands",
    region: "Tularosa Basin, New Mexico",
    lat: 32.3865,
    lng: -106.4907,
    primary: true,
    access: "military-restricted",
    acres: 2_200_000,
    acresLabel: "≈2.2 million acres / 3,200 sq mi",
    restrictionNote:
      "Largest military installation in the United States. The range is closed except for tightly scheduled public windows (dune field is a separate National Park on the edge). Interior mountains — San Andres, Oscura — are not visitable. Trinity Site opens two days a year.",
    resources: [
      {
        commodity: "Gypsum dune sea",
        status: "Park on the margin; range interior not mined",
      },
      {
        commodity: "Permian Basin adjacency",
        status: "Oil province to the east; the missile range itself is not a field",
      },
    ],
    missing: {
      rateLabel: "Low on-range; high in surrounding wilderness",
      notes:
        "Civilians are not wandering the Oscura range. The adjacent Lincoln National Forest and San Andres have a thinner but real missing-hiker record. The keep-away itself suppresses the statistic.",
      anomaly: 38,
    },
    habitat: [
      "San Andres and Oscura mountain interiors",
      "Deep alluvial basin",
      "Holloman AFB / alleged 1950s landing lore",
      "Permanent instrumented night range",
    ],
    uapLore:
      "Holloman Air Force Base, on the range’s edge, is the other alleged Eisenhower-era landing site (1964 film lore). Roswell sits one basin over. The 1945 Trinity shot is the nuclear correlation Nolan, Vallee, and Hastings keep returning to: UAP and nukes co-locate.",
    jacksonAngle:
      "A planetary-defense test range sitting on a closed basin is, in Jackson’s architecture, both a human imitation of the Sphere Network and a convenient cover for Type-2 mid-altitude nodes the Navy later sees at sea.",
    scores: {
      restriction: 94,
      resources: 58,
      missing: 38,
      subsurface: 70,
      uap: 82,
      darkness: 74,
    },
    nearby: ["Holloman AFB", "Trinity Site", "Roswell corridor"],
    publicObservation:
      "White Sands National Park (the dunes) is public. The missile range is not. Watch the sky from the park, Alamogordo, or Highway 70 when it is open.",
    sources: ["puthoff-2022", "nolan-vallee", "hastings-nukes"],
    summary:
      "Biggest closed box in the Lower 48, nuclear-adjacent, and sitting on the Holloman/Roswell corridor — a keep-away whose official reason (missiles) does not exhaust the lore.",
  },
  {
    id: "china-lake",
    name: "NAWS China Lake / Coso Range",
    shortName: "China Lake",
    region: "Mojave / Coso, California",
    lat: 35.6854,
    lng: -117.6904,
    primary: true,
    access: "military-restricted",
    acres: 1_100_000,
    acresLabel: "≈1.1 million acres",
    restrictionNote:
      "Naval Air Weapons Station China Lake is a closed weapons-test range. The Coso geothermal field and the Coso petroglyphs sit inside or against the withdrawal. Public access to Little Petroglyph Canyon is a rare, escorted Navy tour — not a walk-up.",
    resources: [
      {
        commodity: "Coso geothermal",
        status: "One of the largest geothermal fields in the U.S.; Navy-controlled",
        estimate: "Hundreds of megawatts; energy, not a civilian mine",
      },
      {
        commodity: "Tungsten / gold (historic Coso)",
        status: "Historic mines around the range; interior not an open claim block",
      },
    ],
    missing: {
      rateLabel: "Death Valley adjacency",
      notes:
        "Death Valley National Park, immediately east, is a Missing-411-adjacent desert with heat deaths and true vanishings. China Lake itself has almost no civilian traffic, so on-range statistics are censored by the fence.",
      anomaly: 55,
    },
    habitat: [
      "Coso volcanic field and lava tubes",
      "Geothermal heat — Jackson’s core-energy analogue at crustal scale",
      "Petroglyph canyon with non-human figures",
      "Permanent dark-sky desert",
    ],
    uapLore:
      "Coso Range petroglyphs include large-eyed, antennaed figures that desert researchers have long treated as contact memory, not decoration. The Navy’s grip on the geothermal and the art is the keep-away.",
    jacksonAngle:
      "Large eyes in rock art + a geothermal plant on a closed range is the habitat model in one picture: low-light operators, crustal energy, and a human military parked on the door.",
    scores: {
      restriction: 93,
      resources: 88,
      missing: 55,
      subsurface: 80,
      uap: 70,
      darkness: 80,
    },
    nearby: ["Death Valley", "Searles Valley", "Ridgecrest"],
    publicObservation:
      "Ridgecrest and public Mojave roads. Little Petroglyph Canyon only via official Navy-sponsored tours. Death Valley is the legal dark-sky alternative.",
    sources: ["nttr-eis", "tonnies", "paulides"],
    summary:
      "A million-acre Navy box sitting on one of America’s largest geothermal fields, with large-eyed figures already carved into the rock. Energy, access, and iconography line up.",
  },
  {
    id: "uttr",
    name: "Utah Test and Training Range / Dugway / Uinta edge",
    shortName: "UTTR / Dugway",
    region: "West Desert & Uinta Basin, Utah",
    lat: 40.1994,
    lng: -112.9378,
    primary: true,
    access: "military-restricted",
    acres: 1_700_000,
    acresLabel: "UTTR + Dugway, well over a million acres",
    restrictionNote:
      "UTTR is a massive overland cruise-missile and air-to-ground range. Dugway Proving Ground (chemical/biological) is a separate closed box to the south. The public does not wander either. East of the ranges, the Uinta Basin and Skinwalker Ranch sit in a different legal regime — private and tribal — but Jackson has named Skinwalker as a Sphere Network ground node.",
    resources: [
      {
        commodity: "Oil shale / tar sands (Uinta)",
        status: "Enormous locked hydrocarbon inventory; development chronically stalled",
        estimate: "Among the world’s largest oil-shale deposits",
      },
      {
        commodity: "Beryllium / uranium (west desert)",
        status: "Sporadic historic extraction; ranges themselves not mined",
      },
    ],
    missing: {
      rateLabel: "Uinta Basin cluster",
      notes:
        "The Uinta Basin is a Missing-411 / high-strangeness cluster: ranch vanishments, cattle mutilation, and the Skinwalker literature. West-desert military land has almost no civilian denominator.",
      anomaly: 72,
    },
    habitat: [
      "Uinta Basin as a ‘window’ in the Skinwalker literature",
      "West-desert playas and subsurface Tertiary basins",
      "Jackson: Skinwalker is Sphere Network ground infrastructure",
      "Low population, long nights",
    ],
    uapLore:
      "Skinwalker Ranch is the best-instrumented American high-strangeness ranch. Jackson has said directly that Skinwalker is one of the underground-system areas, so this keep-away is a two-part object: lethal-force ranges on the west, a named network node on the east.",
    jacksonAngle:
      "The only U.S. site Jackson has publicly pinned as Sphere Network ground infrastructure. Poltergeist-as-scarecrow, cattle as biological sensors, orbs as Type-3 — the book’s whole stack is here.",
    scores: {
      restriction: 90,
      resources: 80,
      missing: 72,
      subsurface: 88,
      uap: 94,
      darkness: 72,
    },
    nearby: ["Skinwalker Ranch", "Uintah and Ouray Reservation", "Great Salt Lake Desert"],
    publicObservation:
      "Public basin roads and towns (Roosevelt, Vernal, Tooele valley). Do not enter Dugway or UTTR. Skinwalker is private property.",
    sources: ["jackson-x-skinwalker", "paulides", "puthoff-2022"],
    summary:
      "The Jackson-named node: a military west desert plus the Uinta ‘window,’ sitting on one of the world’s great locked oil-shale inventories.",
  },
  {
    id: "anwr",
    name: "Arctic National Wildlife Refuge — 1002 coastal plain",
    shortName: "ANWR 1002",
    region: "North Slope, Alaska",
    lat: 70.05,
    lng: -143.0,
    primary: true,
    access: "wilderness-locked",
    acres: 1_500_000,
    acresLabel: "1002 area ~1.5 million acres (refuge 19.3 million)",
    restrictionNote:
      "Not a lethal-force range. It is worse in a different way: the coastal plain is among the least visitable landscapes in the United States. No roads. Access is by bush plane and permit. Industrial entry has been politically locked for decades even while USGS has carried multi-billion-barrel oil estimates. Alaska as a whole is the keep-away the user asked for.",
    resources: [
      {
        commodity: "Oil (1002 coastal plain)",
        status: "Assessed, barely produced, repeatedly locked",
        estimate: "USGS mean estimates historically in the billions of barrels",
      },
      {
        commodity: "Gas hydrates / undeveloped North Slope gas",
        status: "Stranded relative to the Lower 48",
      },
    ],
    missing: {
      rateLabel: "Alaska 178 missing per 100,000",
      notes:
        "Alaska’s missing-person rate is an order of magnitude above the rest of the United States (Newsweek 2026: 178.08 / 100k vs Hawaii 20, Oklahoma 16). Bush vanishing, Native village cases, and park disappearances (Wrangell–St. Elias, Gates of the Arctic) sit on top of the oil lock. This is the strongest missing-persons signal in the atlas.",
      anomaly: 100,
    },
    habitat: [
      "Polar night — months of true darkness",
      "Permafrost as a sealed subsurface",
      "Beaufort Sea shelf immediately north (USO / maritime)",
      "Lowest civilian density of any primary site",
    ],
    uapLore:
      "Alaska has a long USO and orb record (Yukon–Kuskokwim, Aleutians, North Slope workers). It is not Dulce-famous. It is the habitat match: darkness, emptiness, locked carbon, and a missing-persons rate that does not look like the Lower 48.",
    jacksonAngle:
      "Large eyes evolve in the dark. Polar night is the surface expression of that niche. If operators live in the crust and under shelves, the Beaufort margin is a door, and the empty coastal plain is the porch humans were not supposed to pave.",
    scores: {
      restriction: 68,
      resources: 96,
      missing: 100,
      subsurface: 64,
      uap: 48,
      darkness: 98,
    },
    nearby: ["Beaufort Sea", "Brooks Range", "Kaktovik", "Gates of the Arctic"],
    publicObservation:
      "Kaktovik and licensed Arctic guides. This is not a weekend hike. Do not freelance the coastal plain.",
    sources: ["newsweek-missing", "plf-minerals", "paulides"],
    summary:
      "The Alaska seat: billions of barrels assessed and not taken, polar darkness, and the highest missing-person rate in the United States.",
  },
  {
    id: "inl",
    name: "Idaho National Laboratory / Snake River Plain",
    shortName: "INL / Snake Plain",
    region: "Idaho desert volcanic plain",
    lat: 43.511,
    lng: -112.947,
    primary: true,
    access: "doe-nuclear",
    acres: 569_000,
    acresLabel: "890 square miles",
    restrictionNote:
      "Department of Energy nuclear reservation. Public highways cross the desert; the interior is a closed nuclear lab. Adjacent Craters of the Moon and the Lost River / Lemhi country are public wilderness with lava tubes that continue the same volcanic province under the fence.",
    resources: [
      {
        commodity: "Geothermal / basalt heat",
        status: "Research, not a civilian plant field on the lab",
      },
      {
        commodity: "Idaho cobalt / phosphate belt (regional)",
        status: "Critical-mineral province around, not inside, the lab",
      },
    ],
    missing: {
      rateLabel: "Idaho wilderness adjacency",
      notes:
        "Frank Church–River of No Return and the Lost River Range have a thin but real missing-hiker record. The lab itself is badge-access, so the statistic lives next door.",
      anomaly: 44,
    },
    habitat: [
      "World-class lava-tube province",
      "Eastern Snake River Plain aquifer — a dark freshwater sea under basalt",
      "Nuclear materials — the UAP/nuke correlation",
      "High-desert night sky",
    ],
    uapLore:
      "Nuclear reservations are where the serious UAP literature (Hastings, Salas, Nolan) keeps landing. INL is the Intermountain version: a closed nuclear box sitting on a hollow volcanic plain.",
    jacksonAngle:
      "Lava tubes are already a large-eye ecology (bats, troglobites). Jackson’s operators would not need to invent a habitat — only occupy the one geology already provided, then put a nuclear keep-away on the roof.",
    scores: {
      restriction: 88,
      resources: 62,
      missing: 44,
      subsurface: 90,
      uap: 74,
      darkness: 68,
    },
    nearby: ["Craters of the Moon", "Lost River Range", "Arco"],
    publicObservation:
      "Craters of the Moon National Monument, Highway 20/26 viewpoints, Arco. Do not enter INL interiors.",
    sources: ["hastings-nukes", "nolan-vallee", "jackson-x-ut"],
    summary:
      "A DOE keep-away sitting on lava tubes and a buried aquifer — nuclear roof, hollow floor, the Intermountain cryptoterrestrial geology.",
  },
  {
    id: "glacier-peak",
    name: "Glacier Peak Wilderness",
    shortName: "Glacier Peak",
    region: "North Cascades, Washington",
    lat: 48.1118,
    lng: -121.1132,
    primary: false,
    access: "wilderness-locked",
    acres: 566_057,
    acresLabel: "566,057 acres wilderness",
    restrictionNote:
      "People may hike it. They may not mine it. Pacific Legal Foundation’s compilation of the old wilderness mineral inventory puts ~$56 billion in copper here — 5.5× annual U.S. production — sitting unworked.",
    resources: [
      {
        commodity: "Copper",
        status: "Locked by wilderness",
        estimate: "~$56 billion (PLF compilation of USFS/USGS inventory)",
      },
    ],
    missing: {
      rateLabel: "Cascade Missing-411 belt",
      notes: "North Cascades and adjacent national forest are a documented cluster in the Paulides literature.",
      anomaly: 70,
    },
    habitat: ["Deep forest", "Volcanic interior", "High-elevation talus"],
    uapLore: "Pacific Northwest orbs and the 1947 Maury Island / Rainier corridor sit west of the peak.",
    jacksonAngle: "Type-3 scarecrow ecology: deep woods, berry bushes, boulder fields — the Missing-411 stage set.",
    scores: {
      restriction: 40,
      resources: 92,
      missing: 70,
      subsurface: 55,
      uap: 50,
      darkness: 72,
    },
    nearby: ["North Cascades", "Yakima Training Center"],
    publicObservation: "Standard wilderness permits. This is a hike, not a break-in.",
    sources: ["plf-minerals", "paulides"],
    summary: "The copper that was never taken, in a forest where people keep vanishing.",
  },
  {
    id: "glacier-bay",
    name: "Glacier Bay",
    shortName: "Glacier Bay",
    region: "Southeast Alaska",
    lat: 58.6658,
    lng: -136.9002,
    primary: false,
    access: "wilderness-locked",
    acres: 3_300_000,
    acresLabel: "3.3 million acres",
    restrictionNote:
      "Park + wilderness. Mining is off. PLF cites a nickel deposit on the order of 56× annual U.S. production (~$13 billion).",
    resources: [
      {
        commodity: "Nickel",
        status: "Locked in park/wilderness",
        estimate: "~$13 billion (PLF / old USFS inventory)",
      },
    ],
    missing: {
      rateLabel: "Alaska-wide extreme",
      notes: "Sits inside the Alaska missing-rate outlier.",
      anomaly: 88,
    },
    habitat: ["Tidewater ice", "Fjord marine", "Karst on adjacent islands"],
    uapLore: "Southeast Alaska USO / orb reports among fishermen.",
    jacksonAngle: "Ice and fjord as a maritime door — Type-2 over water, operators under the shelf.",
    scores: {
      restriction: 48,
      resources: 90,
      missing: 88,
      subsurface: 50,
      uap: 40,
      darkness: 80,
    },
    nearby: ["Icy Strait", "Cross Sound"],
    publicObservation: "Park boats and Gustavus. Respect bear and ice closures.",
    sources: ["plf-minerals", "newsweek-missing"],
    summary: "Locked nickel under ice, in the state that already loses people at 178 per 100,000.",
  },
  {
    id: "san-clemente",
    name: "San Clemente Island / SOCAL OPAREA",
    shortName: "San Clemente",
    region: "Southern California Bight",
    lat: 32.9,
    lng: -118.5,
    primary: false,
    access: "navy-maritime",
    acres: 36_000,
    acresLabel: "Island closed; surrounding range much larger",
    restrictionNote:
      "Navy-owned island. No civilian landing. The sea around it is a live weapons range. Catalina, public, sits next door as the observation deck.",
    resources: [
      {
        commodity: "California offshore oil province",
        status: "Historic platforms nearby; the island and inner range are not a lease block",
      },
    ],
    missing: {
      rateLabel: "Channel / migrant / diver cases",
      notes: "Channel Islands drownings and vanishments; not a Paulides forest cluster.",
      anomaly: 50,
    },
    habitat: ["Deep Catalina Basin", "USO corridor", "Island volcanic basement"],
    uapLore: "Southern California has a dense USO and sphere record. Jackson’s Type-2 layer is the one the Navy keeps photographing.",
    jacksonAngle: "The ocean half of the thesis. If they live under shelves, this is a fenced well.",
    scores: {
      restriction: 92,
      resources: 60,
      missing: 50,
      subsurface: 86,
      uap: 78,
      darkness: 70,
    },
    nearby: ["Santa Catalina", "San Nicolas Island", "Marina del Rey orb corridor"],
    publicObservation: "Catalina Island and mainland headlands. Do not approach San Clemente.",
    sources: ["jackson-book", "nolan-vallee"],
    summary: "The maritime keep-away: a Navy island on a USO shelf, oil around it, public landing forbidden.",
  },
  {
    id: "pebble",
    name: "Pebble deposit / Bristol Bay",
    shortName: "Pebble / Bristol Bay",
    region: "Southwest Alaska",
    lat: 59.9,
    lng: -155.3,
    primary: false,
    access: "wilderness-locked",
    acres: 0,
    acresLabel: "Deposit-scale lock, not a fenced range",
    restrictionNote:
      "Not military. EPA Clean Water Act 404(c) (2023) and a Corps permit denial blocked a copper-gold-molybdenum mine in one of the rare 404(c) vetoes in the statute’s history. Humans can visit; they cannot take the metal.",
    resources: [
      {
        commodity: "Copper, gold, molybdenum",
        status: "Blocked by EPA 404(c) and Corps denial",
        estimate: "One of the world’s largest undeveloped copper-gold systems",
      },
    ],
    missing: {
      rateLabel: "Alaska-wide extreme",
      notes: "Rural southwest Alaska participates in the statewide missing-rate outlier.",
      anomaly: 86,
    },
    habitat: ["Ponds and tundra", "Salmon hydrology", "Low-light winters"],
    uapLore: "Thin. Included because the resource lock is extraordinary, not because of Dulce-style lore.",
    jacksonAngle: "A keep-away enforced by statute instead of rifles — still a keep-away.",
    scores: {
      restriction: 55,
      resources: 98,
      missing: 86,
      subsurface: 40,
      uap: 22,
      darkness: 78,
    },
    nearby: ["Iliamna", "Nushagak", "Katmai"],
    publicObservation: "Villages and licensed outfitters. Not a clandestine target.",
    sources: ["epa-pebble", "newsweek-missing"],
    summary: "The metal that two administrations refused to let anyone take, in the state with the missing-persons spike.",
  },
  {
    id: "yosemite",
    name: "Yosemite National Park",
    shortName: "Yosemite",
    region: "Sierra Nevada, California",
    lat: 37.8651,
    lng: -119.5383,
    primary: false,
    access: "wilderness-locked",
    acres: 747_956,
    acresLabel: "Park, heavily visited",
    restrictionNote:
      "People are allowed. It fails the ‘keep humans away’ test and is on the atlas as a missing-persons control: the park with the most NPS unsolved missing cold cases (10).",
    resources: [{ commodity: "None locked at scale", status: "Park, not a mineral withdrawal" }],
    missing: {
      rateLabel: "10 NPS unsolved missing cold cases — highest in the system",
      notes: "Paulides’ Yosemite cluster. Contrast with Groom Lake: here humans are invited, and they still vanish.",
      anomaly: 92,
    },
    habitat: ["Granite cathedrals", "Boulder fields", "Deep forest"],
    uapLore: "Sierra orbs exist; this site is on the map for the missing, not the treaty.",
    jacksonAngle: "Type-3 scarecrow habitat without a military roof. Useful as a contrast case.",
    scores: {
      restriction: 20,
      resources: 15,
      missing: 92,
      subsurface: 45,
      uap: 35,
      darkness: 60,
    },
    nearby: ["Sierra National Forest", "Hetch Hetchy"],
    publicObservation: "The park is public. That is the point of the control.",
    sources: ["nps-cold", "paulides"],
    summary: "Control site: humans welcome, highest unsolved-missing count in the National Park System.",
  },
  {
    id: "skinwalker",
    name: "Skinwalker Ranch / Uinta Basin",
    shortName: "Skinwalker",
    region: "Uinta Basin, Utah",
    lat: 40.248,
    lng: -109.652,
    primary: false,
    access: "private-ranch",
    acres: 512,
    acresLabel: "512-acre ranch in a much larger basin",
    restrictionNote:
      "Private property. The ranch is the instrumented pin in a basin that already holds oil shale, tar sands, and a long Native and Mormon ‘window’ file. Jackson named it as Sphere Network ground infrastructure — the only U.S. ranch so tagged in his public stack.",
    resources: [
      {
        commodity: "Oil shale / tar sands",
        status: "Locked around the ranch by cost, statute, and the larger Uinta inventory",
        estimate: "Same Uinta super-basin as the UTTR keep-away",
      },
    ],
    missing: {
      rateLabel: "Ranch-scale, not a park cluster",
      notes: "The file is cattle, orbs, and hitchhikers — not Missing-411 counts.",
      anomaly: 45,
    },
    habitat: ["Uinta Basin alluvium", "Oil-shale overburden", "Night operations, low population"],
    uapLore:
      "NIDS, Bigelow, AAWSAP/BAASS, and a reality-TV sequel. Vallée helped structure data here; he did not certify the ranch as ontology. The missed connection is geographic: it sits between Dugway and the Uinta oil lock, not in a vacuum.",
    jacksonAngle:
      "Type-3 scarecrow plus Type-2 overhead. Jackson: this is a ground node of the Sphere Network, not a haunted farm.",
    scores: {
      restriction: 55,
      resources: 80,
      missing: 45,
      subsurface: 70,
      uap: 94,
      darkness: 78,
    },
    nearby: ["Dugway", "Ouray / Uinta oil", "Uintah and Ouray Reservation"],
    publicObservation: "Public roads around Ballard / Fort Duchesne only. The ranch is private.",
    sources: ["jackson-x-skinwalker", "puthoff-2022", "vallee-eth"],
    summary:
      "The Jackson-named ground node: a private ranch sitting on the Uinta oil lock, instrumented for twenty years, still not a keep-away range — which is the point. You can drive past it. The occupancy does not need a fence if the basin is already dark.",
  },
  {
    id: "yakima",
    name: "Yakima Training Center / Firing Center",
    shortName: "Yakima",
    region: "Yakima, Washington",
    lat: 46.67,
    lng: -120.36,
    primary: false,
    access: "military-restricted",
    acres: 327_000,
    acresLabel: "~327,000 acres Army training",
    restrictionNote:
      "A closed Army box in the rain shadow, next to the Yakama Nation and up-corridor from Glacier Peak’s locked copper. Classic Pacific Northwest ‘window’ (Gregory Long, 1970s–80s orbs and howls).",
    resources: [
      {
        commodity: "Columbia Basin irrigation / basalt",
        status: "Not a mineral lock; the lock is the range itself",
      },
    ],
    missing: {
      rateLabel: "Cascade belt, adjacent",
      notes: "The Missing-411 forest is west and north; the range is the dry half of the same province.",
      anomaly: 58,
    },
    habitat: ["Basalt scabland", "Arid steppe night", "Restricted airspace"],
    uapLore:
      "Yakima Firing Center orbs are a 20th-century window file: lights over the reservation and the range, sometimes answering spotlights. The missed connection is that Glacier Peak’s unworked copper sits one range north.",
    jacksonAngle: "Type-3 over a military night range, Type-2 linking INL lava tubes to Cascade forest.",
    scores: {
      restriction: 78,
      resources: 40,
      missing: 58,
      subsurface: 52,
      uap: 72,
      darkness: 80,
    },
    nearby: ["Yakama Nation", "Hanford", "Glacier Peak"],
    publicObservation: "Public land around the fence. Do not enter the training center.",
    sources: ["paulides", "jackson-book"],
    summary:
      "The dry military hinge between INL’s lava tubes and Glacier Peak’s locked copper — a window that never made the treaty list because it was already a range.",
  },
  {
    id: "catalina",
    name: "Catalina Channel / Southern California Bight",
    shortName: "Catalina Channel",
    region: "Santa Catalina – San Diego shelf",
    lat: 33.387,
    lng: -118.416,
    primary: false,
    access: "mixed-public",
    acres: 0,
    acresLabel: "Open water, Navy OPAREA underneath",
    restrictionNote:
      "The island is a tourist town. The water is a Navy sea range. 2004 Nimitz Tic Tac and 2019 USS Omaha sphere (no-splash ocean entry) sit on this shelf. Civilian boats and destroyers share the same bathymetry.",
    resources: [
      {
        commodity: "Offshore oil (Wilmington / Beta)",
        status: "Produced around the bight; the canyon is not a drill pad",
      },
    ],
    missing: {
      rateLabel: "Maritime, under-counted",
      notes: "Channel drownings and missing divers are not filed as Missing 411. Still a door.",
      anomaly: 48,
    },
    habitat: ["Catalina Basin", "Submarine canyons", "Twilight-zone water (mesopelagic)"],
    uapLore:
      "Preston Dennett’s Catalina compilation, Lockheed test-pilot incidents, Navy 16mm, Tic Tac, Omaha. RADM Gallaudet treats transmedium UAP as ocean science. Sycamore Knoll ‘base’ on Google Earth is pareidolia — rejected.",
    jacksonAngle:
      "Type-2 maritime: spheres exiting water. The occupancy’s cheapest volume is the shelf, not a star. San Clemente is the keep-away island; Catalina is the public half of the same door.",
    scores: {
      restriction: 50,
      resources: 62,
      missing: 48,
      subsurface: 88,
      uap: 90,
      darkness: 70,
    },
    nearby: ["San Clemente Island", "San Diego", "Catalina Island"],
    publicObservation: "Ferries, dive boats, public beaches. The Navy range is the water, not the town.",
    sources: ["gallaudet", "sanderson", "jackson-book"],
    summary:
      "The densest American USO file sitting next to a Navy island we already mapped. The missed connection: San Clemente is the rifle; Catalina Channel is the door.",
  },
  {
    id: "shasta",
    name: "Mount Shasta",
    shortName: "Mount Shasta",
    region: "Cascade volcano, California",
    lat: 41.409,
    lng: -122.195,
    primary: false,
    access: "wilderness-locked",
    acres: 38_200,
    acresLabel: "Wilderness + national forest around the cone",
    restrictionNote:
      "You may climb it. The lock is cultural and geologic: a hollow-mountain folklore so loud it contaminates the occupancy claim. On this atlas as the West Coast ‘they live in the hill’ file — labeled folklore, kept because Vallée’s sidhe map needs an American mountain.",
    resources: [
      {
        commodity: "Volcanic interior / cascade water",
        status: "Not a mineral super-lock",
      },
    ],
    missing: {
      rateLabel: "Cascade belt",
      notes: "Climber and forest vanishings; not Yosemite-scale unsolved counts.",
      anomaly: 52,
    },
    habitat: ["Volcanic tubes", "Tree line, long winter night", "Forest service roads"],
    uapLore:
      "Lemuria, Telos, and New Age inner-earth tourism. Reject as geography. Keep as a folklore hill: lights, missing time, ‘city inside the mountain.’ Jackson’s orbs over the Cascades do not require Telos.",
    jacksonAngle: "Type-3 over a volcanic cone between China Lake and Crater Lake. Folklore costume, possible real door.",
    scores: {
      restriction: 35,
      resources: 28,
      missing: 52,
      subsurface: 68,
      uap: 60,
      darkness: 70,
    },
    nearby: ["Crater Lake", "Lava Beds NM", "China Lake"],
    publicObservation: "Standard forest and wilderness access. This is a hike.",
    sources: ["vallee-magonia", "jackson-book"],
    summary:
      "The American hollow hill. Agartha tourism is rejected. The mountain stays on the map because folklore put the others inside volcanoes long before saucers.",
  },
  {
    id: "hudson",
    name: "Hudson Valley window",
    shortName: "Hudson Valley",
    region: "Hudson Valley / Pine Bush, New York",
    lat: 41.56,
    lng: -74.3,
    primary: false,
    access: "mixed-public",
    acres: 0,
    acresLabel: "Populated corridor, no keep-away",
    restrictionNote:
      "People live here. That is the missed connection: Jackson’s Type-1 tell — three equal-brightness lights in a V — is the 1982–86 Hudson Valley ‘Westchester boomerang’ in another dialect. 2026 Maussan clip of three orbs over New York sits in the same groove.",
    resources: [
      {
        commodity: "None locked",
        status: "This is a display corridor, not a resource box",
      },
    ],
    missing: {
      rateLabel: "Not a park cluster",
      notes: "A populated valley. The file is sightings, not vanishings.",
      anomaly: 22,
    },
    habitat: ["River corridor", "Night suburbs", "No subsurface claim"],
    uapLore:
      "Thousands of witnesses, NYPD and FAA chatter, J. Allen Hynek still alive for part of the wave. Dr. James S. Oberg and skeptics said advertising planes. The geometry matches Jackson’s naked-eye Type-1 more cleanly than Groom Lake does.",
    jacksonAngle:
      "Type-1 over a city is the control-system move Vallée warned about: the display is for the witness. Not a habitat. A billboard.",
    scores: {
      restriction: 10,
      resources: 8,
      missing: 22,
      subsurface: 12,
      uap: 88,
      darkness: 35,
    },
    nearby: ["Pine Bush", "Storm King", "Stewart Airport"],
    publicObservation: "Anywhere with a night sky. This is the opposite of a keep-away.",
    sources: ["jackson-book", "jackson-x-ut", "vallee-dimensions"],
    summary:
      "The largest American V-formation wave, in a place you do not need a clearance to stand. Habitat is west. The advertisement is here.",
  },
  {
    id: "aztec",
    name: "Aztec, New Mexico",
    shortName: "Aztec 1948",
    region: "San Juan Basin, New Mexico",
    lat: 36.8222,
    lng: -107.9928,
    primary: false,
    access: "mixed-public",
    acres: 0,
    acresLabel: "Town + oil field, ~70 miles from Archuleta Mesa",
    restrictionNote:
      "A town. Frank Scully’s 1950 crash-retrieval book planted an underground-race aside (Paxson Hayes: polar-vent people stirred by atomic tests) on the same basin as Dulce. The missed connection is spatial, not a second treaty box.",
    resources: [
      {
        commodity: "San Juan Basin oil and gas",
        status: "Produced at industrial scale around the town",
      },
    ],
    missing: {
      rateLabel: "Basin, not park",
      notes: "No Missing-411 signature. The overlay is crash lore.",
      anomaly: 18,
    },
    habitat: ["San Juan Basin", "Same gas province as Dulce"],
    uapLore:
      "Scully’s Aztec crash is contested (con-man witnesses). Keep as literature sitting 70 miles from the longest U.S. underground-base narrative. Polar vents in the same paragraph are rejected geology.",
    jacksonAngle: "If Dulce is a door, Aztec is the 1950 caption written on the same basin.",
    scores: {
      restriction: 15,
      resources: 70,
      missing: 18,
      subsurface: 55,
      uap: 64,
      darkness: 50,
    },
    nearby: ["Archuleta Mesa", "Farmington", "Shiprock"],
    publicObservation: "Public town. Crash-site tours are folklore businesses.",
    sources: ["dulce-wiki", "scully"],
    summary:
      "The 1950 crash book that already knew about underground people, sitting on Dulce’s gas basin. Lore, but the geography is not a coincidence.",
  },
  {
    id: "sedona",
    name: "Secret Mountain / Bradshaw Ranch",
    shortName: "Sedona",
    region: "Secret Mountain Wilderness, Arizona",
    lat: 34.87,
    lng: -111.82,
    primary: false,
    access: "wilderness-locked",
    acres: 47_030,
    acresLabel: "Secret Mountain Wilderness + a seized ranch",
    restrictionNote:
      "Wilderness plus a ranch that left private hands after a federal action. Coulthart’s reporting: orbs, claimed GPR voids, cameras on a ‘portal.’ Same 1.6 GHz story as Skinwalker. A keep-away that does not look like a bombing range.",
    resources: [
      {
        commodity: "Red-rock aquifer / no super-lock metal",
        status: "The lock is access and folklore density, not copper",
      },
    ],
    missing: {
      rateLabel: "Red-rock disappearances, anecdotal",
      notes: "Not a Paulides flagship. Hikers do go missing in the canyons.",
      anomaly: 40,
    },
    habitat: ["Sandstone alcoves", "Claimed subsurface voids", "Night desert"],
    uapLore:
      "Sedona is a New Age costume over a real window file. Treat tunnels as claimed. Treat the wilderness as a closed volume next to a ranch that was instrumented like Skinwalker.",
    jacksonAngle: "Type-3 over red rock, same class as Skinwalker, without the Uinta oil lock.",
    scores: {
      restriction: 58,
      resources: 22,
      missing: 40,
      subsurface: 62,
      uap: 74,
      darkness: 76,
    },
    nearby: ["Sedona", "Sycamore Canyon", "Flagstaff"],
    publicObservation: "Wilderness trails. Bradshaw is not a public attraction.",
    sources: ["jackson-book", "puthoff-2022"],
    summary:
      "Skinwalker’s Arizona cousin: a ranch-plus-wilderness keep-away that X treats as a portal and this atlas treats as a closed volume with a window file.",
  },
  {
    id: "aguadilla",
    name: "Aguadilla, Puerto Rico",
    shortName: "Aguadilla 2013",
    region: "Northwest Puerto Rico / Mona Passage",
    lat: 18.4275,
    lng: -67.1542,
    primary: false,
    access: "mixed-public",
    acres: 0,
    acresLabel: "Coastal city on a trench approach",
    restrictionNote:
      "Public town. 2013 CBP thermal: an object hits water, splits, continues. SCU published an analysis. 1989 fisherman anecdote of a large submerged craft is a separate, weaker file. The Puerto Rico Trench ‘depot’ is lore; this coast is the instrumented pin.",
    resources: [
      {
        commodity: "Mona Passage / trench approach",
        status: "Maritime volume, not a mineral lock",
      },
    ],
    missing: {
      rateLabel: "Caribbean maritime",
      notes: "Not a park cluster.",
      anomaly: 30,
    },
    habitat: ["Shelf to trench", "Warm night water"],
    uapLore:
      "Arecibo (already a crop/code node) is the island’s other pin. Aguadilla is the USO pin. Do not collapse them into a single underground base.",
    jacksonAngle: "Type-2 transmedium on the Atlantic half of the same occupancy that uses Catalina on the Pacific.",
    scores: {
      restriction: 20,
      resources: 25,
      missing: 30,
      subsurface: 80,
      uap: 86,
      darkness: 55,
    },
    nearby: ["Arecibo", "Mona Passage", "Puerto Rico Trench"],
    publicObservation: "Public waterfront. The 2013 video is the specimen.",
    sources: ["gallaudet", "sanderson"],
    summary:
      "The best-instrumented Caribbean USO, on the same island as the Arecibo code. Trench-depot lore stays lore; the thermal does not.",
  },
];

export const PRIMARY_SITES = SITES.filter((s) => s.primary);
export const WATCH_SITES = SITES.filter((s) => !s.primary);

export function siteById(id: string): Site | undefined {
  return SITES.find((s) => s.id === id);
}

export const ACCESS_LABEL: Record<Site["access"], string> = {
  "military-lethal": "Military withdrawal — lethal force",
  "military-restricted": "Military range — closed",
  "doe-nuclear": "DOE nuclear reservation",
  "tribal-closed": "Tribal land — permit required",
  "wilderness-locked": "Wilderness / statutory lock",
  "navy-maritime": "Navy island / sea range",
  "private-ranch": "Private ranch — no trespass",
  "mixed-public": "Public overlay on a closed volume",
};
