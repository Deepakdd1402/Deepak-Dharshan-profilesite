import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiFileText,
  FiFolder,
  FiGithub,
  FiHome,
  FiLinkedin,
  FiMail,
  FiSearch,
} from 'react-icons/fi';
import SiteMascot from './SiteMascot';
import { LINKS, NAV } from '../lib/portfolio';

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  '/': FiHome,
  '/resume': FiFileText,
  '/education': FiBookOpen,
  '/skills': FiCpu,
  '/experience': FiBriefcase,
  '/projects': FiFolder,
  '/contact': FiMail,
};

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const items = useMemo(() => {
    const all = [
      ...NAV.map((n) => ({ label: n.label, hint: 'Page', run: () => router.push(n.href) })),
      { label: 'Download CV', hint: 'File', run: () => window.open(`${router.basePath}/Deepak_Dharshan_CV.pdf`, '_blank') },
      { label: 'GitHub', hint: 'Link', run: () => window.open(LINKS.github, '_blank') },
      { label: 'LinkedIn', hint: 'Link', run: () => window.open(LINKS.linkedin, '_blank') },
    ];
    return all.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, router]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  if (!open) return null;

  const choose = (i: number) => {
    items[i]?.run();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/30 p-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-sf-g5 bg-white shadow-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search portfolio"
      >
        <div className="flex items-center gap-2 border-b border-sf-g5 px-3">
          <FiSearch className="text-sf-weak" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, items.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') choose(active);
              else if (e.key === 'Escape') onClose();
            }}
            placeholder="Search pages and links…"
            className="h-12 flex-1 bg-transparent text-sm outline-none"
          />
          <kbd className="rounded border border-sf-g5 px-1.5 text-[10px] text-sf-weak">esc</kbd>
        </div>
        <ul className="max-h-72 overflow-auto p-1.5">
          {items.map((it, i) => (
            <li key={it.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${
                  i === active ? 'bg-brand-50 text-brand-600' : 'text-sf-ink'
                }`}
              >
                {it.label}
                <span className="text-xs text-sf-weak">{it.hint}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-sf-weak">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    NAV.forEach((n) => router.prefetch(n.href));
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen">
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-sf-g5 bg-white/85 px-3 backdrop-blur-md md:px-4">
        <SiteMascot size={46} />
        <Link href="/" className="hidden min-w-0 leading-tight sm:block">
          <span className="block truncate text-sm font-semibold text-sf-ink">
            Deepak Dharshan
          </span>
          <span className="block truncate text-[11px] text-sf-weak">
            CRM Specialist · Business Analyst
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="mx-auto flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-sf-g5 bg-sf-g3/70 px-3 text-left text-sm text-sf-weak transition-colors hover:border-brand-400 hover:bg-white"
        >
          <FiSearch size={15} />
          <span className="flex-1 truncate">Search or jump to…</span>
          <kbd className="hidden rounded border border-sf-g5 bg-white px-1.5 text-[10px] sm:block">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden h-9 w-9 items-center justify-center rounded-lg text-sf-weak transition-colors hover:bg-brand-50 hover:text-brand-500 sm:flex">
            <FiGithub size={18} />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden h-9 w-9 items-center justify-center rounded-lg text-sf-weak transition-colors hover:bg-brand-50 hover:text-brand-500 sm:flex">
            <FiLinkedin size={18} />
          </a>
          <Link href="/contact" className="ml-1 hidden rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600 sm:block">
            Contact me
          </Link>
        </div>
      </header>

      {/* left icon rail (desktop) */}
      <nav aria-label="Primary" className="fixed bottom-0 left-0 top-14 z-30 hidden w-[72px] flex-col items-center gap-1 border-r border-sf-g5 bg-white py-3 md:flex">
        {NAV.map((n) => {
          const Icon = ICONS[n.href];
          const active = router.pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`group relative flex w-14 flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-medium transition-colors ${
                active ? 'bg-brand-50 text-brand-500' : 'text-sf-weak hover:bg-sf-g3 hover:text-sf-ink'
              }`}
            >
              {active && (
                <motion.span layoutId="rail-active" className="absolute -left-[9px] top-2 h-8 w-1 rounded-r bg-brand-500" />
              )}
              <Icon size={20} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      {/* bottom tab bar (mobile) */}
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-sf-g5 bg-white/95 backdrop-blur md:hidden">
        {NAV.map((n) => {
          const Icon = ICONS[n.href];
          const active = router.pathname === n.href;
          return (
            <Link key={n.href} href={n.href} aria-label={n.label} className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? 'bg-brand-50 text-brand-500' : 'text-sf-weak'}`}>
              <Icon size={20} />
            </Link>
          );
        })}
      </nav>

      <main className="pb-20 pt-14 md:pb-8 md:pl-[72px]">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-6xl px-4 py-6 md:px-8"
        >
          {children}
        </motion.div>
      </main>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </div>
  );
}

export default RootLayout;
