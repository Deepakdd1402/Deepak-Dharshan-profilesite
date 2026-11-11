import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiBriefcase, FiDownload, FiLayers, FiTrendingUp } from 'react-icons/fi';
import SiteMascot from '../components/SiteMascot';
import TypingText from '../components/TypingText';
import StatCounter from '../components/StatCounter';
import Widget from '../components/Widget';
import { CalendarWidget, CareerPath, ClockWidget } from '../components/HomeWidgets';
import { CRM_PLATFORMS } from '../lib/portfolio';

const ROLES = [
  'CRM Specialist',
  'Business & CRM Analyst',
  'GoHighLevel Expert',
  'Workflow Automation Builder',
];

function Home() {
  const { basePath } = useRouter();
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | CRM Specialist & Business Analyst</title>
      </Head>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[22px] border border-sf-g5 bg-white p-6 shadow-widget lg:col-span-6"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-50" />
          <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="rounded-full bg-gradient-to-b from-brand-50 to-brand-100 p-1">
              <SiteMascot size={132} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                Hello, I&apos;m
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-sf-ink sm:text-4xl">
                Deepak Dharshan
              </h1>
              <p className="mt-1 h-7 text-lg font-medium text-brand-500">
                <TypingText words={ROLES} />
              </p>
              <p className="mt-2 max-w-md text-sm text-sf-weak">
                I build scalable CRM processes with GoHighLevel, HubSpot, Zoho and
                Salesforce, turning manual work into automated workflows, dashboards
                and integrations that improve customer engagement.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/experience" className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600">
                  View experience
                </Link>
                <a href={`${basePath}/Deepak_Dharshan_CV.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-sf-g5 bg-white px-4 py-2 text-sm font-medium text-brand-500 transition-colors hover:bg-brand-50">
                  <FiDownload size={14} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* clock + calendar widgets */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
          <ClockWidget />
          <CalendarWidget />
        </div>

        {/* second widget row */}
        <Widget title="At a glance" icon={FiTrendingUp} className="lg:col-span-4">
          <div className="grid grid-cols-3 gap-2">
            <StatCounter value={4} suffix="+" label="Years in CRM" />
            <StatCounter value={2} label="Organisations" />
            <StatCounter value={5} label="CRM platforms" />
          </div>
        </Widget>

        <Widget title="Now" icon={FiBriefcase} accent="text-sf-success" className="lg:col-span-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-sf-ink">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sf-success" />
            Park Intelli Solutions
          </p>
          <p className="text-sm text-sf-weak">CRM Specialist · GoHighLevel · since Nov 2025</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-sf-ink">
            <span className="h-2 w-2 rounded-full bg-brand-400" />
            Wildcraft India
          </p>
          <p className="text-sm text-sf-weak">Business &amp; CRM Analyst · since Sep 2022</p>
        </Widget>

        <Widget title="CRM stack" icon={FiLayers} className="lg:col-span-4">
          <div className="flex flex-wrap gap-1.5">
            {CRM_PLATFORMS.map((c, i) => (
              <motion.span
                key={c}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  i === 0 ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600'
                }`}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <Link href="/skills" className="mt-3 inline-block text-xs font-medium text-brand-500 hover:underline">
            Open the skills explorer →
          </Link>
        </Widget>

        <div className="min-w-0 lg:col-span-12">
          <CareerPath />
        </div>
      </div>
    </div>
  );
}

export default Home;
