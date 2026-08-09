/** Hand-drawn underline accent under key headline words. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mt-1 block w-[min(100%,280px)] ${className}`}
      viewBox="0 0 280 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8 C40 2, 70 12, 110 6 S180 2, 220 9 S260 4, 278 7"
        stroke="#f0d7ff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
