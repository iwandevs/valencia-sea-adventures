import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGame, ACTIVITY_IDS } from "@/context/GameContext";

export const Route = createFileRoute("/resultados")({
  component: Resultados,
});

const TITULOS: Record<string, string> = {
  quiz: "❓ Cuestionario",
  vf: "✅ Verdadero o Falso",
  parejas: "🔗 Une los conceptos",
  mapa: "🗺️ Mapa interactivo",
  sopa: "🔤 Sopa de letras",
  ordenar: "🔢 Cadena alimentaria",
};

function Resultados() {
  const { studentName, results, reset } = useGame();
  const navigate = useNavigate();

  if (!studentName) {
    if (typeof window !== "undefined") navigate({ to: "/" });
    return null;
  }

  const totalCorrect = ACTIVITY_IDS.reduce((sum, id) => sum + (results[id]?.correct ?? 0), 0);
  const totalPoints = ACTIVITY_IDS.reduce((sum, id) => sum + (results[id]?.total ?? 0), 0);
  const pct = totalPoints ? Math.round((totalCorrect / totalPoints) * 100) : 0;

  let medalla = "🐟";
  let titulo = "Aprendiz del océano";
  let mensaje = "¡Sigue explorando para descubrir más!";
  if (pct >= 90) { medalla = "🏆"; titulo = "Maestro/a del Oceanogràfic"; mensaje = "¡Increíble! Conoces el océano como nadie."; }
  else if (pct >= 70) { medalla = "🥇"; titulo = "Explorador/a marino/a"; mensaje = "¡Genial! Has demostrado mucho conocimiento."; }
  else if (pct >= 50) { medalla = "🥈"; titulo = "Buceador/a curioso/a"; mensaje = "¡Buen trabajo! Aún hay más por descubrir."; }
  else if (pct >= 30) { medalla = "🥉"; titulo = "Pez aventurero"; mensaje = "Sigue practicando, ¡puedes mejorar!"; }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 print:py-0">
      {/* Diploma */}
      <div className="comic-card animate-pop-in bg-gradient-to-br from-sun/30 to-coral/20 p-8 text-center print:shadow-none">
        <div className="text-7xl animate-bob">{medalla}</div>
        <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">Diploma de</p>
        <h1 className="mt-1 text-4xl text-primary sm:text-5xl">{titulo}</h1>

        <div className="my-6 h-px w-2/3 mx-auto bg-foreground/20" />

        <p className="text-lg">Otorgado a</p>
        <p className="mt-2 font-display text-3xl text-coral sm:text-4xl">{studentName}</p>
        <p className="mt-3 text-base text-muted-foreground">{mensaje}</p>

        <div className="mt-6 inline-block comic-card-soft bg-card px-6 py-3">
          <p className="text-sm">Puntuación total</p>
          <p className="text-3xl font-bold text-primary">{totalCorrect} / {totalPoints}</p>
          <p className="text-sm text-muted-foreground">({pct}%)</p>
        </div>

        <div className="mt-6 grid gap-2 text-left sm:grid-cols-2">
          {ACTIVITY_IDS.map((id) => {
            const r = results[id];
            return (
              <div key={id} className="comic-card-soft flex items-center justify-between bg-card px-3 py-2">
                <span className="text-sm font-semibold">{TITULOS[id]}</span>
                <span className="text-sm">
                  {r ? `${r.correct}/${r.total}` : "—"}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Aventura en el Oceanogràfic de Valencia · 6º Primaria
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
        <button onClick={() => window.print()} className="bubble-btn bg-primary px-6 py-3 text-primary-foreground">
          🖨️ Imprimir diploma
        </button>
        <button onClick={() => navigate({ to: "/hub" })} className="bubble-btn bg-card px-5 py-3 text-foreground">
          ← Volver al mapa
        </button>
        <button onClick={() => { reset(); navigate({ to: "/" }); }} className="bubble-btn bg-coral px-5 py-3 text-coral-foreground">
          🔄 Nueva aventura
        </button>
      </div>
    </main>
  );
}
