type Props = {
  message: string | null;
};

export function Notice({ message }: Props) {
  if (!message) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div className="rounded-full border-2 border-vast-ink bg-lavender-whisper px-5 py-3 text-center text-sm font-medium text-vast-ink">
        {message}
      </div>
    </div>
  );
}
