import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { GameProvider } from "@/context/GameContext";
import { LangProvider } from "@/context/LangContext";
import { Bubbles } from "@/components/Bubbles";
import { LangSwitch } from "@/components/LangSwitch";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="comic-card max-w-md p-8 text-center">
        <h1 className="text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl">¡Te has perdido en el océano!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta página no existe.
        </p>
        <div className="mt-6">
          <Link to="/" className="bubble-btn inline-flex bg-primary px-6 py-3 text-primary-foreground">
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aventura en el Oceanogràfic — Actividades 6º Primaria" },
      { name: "description", content: "Aplicación interactiva con actividades para descubrir el Oceanogràfic de Valencia." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bowlby+One&family=Fredoka:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LangProvider>
      <GameProvider>
        <Bubbles />
        <LangSwitch />
        <div className="relative z-10 min-h-screen">
          <Outlet />
        </div>
      </GameProvider>
    </LangProvider>
  );
}
