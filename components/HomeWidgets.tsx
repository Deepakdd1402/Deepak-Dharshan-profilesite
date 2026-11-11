import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiCheck, FiClock, FiMapPin } from 'react-icons/fi';
import Widget from './Widget';
import { PATH } from '../lib/portfolio';

interface IST {
  h: number;
  m: number;
  s: number;
  day: number;
  month: number;
  year: number;
  weekday: string;
  monthName: string;
}

/** Live Indian Standard Time, ticking every second. Null until mounted. */
function useIST(): IST | null {
  const [t, setT] = useState<IST | null>(null);
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hourCycle: 'h23',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        weekday: 'long',
      }).formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
      const month = Number(get('month'));
      setT({
        h: Number(get('hour')),
        m: Number(get('minute')),
        s: Number(get('second')),
        day: Number(get('day')),
        month,
        year: Number(get('year')),
        weekday: get('weekday'),
        monthName: new Date(2000, month - 1, 1).toLocaleString('en-US', { month: 'long' }),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export function ClockWidget() {
  const t = useIST();
  const hand = (deg: number, len: number, w: number, color: string) => (
    <line
      x1="50"
      y1="50"
      x2="50"
      y2={50 - len}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      transform={`rotate(${deg} 50 50)`}
    />
  );
  return (
    <Widget title="Clock" icon={FiClock} accent="text-sf-weak">
      <div className="flex flex-col items-center gap-2">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0" role="img" aria-label="Analog clock showing Indian Standard Time">
          <circle cx="50" cy="50" r="48" fill="#fff" stroke="#DDDBDA" strokeWidth="1.5" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="50" y1="5" x2="50" y2={i % 3 === 0 ? 12 : 9} stroke="#181818" strokeWidth={i % 3 === 0 ? 2 : 1} transform={`rotate(${i * 30} 50 50)`} />
          ))}
          {t && (
            <>
              {hand(((t.h % 12) + t.m / 60) * 30, 24, 3.2, '#181818')}
              {hand((t.m + t.s / 60) * 6, 35, 2.4, '#181818')}
              {hand(t.s * 6, 38, 1, '#FF5F57')}
            </>
          )}
          <circle cx="50" cy="50" r="2.6" fill="#FF5F57" />
        </svg>
        <div className="text-center">
          <p className="text-2xl font-semibold tabular-nums tracking-tight">
            {t ? `${String(t.h).padStart(2, '0')}:${String(t.m).padStart(2, '0')}` : '--:--'}
          </p>
          <p className="flex items-center justify-center gap-1 text-xs text-sf-weak">
            <FiMapPin size={11} /> IST · India
          </p>
        </div>
      </div>
    </Widget>
  );
}

export function CalendarWidget() {
  const t = useIST();
  const first = t ? new Date(Date.UTC(t.year, t.month - 1, 1)).getUTCDay() : 0;
  const days = t ? new Date(Date.UTC(t.year, t.month, 0)).getUTCDate() : 30;
  const cells = [...Array(first).fill(0), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <Widget title={t ? t.weekday : 'Calendar'} icon={FiCalendar} accent="text-[#FF3B30]">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <p className="text-5xl font-light leading-none tracking-tight">{t?.day ?? '–'}</p>
          <p className="mt-1 text-xs text-sf-weak">{t ? `${t.monthName} ${t.year}` : ''}</p>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-y-0.5 text-center text-[10px] text-sf-weak">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="font-semibold">{d}</span>
          ))}
          {cells.map((d, i) => (
            <span key={i} className={d && t && d === t.day ? 'mx-auto h-4 w-4 rounded-full bg-[#FF3B30] font-semibold leading-4 text-white' : ''}>
              {d || ''}
            </span>
          ))}
        </div>
      </div>
    </Widget>
  );
}

/** Salesforce-style Path: chevron stages + a guidance panel for the selected one. */
export function CareerPath() {
  const [sel, setSel] = useState(PATH.length - 1);
  const stage = PATH[sel];
  return (
    <section className="rounded-xl border border-sf-g5 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-sf-ink">Career path</h2>
        <span className="text-xs text-sf-weak">Select a stage</span>
      </div>
      <ol className="flex overflow-x-auto pb-3 pt-1">
        {PATH.map((s, i) => {
          const selected = i === sel;
          return (
            <li key={s.id} className="relative -ml-2 min-w-[150px] flex-1 first:ml-0">
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-current={selected ? 'step' : undefined}
                style={{
                  clipPath:
                    i === 0
                      ? 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)'
                      : 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%)',
                }}
                className={`flex h-11 w-full items-center justify-center gap-1.5 px-5 text-xs font-medium text-white transition-all ${
                  s.current ? 'bg-brand-500' : 'bg-sf-success'
                } ${selected ? 'brightness-90' : 'hover:brightness-110'}`}
              >
                {!s.current && <FiCheck size={13} />}
                <span className="truncate">{s.label}</span>
              </button>
              {selected && (
                <motion.span layoutId="path-pointer" className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-brand-500" />
              )}
            </li>
          );
        })}
      </ol>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 grid gap-3 rounded-lg bg-brand-50 p-4 text-sm md:grid-cols-[1fr_2fr]"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sf-weak">Organisation</p>
            <p className="font-medium text-sf-ink">{stage.org}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-sf-weak">When</p>
            <p className="text-sf-ink">
              {stage.when}
              {stage.current && (
                <span className="ml-2 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-semibold text-white">Current</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sf-weak">Key focus</p>
            <p className="text-sf-ink">{stage.detail}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
