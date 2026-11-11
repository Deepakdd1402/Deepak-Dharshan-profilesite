import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  icon: IconType;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}

/** Salesforce "record header": icon tile, small eyebrow, big title, actions. */
function PageHeader({ icon: Icon, eyebrow, title, children }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-sf-g5 bg-white px-4 py-3 shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white">
        <Icon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sf-weak">
          {eyebrow}
        </p>
        <h1 className="truncate text-xl font-semibold text-sf-ink md:text-2xl">
          {title}
        </h1>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </motion.header>
  );
}

export default PageHeader;
