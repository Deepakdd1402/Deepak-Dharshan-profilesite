import { useEffect, useRef, useState } from 'react';

interface Burst {
  id: number;
  x: number;
  y: number;
}

const INTERACTIVE =
  'a,button,[role="button"],input,textarea,select,label,summary,[data-cursor="hover"]';

/**
 * Soft trailing ring + dot that follow the pointer (grows over clickable
 * things) and a ripple with sparks on every click. The native cursor is kept
 * for accessibility, and everything is off on touch screens.
 */
function CursorFX() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return undefined;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let pressed = false;
    let raf = 0;
    let nextId = 0;

    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      const scale = pressed ? 0.7 : hovering ? 1.6 : 1;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale})`;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as Element | null;
      hovering = !!el?.closest?.(INTERACTIVE);
      if (ring.current) {
        ring.current.dataset.hover = String(hovering);
        ring.current.style.opacity = '1';
      }
      if (dot.current) dot.current.style.opacity = '1';
    };
    const onDown = (e: PointerEvent) => {
      pressed = true;
      const id = nextId++;
      setBursts((b) => [...b.slice(-5), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setBursts((b) => b.filter((i) => i.id !== id)), 750);
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      if (ring.current) ring.current.style.opacity = '0';
      if (dot.current) dot.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={ring} className="fx-ring" style={{ opacity: 0 }} />
      <div ref={dot} className="fx-dot" style={{ opacity: 0 }} />
      {bursts.map((b) => (
        <div key={b.id}>
          <span className="fx-ripple" style={{ left: b.x, top: b.y }} />
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="fx-spark"
              style={{ left: b.x, top: b.y, ['--a' as string]: `${i * 45}deg` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default CursorFX;
