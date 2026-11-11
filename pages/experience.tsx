import { useMemo, useState } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase, FiEdit, FiList, FiSearch, FiShare, FiSidebar, FiTrash2 } from 'react-icons/fi';
import { BsPinAngleFill } from 'react-icons/bs';
import PageHeader from '../components/PageHeader';
import { OBJECTIVE, ROLES } from '../lib/portfolio';

interface Note {
  id: string;
  title: string;
  date: string;
  snippet: string;
  pinned?: boolean;
  tags: string[];
  body?: string;
  items: { title: string; text: string }[];
}

const NOTES: Note[] = [
  {
    id: 'objective',
    title: 'Career Objective',
    date: 'Summary',
    snippet: 'Results-driven CRM Specialist with expertise in GoHighLevel…',
    pinned: true,
    tags: ['CRM', 'Automation', 'SaaS'],
    body: OBJECTIVE,
    items: [],
  },
  ...ROLES.map((r) => ({
    id: r.id,
    title: `${r.company} · ${r.title}`,
    date: r.period,
    snippet: r.summary,
    tags: r.tags,
    items: r.highlights,
  })),
];

function Experience() {
  const [selected, setSelected] = useState(NOTES[1].id);
  const [query, setQuery] = useState('');
  const [done, setDone] = useState<Record<string, boolean>>({});

  const visible = useMemo(
    () =>
      NOTES.filter((n) =>
        `${n.title} ${n.snippet} ${n.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );
  const note = NOTES.find((n) => n.id === selected) ?? NOTES[0];

  const row = (n: Note) => (
    <button
      key={n.id}
      type="button"
      onClick={() => setSelected(n.id)}
      className={`block w-full shrink-0 rounded-lg px-3 py-2 text-left transition-colors max-md:w-60 ${
        n.id === selected ? 'bg-[#FDDC5C] text-black' : 'hover:bg-black/5'
      }`}
    >
      <span className="block truncate text-[13px] font-semibold">{n.title}</span>
      <span className="block truncate text-xs">
        <span className={n.id === selected ? 'text-black/70' : 'text-black/50'}>{n.date}</span>{' '}
        <span className={n.id === selected ? 'text-black/60' : 'text-black/40'}>{n.snippet}</span>
      </span>
    </button>
  );

  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Experience</title>
      </Head>
      <PageHeader icon={FiBriefcase} eyebrow="Work history" title="Experience" />

      {/* macOS Notes window */}
      <div className="mac-font overflow-hidden rounded-xl border border-black/10 bg-white shadow-window">
        <div className="flex h-12 items-center gap-3 border-b border-black/10 bg-[#F3F1EF] px-3">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57] ring-1 ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E] ring-1 ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-[#28C840] ring-1 ring-black/10" />
          </div>
          <FiSidebar className="ml-3 hidden text-black/45 md:block" aria-hidden="true" />
          <FiList className="hidden text-black/45 md:block" aria-hidden="true" />
          <span className="flex-1 text-center text-[13px] font-semibold text-black/70 max-md:text-left">
            Notes
          </span>
          <FiTrash2 className="hidden text-black/45 md:block" aria-hidden="true" />
          <FiEdit className="hidden text-black/45 md:block" aria-hidden="true" />
          <FiShare className="hidden text-black/45 md:block" aria-hidden="true" />
        </div>

        <div className="md:grid md:h-[640px] md:grid-cols-[290px_1fr]">
          {/* sidebar */}
          <aside className="border-black/10 bg-[#F7F6F4] p-2 md:overflow-y-auto md:border-r mac-scroll">
            <label className="mb-2 flex items-center gap-1.5 rounded-md bg-black/[0.06] px-2 py-1.5 text-sm">
              <FiSearch className="text-black/40" size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/40"
              />
            </label>
            <div className="max-md:flex max-md:gap-1 max-md:overflow-x-auto">
              {visible.some((n) => n.pinned) && (
                <p className="flex items-center gap-1 px-3 pb-1 pt-2 text-xs font-semibold text-black/55 max-md:hidden">
                  <BsPinAngleFill size={10} /> Pinned
                </p>
              )}
              {visible.filter((n) => n.pinned).map(row)}
              {visible.some((n) => !n.pinned) && (
                <p className="px-3 pb-1 pt-3 text-xs font-semibold text-black/55 max-md:hidden">
                  Experience
                </p>
              )}
              {visible.filter((n) => !n.pinned).map(row)}
              {visible.length === 0 && (
                <p className="px-3 py-6 text-center text-xs text-black/40">No notes found</p>
              )}
            </div>
          </aside>

          {/* note */}
          <section className="bg-[#FFFEFB] md:overflow-y-auto mac-scroll">
            <AnimatePresence mode="wait">
              <motion.article
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mx-auto max-w-2xl px-6 py-6 md:px-10"
              >
                <p className="text-center text-xs text-black/40">{note.date}</p>
                <h2 className="mt-2 text-2xl font-bold text-black">{note.title}</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {note.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#FFF3C4] px-2.5 py-0.5 text-xs font-medium text-[#8A6A00]">
                      #{t.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                {note.body && (
                  <p className="mt-4 text-[15px] leading-relaxed text-black/80">{note.body}</p>
                )}
                <ul className="mt-4 space-y-3">
                  {note.items.map((it, i) => {
                    const key = `${note.id}-${i}`;
                    const off = done[key];
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => setDone((d) => ({ ...d, [key]: !d[key] }))}
                          className="flex w-full items-start gap-3 text-left"
                          aria-pressed={!off}
                        >
                          <span
                            className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
                              off ? 'border-black/30' : 'border-[#E5A800] bg-[#E5A800]'
                            }`}
                          >
                            {!off && (
                              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 6.4l2.3 2.3L9.5 3.6" />
                              </svg>
                            )}
                          </span>
                          <span className="text-[15px] leading-snug text-black/85">
                            <b className="font-semibold">{it.title}.</b> {it.text}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.article>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Experience;
