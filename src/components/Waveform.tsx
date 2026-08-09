export function Waveform({ active = false }: { active?: boolean }) {
  const heights = [10, 18, 12, 22, 8, 16, 14];
  return (
    <div className="inline-flex h-10 items-end gap-1 rounded-full border-2 border-vast-ink bg-lumen-cream px-3 py-2">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 rounded-sm bg-vast-ink ${active ? "wave-bar" : ""}`}
          style={{
            height: h,
            animationDelay: active ? `${i * 0.08}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
