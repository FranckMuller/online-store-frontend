import { useState, useEffect, startTransition } from "react";

type Options = {
  defaultValue?: boolean;
  appearenceDelay?: number;
  minDisplay?: number;
};

const useAppearanceDelay = (show?: boolean, options = {} as Options) => {
  const {
    defaultValue = false,
    minDisplay = 500,
    appearenceDelay = 500
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearenceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearenceDelay, show, minDisplay]);

  return delayedShow;
};

export { useAppearanceDelay };
