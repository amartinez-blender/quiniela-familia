import type { GroupLetter, ParticipantName } from "../types/quiniela";

export const PARTICIPANTS = ["Pedro", "Francisco", "Juan Pablo", "Alex", "Maryfer", "Mary"] as const;

type PredictionsMap = Record<GroupLetter, Partial<Record<ParticipantName, readonly string[]>>>;

export const PREDICTIONS: PredictionsMap = {
  A: { Pedro: ["México", "Corea del Sur", "Chequia"], Francisco: ["México", "Chequia", "Corea del Sur"], "Juan Pablo": ["México", "Corea del Sur", "Chequia"], Alex: ["México", "Corea del Sur", "Chequia"], Maryfer: ["México", "Corea del Sur", "Chequia"], Mary: ["Chequia", "México"] },
  B: { Pedro: ["Bosnia y Herzegovina", "Canadá", "Suiza"], Francisco: ["Suiza", "Bosnia y Herzegovina", "Canadá"], "Juan Pablo": ["Suiza", "Bosnia y Herzegovina", "Canadá"], Alex: ["Canadá", "Bosnia y Herzegovina", "Suiza"], Maryfer: ["Bosnia y Herzegovina", "Qatar", "Suiza"] },
  C: { Pedro: ["Brasil", "Marruecos", "Escocia"], Francisco: ["Brasil", "Marruecos"], "Juan Pablo": ["Brasil", "Marruecos"], Alex: ["Brasil", "Marruecos"], Maryfer: ["Brasil", "Marruecos", "Escocia"], Mary: ["Brasil", "Escocia"] },
  D: { Pedro: ["Turquia", "Paraguay", "Estados Unidos"], Francisco: ["Turquia", "Paraguay", "Estados Unidos"], "Juan Pablo": ["Paraguay", "Turquia", "Estados Unidos"], Alex: ["Turquia", "Australia", "Estados Unidos"], Maryfer: ["Turquia", "Australia", "Estados Unidos"], Mary: ["Australia", "Estados Unidos"] },
  E: { Pedro: ["Alemania", "Ecuador", "Costa de Marfil"], Francisco: ["Alemania", "Ecuador", "Costa de Marfil"], "Juan Pablo": ["Alemania", "Ecuador", "Costa de Marfil"], Alex: ["Alemania", "Ecuador", "Costa de Marfil"], Maryfer: ["Alemania", "Ecuador", "Costa de Marfil"], Mary: ["Alemania", "Ecuador", "Curazao"] },
  F: { Pedro: ["Países Bajos", "Japón", "Suecia"], Francisco: ["Japón", "Países Bajos", "Suecia"], "Juan Pablo": ["Países Bajos", "Japón", "Suecia"], Alex: ["Japón", "Países Bajos", "Suecia"] },
  G: { Pedro: ["Bélgica", "Egipto"], Francisco: ["Bélgica", "Egipto"], "Juan Pablo": ["Bélgica", "Egipto"], Alex: ["Bélgica", "Egipto"], Maryfer: ["Bélgica", "Egipto"], Mary: ["Bélgica", "Nueva Zelanda", "Egipto"] },
  H: { Pedro: ["España", "Uruguay"], Francisco: ["España", "Uruguay"], "Juan Pablo": ["España", "Uruguay"], Alex: ["España", "Uruguay"], Maryfer: ["España", "Uruguay"], Mary: ["España", "Uruguay", "Arabia Saudita"] },
  I: { Pedro: ["Francia", "Noruega", "Senegal"], Francisco: ["Francia", "Senegal", "Noruega"], "Juan Pablo": ["Francia", "Senegal", "Noruega"], Alex: ["Francia", "Senegal", "Noruega"], Maryfer: ["Francia", "Senegal", "Noruega"], Mary: ["Francia", "Noruega", "Senegal"] },
  J: { Pedro: ["Argentina", "Austria"], Francisco: ["Argentina", "Austria", "Argelia"], "Juan Pablo": ["Argentina", "Austria"], Alex: ["Argentina", "Argelia", "Austria"], Maryfer: ["Argentina", "Austria"], Mary: ["Argentina", "Austria", "Jordania"] },
  K: { Pedro: ["Portugal", "Colombia"], Francisco: ["Portugal", "Colombia"], "Juan Pablo": ["Portugal", "Colombia", "Uzbekistán"], Alex: ["Portugal", "Colombia"], Maryfer: ["Portugal", "Colombia"], Mary: ["Portugal", "Colombia"] },
  L: { Pedro: ["Croacia", "Inglaterra", "Panamá"], Francisco: ["Croacia", "Inglaterra", "Panamá"], "Juan Pablo": ["Croacia", "Inglaterra", "Panamá"], Alex: ["Inglaterra", "Croacia", "Panamá"], Maryfer: ["Croacia", "Inglaterra", "Panamá"], Mary: ["Inglaterra", "Croacia", "Panamá"] },
};
