import { useEffect, useMemo } from "react";

interface BubblesProps {
  count?: number;
}

export function Bubbles({ count = 18 }: BubblesProps) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 32,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble animate-float-up"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            bottom: `-40px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
      <div className="ray" style={{ left: "10%" }} />
      <div className="ray" style={{ left: "55%" }} />
      <div className="ray" style={{ left: "85%" }} />
    </div>
  );
}

export function useBodyClass(cls: string) {
  useEffect(() => {
    document.body.classList.add(cls);
    return () => document.body.classList.remove(cls);
  }, [cls]);
}
