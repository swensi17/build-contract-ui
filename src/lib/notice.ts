import { useCallback, useEffect, useState } from "react";

export function useNotice(timeoutMs = 2800) {
  const [message, setMessage] = useState<string | null>(null);

  const notify = useCallback((text: string) => {
    setMessage(text);
  }, []);

  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(() => setMessage(null), timeoutMs);
    return () => window.clearTimeout(id);
  }, [message, timeoutMs]);

  return { message, notify };
}
