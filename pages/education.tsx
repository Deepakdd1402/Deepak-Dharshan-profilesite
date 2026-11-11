import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiExternalLink, FiMapPin } from 'react-icons/fi';
import { FaCertificate, FaChartBar, FaCloud } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import PageHeader from '../components/PageHeader';

interface Edu {
  school: string;
  sub: string;
  dates: string;
  credential: string;
  gpa: string;
  location?: string;
  note?: string;
  links: { url: string; text: string }[];
}

const EDU: Edu[] = [
  {
    school: 'Madras Institute of Technology',
    sub: 'College of Technology & Management',
    dates: 'Sep 2022 – Sep 2024',
    credential: 'Master of Business Administration – Technology Management',
    gpa: '8.2',
    note: 'Threads: SaaS & Business Technology',
    links: [
      { url: 'https://www.annauniv.edu/', text: 'University website' },
      { url: 'https://www.mitindia.edu/', text: 'College website' },
    ],
  },
  {
    school: 'Dr. Mahalingam College of Engineering and Technology',
    sub: 'College of Engineering & Technology',
    dates: 'Jun 2018 – May 2022',
    credential: 'Bachelor of Engineering – Mechatronics Engineering',
    gpa: '8.6',
    location: 'Pollachi, Coimbatore',
    links: [{ url: 'https://drmcet.ac.in/', text: 'College website' }],
  },
  {
    school: 'Vidya Nethrra Matric Higher Secondary School',
    sub: 'High School',
    dates: 'Jun 2016 – May 2018',
    credential: 'High School',
    gpa: '7.2',
    location: 'Pollachi, Coimbatore',
    links: [{ url: 'https://cbse.vidyanethrra.com/', text: 'School website' }],
  },
];

const CERTS: { title: string; issuer: string; icon: IconType; tone: string }[] = [
  { title: 'Professional Diploma in CRM Platforms Management', issuer: 'Udemy', icon: FaCertificate, tone: 'from-[#1B96FF] to-[#0B5CAB]' },
  { title: 'Data Analytics Using Power BI', issuer: 'TechTip24', icon: FaChartBar, tone: 'from-[#F8C531] to-[#DD7A01]' },
  { title: 'Oracle Cloud Essentials – Cloud Applications', issuer: 'Oracle University', icon: FaCloud, tone: 'from-[#F0643E] to-[#BA0517]' },
];

function Education() {
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Education</title>
      </Head>
      <PageHeader icon={FiBookOpen} eyebrow="Academic record" title="Education" />

      <div className="grid gap-4 md:grid-cols-3">
        {EDU.map((e, i) => (
          <motion.article
            key={e.school}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-[22px] border border-sf-g5 bg-white p-5 shadow-widget"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">{e.dates}</span>
              <span className="rounded-full bg-sf-success/10 px-2.5 py-1 text-xs font-semibold text-sf-success">GPA {e.gpa}</span>
            </div>
            <h2 className="mt-3 text-base font-semibold leading-snug text-sf-ink">{e.school}</h2>
            <p className="text-xs text-sf-weak">{e.sub}</p>
            <p className="mt-3 text-sm font-medium text-brand-600">{e.credential}</p>
            {e.note && <p className="mt-1 text-xs text-sf-weak">{e.note}</p>}
            {e.location && (
              <p className="mt-2 flex items-center gap-1 text-xs text-sf-weak">
                <FiMapPin size={11} /> {e.location}
              </p>
            )}
            <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4">
              {e.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-brand-500 hover:underline">
                  {l.text} <FiExternalLink size={11} />
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <h2 className="mb-3 mt-8 flex items-center gap-2 text-sm font-semibold text-sf-ink">
        <FiAward className="text-brand-500" /> Courses &amp; certifications
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {CERTS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-[22px] border border-sf-g5 bg-white p-4 shadow-widget"
            >
              {/* Trailhead-style hex badge */}
              <span
                className={`flex h-16 w-14 shrink-0 items-center justify-center bg-gradient-to-br text-white ${c.tone}`}
                style={{ clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }}
              >
                <Icon size={22} />
              </span>
              <div>
                <h3 className="text-sm font-semibold leading-snug text-sf-ink">{c.title}</h3>
                <p className="mt-1 text-xs text-sf-weak">{c.issuer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Education;
