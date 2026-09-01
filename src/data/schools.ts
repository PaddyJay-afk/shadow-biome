export type SchoolRow = {
  id: string;
  name: string;
  habitat: string;
  intent: string;
  government: string;
  evidence: string;
  stance: "core" | "adjacent" | "lore" | "reject";
};

export const SCHOOLS: SchoolRow[] = [
  {
    id: "vallee",
    name: "Jacques Vallée",
    habitat: "Interlocking / parallel layer of this Earth; folklore hills, mines, lakes as the old map",
    intent: "Control system — a thermostat on human belief, not an invasion timetable",
    government: "Cover stories can be part of the theater; crash-retrieval is not the whole file",
    evidence: "Historical catalog, physical traces, psychophysiological effects, five ETH arguments",
    stance: "core",
  },
  {
    id: "keel",
    name: "John Keel",
    habitat: "Superspectrum — a wavelength of energy we do not detect; window areas",
    intent: "Staged events to install belief systems. Ultraterrestrial, his coinage",
    government: "Humans are the audience; agencies chase the costume",
    evidence: "Window-area fieldwork, Mothman / 1966–67 flap as a worked example",
    stance: "core",
  },
  {
    id: "jackson",
    name: "Patrick Jackson",
    habitat: "Crust and undersea. Core as power plant. Large-eye, low-light biology",
    intent: "Planetary defense grid (spheres) plus keep-away scarecrows",
    government: "Tongue-tied because the infrastructure is under the ranges",
    evidence: "Orb geometry, Type 1–3 stack, Q-code strobe, 60 fps tunnel frames",
    stance: "core",
  },
  {
    id: "tonnies",
    name: "Mac Tonnies",
    habitat: "Indigenous stealth species; underground as home, not hangar",
    intent: "Survival beside a more numerous ape. They prefer we say ‘alien’",
    government: "Possible joint sites in the report stream; unproven",
    evidence: "Occupant-report synthesis; posthumous 2010 monograph",
    stance: "core",
  },
  {
    id: "puthoff",
    name: "Hal Puthoff",
    habitat: "Sequestered terrestrial cultures: crypto, proto-human, extradimensional, time-traveler",
    intent: "Open taxonomy rather than one species",
    government: "A scientist who has stood near classified programs; the paper is the public piece",
    evidence: "2022 ‘Ultraterrestrial Models’",
    stance: "core",
  },
  {
    id: "layne",
    name: "Meade Layne",
    habitat: "Etheric / other-density of this planet, not deep space",
    intent: "Early interdimensional school (1940s–50s Borderland Sciences)",
    government: "Not a treaty theorist",
    evidence: "Ether-ship literature; historically prior to Vallée",
    stance: "adjacent",
  },
  {
    id: "sauder",
    name: "Richard Sauder",
    habitat: "Documented human underground construction; alleged NHI use is a separate claim",
    intent: "Military continuity, weapons, command",
    government: "Human. Do not collapse DOE tunnels into insectoid cities",
    evidence: "FOIA, contractor records, siting of deep facilities",
    stance: "adjacent",
  },
  {
    id: "dolan",
    name: "Richard Dolan (breakaway)",
    habitat: "A classified human offshoot with exotic technology — still us",
    intent: "Secrecy, advantage. Distinct from an older-than-human species",
    government: "The breakaway is the government, or a wing of it",
    evidence: "Secrecy studies; does not prove NHI occupancy",
    stance: "adjacent",
  },
  {
    id: "shaver",
    name: "Richard Shaver",
    habitat: "Cavern world of remnant Tero and degenerate Dero",
    intent: "Pulp-era predation myth that leaked into later Dulce talk",
    government: "N/A",
    evidence: "1940s Amazing Stories letters and fiction. Contested; treated as lore",
    stance: "lore",
  },
  {
    id: "dulce",
    name: "Dulce Base literature",
    habitat: "Seven-level joint facility under Archuleta Mesa",
    intent: "Genetics, treaty, later war — depending on the teller",
    government: "Alleged partner or combatant",
    evidence: "Bennewitz intercepts and later testimony. On this atlas as lore sitting on a real keep-away",
    stance: "lore",
  },
  {
    id: "byrd",
    name: "Byrd / hollow Earth",
    habitat: "Open polar holes, inner sun",
    intent: "Victorian / mid-century romance",
    government: "Fan edits of Operation Highjump",
    evidence: "Rejected here. Polar holes are not a dataset",
    stance: "reject",
  },
  {
    id: "agartha",
    name: "Agartha / Shambhala tourism",
    habitat: "Inner kingdom as travel brochure",
    intent: "Theosophical and internet folklore",
    government: "None",
    evidence: "Rejected as geography. Folklore motifs may still echo Vallée’s hill-people file",
    stance: "reject",
  },
];

export const FOLK_UNDERWORLDS = [
  {
    name: "Sidhe / hollow hills",
    where: "Ireland, Scotland, Brittany",
    note: "The others live in the mound. Offerings at the door. Time dilation inside. Vallée’s primary European parallel.",
  },
  {
    name: "Hopi sipapu",
    where: "Colorado Plateau",
    note: "Emergence from a previous world through a hole in the floor of this one. Not a UFO theory — a cosmology that already puts prior peoples below.",
  },
  {
    name: "Mines and knockers",
    where: "Cornwall, Wales, German Berggeist",
    note: "Small workers in the dark who resent intrusion. Jackson’s ‘don’t drill the infrastructure’ in an older accent.",
  },
  {
    name: "USO doors",
    where: "Catalina Basin, Gulf of Mexico, Puerto Rico trench, Baikal",
    note: "Objects entering water. Navy ranges often sit on the same shelves. Maritime half of the occupancy claim.",
  },
];

export const EYE_ARGUMENT = {
  title: "Large eyes as a habitat clue",
  body: "Jackson: oversized dark eyes imply a low-light niche. Comparative biology is a constraint, not a proof. True cave obligates (troglobites) usually lose eyes — they are expensive in zero light. Large eyes evolve at the photon edge: nocturnal mammals, owls, mesopelagic fish in the ocean twilight, cave-entrance species. If the frames show huge black eyes and the beings appear at night on the surface, that argues for nocturnality or twilight, not a sealed city five kilometers down. Jackson’s crustal claim still works if they use lava tubes, shelf-edge water, and polar night as the door, and the deep dark as infrastructure they do not need to see in. Vallée’s colder option remains open: the face is a mask built for human vision.",
};
