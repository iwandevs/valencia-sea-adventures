// Datos educativos sobre el Oceanogràfic de Valencia
// Fuente: https://www.oceanografic.org/

import type { Lang } from "@/context/LangContext";

export const ZONAS_ES = [
  { id: "mediterraneo", nombre: "Mediterráneo", emoji: "🐟", color: "secondary" },
  { id: "humedales", nombre: "Humedales", emoji: "🦩", color: "coral" },
  { id: "templados", nombre: "Mares Templados", emoji: "🐠", color: "primary" },
  { id: "tropicales", nombre: "Mares Tropicales", emoji: "🐡", color: "sun" },
  { id: "oceanos", nombre: "Océanos", emoji: "🦈", color: "deep" },
  { id: "antartico", nombre: "Antártico", emoji: "🐧", color: "secondary" },
  { id: "artico", nombre: "Ártico", emoji: "🐻‍❄️", color: "primary" },
  { id: "islas", nombre: "Islas", emoji: "🦭", color: "coral" },
  { id: "delfinario", nombre: "Delfinario", emoji: "🐬", color: "primary" },
] as const;

export const ZONAS_VA = [
  { id: "mediterraneo", nombre: "Mediterrani", emoji: "🐟", color: "secondary" },
  { id: "humedales", nombre: "Aiguamolls", emoji: "🦩", color: "coral" },
  { id: "templados", nombre: "Mars Temperats", emoji: "🐠", color: "primary" },
  { id: "tropicales", nombre: "Mars Tropicals", emoji: "🐡", color: "sun" },
  { id: "oceanos", nombre: "Oceans", emoji: "🦈", color: "deep" },
  { id: "antartico", nombre: "Antàrtic", emoji: "🐧", color: "secondary" },
  { id: "artico", nombre: "Àrtic", emoji: "🐻‍❄️", color: "primary" },
  { id: "islas", nombre: "Illes", emoji: "🦭", color: "coral" },
  { id: "delfinario", nombre: "Delfinari", emoji: "🐬", color: "primary" },
] as const;

export const QUIZ_ES = [
  { pregunta: "¿En qué ciudad se encuentra el Oceanogràfic?", opciones: ["Barcelona", "Valencia", "Sevilla", "Madrid"], correcta: 1 },
  { pregunta: "¿Quién diseñó el edificio principal del Oceanogràfic?", opciones: ["Santiago Calatrava", "Félix Candela", "Antoni Gaudí", "Norman Foster"], correcta: 1 },
  { pregunta: "¿Cuál es el animal más grande que se puede ver en el Oceanogràfic?", opciones: ["Tiburón toro", "Beluga", "Delfín mular", "Morsa"], correcta: 1 },
  { pregunta: "¿Cómo se llama el túnel donde se ven los tiburones?", opciones: ["Túnel Tropical", "Túnel de Océanos", "Túnel Ártico", "Túnel Mediterráneo"], correcta: 1 },
  { pregunta: "¿Qué aves típicas viven en la zona de Humedales?", opciones: ["Pingüinos", "Flamencos", "Águilas", "Loros"], correcta: 1 },
  { pregunta: "¿Cuántas zonas o ecosistemas principales tiene el Oceanogràfic?", opciones: ["3", "5", "9", "15"], correcta: 2 },
  { pregunta: "¿Qué animal NO encontrarías en el Oceanogràfic?", opciones: ["Beluga", "Tiburón", "León", "Morsa"], correcta: 2 },
  { pregunta: "Las medusas pertenecen al grupo de los...", opciones: ["Peces", "Mamíferos", "Cnidarios (invertebrados)", "Reptiles"], correcta: 2 },
] as const;

export const QUIZ_VA = [
  { pregunta: "En quina ciutat es troba l'Oceanogràfic?", opciones: ["Barcelona", "València", "Sevilla", "Madrid"], correcta: 1 },
  { pregunta: "Qui va dissenyar l'edifici principal de l'Oceanogràfic?", opciones: ["Santiago Calatrava", "Félix Candela", "Antoni Gaudí", "Norman Foster"], correcta: 1 },
  { pregunta: "Quin és l'animal més gran que es pot veure a l'Oceanogràfic?", opciones: ["Tauró bou", "Beluga", "Dofí mular", "Morsa"], correcta: 1 },
  { pregunta: "Com es diu el túnel on es veuen els taurons?", opciones: ["Túnel Tropical", "Túnel d'Oceans", "Túnel Àrtic", "Túnel Mediterrani"], correcta: 1 },
  { pregunta: "Quines aus típiques viuen a la zona d'Aiguamolls?", opciones: ["Pingüins", "Flamencs", "Àguiles", "Lloros"], correcta: 1 },
  { pregunta: "Quantes zones o ecosistemes principals té l'Oceanogràfic?", opciones: ["3", "5", "9", "15"], correcta: 2 },
  { pregunta: "Quin animal NO trobaries a l'Oceanogràfic?", opciones: ["Beluga", "Tauró", "Lleó", "Morsa"], correcta: 2 },
  { pregunta: "Les meduses pertanyen al grup dels...", opciones: ["Peixos", "Mamífers", "Cnidaris (invertebrats)", "Rèptils"], correcta: 2 },
] as const;

