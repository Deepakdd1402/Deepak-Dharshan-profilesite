import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

/** Counts up from 0 to `value` the first time it scrolls into view. */
function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return undefined;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <div>
      <span ref={ref} className="block text-3xl font-semibold tracking-tight text-brand-500">
        {`0${suffix}`}
      </span>
      <span className="text-xs text-sf-weak">{label}</span>
    </div>
  );
}

export default StatCounter;
