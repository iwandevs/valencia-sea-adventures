import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { QUIZ } from "@/data/oceanografic";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];
  const showResult = selected !== null;
  const isCorrect = selected === q.correcta;

  const choose = (i: number) => {
    if (showResult) return;
    setSelected(i);
    if (i === q.correcta) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx < QUIZ.length - 1) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      const finalScore = score;
      saveResult("quiz", { correct: finalScore, total: QUIZ.length });
      setDone(true);
    }
  };

  if (done) {
    return (
      <main>
        <ActivityHeader title="Cuestionario" emoji="❓" />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="comic-card animate-pop-in p-8 text-center">
            <div className="text-7xl">🎉</div>
            <h2 className="mt-3 text-3xl text-primary">¡Completado!</h2>
            <p className="mt-2 text-lg">
              Has acertado <strong>{score}</strong> de <strong>{QUIZ.length}</strong>
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
      <ActivityHeader title="Cuestionario" emoji="❓" />
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between text-deep-foreground">
          <span className="text-sm">Pregunta {idx + 1} / {QUIZ.length}</span>
          <span className="text-sm">⭐ {score}</span>
        </div>
        <div className="mb-4 h-3 overflow-hidden rounded-full border-2 border-foreground bg-card">
          <div className="h-full bg-coral transition-all" style={{ width: `${((idx + (showResult ? 1 : 0)) / QUIZ.length) * 100}%` }} />
        </div>

        <div key={idx} className="comic-card animate-pop-in p-6">
          <h2 className="mb-5 text-xl text-foreground sm:text-2xl">{q.pregunta}</h2>
          <div className="space-y-3">
            {q.opciones.map((op, i) => {
              const isPicked = selected === i;
              const isRight = i === q.correcta;
              let cls = "bg-background hover:bg-secondary/40";
              if (showResult && isRight) cls = "bg-success text-success-foreground";
              else if (showResult && isPicked && !isRight) cls = "bg-destructive text-destructive-foreground";
              else if (showResult) cls = "bg-muted opacity-60";
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={showResult}
                  className={`comic-card-soft flex w-full items-center justify-between px-4 py-3 text-left text-base transition ${cls}`}
                >
                  <span>{op}</span>
                  {showResult && isRight && <CheckCircle2 className="h-5 w-5" />}
                  {showResult && isPicked && !isRight && <XCircle className="h-5 w-5" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-5 flex items-center justify-between">
              <p className={`font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "¡Correcto! 🐠" : "¡Casi! Sigue intentando 🐡"}
              </p>
              <button onClick={next} className="bubble-btn bg-primary px-5 py-2 text-primary-foreground">
                {idx < QUIZ.length - 1 ? "Siguiente →" : "Terminar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