export const VF_ES = [
  { afirmacion: "Los delfines son mamíferos, no peces.", correcta: true },
  { afirmacion: "Los pingüinos pueden volar largas distancias.", correcta: false },
  { afirmacion: "El Oceanogràfic es el acuario más grande de Europa.", correcta: true },
  { afirmacion: "Los tiburones tienen huesos como los peces normales.", correcta: false },
  { afirmacion: "Las belugas son ballenas pequeñas de color blanco.", correcta: true },
  { afirmacion: "Los flamencos son rosas porque comen crustáceos.", correcta: true },
  { afirmacion: "Las morsas viven en aguas tropicales.", correcta: false },
  { afirmacion: "El pulpo tiene tres corazones.", correcta: true },
] as const;

export const VF_VA = [
  { afirmacion: "Els dofins són mamífers, no peixos.", correcta: true },
  { afirmacion: "Els pingüins poden volar llargues distàncies.", correcta: false },
  { afirmacion: "L'Oceanogràfic és l'aquari més gran d'Europa.", correcta: true },
  { afirmacion: "Els taurons tenen ossos com els peixos normals.", correcta: false },
  { afirmacion: "Les belugues són balenes xicotetes de color blanc.", correcta: true },
  { afirmacion: "Els flamencs són rosa perquè mengen crustacis.", correcta: true },
  { afirmacion: "Les morses viuen en aigües tropicals.", correcta: false },
  { afirmacion: "El polp té tres cors.", correcta: true },
] as const;

export const PAREJAS_ES = [
  { animal: "🐧 Pingüino", habitat: "Antártico" },
  { animal: "🦈 Tiburón toro", habitat: "Océanos" },
  { animal: "🐬 Delfín", habitat: "Delfinario" },
  { animal: "🦩 Flamenco", habitat: "Humedales" },
  { animal: "🐻‍❄️ Beluga", habitat: "Ártico" },
  { animal: "🐡 Pez globo", habitat: "Mares Tropicales" },
] as const;

export const PAREJAS_VA = [
  { animal: "🐧 Pingüí", habitat: "Antàrtic" },
  { animal: "🦈 Tauró bou", habitat: "Oceans" },
  { animal: "🐬 Dofí", habitat: "Delfinari" },
  { animal: "🦩 Flamenc", habitat: "Aiguamolls" },
  { animal: "🐻‍❄️ Beluga", habitat: "Àrtic" },
  { animal: "🐡 Peix globus", habitat: "Mars Tropicals" },
] as const;

// Sopa de letras (mismas palabras válidas en ambos idiomas, son nombres reconocibles)
export const SOPA_ES = ["DELFIN", "TIBURON", "MEDUSA", "PULPO", "CORAL", "BELUGA", "MORSA", "RAYA"] as const;
export const SOPA_VA = ["DOFI", "TAURO", "MEDUSA", "POLP", "CORAL", "BELUGA", "MORSA", "RAJADA"] as const;

export const CADENA_ES = [
  { id: "1", nombre: "Plancton", emoji: "🦠", orden: 1 },
  { id: "2", nombre: "Krill", emoji: "🦐", orden: 2 },
  { id: "3", nombre: "Sardina", emoji: "🐟", orden: 3 },
  { id: "4", nombre: "Atún", emoji: "🐠", orden: 4 },
  { id: "5", nombre: "Tiburón", emoji: "🦈", orden: 5 },
] as const;

export const CADENA_VA = [
  { id: "1", nombre: "Plàncton", emoji: "🦠", orden: 1 },
  { id: "2", nombre: "Krill", emoji: "🦐", orden: 2 },
  { id: "3", nombre: "Sardina", emoji: "🐟", orden: 3 },
  { id: "4", nombre: "Tonyina", emoji: "🐠", orden: 4 },
  { id: "5", nombre: "Tauró", emoji: "🦈", orden: 5 },
] as const;

