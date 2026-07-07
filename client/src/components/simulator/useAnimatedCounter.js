import { useEffect, useRef, useState } from "react";

const useAnimatedCounter = (target, duration = 500) => {
  const [value, setValue] = useState(target);
  const previousTarget = useRef(target);

  useEffect(() => {
    let frame;
    const start = previousTarget.current;
    const delta = target - start;
    const startTime = performance.now();
    previousTarget.current = target;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(start + delta * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
};

export default useAnimatedCounter;
