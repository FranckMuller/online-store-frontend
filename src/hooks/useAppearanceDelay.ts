import { useState, useEffect, startTransition } from "react";

type Options = {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
};

export const useAppearanceDelay = (show?: boolean, options = {} as Options) => {
  const {
    defaultValue = false,
    minDisplay = 300,
    appearanceDelay = 500
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearanceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearanceDelay, show, minDisplay]);

  return delayedShow;
};
