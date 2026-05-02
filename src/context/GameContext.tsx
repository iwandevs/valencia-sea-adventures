import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type ActivityId = "quiz" | "vf" | "parejas" | "mapa" | "sopa" | "ordenar";

export interface ActivityResult {
  correct: number;
  total: number;
}

interface GameState {
  studentName: string;
  setStudentName: (name: string) => void;
  results: Record<ActivityId, ActivityResult | null>;
  saveResult: (id: ActivityId, result: ActivityResult) => void;
  reset: () => void;
}

const ACTIVITIES: ActivityId[] = ["quiz", "vf", "parejas", "mapa", "sopa", "ordenar"];

const emptyResults = () =>
  ACTIVITIES.reduce((acc, id) => ({ ...acc, [id]: null }), {} as Record<ActivityId, ActivityResult | null>);

const Ctx = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [studentName, setStudentName] = useState("");
  const [results, setResults] = useState<Record<ActivityId, ActivityResult | null>>(emptyResults);

  const saveResult = useCallback((id: ActivityId, result: ActivityResult) => {
    setResults((r) => ({ ...r, [id]: result }));
  }, []);

  const reset = useCallback(() => {
    setStudentName("");
    setResults(emptyResults());
  }, []);

  return (
    <Ctx.Provider value={{ studentName, setStudentName, results, saveResult, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useGame() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

export const ACTIVITY_IDS = ACTIVITIES;
