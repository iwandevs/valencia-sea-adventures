import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useGame, ACTIVITY_IDS, ActivityId } from "@/context/GameContext";
import { useLang } from "@/context/LangContext";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/hub")({
  component: Hub,
});

interface ActivityMeta {
  id: ActivityId;
  emoji: string;
  titleKey: string;
  descKey: string;
  bg: string;
  to: "/quiz" | "/vf" | "/parejas" | "/mapa" | "/sopa" | "/ordenar";
}

const ACTIVITIES: ActivityMeta[] = [
  { id: "quiz", emoji: "❓", titleKey: "act.quiz.title", descKey: "act.quiz.desc", bg: "bg-secondary", to: "/quiz" },
  { id: "vf", emoji: "✅", titleKey: "act.vf.title", descKey: "act.vf.desc", bg: "bg-sun", to: "/vf" },
  { id: "parejas", emoji: "🔗", titleKey: "act.parejas.title", descKey: "act.parejas.desc", bg: "bg-coral", to: "/parejas" },
  { id: "mapa", emoji: "🗺️", titleKey: "act.mapa.title", descKey: "act.mapa.desc", bg: "bg-primary", to: "/mapa" },
  { id: "sopa", emoji: "🔤", titleKey: "act.sopa.title", descKey: "act.sopa.desc", bg: "bg-success", to: "/sopa" },
  { id: "ordenar", emoji: "🔢", titleKey: "act.ordenar.title", descKey: "act.ordenar.desc", bg: "bg-deep", to: "/ordenar" },
];

function Hub() {
  const { studentName, results, reset } = useGame();
  const { t } = useLang();
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
          <p className="text-sm text-deep-foreground/80">{t("hub.hello")}</p>
          <h1 className="text-4xl text-deep-foreground">{studentName} 🐠</h1>
        </div>
        <div className="comic-card bg-sun px-5 py-3 text-sun-foreground">
          <strong>{completed}</strong> / {ACTIVITY_IDS.length} {t("hub.activities")}
        </div>
      </div>

      <p className="mb-6 text-deep-foreground/90">{t("hub.intro")}</p>

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
              <h2 className="text-xl text-foreground">{t(a.titleKey)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t(a.descKey)}</p>
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
          {t("hub.results")}
        </Link>
        <button
          onClick={() => { reset(); navigate({ to: "/" }); }}
          className="bubble-btn bg-card px-5 py-3 text-sm text-foreground"
        >
          {t("hub.restart")}
        </button>
      </div>
    </main>
  );
}
