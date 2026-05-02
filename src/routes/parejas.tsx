import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { PAREJAS } from "@/data/oceanografic";

export const Route = createFileRoute("/parejas")({
  component: ParejasPage,
});

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ParejasPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const habitats = useMemo(() => shuffle(PAREJAS.map((p) => p.habitat)), []);
  const animales = PAREJAS.map((p) => p.animal);

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [errors, setErrors] = useState(0);

  const allDone = Object.keys(matches).length === PAREJAS.length;

  const tryMatch = (habitat: string) => {
    if (!selectedAnimal) return;
    const correct = PAREJAS.find((p) => p.animal === selectedAnimal)?.habitat === habitat;
    if (correct) {
      setMatches((m) => ({ ...m, [selectedAnimal]: habitat }));
      setSelectedAnimal(null);
    } else {
      setErrors((e) => e + 1);
      setWrong(habitat);
      setTimeout(() => { setWrong(null); setSelectedAnimal(null); }, 600);
    }
  };

  const finish = () => {
    const correct = Math.max(0, PAREJAS.length - errors);
    saveResult("parejas", { correct, total: PAREJAS.length });
    navigate({ to: "/hub" });
  };

  return (
    <main>
      <ActivityHeader title="Une los conceptos" emoji="🔗" />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <p className="comic-card mb-5 bg-card p-4 text-center">
          Toca un animal y luego su <strong>zona del Oceanogràfic</strong>. Errores: <strong>{errors}</strong>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl text-deep-foreground">🐠 Animales</h2>
            {animales.map((a) => {
              const isMatched = !!matches[a];
              const isSelected = selectedAnimal === a;
              return (
                <button
                  key={a}
                  disabled={isMatched}
                  onClick={() => setSelectedAnimal(a)}
                  className={`comic-card-soft block w-full px-4 py-3 text-left text-lg transition ${
                    isMatched ? "bg-success text-success-foreground opacity-80" :
                    isSelected ? "bg-sun text-sun-foreground scale-105" : "bg-card"
                  }`}
                >
                  {a} {isMatched && "✓"}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl text-deep-foreground">🌊 Zonas</h2>
            {habitats.map((h) => {
              const matchedAnimal = Object.entries(matches).find(([, hh]) => hh === h)?.[0];
              const isMatched = !!matchedAnimal;
              const isWrong = wrong === h;
              return (
                <button
                  key={h}
                  disabled={isMatched || !selectedAnimal}
                  onClick={() => tryMatch(h)}
                  className={`comic-card-soft block w-full px-4 py-3 text-left text-lg transition ${
                    isMatched ? "bg-success text-success-foreground opacity-80" :
                    isWrong ? "bg-destructive text-destructive-foreground animate-wiggle" :
                    selectedAnimal ? "bg-card hover:bg-secondary/50 cursor-pointer" : "bg-card opacity-70"
                  }`}
                >
                  {h} {isMatched && `← ${matchedAnimal}`}
                </button>
              );
            })}
          </div>
        </div>

        {allDone && (
          <div className="mt-6 text-center animate-pop-in">
            <div className="comic-card inline-block bg-coral px-6 py-4 text-coral-foreground">
              <p className="text-xl">🎉 ¡Todas emparejadas!</p>
              <p className="text-sm">Errores: {errors} · Aciertos: {Math.max(0, PAREJAS.length - errors)}/{PAREJAS.length}</p>
            </div>
            <div className="mt-4">
              <button onClick={finish} className="bubble-btn bg-primary px-6 py-3 text-primary-foreground">
                Continuar →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
