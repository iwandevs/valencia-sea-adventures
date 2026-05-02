import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useGame, ACTIVITY_IDS, ActivityId } from "@/context/GameContext";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/hub")({
  component: Hub,
});

interface ActivityMeta {
  id: ActivityId;
  emoji: string;
  title: string;
  desc: string;
  bg: string;
  to: "/quiz" | "/vf" | "/parejas" | "/mapa" | "/sopa" | "/ordenar";
}

const ACTIVITIES: ActivityMeta[] = [
  { id: "quiz", emoji: "❓", title: "Cuestionario", desc: "8 preguntas de opción múltiple", bg: "bg-secondary", to: "/quiz" },
  { id: "vf", emoji: "✅", title: "Verdadero o Falso", desc: "8 afirmaciones marinas", bg: "bg-sun", to: "/vf" },
  { id: "parejas", emoji: "🔗", title: "Une los conceptos", desc: "Empareja animales con su zona", bg: "bg-coral", to: "/parejas" },
  { id: "mapa", emoji: "🗺️", title: "Mapa interactivo", desc: "Explora las 9 zonas del acuario", bg: "bg-primary", to: "/mapa" },
  { id: "sopa", emoji: "🔤", title: "Sopa de letras", desc: "Encuentra 8 animales marinos", bg: "bg-success", to: "/sopa" },
  { id: "ordenar", emoji: "🔢", title: "Cadena alimentaria", desc: "Ordena del más pequeño al mayor", bg: "bg-deep", to: "/ordenar" },
];

function Hub() {
  const { studentName, results, reset } = useGame();
  const navigate = useNavigate();

  if (!studentName) {
    if (typeof window !== "undefined") navigate({ to: "/" });
    return null;
  }

  const completed = ACTIVITY_IDS.filter((id) => results[id] !== null).length;
  const allDone = completed === ACTIVITY_IDS.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-deep-foreground/80">Hola,</p>
          <h1 className="text-4xl text-deep-foreground">{studentName} 🐠</h1>
        </div>
        <div className="comic-card bg-sun px-5 py-3 text-sun-foreground">
          <strong>{completed}</strong> / {ACTIVITY_IDS.length} actividades
        </div>
      </div>

      <p className="mb-6 text-deep-foreground/90">
        Elige una actividad para empezar. Puedes hacerlas en el orden que quieras.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVITIES.map((a, i) => {
          const r = results[a.id];
          const done = r !== null;
          return (
            <Link
              key={a.id}
              to={a.to}
              className="comic-card group relative block overflow-hidden p-5 transition-transform hover:-translate-y-1"
              style={{ animation: `pop-in 0.5s ${i * 0.08}s both` }}
            >
              <div className={`mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${a.bg} text-4xl border-3 border-foreground`} style={{ borderWidth: 3 }}>
                {a.emoji}
              </div>
              <h2 className="text-xl text-foreground">{a.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              {done && r && (
                <div className="mt-3 flex items-center gap-2 text-sm text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-semibold">{r.correct} / {r.total}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/resultados"
          className={`bubble-btn px-8 py-4 text-lg ${allDone ? "bg-coral text-coral-foreground animate-bob" : "bg-muted text-muted-foreground"}`}
        >
          🏆 Ver mis resultados
        </Link>
        <button
          onClick={() => { reset(); navigate({ to: "/" }); }}
          className="bubble-btn bg-card px-5 py-3 text-sm text-foreground"
        >
          🔄 Empezar de nuevo
        </button>
      </div>
    </main>
  );
}
