import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { ActivityHeader } from "@/components/ActivityHeader";
import { useGame } from "@/context/GameContext";
import { SOPA_PALABRAS } from "@/data/oceanografic";

export const Route = createFileRoute("/sopa")({
  component: SopaPage,
});

const SIZE = 12;

type Cell = { letter: string; r: number; c: number };

function buildGrid(words: readonly string[]): { grid: string[][]; placements: { word: string; cells: { r: number; c: number }[] }[] } {
  const grid: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
  const placements: { word: string; cells: { r: number; c: number }[] }[] = [];
  const dirs = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal ↘
  ];

  for (const word of words) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const maxR = SIZE - dr * word.length;
      const maxC = SIZE - dc * word.length;
      if (maxR <= 0 || maxC <= 0) continue;
      const r0 = Math.floor(Math.random() * maxR);
      const c0 = Math.floor(Math.random() * maxC);
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        if (grid[r][c] && grid[r][c] !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;
      const cells: { r: number; c: number }[] = [];
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        grid[r][c] = word[i];
        cells.push({ r, c });
      }
      placements.push({ word, cells });
      placed = true;
    }
  }

  // rellenar
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * letters.length)];

  return { grid, placements };
}

function cellKey(r: number, c: number) { return `${r}-${c}`; }

function SopaPage() {
  const { saveResult } = useGame();
  const navigate = useNavigate();
  const { grid, placements } = useMemo(() => buildGrid(SOPA_PALABRAS), []);
  const [selecting, setSelecting] = useState<Cell[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const isDown = useRef(false);

  const start = (cell: Cell) => { isDown.current = true; setSelecting([cell]); };
  const enter = (cell: Cell) => {
    if (!isDown.current || selecting.length === 0) return;
    const start = selecting[0];
    const dr = Math.sign(cell.r - start.r);
    const dc = Math.sign(cell.c - start.c);
    if (dr === 0 && dc === 0) { setSelecting([start]); return; }
    const len = Math.max(Math.abs(cell.r - start.r), Math.abs(cell.c - start.c)) + 1;
    // valida línea recta
    if (Math.abs(cell.r - start.r) !== 0 && Math.abs(cell.c - start.c) !== 0 && Math.abs(cell.r - start.r) !== Math.abs(cell.c - start.c)) return;
    const cells: Cell[] = [];
    for (let i = 0; i < len; i++) {
      const r = start.r + dr * i, c = start.c + dc * i;
      if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return;
      cells.push({ r, c, letter: grid[r][c] });
    }
    setSelecting(cells);
  };
  const end = () => {
    isDown.current = false;
    if (selecting.length < 2) { setSelecting([]); return; }
    const word = selecting.map((c) => c.letter).join("");
    const reverse = [...selecting].reverse().map((c) => c.letter).join("");
    const match = placements.find((p) => (p.word === word || p.word === reverse) && !found.has(p.word));
    if (match) {
      const newFound = new Set(found); newFound.add(match.word);
      const newCells = new Set(foundCells);
      match.cells.forEach((c) => newCells.add(cellKey(c.r, c.c)));
      setFound(newFound);
      setFoundCells(newCells);
      if (newFound.size === SOPA_PALABRAS.length) {
        setTimeout(() => {
          saveResult("sopa", { correct: SOPA_PALABRAS.length, total: SOPA_PALABRAS.length });
        }, 100);
      }
    }
    setSelecting([]);
  };

  const finish = () => {
    saveResult("sopa", { correct: found.size, total: SOPA_PALABRAS.length });
    navigate({ to: "/hub" });
  };

  const selectedKeys = new Set(selecting.map((c) => cellKey(c.r, c.c)));
  const allFound = found.size === SOPA_PALABRAS.length;

  return (
    <main>
      <ActivityHeader title="Sopa de letras" emoji="🔤" />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <p className="comic-card mb-5 bg-card p-4 text-center text-sm">
          Arrastra para seleccionar las palabras (horizontal, vertical o diagonal). Encontradas: <strong>{found.size}/{SOPA_PALABRAS.length}</strong>
        </p>

        <div className="grid gap-6 md:grid-cols-[auto,1fr]">
          <div
            className="comic-card select-none bg-card p-3"
            onMouseLeave={end}
            onMouseUp={end}
            onTouchEnd={end}
          >
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}>
              {grid.map((row, r) =>
                row.map((letter, c) => {
                  const k = cellKey(r, c);
                  const isFound = foundCells.has(k);
                  const isSel = selectedKeys.has(k);
                  return (
                    <div
                      key={k}
                      onMouseDown={() => start({ r, c, letter })}
                      onMouseEnter={() => enter({ r, c, letter })}
                      onTouchStart={() => start({ r, c, letter })}
                      className={`flex aspect-square cursor-pointer items-center justify-center rounded-md border border-foreground/20 text-sm font-bold sm:text-base ${
                        isFound ? "bg-success text-success-foreground" :
                        isSel ? "bg-sun text-sun-foreground" : "bg-background"
                      }`}
                    >
                      {letter}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="comic-card bg-card p-4">
            <h3 className="mb-3 text-lg text-primary">A buscar:</h3>
            <ul className="space-y-1">
              {SOPA_PALABRAS.map((w) => (
                <li key={w} className={`rounded px-2 py-1 text-base ${found.has(w) ? "bg-success/20 line-through text-success" : ""}`}>
                  {found.has(w) ? "✓ " : "• "}{w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={finish}
            className={`bubble-btn px-8 py-4 text-lg ${allFound ? "bg-coral text-coral-foreground animate-bob" : "bg-card text-foreground"}`}
          >
            {allFound ? "🏁 ¡Terminado!" : `Saltar (${found.size}/${SOPA_PALABRAS.length})`}
          </button>
        </div>
      </div>
    </main>
  );
}
