import { ANCIENT } from "@/data/ancient";
import { FAULTS } from "@/data/faults";
import { LEYS } from "@/data/leys";
import { CLUSTERS } from "@/data/missing";
import { NODES } from "@/data/network";
import { siteById } from "@/data/sites";

export type PlaceImage = { src: string; alt: string };

export type PlaceCard = {
  title: string;
  kicker: string;
  text: string;
  lat: number;
  lng: number;
  images: PlaceImage[];
  link?: { to: "/sites/$id" | "/ancient/$id"; id: string };
};

const range = { src: "/art/range.jpg", alt: "Dry range and locked ground" };
const cavern = { src: "/art/cavern.jpg", alt: "Rock volume under the surface" };
const corridor = { src: "/art/corridor.jpg", alt: "A cut through dark rock" };
const sphere = { src: "/art/sphere.jpg", alt: "A metallic sphere over night ground" };
const plate = { src: "/art/strobe-plate.jpg", alt: "High-speed plate from the strobe work" };

const NODE_NOTES: Record<string, string> = {
  gulf: "Deep Gulf water over salt and oil. A Type-2 ocean node: the layer Jackson says the Navy keeps filming, here sitting on a basin that is drilled at the edges and still has shut-in blocks.",
  arecibo: "The collapsed dish is the public ruin. The node is the karst underneath — limestone honeycombed into caves — and the crop-circle file that treated this island as a receiver.",
  chilbolton: "Hampshire radio telescope and the 2001 formation Jackson reads as a binary reply. Twenty kilometres from Stonehenge. This is the site of the strobe that, in his account, broke a cloak for a few frames.",
  rendlesham: "December 1980, RAF Woodbridge. The English sphere-hub: lights in the plantation, a claimed landed object, and a forest that is still walked by the public.",
  hessdalen: "A Norwegian valley that has flashed on instruments since the 1980s. Lights that sit, move, and return. Jackson would file it as a regional node over a cold, mineral valley, not a visitor lane.",
  "pine-gap": "Joint Defence Facility, Alice Springs. One of the few Southern Hemisphere keep-aways with a real fence. Desert, aquifer, and a listening post the public does not enter.",
  colares: "1977, an island at the mouth of the Amazon. Doctors logged burns. The file is coastal and hot — a USO-adjacent flap, not a mountain myth.",
  varginha: "1996, Minas Gerais. The Brazilian ‘captured being’ story. Contested hard. Kept on the map as a sphere-hub claim sitting over iron country.",
  buga: "A Colombian valley sphere report, recent and disputed. Placed here because the network model wants a northern-Andes node between the ocean and the mountains.",
  giza: "The plateau is public and over-described. On this map it is a beacon on a failed rift, not a keep-away. The stones keep a true-north heading the compass has since walked away from.",
  baikal: "The deepest freshwater rift on Earth. Volume, cold, and a crack that goes to the mantle’s doorstep. A natural Jackson habitat: dark water in a wound in the crust.",
  mcmurdo: "The Ross Ice Shelf and the American station. Ice as a roof. What is under the shelf is surveyed by governments and almost no one else.",
  bermuda: "A deep Atlantic basin with a retired legend. The useful fact is the water column and the seafloor, not the disappearing ships.",
  "devils-sea": "South of Japan, a Pacific patch with the same folkloric job as Bermuda. Subduction is the real structure: the Pacific plate going down.",
  mariana: "The deepest trench. If any ocean volume qualifies as an untouched habitat, it is this one. No mine, no city, pressure that ends a human visitor.",
  "kapustin": "Soviet, then Russian, missile range on the steppe. A closed sky over flat mineral ground. The Eurasian twin of the American test ranges.",
  hakui: "Noto peninsula. A coastal sphere file beside a live fault. The 2024 quake is the geology; the lights are the claim.",
  nazca: "The lines are a surface code on a desert that barely rains. Public to fly over, empty to stand in. A Type-3 country: marks meant to be read from above.",
  "crater-lake": "A caldera full of water inside a public park. The emblematic case is a child at the rim. The habitat read is the flooded volcanic throat.",
  smokies: "The eastern missing-person counterpart to Yosemite. Old mountains, thick cover, and a handful of cold cases that never produced a body.",
};

