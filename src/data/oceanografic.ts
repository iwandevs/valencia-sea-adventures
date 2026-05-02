// Datos educativos sobre el Oceanogràfic de Valencia
// Fuente: https://www.oceanografic.org/

export const ZONAS = [
  { id: "mediterraneo", nombre: "Mediterráneo", emoji: "🐟", color: "secondary",
    descripcion: "Especies del Mar Mediterráneo, como la dorada y el mero." },
  { id: "humedales", nombre: "Humedales", emoji: "🦩", color: "coral",
    descripcion: "Zonas pantanosas con flamencos y aves acuáticas." },
  { id: "templados", nombre: "Mares Templados", emoji: "🐠", color: "primary",
    descripcion: "Aguas templadas con peces de colores." },
  { id: "tropicales", nombre: "Mares Tropicales", emoji: "🐡", color: "sun",
    descripcion: "Arrecifes de coral con peces tropicales." },
  { id: "oceanos", nombre: "Océanos", emoji: "🦈", color: "deep",
    descripcion: "El gran túnel con tiburones toro." },
  { id: "antartico", nombre: "Antártico", emoji: "🐧", color: "secondary",
    descripcion: "Pingüinos de Humboldt y de Gentoo." },
  { id: "artico", nombre: "Ártico", emoji: "🐻‍❄️", color: "primary",
    descripcion: "Belugas y morsas en aguas heladas." },
  { id: "islas", nombre: "Islas", emoji: "🦭", color: "coral",
    descripcion: "Leones marinos y morsas." },
  { id: "delfinario", nombre: "Delfinario", emoji: "🐬", color: "primary",
    descripcion: "Uno de los mayores delfinarios de Europa." },
] as const;

// Cuestionario opción múltiple
export const QUIZ = [
  {
    pregunta: "¿En qué ciudad se encuentra el Oceanogràfic?",
    opciones: ["Barcelona", "Valencia", "Sevilla", "Madrid"],
    correcta: 1,
  },
  {
    pregunta: "¿Quién diseñó el edificio principal del Oceanogràfic?",
    opciones: ["Santiago Calatrava", "Félix Candela", "Antoni Gaudí", "Norman Foster"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el animal más grande que se puede ver en el Oceanogràfic?",
    opciones: ["Tiburón toro", "Beluga", "Delfín mular", "Morsa"],
    correcta: 1,
  },
  {
    pregunta: "¿Cómo se llama el túnel donde se ven los tiburones?",
    opciones: ["Túnel Tropical", "Túnel de Océanos", "Túnel Ártico", "Túnel Mediterráneo"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué aves típicas viven en la zona de Humedales?",
    opciones: ["Pingüinos", "Flamencos", "Águilas", "Loros"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuántas zonas o ecosistemas principales tiene el Oceanogràfic?",
    opciones: ["3", "5", "9", "15"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué animal NO encontrarías en el Oceanogràfic?",
    opciones: ["Beluga", "Tiburón", "León", "Morsa"],
    correcta: 2,
  },
  {
    pregunta: "Las medusas pertenecen al grupo de los...",
    opciones: ["Peces", "Mamíferos", "Cnidarios (invertebrados)", "Reptiles"],
    correcta: 2,
  },
] as const;

// Verdadero / Falso
export const VERDADERO_FALSO = [
  { afirmacion: "Los delfines son mamíferos, no peces.", correcta: true },
  { afirmacion: "Los pingüinos pueden volar largas distancias.", correcta: false },
  { afirmacion: "El Oceanogràfic es el acuario más grande de Europa.", correcta: true },
  { afirmacion: "Los tiburones tienen huesos como los peces normales.", correcta: false },
  { afirmacion: "Las belugas son ballenas pequeñas de color blanco.", correcta: true },
  { afirmacion: "Los flamencos son rosas porque comen crustáceos.", correcta: true },
  { afirmacion: "Las morsas viven en aguas tropicales.", correcta: false },
  { afirmacion: "El pulpo tiene tres corazones.", correcta: true },
] as const;

// Unir conceptos: animal -> hábitat
export const PAREJAS = [
  { animal: "🐧 Pingüino", habitat: "Antártico" },
  { animal: "🦈 Tiburón toro", habitat: "Océanos" },
  { animal: "🐬 Delfín", habitat: "Delfinario" },
  { animal: "🦩 Flamenco", habitat: "Humedales" },
  { animal: "🐻‍❄️ Beluga", habitat: "Ártico" },
  { animal: "🐡 Pez globo", habitat: "Mares Tropicales" },
] as const;

// Sopa de letras - palabras a encontrar
export const SOPA_PALABRAS = [
  "DELFIN", "TIBURON", "MEDUSA", "PULPO", "CORAL", "BELUGA", "MORSA", "RAYA",
] as const;

// Ordenar - cadena alimentaria del océano (de presa a depredador)
export const CADENA = [
  { id: "1", nombre: "Plancton", emoji: "🦠", orden: 1 },
  { id: "2", nombre: "Krill", emoji: "🦐", orden: 2 },
  { id: "3", nombre: "Sardina", emoji: "🐟", orden: 3 },
  { id: "4", nombre: "Atún", emoji: "🐠", orden: 4 },
  { id: "5", nombre: "Tiburón", emoji: "🦈", orden: 5 },
] as const;