export const PREGUNTAS_ZONA_ES: Record<string, { pregunta: string; opciones: string[]; correcta: number }> = {
  mediterraneo: { pregunta: "¿Qué pez típico vive en el Mediterráneo?", opciones: ["Pingüino", "Dorada", "Beluga"], correcta: 1 },
  humedales: { pregunta: "¿Qué ave característica hay en los Humedales?", opciones: ["Flamenco", "Águila", "Loro"], correcta: 0 },
  templados: { pregunta: "¿Qué temperatura tienen los mares templados?", opciones: ["Muy fría", "Intermedia", "Hirviendo"], correcta: 1 },
  tropicales: { pregunta: "¿Qué se forma en los mares tropicales?", opciones: ["Icebergs", "Arrecifes de coral", "Volcanes"], correcta: 1 },
  oceanos: { pregunta: "¿Qué hay en la zona de Océanos del Oceanogràfic?", opciones: ["Pingüinos", "Túnel de tiburones", "Flamencos"], correcta: 1 },
  antartico: { pregunta: "¿Qué animal famoso vive en el Antártico?", opciones: ["Pingüino", "Camello", "Tigre"], correcta: 0 },
  artico: { pregunta: "¿Qué ballena blanca vive en el Ártico del acuario?", opciones: ["Orca", "Beluga", "Cachalote"], correcta: 1 },
  islas: { pregunta: "¿Qué mamíferos marinos viven en Islas?", opciones: ["Leones marinos", "Tiburones", "Medusas"], correcta: 0 },
  delfinario: { pregunta: "¿Qué hace especial al Delfinario del Oceanogràfic?", opciones: ["Es el más pequeño", "Es uno de los más grandes de Europa", "No tiene delfines"], correcta: 1 },
};

export const PREGUNTAS_ZONA_VA: Record<string, { pregunta: string; opciones: string[]; correcta: number }> = {
  mediterraneo: { pregunta: "Quin peix típic viu al Mediterrani?", opciones: ["Pingüí", "Daurada", "Beluga"], correcta: 1 },
  humedales: { pregunta: "Quina au característica hi ha als Aiguamolls?", opciones: ["Flamenc", "Àguila", "Lloro"], correcta: 0 },
  templados: { pregunta: "Quina temperatura tenen els mars temperats?", opciones: ["Molt freda", "Intermèdia", "Bullint"], correcta: 1 },
  tropicales: { pregunta: "Què es forma als mars tropicals?", opciones: ["Icebergs", "Esculls de coral", "Volcans"], correcta: 1 },
  oceanos: { pregunta: "Què hi ha a la zona d'Oceans de l'Oceanogràfic?", opciones: ["Pingüins", "Túnel de taurons", "Flamencs"], correcta: 1 },
  antartico: { pregunta: "Quin animal famós viu a l'Antàrtic?", opciones: ["Pingüí", "Camell", "Tigre"], correcta: 0 },
  artico: { pregunta: "Quina balena blanca viu a l'Àrtic de l'aquari?", opciones: ["Orca", "Beluga", "Catxalot"], correcta: 1 },
  islas: { pregunta: "Quins mamífers marins viuen a Illes?", opciones: ["Lleons marins", "Taurons", "Meduses"], correcta: 0 },
  delfinario: { pregunta: "Què fa especial al Delfinari de l'Oceanogràfic?", opciones: ["És el més xicotet", "És un dels més grans d'Europa", "No té dofins"], correcta: 1 },
};

export function getData(lang: Lang) {
  return lang === "va"
    ? { ZONAS: ZONAS_VA, QUIZ: QUIZ_VA, VF: VF_VA, PAREJAS: PAREJAS_VA, SOPA: SOPA_VA, CADENA: CADENA_VA, PREGUNTAS_ZONA: PREGUNTAS_ZONA_VA }
    : { ZONAS: ZONAS_ES, QUIZ: QUIZ_ES, VF: VF_ES, PAREJAS: PAREJAS_ES, SOPA: SOPA_ES, CADENA: CADENA_ES, PREGUNTAS_ZONA: PREGUNTAS_ZONA_ES };
}

// Compatibilidad legacy (rutas que aún importan los símbolos antiguos)
export const ZONAS = ZONAS_ES;
export const QUIZ = QUIZ_ES;
export const VERDADERO_FALSO = VF_ES;
export const PAREJAS = PAREJAS_ES;
export const SOPA_PALABRAS = SOPA_ES;
export const CADENA = CADENA_ES;
