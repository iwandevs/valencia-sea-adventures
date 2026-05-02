import { Link, useNavigate } from "@tanstack/react-router";
import { useGame } from "@/context/GameContext";
import { useLang } from "@/context/LangContext";
import { Home, Trophy } from "lucide-react";

interface Props {
  titleKey: string;
  emoji?: string;
}

export function ActivityHeader({ titleKey, emoji }: Props) {
  const { studentName } = useGame();
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
      <button
        onClick={() => navigate({ to: "/hub" })}
        className="bubble-btn inline-flex items-center gap-2 bg-card px-4 py-2 text-sm text-foreground"
      >
        <Home className="h-4 w-4" /> {t("header.map")}
      </button>
      <h1 className="comic-card px-5 py-2 text-xl text-foreground sm:text-2xl">
        {emoji} {t(titleKey)}
      </h1>
      <div className="bubble-btn inline-flex items-center gap-2 bg-sun px-4 py-2 text-sm text-sun-foreground">
        <Trophy className="h-4 w-4" />
        {studentName || t("header.explorer")}
      </div>
    </header>
  );
}
