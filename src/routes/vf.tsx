import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { VERDADERO_FALSO } from "@/data/oceanografic";

export const Route = createFileRoute("/vf")({
  component: VFPage,
});

function VFPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "ko" | null>(null);
  const [done, setDone] = useState(false);

  const q = VERDADERO_FALSO[idx];

  const answer = (a: boolean) => {
    if (feedback) return;
    const correct = a === q.correcta;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "ok" : "ko");
    setTimeout(() => {
      setFeedback(null);
      if (idx < VERDADERO_FALSO.length - 1) setIdx(idx + 1);
      else {
        const final = correct ? score + 1 : score;
        saveResult("vf", { correct: final, total: VERDADERO_FALSO.length });
        setDone(true);
      }
    }, 1100);
  };

  if (done) {
    return (
      <main>
        <ActivityHeader title="Verdadero o Falso" emoji="✅" />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="comic-card animate-pop-in p-8 text-center">
            <div className="text-7xl">🐬</div>
            <h2 className="mt-3 text-3xl text-primary">¡Completado!</h2>
            <p className="mt-2 text-lg">
              Has acertado <strong>{score}</strong> de <strong>{VERDADERO_FALSO.length}</strong>
            </p>
            <button onClick={() => navigate({ to: "/hub" })} className="bubble-btn mt-6 bg-coral px-6 py-3 text-coral-foreground">
              Volver al mapa
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ActivityHeader title="Verdadero o Falso" emoji="✅" />
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between text-deep-foreground">
          <span className="text-sm">{idx + 1} / {VERDADERO_FALSO.length}</span>
          <span className="text-sm">⭐ {score}</span>
        </div>

        <div key={idx} className="comic-card animate-pop-in p-8 text-center">
          <p className="text-2xl text-foreground">{q.afirmacion}</p>

          {feedback && (
            <div className={`mt-6 inline-block rounded-full px-6 py-2 text-lg font-bold ${feedback === "ok" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>
              {feedback === "ok" ? "¡Correcto! 🌟" : `Era ${q.correcta ? "VERDADERO" : "FALSO"}`}
            </div>
          )}

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => answer(true)}
              disabled={!!feedback}
              className="bubble-btn bg-success px-8 py-4 text-2xl text-success-foreground disabled:opacity-60"
            >
              ✓ Verdadero
            </button>
            <button
              onClick={() => answer(false)}
              disabled={!!feedback}
              className="bubble-btn bg-destructive px-8 py-4 text-2xl text-destructive-foreground disabled:opacity-60"
            >
              ✗ Falso
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
