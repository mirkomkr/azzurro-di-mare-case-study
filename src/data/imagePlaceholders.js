import { imageCredits } from "./imageCredits.js";

const operationalMetadata = [
  {
    id: "home-hero",
    fileName: "hero-ristorante-pesce-anzio-nettuno.webp",
    description: "Tavoli preparati per la cena al tramonto in veranda",
    type: "contenutistica",
  },
  {
    id: "menu-overview",
    fileName: "spaghetti-cozze-e-pescato-griglia-demo.webp",
    description: "Due piatti di mare e un calice di vino",
    type: "contenutistica",
  },
  {
    id: "menu-spaghetti-cozze",
    fileName: "spaghetti-cozze-demo.webp",
    description: "Piatto di spaghetti con cozze e pomodorini",
    type: "contenutistica",
  },
  {
    id: "menu-spaghetti-vongole",
    fileName: "spaghetti-vongole-demo.webp",
    description: "Piatti di spaghetti con le vongole pronti da servire",
    type: "contenutistica",
  },
  {
    id: "menu-pescato-griglia",
    fileName: "pescato-griglia-demo.webp",
    description: "Piatto con pesce alla griglia, insalata e pomodori",
    type: "contenutistica",
  },
  {
    id: "menu-polpo-arrosto",
    fileName: "polpo-arrosto-demo.webp",
    description: "Piatto di polpo arrosto con patate",
    type: "contenutistica",
  },
  {
    id: "menu-tiramisu",
    fileName: "tiramisu-demo.webp",
    description: "Fetta di tiramisù servita su un vassoio",
    type: "contenutistica",
  },
  {
    id: "location-costa",
    fileName: "costa-anzio-nettuno-demo.webp",
    description: "Tavoli preparati in veranda con vista mare",
    type: "contenutistica",
  },
  {
    id: "booking-table",
    fileName: "tavolo-prenotazione-demo.webp",
    description: "Tavolo con piatti di mare e vino bianco",
    type: "contenutistica",
  },
  {
    id: "atmosphere-table",
    fileName: "tavolo-ristorante-mediterraneo-demo.webp",
    description: "Tavolo preparato per la cena al tramonto",
    type: "contenutistica",
  },
  {
    id: "open-graph",
    fileName: "azzurro-di-mare-og.webp",
    description: "Immagine di anteprima social del caso studio",
    type: "decorativa",
  },
];

const creditsByFileName = Object.fromEntries(
  imageCredits.map((image) => [image.fileName, image]),
);

export const imagePlaceholders = operationalMetadata.map((metadata) => {
  const credit = creditsByFileName[metadata.fileName];

  if (!credit) {
    throw new Error(`Credito immagine mancante per ${metadata.fileName}`);
  }

  return {
    id: metadata.id,
    folder: credit.folder,
    fileName: credit.fileName,
    description: metadata.description,
    use: credit.usage,
    alt: credit.alt,
    type: metadata.type,
    status: "ready",
  };
});

export const imagePlaceholdersById = Object.fromEntries(
  imagePlaceholders.map((image) => [image.id, image]),
);
