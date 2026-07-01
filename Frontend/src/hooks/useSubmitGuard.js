// useSubmitGuard.js
import { useState } from "react";

export function useSubmitGuard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guard = async (fn) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      return await fn();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, guard };
}