const FAULT_NOTES: Record<string, string> = {
  "san-andreas": "The plate boundary Californians live on. A transform, not a trench. In this atlas a fault is a possible door: long, crushed rock, and a reason the surface is already broken.",
  cascadia: "A locked megathrust from Cape Mendocino to Vancouver Island. The last full rupture was 1700. The volume above the descending plate is the part Jackson’s model would care about.",
  wasatch: "The Wasatch fault is why Salt Lake City has an earthquake problem. It edges the closed ranges of Dugway and the Uinta ranch country.",
  "rio-grande": "A rift through New Mexico, with Dulce and the Valles caldera on its shoulders. Continental crust pulled thin.",
  "new-madrid": "An old rift under the Mississippi, still able to shake the middle of the continent. 1811–12 is the reminder that a quiet map can hide a live seam.",
  "dead-sea": "The Levant’s transform. Jericho, Petra, and Baalbek sit in its family. A deep, dry valley and a plate sliding past a plate.",
  "east-anatolian": "The 2023 rupture family. Göbekli Tepe is not on the scrapes, but it is in the same broken province.",
  "north-anatolian": "Istanbul’s approaching earthquake. A long strike-slip, historically punctual.",
  "east-african-rift": "The continent actually splitting. Lakes in the wounds. The most literal ‘the ground is opening’ structure on the map.",
  himalaya: "India still driving under Asia. The highest rock on the surface, and a fault zone measured in thousands of kilometres.",
  zagros: "Iran’s folded belt. Oil, earthquakes, and a mountain front.",
  andes: "Ocean crust going under South America. Volcanoes, the Altiplano, and a wall of peaks from the Caribbean to Patagonia.",
  "mexico-volcanic": "The trans-Mexican belt. Popocatépetl and the basin of Mexico. A volcanic arc, not a single crack.",
  "japan-trench": "The Pacific plate diving under Japan. Tsunamis are the surface symptom. The habitat argument is the volume along the descending slab.",
  sumatra: "The 2004 trench. A subduction zone that has already shown what a full rupture does.",
  alpine: "The Alps as a collision scar, plus the fault family under Italy and the Adriatic. Lower than the Himalaya, same kind of story.",
};

function pictures(seed: string, kind: string): PlaceImage[] {
  const pool: PlaceImage[] =
    kind === "uso"
      ? [sphere, corridor, cavern]
      : kind === "crop"
        ? [plate, range, sphere]
        : kind === "rift" || kind === "underground"
          ? [cavern, corridor, range]
          : kind === "subduction" || kind === "transform"
            ? [range, cavern]
            : kind === "watch"
              ? [corridor, range, cavern]
              : [range, cavern, sphere, corridor];
  const start = Math.abs(hash(seed)) % pool.length;
  return [0, 1].map((k) => pool[(start + k) % pool.length]);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export function placeCard(kind: string, id: string): PlaceCard | null {
  if (kind === "n") {
    const node = NODES.find((n) => n.id === id);
    if (!node) return null;
    const site = node.siteId ? siteById(node.siteId) : undefined;
    const ancient = ANCIENT.find((a) => a.id === node.id);
    const text = site
      ? `${site.summary} ${site.jacksonAngle}`
      : ancient
        ? `${ancient.tldr} ${ancient.nhi}`
        : (NODE_NOTES[node.id] ??
          `${node.name} is on the sphere network as a ${node.kind.replace("-", " ")} mark. The public record for this coordinate is thin; the map keeps it because the model wants a node here.`);
    const images = ancient?.images?.length
      ? ancient.images
      : pictures(node.id, site?.access.includes("navy") ? "uso" : node.kind);
    return {
      title: site?.name ?? node.name,
      kicker: site ? `${site.region} · ${node.kind.replace("-", " ")}` : node.kind.replace("-", " "),
      text,
      lat: node.lat,
      lng: node.lng,
      images,
      link: site
        ? { to: "/sites/$id", id: site.id }
        : ancient
          ? { to: "/ancient/$id", id: ancient.id }
          : undefined,
    };
  }
  if (kind === "a") {
    const site = ANCIENT.find((a) => a.id === id);
    if (!site) return null;
    return {
      title: site.name,
      kicker: `${site.region} · ${site.era}`,
      text: `${site.tldr} ${site.analysis}`,
      lat: site.lat,
      lng: site.lng,
      images: site.images.length ? site.images : pictures(site.id, site.kind),
      link: { to: "/ancient/$id", id: site.id },
    };
  }
  if (kind === "f") {
    const fault = FAULTS.find((f) => f.id === id);
    if (!fault) return null;
    const mid = fault.path[Math.floor(fault.path.length / 2)];
    return {
      title: fault.name,
      kicker: `${fault.kind} fault`,
      text:
        FAULT_NOTES[fault.id] ??
        `${fault.name} is drawn as an active ${fault.kind} zone. The atlas treats faults as access, not as proof.`,
      lat: mid[0],
      lng: mid[1],
      images: pictures(fault.id, fault.kind),
    };
  }
  if (kind === "l") {
    const ley = LEYS.find((l) => l.id === id);
    if (!ley) return null;
    const mid = ley.path[Math.floor(ley.path.length / 2)];
    return {
      title: ley.name,
      kicker: ley.kind === "grid" ? "world grid" : "named alignment",
      text: ley.note,
      lat: mid[0],
      lng: mid[1],
      images: pictures(ley.id, "crop"),
    };
  }
  if (kind === "m") {
    const cluster = CLUSTERS.find((c) => c.id === id);
    if (!cluster) return null;
    const site = cluster.relatedSiteId ? siteById(cluster.relatedSiteId) : undefined;
    return {
      title: cluster.name,
      kicker: "missing-person cluster",
      text: `${cluster.cases} ${cluster.notes}`,
      lat: cluster.lat,
      lng: cluster.lng,
      images: pictures(cluster.id, "watch"),
      link: site ? { to: "/sites/$id", id: site.id } : undefined,
    };
  }
  return null;
}
