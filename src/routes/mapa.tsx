import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { useLang } from "@/context/LangContext";
import { getData } from "@/data/oceanografic";

export const Route = createFileRoute("/mapa")({ component: MapaPage });

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
  const { t, lang } = useLang();
  const { ZONAS, PREGUNTAS_ZONA } = getData(lang);
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
      <ActivityHeader titleKey="act.mapa.title" emoji="🗺️" />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="comic-card mb-5 bg-card p-4 text-center">
          <span dangerouslySetInnerHTML={{ __html: t("mapa.intro") }} /> {completed}/{total} · ⭐ {score}
        </p>

        <div className="comic-card relative overflow-hidden bg-gradient-to-b from-secondary/40 to-primary/20" style={{ aspectRatio: "16/10" }}>
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
                onClick={() => !(z.id in answered) && setActiveZone(z.id)}
                disabled={z.id in answered}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-1 ${(z.id in answered) ? "" : "animate-bob"}`}
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
              {t("mapa.finish")} {score}/{total} {t("mapa.hits")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
