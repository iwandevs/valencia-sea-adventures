import { useLang } from "@/context/LangContext";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed right-3 top-3 z-50 flex gap-1 rounded-full border-2 border-foreground bg-card p-1 text-xs shadow-bubble" style={{ borderWidth: 2 }}>
      <button
        onClick={() => setLang("es")}
        className={`rounded-full px-3 py-1 font-bold transition ${lang === "es" ? "bg-coral text-coral-foreground" : "text-foreground"}`}
        aria-label="Castellano"
      >
        ES
      </button>
      <button
        onClick={() => setLang("va")}
        className={`rounded-full px-3 py-1 font-bold transition ${lang === "va" ? "bg-coral text-coral-foreground" : "text-foreground"}`}
        aria-label="Valencià"
      >
        VA
      </button>
    </div>
  );
}
