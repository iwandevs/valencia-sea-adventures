import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { ZONAS } from "@/data/oceanografic";

export const Route = createFileRoute("/mapa")({
  component: MapaPage,
});

// Preguntas asociadas a cada zona
const PREGUNTAS_ZONA: Record<string, { pregunta: string; opciones: string[]; correcta: number }> = {
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

// Posiciones de las zonas en el mapa (porcentajes)
const POSICIONES: Record<string, { x: number; y: number }> = {
  artico: { x: 18, y: 18 },
  antartico: { x: 78, y: 22 },
  oceanos: { x: 50, y: 35 },
  templados: { x: 25, y: 50 },
  tropicales: { x: 70, y: 52 },
  mediterraneo: { x: 38, y: 68 },
  humedales: { x: 62, y: 72 },
  islas: { x: 22, y: 82 },
  delfinario: { x: 78, y: 84 },
};

function MapaPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const total = ZONAS.length;
  const completed = Object.keys(answered).length;

  const handleAnswer = (i: number) => {
    if (!activeZone || selected !== null) return;
    setSelected(i);
    const correct = PREGUNTAS_ZONA[activeZone].correcta === i;
    setAnswered((a) => ({ ...a, [activeZone]: correct }));
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setActiveZone(null);
      setSelected(null);
    }, 1400);
  };

  const finish = () => {
    saveResult("mapa", { correct: score, total });
    navigate({ to: "/hub" });
  };

  return (
    <main>
      <ActivityHeader title="Mapa interactivo" emoji="🗺️" />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="comic-card mb-5 bg-card p-4 text-center">
          Haz clic en cada <strong>zona del Oceanogràfic</strong> y responde su pregunta. {completed}/{total} · ⭐ {score}
        </p>

        <div className="comic-card relative overflow-hidden bg-gradient-to-b from-secondary/40 to-primary/20" style={{ aspectRatio: "16/10" }}>
          {/* Decoración fondo */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-deep/40 to-transparent" />
          </div>

          {ZONAS.map((z) => {
            const pos = POSICIONES[z.id];
            const done = answered[z.id];
            const isCorrect = done === true;
            const isWrong = done === false;
            return (
              <button
                key={z.id}
                onClick={() => !done && setActiveZone(z.id)}
                disabled={!!done}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-1 ${done ? "" : "animate-bob"}`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full border-3 border-foreground text-2xl shadow-bubble transition-transform group-hover:scale-110 ${
                  isCorrect ? "bg-success" : isWrong ? "bg-destructive" : "bg-card"
                }`} style={{ borderWidth: 3 }}>
                  {z.emoji}
                </div>
                <span className="comic-card-soft bg-card px-2 py-0.5 text-xs font-bold whitespace-nowrap">
                  {z.nombre}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal pregunta */}
        {activeZone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/70 p-4 animate-pop-in">
            <div className="comic-card w-full max-w-lg bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-4xl">{ZONAS.find((z) => z.id === activeZone)?.emoji}</span>
                <h3 className="text-xl text-primary">{ZONAS.find((z) => z.id === activeZone)?.nombre}</h3>
              </div>
              <p className="mb-4 text-lg">{PREGUNTAS_ZONA[activeZone].pregunta}</p>
              <div className="space-y-2">
                {PREGUNTAS_ZONA[activeZone].opciones.map((op, i) => {
                  const showR = selected !== null;
                  const right = i === PREGUNTAS_ZONA[activeZone].correcta;
                  let cls = "bg-background hover:bg-secondary/40";
                  if (showR && right) cls = "bg-success text-success-foreground";
                  else if (showR && i === selected && !right) cls = "bg-destructive text-destructive-foreground";
                  return (
                    <button
                      key={i}
                      disabled={showR}
                      onClick={() => handleAnswer(i)}
                      className={`comic-card-soft block w-full px-4 py-2 text-left ${cls}`}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {completed === total && (
          <div className="mt-6 text-center animate-pop-in">
            <button onClick={finish} className="bubble-btn bg-coral px-8 py-4 text-lg text-coral-foreground">
              🏁 Terminar — {score}/{total} aciertos
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
