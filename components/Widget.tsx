import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface WidgetProps {
  title: string;
  icon?: IconType;
  accent?: string;
  className?: string;
  children: React.ReactNode;
}

/** macOS-style widget: big radius, frosted white, tiny uppercase header. */
function Widget({ title, icon: Icon, accent = 'text-brand-500', className = '', children }: WidgetProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4 }}
      className={`rounded-[22px] border border-white/80 bg-white/80 p-4 shadow-widget backdrop-blur-xl ${className}`}
    >
      <div className="mb-2 flex items-center gap-1.5">
        {Icon && <Icon size={13} className={accent} />}
        <h2 className={`text-[11px] font-semibold uppercase tracking-wider ${accent}`}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

export default Widget;
