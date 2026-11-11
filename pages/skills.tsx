import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaBolt,
  FaChartLine,
  FaDatabase,
  FaFileAlt,
  FaFilePdf,
  FaFolder,
  FaFolderOpen,
  FaTimes,
} from 'react-icons/fa';
import {
  SiCss3,
  SiCplusplus,
  SiC,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiHubspot,
  SiJavascript,
  SiMicrosoftexcel,
  SiOracle,
  SiPowerbi,
  SiPython,
  SiSalesforce,
  SiTailwindcss,
  SiZoho,
} from 'react-icons/si';
import { NAV } from '../lib/portfolio';

interface Skill {
  name: string;
  group: string;
  icon: IconType;
  color: string;
}

const GROUPS = [
  'CRM Platforms',
  'Core Competencies',
  'Analytics & Programming',
  'Tools & Technologies',
] as const;

const SKILLS: Skill[] = [
  { name: 'GoHighLevel (GHL)', group: GROUPS[0], icon: FaBolt, color: '#F5A100' },
  { name: 'HubSpot', group: GROUPS[0], icon: SiHubspot, color: '#FF7A59' },
  { name: 'Zoho', group: GROUPS[0], icon: SiZoho, color: '#E42527' },
  { name: 'SFDC', group: GROUPS[0], icon: SiSalesforce, color: '#00A1E0' },
  { name: 'OCA', group: GROUPS[0], icon: SiOracle, color: '#F80000' },
  ...[
    'Product Management',
    'Market Research & Analysis',
    'Data Analysis',
    'Project Management',
    'SaaS Proficiency',
    'Effective Communication',
    'Critical Thinking',
    'Marketplace Optimization',
    'Product Specialist',
  ].map((name) => ({ name, group: GROUPS[1], icon: FaFileAlt, color: '#3A6EA5' })),
  { name: 'Advanced Excel', group: GROUPS[2], icon: SiMicrosoftexcel, color: '#217346' },
  { name: 'Power BI', group: GROUPS[2], icon: SiPowerbi, color: '#F2C811' },
  { name: 'SQL', group: GROUPS[2], icon: FaDatabase, color: '#336791' },
  { name: 'Python', group: GROUPS[2], icon: SiPython, color: '#3776AB' },
  { name: 'HTML', group: GROUPS[2], icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', group: GROUPS[2], icon: SiCss3, color: '#1572B6' },
  { name: 'C++', group: GROUPS[2], icon: SiCplusplus, color: '#00599C' },
  { name: 'C', group: GROUPS[2], icon: SiC, color: '#5C6BC0' },
  { name: 'Git', group: GROUPS[3], icon: SiGit, color: '#F05032' },
  { name: 'GitHub', group: GROUPS[3], icon: SiGithub, color: '#24292F' },
  { name: 'GitLab', group: GROUPS[3], icon: SiGitlab, color: '#FC6D26' },
  { name: 'JavaScript', group: GROUPS[3], icon: SiJavascript, color: '#D4B106' },
  { name: 'Tailwind CSS', group: GROUPS[3], icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'MATLAB', group: GROUPS[3], icon: FaChartLine, color: '#D9722A' },
  { name: 'Zoho Creator', group: GROUPS[3], icon: SiZoho, color: '#E42527' },
];

function Flag() {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden="true">
      <path d="M1 3c3-1.5 4 1.5 7 0v5c-3 1.5-4-1.5-7 0z" fill="#F25022" />
      <path d="M9 3c2-1 4 0 6-1v5c-2 1-4 0-6 1z" fill="#7FBA00" />
      <path d="M1 9c3-1.5 4 1.5 7 0v5c-3 1.5-4-1.5-7 0z" fill="#00A4EF" />
      <path d="M9 9c2-1 4 0 6-1v5c-2 1-4 0-6 1z" fill="#FFB900" />
    </svg>
  );
}

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }));
    f();
    const id = window.setInterval(f, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

function Skills() {
  const { basePath } = useRouter();
  const desk = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Skill | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [error, setError] = useState(false);

  const shown = filter === 'all' ? [...GROUPS] : GROUPS.filter((g) => g === filter);
  const count = SKILLS.filter((s) => filter === 'all' || s.group === filter).length;
  const path = `C:\\Portfolio\\Skills${filter === 'all' ? '' : `\\${filter}`}`;

  const winBtn =
    'flex h-[22px] w-[22px] items-center justify-center rounded-[3px] border border-white/80 text-white text-[11px] font-bold leading-none shadow-[inset_0_0_2px_rgba(255,255,255,.5)]';

  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Skills</title>
      </Head>

      <div
        ref={desk}
        className="xp-font xp-bliss relative h-[720px] overflow-hidden rounded-xl border border-black/20 shadow-window text-[12px] text-black md:h-[700px]"
        onClick={() => startOpen && setStartOpen(false)}
        role="presentation"
      >
        {/* desktop icon */}
        <a
          href={`${basePath}/Deepak_Dharshan_CV.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-3 top-3 z-0 hidden w-20 flex-col items-center gap-1 rounded p-1 text-center text-white hover:bg-white/15 md:flex"
        >
          <FaFilePdf size={36} className="drop-shadow" />
          <span className="text-[11px] leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,.9)]">My CV.pdf</span>
        </a>

        {/* window */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              key={String(maximized)}
              drag={!maximized}
              dragListener={false}
              dragControls={drag}
              dragConstraints={desk}
              dragElastic={0}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.16 }}
              className={`absolute flex flex-col overflow-hidden rounded-t-lg border-[3px] border-[#0050EE] bg-[#ECE9D8] shadow-[4px_6px_18px_rgba(0,0,0,.45)] ${
                maximized ? 'inset-x-0 bottom-9 top-0 rounded-none' : 'inset-x-3 bottom-16 top-4 md:left-28 md:right-8 md:bottom-16 md:top-8'
              }`}
            >
              {/* title bar */}
              <div
                className="xp-title flex h-[30px] shrink-0 touch-none select-none items-center gap-2 px-1.5"
                onPointerDown={(e) => !maximized && drag.start(e)}
                onDoubleClick={() => setMaximized((m) => !m)}
              >
                <FaFolderOpen className="text-[#FFD65C]" size={15} />
                <span className="flex-1 truncate text-[13px] font-bold text-white [text-shadow:1px_1px_0_#0A246A]">
                  Skills
                </span>
                <button type="button" aria-label="Minimize" className={winBtn} style={{ background: 'linear-gradient(#5C93FF,#1F5FE0)' }} onPointerDown={(e) => e.stopPropagation()} onClick={() => setMinimized(true)}>
                  <span className="mt-1.5 block h-[3px] w-2 bg-white" />
                </button>
                <button type="button" aria-label="Maximize" className={winBtn} style={{ background: 'linear-gradient(#5C93FF,#1F5FE0)' }} onPointerDown={(e) => e.stopPropagation()} onClick={() => setMaximized((m) => !m)}>
                  <span className="block h-2.5 w-2.5 border-2 border-t-[3px] border-white" />
                </button>
                <button type="button" aria-label="Close" className={winBtn} style={{ background: 'linear-gradient(#F08D6E,#D2381C)' }} onPointerDown={(e) => e.stopPropagation()} onClick={() => setError(true)}>
                  <FaTimes size={10} />
                </button>
              </div>

              {/* menu + address bar */}
              <div className="flex shrink-0 gap-3 border-b border-[#D5D2C0] px-2 py-0.5 text-[12px]">
                {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((m) => (
                  <span key={m} className="cursor-default px-1 hover:bg-[#316AC5] hover:text-white">{m}</span>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-2 border-b border-[#D5D2C0] px-2 py-1">
                <span className="text-[#716F64]">Address</span>
                <div className="flex-1 truncate border border-[#7F9DB9] bg-white px-1.5 py-[3px]">{path}</div>
                <button type="button" onClick={() => setFilter('all')} className="xp-btn px-2.5 py-[2px]">Go</button>
              </div>

              {/* body */}
              <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                <aside className="xp-task shrink-0 space-y-2.5 overflow-y-auto p-2.5 md:w-56">
                  <TaskPanel title="System Tasks">
                    {[{ k: 'all', l: 'View all skills' }, ...GROUPS.map((g) => ({ k: g, l: g }))].map((i) => (
                      <button
                        key={i.k}
                        type="button"
                        onClick={() => setFilter(i.k)}
                        className={`block w-full text-left leading-snug hover:underline ${filter === i.k ? 'font-bold text-[#0A246A]' : 'text-[#215DC6]'}`}
                      >
                        {i.l}
                      </button>
                    ))}
                  </TaskPanel>
                  <TaskPanel title="Other Places" className="max-md:hidden">
                    {NAV.filter((n) => n.href !== '/skills').map((n) => (
                      <Link key={n.href} href={n.href} className="block text-[#215DC6] hover:underline">
                        {n.label}
                      </Link>
                    ))}
                  </TaskPanel>
                  <TaskPanel title="Details" className="max-md:hidden">
                    {selected ? (
                      <div className="text-black">
                        <p className="font-bold">{selected.name}</p>
                        <p className="text-[#716F64]">{selected.group}</p>
                      </div>
                    ) : (
                      <p className="text-[#716F64]">Select a file to see details.</p>
                    )}
                  </TaskPanel>
                </aside>

                <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 mac-scroll" onClick={() => setSelected(null)} role="presentation">
                  {shown.map((g) => (
                    <section key={g} className="mb-4">
                      <h2 className="mb-2 border-b border-[#C5D5F0] pb-0.5 text-[13px] font-bold text-[#0C327D]">{g}</h2>
                      <div className="flex flex-wrap gap-1">
                        {SKILLS.filter((s) => s.group === g).map((s, i) => {
                          const Icon = s.icon;
                          const on = selected?.name === s.name && selected.group === s.group;
                          return (
                            <motion.button
                              key={`${g}-${s.name}`}
                              type="button"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.02 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(s);
                              }}
                              className="flex w-[84px] flex-col items-center gap-1 p-1.5 text-center"
                            >
                              <span className={`rounded p-1.5 ${on ? 'bg-[#316AC5]/30' : ''}`}>
                                <Icon size={30} color={s.color} />
                              </span>
                              <span className={`px-0.5 text-[11px] leading-tight ${on ? 'bg-[#316AC5] text-white' : ''}`}>{s.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              {/* status bar */}
              <div className="flex shrink-0 items-center justify-between border-t border-[#D5D2C0] px-2 py-[3px] text-[11px] text-[#444]">
                <span>{count} objects</span>
                <span className="flex items-center gap-1"><FaFolder className="text-[#E7B93B]" /> My Portfolio</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* error dialog */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm overflow-hidden rounded-t-lg border-[3px] border-[#0050EE] bg-[#ECE9D8] shadow-[4px_6px_18px_rgba(0,0,0,.5)]"
                role="alertdialog"
                aria-label="Skills"
              >
                <div className="xp-title flex h-[26px] items-center justify-between px-2">
                  <span className="text-[12px] font-bold text-white [text-shadow:1px_1px_0_#0A246A]">Skills</span>
                  <button type="button" aria-label="Close dialog" className={winBtn} style={{ background: 'linear-gradient(#F08D6E,#D2381C)' }} onClick={() => setError(false)}>
                    <FaTimes size={10} />
                  </button>
                </div>
                <div className="flex items-start gap-3 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D2381C] text-lg font-bold text-white shadow-inner">×</span>
                  <p className="text-[12px] leading-snug">
                    This window can&apos;t be closed because these skills are still in use.
                    Please try again after hiring me.
                  </p>
                </div>
                <div className="flex justify-center pb-4">
                  <button type="button" autoFocus onClick={() => setError(false)} className="xp-btn min-w-[75px] px-3 py-[3px] font-medium">OK</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* start menu */}
        <AnimatePresence>
          {startOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.12 }}
              className="absolute bottom-9 left-0 z-20 w-[300px] overflow-hidden rounded-t-lg border-2 border-[#0A3FB5] bg-white shadow-[4px_-2px_14px_rgba(0,0,0,.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 bg-gradient-to-b from-[#1F6BE5] to-[#0A4DC9] px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${basePath}/logo.png`} alt="" className="h-10 w-10 rounded border-2 border-white/80 bg-[#EEF4FF] object-cover object-top" />
                <span className="text-[15px] font-bold text-white [text-shadow:1px_1px_1px_rgba(0,0,0,.5)]">Deepak</span>
              </div>
              <ul className="grid grid-cols-2 p-1.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="block rounded px-2 py-1.5 text-[12px] hover:bg-[#316AC5] hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end bg-[#D3E5FA] px-2 py-1.5">
                <button type="button" onClick={() => setStartOpen(false)} className="rounded px-2 py-0.5 text-[11px] hover:bg-[#316AC5] hover:text-white">
                  Close menu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* taskbar */}
        <div className="xp-taskbar absolute inset-x-0 bottom-0 z-30 flex h-9 items-center gap-2 pr-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStartOpen((o) => !o);
            }}
            className="xp-start flex h-full items-center gap-1.5 rounded-r-[14px] pl-2 pr-4 text-[19px] font-bold italic text-white shadow-[inset_-2px_0_3px_rgba(0,0,0,.3)] [text-shadow:1px_1px_2px_rgba(0,0,0,.6)] hover:brightness-110"
          >
            <Flag /> start
          </button>
          <button
            type="button"
            onClick={() => setMinimized((m) => !m)}
            className={`flex h-[26px] w-40 items-center gap-1.5 truncate rounded px-2 text-[12px] text-white ${minimized ? 'bg-[#1E52B7]' : 'bg-[#3C81F3] shadow-inner'}`}
          >
            <FaFolderOpen className="text-[#FFD65C]" /> Skills
          </button>
          <div className="ml-auto flex h-[26px] items-center gap-2 rounded-sm border-l border-[#0B3A9B] bg-[#0F8CE8] px-3 text-[11px] text-white">
            <Clock />
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskPanel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-t-md ${className}`}>
      <div className="bg-gradient-to-r from-white to-[#C6D3F7] px-2.5 py-1 text-[12px] font-bold text-[#215DC6]">{title}</div>
      <div className="space-y-1 bg-[#D6DFF7] p-2.5">{children}</div>
    </div>
  );
}

export default Skills;
