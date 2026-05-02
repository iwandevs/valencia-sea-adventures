import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useGame } from "@/context/GameContext";
import heroImg from "@/assets/hero-ocean.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { setStudentName } = useGame();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Escribe tu nombre (al menos 2 letras)");
      return;
    }
    setStudentName(trimmed);
    navigate({ to: "/hub" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        <div className="animate-pop-in">
          <div className="comic-card overflow-hidden">
            <img
              src={heroImg}
              alt="Ilustración cómic del Oceanogràfic con tiburón, peces y corales"
              width={1536}
              height={896}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="comic-card animate-pop-in space-y-5 bg-card p-6 sm:p-8">
          <span className="inline-block rounded-full bg-coral px-4 py-1 text-sm text-coral-foreground">
            🌊 Aventura submarina
          </span>
          <h1 className="text-4xl leading-tight text-primary sm:text-5xl">
            ¡Descubre el<br />Oceanogràfic!
          </h1>
          <p className="text-base text-muted-foreground">
            Una misión interactiva por el acuario más grande de Europa.
            <br />
            <strong>6 actividades</strong> · ⏱️ ~40 minutos
          </p>

          <form onSubmit={start} className="space-y-3 pt-2">
            <label className="block text-sm font-semibold" htmlFor="name">
              ¿Cuál es tu nombre, explorador/a?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Escribe aquí tu nombre"
              className="w-full rounded-2xl border-3 border-foreground bg-background px-4 py-3 text-lg outline-none focus:ring-4 focus:ring-secondary"
              style={{ borderWidth: 3 }}
              maxLength={30}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="bubble-btn w-full bg-coral px-6 py-4 text-lg text-coral-foreground"
            >
              🚀 ¡Empezar la aventura!
            </button>
          </form>

          <p className="text-xs text-muted-foreground">
            Información basada en{" "}
            <a className="underline" href="https://www.oceanografic.org/" target="_blank" rel="noreferrer">
              oceanografic.org
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
