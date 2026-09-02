import { SITE_DECLINATION } from "./isogonics";

export type AncientSite = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  lat: number;
  lng: number;
  era: string;
  kind: "cradle" | "megalith" | "underground" | "uso-shelf";
  declination: number;
  fault: string;
  tldr: string;
  analysis: string;
  nhi: string;
  hancock: string;
  mainstream: string;
  images: { src: string; alt: string }[];
};

const d = (id: string) => SITE_DECLINATION[id] ?? 0;

export const ANCIENT: AncientSite[] = [
  {
    id: "giza",
    name: "Giza plateau",
    shortName: "Giza",
    region: "Lower Egypt",
    lat: 29.9792,
    lng: 31.1342,
    era: "c. 2600 BCE official; Hancock/Schoch argue the Sphinx is older",
    kind: "cradle",
    declination: d("giza"),
    fault: "Nile graben on the African-rift family — not a locked military box, a crustal hinge.",
    tldr: "Barnhart put Egypt on the zero line. WMM puts Giza at about +5.1° — on the sister contour, not the agonic. Still a low-interference site sitting on a rifted valley with the most over-described stones on Earth.",
    analysis:
      "Ed Barnhart, on Shawn Ryan #335, said the cradles hover where ‘magnetic interference is zero,’ and named Egypt. The Boy Scout isogonic map at classroom scale makes that look true. The model does not: Giza is +5.13°, Ur +4.57°. They sit on the +5° contour that runs Sinai–Nile, a few hundred kilometres from the 0° sine wave. That is ‘quiet,’ not ‘exactly zero.’ The better signal is the fault: the Nile is a failed rift. Jackson’s operators want volume under a hinge. Hancock wants a survivor cult that could survey true north — and Giza is still one of the best true-north machines ever built. Declination today is the wrong clock for a 4,600-year-old survey. A species that lives in the field could keep the heading even as the pole wandered.",
    nhi: "Orion-correlation (Bauval) plus Vallée’s ‘too many landings, too-humanoid bodies’ plus Jackson’s crustal operators. The plateau is a beacon, not a tomb-first project. Public. Heavily watched. Not a keep-away.",
    hancock:
      "Fingerprints of the Gods / Magicians of the Gods: the Sphinx’s water weathering is the ice-age tell. Official chronology is a renovation, not a birth certificate.",
    mainstream:
      "Khufu–Khafre–Menkaure pyramid field, 4th Dynasty. Schoch’s rainfall weathering is contested. No NHI required.",
    images: [
      { src: "/ancient/giza-1.jpg", alt: "NASA Earth Observatory view of the Giza pyramids" },
      { src: "/art/cavern.jpg", alt: "Subsurface volume under a desert hinge — interpretive" },
    ],
  },
  {
    id: "gobekli",
    name: "Göbekli Tepe",
    shortName: "Göbekli",
    region: "Şanlıurfa, Turkey",
    lat: 37.2231,
    lng: 38.9224,
    era: "c. 9600–8000 BCE",
    kind: "megalith",
    declination: d("gobekli"),
    fault: "East Anatolian Fault — the 2023 Kahramanmaraş rupture family. A live door.",
    tldr: "Oldest dated megalith. Built by ‘hunter-gatherers,’ then backfilled. Hancock’s prime exhibit. Sits on a transform fault, D ≈ +6.2°.",
    analysis:
      "If any single site breaks the textbook sequence (farming → surplus → temples), it is this hill. T-pillars with animals and a possible Taurid/Younger Dryas sky-story (Martin Sweatman, contested). Barnhart’s zero-line does not tag it cleanly. The fault does. Karahan Tepe is next door. The Taş Tepeler complex is a cluster, not a one-off. For Jackson: a ceremonial roof over a fracture. For Hancock: the school the sages opened after the flood. For Vallée: a control-system shrine that predates cities.",
    nhi: "Not a UFO hotspot. The NHI read is older: teachers coming out of the hills after a catastrophe, leaving a stone language, then covering it.",
    hancock:
      "Ancient Apocalypse ep. 5. Hunter-gatherers were not supposed to be able to do this. The backfill looks like a shutdown, not a collapse.",
    mainstream:
      "Klaus Schmidt / DAI: ritual enclosure of late hunter-gatherers. Extraordinary, still human. No lost industrial civilization in the strata.",
    images: [
      { src: "/ancient/gobekli-1.jpg", alt: "Göbekli Tepe enclosure with T-pillars" },
      { src: "/ancient/gobekli-2.jpg", alt: "T-shaped megaliths at night" },
    ],
  },
  {
    id: "derinkuyu",
    name: "Derinkuyu underground city",
    shortName: "Derinkuyu",
    region: "Cappadocia, Turkey",
    lat: 38.3756,
    lng: 34.9115,
    era: "Phrygian–Byzantine occupation of a much older volcanic-tuff maze",
    kind: "underground",
    declination: d("derinkuyu"),
    fault: "Central Anatolian volcanic province — tuff you can carve, on the same plate as Göbekli.",
    tldr: "Eighteen levels. Rolling-stone doors. Air shafts. Room for tens of thousands. The most literal ‘people live under the ground’ file in the atlas.",
    analysis:
      "Tourism says ‘Christians hiding from Romans.’ The engineering says a culture that already thought in three dimensions of rock. Jackson’s operators would not need Derinkuyu — they would need the idea of it: that the safe place is down. Vallée’s hollow hills are Cappadocia with the folklore still on. Declination +6.3°, same quiet-ish Anatolian band as Göbekli. Not a keep-away. You can buy a ticket. That is the point of a public door.",
    nhi: "If ultraterrestrials share the crust, a human copy of their architecture would look like this: shafts, millstones as airlocks, no surface signature until you fall in.",
    hancock: "He uses Cappadocia less than Göbekli. The underground-city file is closer to Richard Sauder / ‘hidden chambers’ literature than to Ice Age sages.",
    mainstream:
      "Multi-period troglodyte settlement in ignimbrite. Impressive, dated, human. No non-human tool marks published.",
    images: [
      { src: "/ancient/derinkuyu-1.jpg", alt: "Interior of Derinkuyu carved tuff rooms" },
      { src: "/ancient/derinkuyu-2.jpg", alt: "Cross-section illustration of the underground city" },
    ],
  },
  {
    id: "baalbek",
    name: "Baalbek / Trilithon",
    shortName: "Baalbek",
    region: "Beqaa Valley, Lebanon",
    lat: 34.0069,
    lng: 36.2039,
    era: "Roman temple on a megalithic podium; the podium’s age is the fight",
    kind: "megalith",
    declination: d("baalbek"),
    fault: "Dead Sea Transform — the Levant’s strike-slip door, same family as Jericho and Petra.",
    tldr: "1,000+ tonne blocks. A Roman temple sitting on something the Romans did not have to invent. Hancock’s favorite ‘they were not the first’ platform.",
    analysis:
      "The Trilithon and the Stone of the Pregnant Woman are the scale argument: if you can quarry and move that, you are not a Bronze Age crew with ropes as the whole story. Mainstream: Roman/Herodian engineering is enough. Fringe: pre-Roman, possibly pre-flood platform on a transform fault. D ≈ +5.7°, same band as Giza. The ley from Göbekli through Baalbek to Giza is a named line in this atlas because the faults already connect them.",
    nhi: "Local folklore of djinn and ‘temple of the sun.’ Not a modern UAP flap. The NHI read is architectural: a pad, not a parish church.",
    hancock: "Magicians of the Gods — the podium predates Jupiter. The Romans were squatters with good columns.",
    mainstream: "Roman Heliopolis. Large stones are hard, not impossible. No need for lost tech.",
    images: [
      { src: "/ancient/baalbek-1.jpg", alt: "The Stone of the Pregnant Woman at Baalbek, person for scale" },
      { src: "/art/range.jpg", alt: "Desert range light — the Beqaa is a rift valley" },
    ],
  },
  {
    id: "stonehenge",
    name: "Stonehenge / Avebury",
    shortName: "Stonehenge",
    region: "Wiltshire, England",
    lat: 51.1789,
    lng: -1.8262,
    era: "c. 3000–2000 BCE",
    kind: "megalith",
    declination: d("stonehenge"),
    fault: "Not a plate boundary. Chalk downland. The magnetic story here is the agonic, not a rift.",
    tldr: "WMM D ≈ +0.3°. Avebury +0.25°, Carnac +0.17°. The British and Breton megalith belt is on Barnhart’s sine wave more cleanly than Giza is.",
    analysis:
      "This is the surprise in the numbers. Barnhart named Egypt and missed the place that actually sits on 0°. London’s declination crossed zero around 2020; the Wiltshire henge-complex is still there. That cannot be why they were built — the line has moved — unless the corridor is a long-lived ‘quiet band’ that the pole keeps sweeping, or the builders were locking to true north with a method that does not care about this year’s compass. Watkins started ley hunting here. The St Michael line is the folk cable.",
    nhi: "Crop-circle country (Chilbolton is 20 km). Jackson’s Type-3 scarecrows overlay the same chalk. Rendlesham is the other English node.",
    hancock: "He treats the British megaliths as a late echo of the same sky-religion, not as the origin.",
    mainstream: "Neolithic and Bronze Age ceremonial landscape. Solar and lunar alignments are real. Leys are selection bias.",
    images: [
      { src: "/ancient/stonehenge-1.jpg", alt: "Stonehenge sarsen circle" },
      { src: "/art/strobe-plate.jpg", alt: "Q-code / crop-formation overlay — Chilbolton is nearby" },
    ],
  },
  {
    id: "harappa",
    name: "Harappa / Mohenjo-daro",
    shortName: "Harappa",
    region: "Punjab / Sindh, Indus",
    lat: 30.6266,
    lng: 72.8636,
    era: "c. 2600–1900 BCE",
    kind: "cradle",
    declination: d("harappa"),
    fault: "Near the Himalayan front’s western syntaxis — not on the trench, in the foreland.",
    tldr: "Barnhart named Harappa. D ≈ +2.4° (Mohenjo-daro +2.0°). This is the cleanest Old-World cradle-on-the-sine-wave hit after Yucatán.",
    analysis:
      "Planned brick cities, weights, drains, almost no palaces. A civic mind that looks ‘quiet’ even in the archaeology. If Barnhart’s electromagnetic-people idea has a test bed, it is here: a civilisation that standardised everything and then vanished into the dust without a hero-king narrative. The agonic’s Asian branch runs close. Xi’an, the Chinese cradle, is −4.0° — still in the |D|<5 band, not on zero.",
    nhi: "Thin UAP file. The NHI read is Vallée’s: a culture that does not look like our temple-state default, as if the control system had a different setting.",
    hancock: "He spends less time on the Indus than on Göbekli and the Andes. Independent invention vs. seed-sages is the live fight.",
    mainstream: "Bronze Age urbanism, climate/river shift collapse. No lost ice-age layer under the bricks.",
    images: [
      { src: "/art/range.jpg", alt: "Dry alluvial light — stand-in for the Indus plain" },
      { src: "/ancient/giza-1.jpg", alt: "Planned geometry from above — the civic habit" },
    ],
  },
  {
    id: "ur",
    name: "Ur / Eridu / Uruk",
    shortName: "Sumer",
    region: "Dhi Qar, Iraq",
    lat: 30.9626,
    lng: 46.1031,
    era: "Eridu from c. 5400 BCE; urban explosion 4th millennium",
    kind: "cradle",
    declination: d("ur"),
    fault: "Zagros collision’s foreland. The Tigris–Euphrates sit in a sag, not a locked range.",
    tldr: "The textbook first cities. D ≈ +4.6°. Same ‘near, not on’ the agonic as Giza. The 30th-parallel agricultural belt explains more than the Boy Scout map.",
    analysis:
      "Honesty first: Sumer, Egypt, the Indus and the Yellow River are a climate-and-river story. Barnhart noticed they also sit in a magnetically mild mid-latitude band. Both can be true. The puzzle is why the same band later hosts Göbekli’s hill, Baalbek’s pad, and the British henges — not just irrigation states. The zigzag of 0° and +5° contours through this longitude is the ‘sine wave’ he was looking at.",
    nhi: "Anunnaki-as-NHI is Zecharia Sitchin, which this atlas rejects as a mistranslation industry. The ultraterrestrial read is older and quieter: occupancy under the alluvium, cities as a permitted surface experiment.",
    hancock: "Sumer as a receiver of older knowledge, not the inventor of it. Eridu’s ‘first city’ claim is a memory of a restart.",
    mainstream: "Ubaid to Uruk independent trajectory. Writing, beer, taxes. No aliens in the tablets.",
    images: [
      { src: "/art/range.jpg", alt: "Alluvial desert — the southern Mesopotamian setting" },
      { src: "/ancient/giza-1.jpg", alt: "Monumental geometry from altitude" },
    ],
  },
  {
    id: "teotihuacan",
    name: "Teotihuacan / Cholula",
    shortName: "Teotihuacan",
    region: "Valley of Mexico",
    lat: 19.6925,
    lng: -98.8438,
    era: "c. 100 BCE–550 CE (city); Cholula’s core is older",
    kind: "megalith",
    declination: d("teotihuacan"),
    fault: "Trans-Mexican volcanic belt. Popocatépetl is the chimney.",
    tldr: "Grid city, Avenue of the Dead, Pyramid of the Sun over a man-made cave. D ≈ +3.5°. Barnhart’s Yucatán zero is 1,000 km east; this is the volcanic twin.",
    analysis:
      "A cave under the Sun pyramid is not a rumour — it is excavated. Jackson would call that a designed interface. Hancock’s Cholula episode treats the largest pyramid by volume as a memory of something older. Declination is mild. The fault is not: this is a subduction-related volcanic chain, crust opening and closing. Mesoamerica’s ‘cradles’ (Olmec La Venta D≈+1.3°, Chichén D≈−2.0°, Mérida D≈−1.4°) are the best confirmation of Barnhart’s actual sentence.",
    nhi: "Local folklore of the ‘place where men become gods.’ Modern UAP culture around Mexico City is dense. The cave is the NHI object, not the tourist stairs.",
    hancock: "Ancient Apocalypse — Cholula and the sages. Teotihuacan as a later receiver of the same grid-and-cave idea.",
    mainstream: "Multi-ethnic metropolis, later Aztec pilgrimage. Engineering is human. The cave is a ritual construction.",
    images: [
      { src: "/ancient/teotihuacan-1.jpg", alt: "Pyramid of the Sun, Teotihuacan" },
      { src: "/ancient/teotihuacan-2.jpg", alt: "Avenue of the Dead looking toward the Sun pyramid" },
    ],
  },
  {
    id: "chichen",
    name: "Chichén Itzá / Mérida shelf",
    shortName: "Yucatán",
    region: "Yucatán, Mexico",
    lat: 20.6843,
    lng: -88.5678,
    era: "Maya Late Classic–Terminal; the karst is older than any temple",
    kind: "cradle",
    declination: d("chichen"),
    fault: "Not a plate edge. Karst over the Chicxulub structure — a buried crater, a different kind of wound.",
    tldr: "Barnhart: ‘top of Yucatán, it’s zero.’ Mérida −1.41°, Chichén −1.98°. This is the hit that made him say it out loud.",
    analysis:
      "Cenotes, a buried impact, a civilisation that put its sacred holes on water-filled karst. Magnetic declination is near zero. The Chicxulub crater is a crustal scar you can still map with gravity. If you wanted a non-fault ‘door’ — a place the crust was already broken and re-healed — this is it. Maya astronomy is the public face. The cenote is the private one.",
    nhi: "Cenote sacrifice as a control-system payment (Vallée’s thermostat, not a joke). Modern UAP reports along the Caribbean shelf (Aguadilla is the instrumented cousin).",
    hancock: "Maya as inheritors. He is less interested in Chichén than in the Olmec and in Amazon earthworks — Barnhart’s other subject on the same show.",
    mainstream: "Maya city with a cenote cult. Chicxulub is 66 Ma, irrelevant to human siting except as geology tourists notice.",
    images: [
      { src: "/ancient/teotihuacan-2.jpg", alt: "Mesoamerican pyramid geometry — Yucatán cousin" },
      { src: "/art/cavern.jpg", alt: "Karst / cenote volume — the actual Yucatán interface" },
    ],
  },
  {
    id: "angkor",
    name: "Angkor / Gunung Padang",
    shortName: "Angkor",
    region: "Cambodia / West Java",
    lat: 13.4125,
    lng: 103.867,
    era: "Angkor 9th–15th c. CE; Gunung Padang’s buried layers are the fight (Holocene vs. much older)",
    kind: "megalith",
    declination: d("angkor"),
    fault: "Sunda megathrust offshore. Java is the Ring of Fire’s densest chimney line.",
    tldr: "Barnhart: ‘Southeast Asia, it’s zero.’ Angkor −0.72°, Gunung Padang +0.51°. The quiet-band claim is strongest here.",
    analysis:
      "Two sites, one magnetic sentence. Angkor is a hydraulic city aimed at the sky (equinox, Vishnu, the barays). Gunung Padang is Hancock’s Indonesian hill: columnar andesite terraces, disputed carbon dates, a possible buried chamber. Both sit on the 0° branch that runs Indonesia–Malaya. If you only had Barnhart’s Boy Scout map and no Egypt, you would still have a civilizational corridor on the agonic in SE Asia.",
    nhi: "Gunung Padang’s ‘chamber’ is the NHI bait. Angkor is the later, human, beautiful occupation of the same quiet.",
    hancock: "Ancient Apocalypse / Magicians — Gunung Padang as a pyramid in a volcano’s clothing. Mainstream dating is the hill he is willing to die on.",
    mainstream: "Angkor is medieval Khmer. Gunung Padang is a hilltop megalithic site; the very early dates are not accepted.",
    images: [
      { src: "/art/cavern.jpg", alt: "Volcanic interior — Gunung Padang’s andesite idea" },
      { src: "/ancient/nanmadol-2.jpg", alt: "Stone and water — the SE Asian construction habit" },
    ],
  },
  {
    id: "nan-madol",
    name: "Nan Madol",
    shortName: "Nan Madol",
    region: "Pohnpei, Micronesia",
    lat: 6.8444,
    lng: 158.3358,
    era: "c. 1200–1500 CE on older occupation",
    kind: "uso-shelf",
    declination: d("nan-madol"),
    fault: "Pacific plate / island-arc. A drowned basalt city in a lagoon — USO geography, not a desert keep-away.",
    tldr: "Basalt-column palaces in salt water. The ‘Venice of the Pacific’ is a Type-2 door: ocean, columns, a city that is already flooding.",
    analysis:
      "Hancock loves a drowned city because the Younger Dryas sea-level rise is his murder weapon. Nan Madol is too young to be that murder — it is a late copy of the idea: live at the waterline in stone. D ≈ +5.7°. Not on the agonic. On the ocean. Jackson’s mid-grid cares about shelves more than about 0°.",
    nhi: "Local spirits (Saudeleur, canal-ghosts). Modern Pacific USO files sit in the same basin as this construction style.",
    hancock: "He files it with other water-cities as a memory of a lost coastal world, even when the dates are late.",
    mainstream: "Saudeleur-period ceremonial centre. Hard labour, coral fill, no lost high-tech.",
    images: [
      { src: "/ancient/nanmadol-1.jpg", alt: "Basalt column walls at Nan Madol" },
      { src: "/ancient/nanmadol-2.jpg", alt: "Nan Madol walls in the lagoon" },
    ],
  },
  {
    id: "sacsay",
    name: "Sacsayhuamán / Tiwanaku",
    shortName: "Andes",
    region: "Cusco, Peru / Altiplano, Bolivia",
    lat: -13.5075,
    lng: -71.9817,
    era: "Inca finish on older megalithic work; Tiwanaku Classic c. 500–1000 CE, Hancock argues older",
    kind: "megalith",
    declination: d("sacsay"),
    fault: "Andean megathrust. The whole spine is a subduction door.",
    tldr: "Polygonal walls that ignore earthquakes. D ≈ −7.2° (Tiwanaku −9.2°). Off Barnhart’s zero. On the strongest fault in the set.",
    analysis:
      "This is where the atlas stops treating declination as the master key. The Andes are magnetically loud and tectonically louder. Hancock’s fingerprint (Puma Punku’s H-blocks, Sacsayhuamán’s jigsaw) is a craft argument, not a compass argument. If ultraterrestrials pick sites for crustal access, they pick this. If they pick sites for ‘no magnetic interference,’ they do not. Two occupancy modes: quiet-band cities vs. fracture-band workshops.",
    nhi: "Andean sky-people (Viracocha) as the sage layer. Modern UAP/USO along the trench. Cusco as a public interface, like Skinwalker is a private one.",
    hancock: "Fingerprints — the Altiplano is Atlantis-adjacent in his map, a high refuge after the flood.",
    mainstream: "Inca and Tiwanaku stonemasonry is extraordinary and human. Seismic fitting is an engineering feature, not a time-stamp from 12,000 BCE.",
    images: [
      { src: "/ancient/sacsay-1.jpg", alt: "Sacsayhuamán polygonal megalithic wall" },
      { src: "/art/range.jpg", alt: "High dry light — Altiplano setting" },
    ],
  },
  {
    id: "poverty-point",
    name: "Poverty Point / Cahokia",
    shortName: "Mounds",
    region: "Louisiana / Illinois",
    lat: 32.6368,
    lng: -91.4063,
    era: "Poverty Point c. 1700–1100 BCE; Cahokia peak c. 1050–1350 CE",
    kind: "megalith",
    declination: d("poverty-point"),
    fault: "New Madrid / Reelfoot rift — intraplate, the failed scar under the Mississippi.",
    tldr: "Hancock’s American lost-civilization file. Poverty Point D ≈ −1.1°, Cahokia −2.4°. On the Americas agonic and on a rift.",
    analysis:
      "The Americas branch of the 0° line runs Gulf → Mississippi → Great Lakes. Poverty Point and Cahokia sit on it. They also sit on the Reelfoot rift, the same intraplate wound that still shakes. Barnhart plus Hancock plus Jackson in one river: quiet compass, broken crust, mounds instead of pyramids. Serpent Mound (D ≈ −7°) is off the zero and on a cryptoexplosion/crater debate of its own.",
    nhi: "Mound-builder folklore, later Skinwalker-style ‘window’ talk further west. The Mississippi is a Type-3 landscape: people vanish in parks on the same drainage.",
    hancock: "Ancient Apocalypse ep. 6 / America Before — ice-age Americans as the missing chapter.",
    mainstream:
      "Hunter-gatherer monumentalism (Poverty Point) and a Mississippian city (Cahokia). No ice-age megalith under the ridges.",
    images: [
      { src: "/art/range.jpg", alt: "River-plain light — the Mississippi mound setting" },
      { src: "/ancient/teotihuacan-1.jpg", alt: "Earth and sky pyramid geometry" },
    ],
  },
  {
    id: "chaco",
    name: "Chaco Canyon",
    shortName: "Chaco",
    region: "San Juan Basin, New Mexico",
    lat: 36.06,
    lng: -107.9608,
    era: "c. 850–1250 CE",
    kind: "megalith",
    declination: d("chaco"),
    fault: "San Juan Basin / Colorado Plateau — same energy kitchen as Aztec 1948 and Dulce.",
    tldr: "Great houses, roads that go nowhere obvious, a dark-sky basin. D ≈ +8.4° — keep-away-band magnetism, not cradle-band.",
    analysis:
      "Chaco is what the quiet-band theory fails. It is a ritual city in a magnetically noisy, resource-locked basin next to the atlas’s Dulce and Aztec nodes. Roads align to solstice and to outliers tens of kilometres away — a ley in the American sense. If the operators have a public ceremonial interface on the Colorado Plateau, this is it, and it does not need D=0.",
    nhi: "Navajo and Pueblo night-sky and emergence stories. The San Juan Basin is already on this atlas as gas, lore, and a 1948 crash book.",
    hancock: "He prefers Poverty Point to Chaco. Chaco is the later, Ancestral Puebloan, still-numinous occupation.",
    mainstream: "Ancestral Puebloan regional centre. Astronomy is real. No NHI in the masonry.",
    images: [
      { src: "/art/range.jpg", alt: "High desert canyon light" },
      { src: "/art/corridor.jpg", alt: "The Four Corners corridor schematic" },
    ],
  },
  {
    id: "osirion",
    name: "Osirion / Abydos",
    shortName: "Osirion",
    region: "Sohag, Egypt",
    lat: 26.1844,
    lng: 31.9189,
    era: "Seti I temple above; the Osirion’s style is the argument",
    kind: "underground",
    declination: d("osirion"),
    fault: "Same Nile hinge as Giza, further up-river. Groundwater in the megalithic hall.",
    tldr: "A megalithic hall that looks older than the temple standing on it, often flooded. D ≈ +4.8°. Hancock/West’s ‘we are looking at a renovation.’",
    analysis:
      "If Giza is the public pyramid, Abydos is the private machine: a granite and sandstone box that wants to be a tank. John Anthony West and Schoch’s older-Egypt thesis lives here as much as at the Sphinx. Magnetically it is Giza’s twin. Architecturally it is Derinkuyu’s cousin — down, wet, not for tourists’ gods.",
    nhi: "Osiris as dying-and-rising vegetation god in the textbook; as an underground king in the older read. Vallée would file the mystery-religion, not the saucer.",
    hancock: "Magicians of the Gods — the Osirion is out of place in the 19th-Dynasty kit.",
    mainstream: "Seti I / Merenptah ceremonial cenotaph. The groundwater is a maintenance problem, not a date.",
    images: [
      { src: "/art/cavern.jpg", alt: "Flooded subterranean hall — the Osirion idea" },
      { src: "/ancient/giza-1.jpg", alt: "Egyptian monumental survey from above" },
    ],
  },
];

export function ancientById(id: string) {
  return ANCIENT.find((s) => s.id === id);
}

export function fmtDecl(d: number) {
  const n = Math.abs(d).toFixed(1);
  if (d > 0.15) return `+${n}° E`;
  if (d < -0.15) return `−${n}° W`;
  return `${n}° (agonic)`;
}
