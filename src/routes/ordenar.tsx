import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { CADENA } from "@/data/oceanografic";

export const Route = createFileRoute("/ordenar")({
  component: OrdenarPage,
});

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function OrdenarPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const [items, setItems] = useState(() => shuffle(CADENA));
  const [checked, setChecked] = useState<null | { correct: number }>(null);

  const move = (idx: number, dir: -1 | 1) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    const next = [...items];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    setItems(next);
    setChecked(null);
  };

  const check = () => {
    const correct = items.reduce((acc, it, i) => acc + (it.orden === i + 1 ? 1 : 0), 0);
    setChecked({ correct });
    if (correct === items.length) {
      saveResult("ordenar", { correct: items.length, total: items.length });
    }
  };

  const finish = () => {
    saveResult("ordenar", { correct: checked?.correct ?? 0, total: items.length });
    navigate({ to: "/hub" });
  };

  const allCorrect = checked?.correct === items.length;

  return (
    <main>
      <ActivityHeader title="Cadena alimentaria" emoji="🔢" />
      <div className="mx-auto max-w-2xl px-4 py-6">
        <p className="comic-card mb-5 bg-card p-4 text-center">
          Ordena de <strong>presa</strong> (abajo de la cadena) a <strong>gran depredador</strong> (arriba).
          <br />Usa las flechas ▲▼ para colocar cada animal.
        </p>

        <div className="space-y-3">
          {items.map((it, i) => {
            const isRight = checked && it.orden === i + 1;
            const isWrong = checked && it.orden !== i + 1;
            return (
              <div
                key={it.id}
                className={`comic-card flex items-center gap-3 p-3 transition ${
                  isRight ? "bg-success/30" : isWrong ? "bg-destructive/20" : "bg-card"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-3 border-foreground bg-sun text-xl font-bold text-sun-foreground" style={{ borderWidth: 3 }}>
                  {i + 1}
                </div>
                <div className="text-3xl">{it.emoji}</div>
                <div className="flex-1 text-lg font-semibold">{it.nombre}</div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-md border-2 border-foreground bg-secondary px-2 py-0.5 text-sm disabled:opacity-30">▲</button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded-md border-2 border-foreground bg-secondary px-2 py-0.5 text-sm disabled:opacity-30">▼</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button onClick={check} className="bubble-btn bg-primary px-6 py-3 text-primary-foreground">
            ✓ Comprobar
          </button>
          {checked && (
            <div className="comic-card bg-card px-4 py-2">
              {allCorrect ? "🎉 ¡Perfecto!" : `${checked.correct}/${items.length} en su sitio`}
            </div>
          )}
          {checked && (
            <button onClick={finish} className="bubble-btn bg-coral px-6 py-3 text-coral-foreground">
              Continuar →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
