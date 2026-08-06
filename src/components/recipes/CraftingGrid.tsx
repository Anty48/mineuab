"use client";

/**
 * A read-only 3x3 Minecraft-style crafting grid + result slot,
 * rendered in the JEI recipe modal.
 */
export default function CraftingGrid({
  grid,
  resultIcon,
  resultName,
}: {
  grid: string[];
  resultIcon: string;
  resultName: string;
}) {
  const cells = Array.from({ length: 9 }, (_, i) => grid[i] ?? "");

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      {/* 3x3 input grid */}
      <div className="mc-panel inline-block rounded-md p-2">
        <div className="grid grid-cols-3 gap-1">
          {cells.map((cell, i) => (
            <div
              key={i}
              title={cell || undefined}
              className="mc-slot h-16 w-16 rounded-[2px] p-1"
            >
              {cell ? (
                <span className="line-clamp-3 text-[10px] font-bold leading-tight text-black">
                  {cell}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-3xl text-neutral-400 sm:rotate-0" aria-hidden>
        <span className="hidden sm:inline">➜</span>
        <span className="inline sm:hidden">⬇</span>
      </div>

      {/* Result slot */}
      <div className="mc-panel inline-block rounded-md p-2">
        <div
          className="mc-slot h-20 w-20 rounded-[2px] p-1"
          title={resultName}
        >
          <span className="text-3xl">{resultIcon}</span>
        </div>
      </div>
    </div>
  );
}
