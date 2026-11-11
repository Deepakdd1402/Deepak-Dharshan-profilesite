/** Single source of truth for everything taken from Deepak's resume. */

export interface Highlight {
  title: string;
  text: string;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  period: string;
  current?: boolean;
  tags: string[];
  summary: string;
  highlights: Highlight[];
}

export const OBJECTIVE =
  'Results-driven CRM Specialist with expertise in GoHighLevel (GHL), CRM implementation, administration, workflow automation, system integration, and process optimization. Skilled in CRM customization, automated workflows, dashboards, reporting, and third-party integrations, with a strong focus on reducing manual workload and improving operational efficiency. Driven to leverage CRM and automation expertise to build scalable processes, enhance customer engagement, and deliver effective technology-driven business solutions.';

export const ROLES: Role[] = [
  {
    id: 'park',
    company: 'Park Intelli Solutions',
    title: 'CRM Specialist – GHL',
    period: 'Nov 2025 – Present',
    current: true,
    tags: ['GoHighLevel', 'Workflow Automation', 'Integrations', 'Dashboards'],
    summary: 'CRM implementation, automation and integration on GoHighLevel.',
    highlights: [
      {
        title: 'CRM Implementation & Integration',
        text: 'Lead the configuration, implementation and integration of GoHighLevel (GHL) CRM, connecting it to business processes and third-party platforms.',
      },
      {
        title: 'Workflow Automation & Process Optimization',
        text: 'Designed and implemented automated workflows, triggers and processes that cut manual workload and streamline repetitive operations.',
      },
      {
        title: 'CRM Customization & Administration',
        text: 'Customized fields, pipelines, workflows, user roles and system configuration to match business and operational requirements.',
      },
      {
        title: 'Dashboard & Reporting',
        text: 'Built dashboards and custom reports with actionable insight into sales, marketing, customer engagement and operational performance.',
      },
      {
        title: 'Reminder & Notification Automation',
        text: 'Configured automated reminders, alerts, follow-ups and task assignments to support lead nurturing, customer journeys and timely execution.',
      },
      {
        title: 'Troubleshooting & User Support',
        text: 'Provide ongoing CRM support, resolve system and workflow issues, and help users with functionality, process adoption and optimization.',
      },
      {
        title: 'Integration & Data Flow Management',
        text: 'Work with CRM integrations and third-party tools to keep data flowing efficiently and support end-to-end business processes.',
      },
    ],
  },
  {
    id: 'wildcraft-analyst',
    company: 'Wildcraft India',
    title: 'Business & CRM Analyst',
    period: 'Sep 2022 – Present',
    current: true,
    tags: ['CRM Administration', 'Business Intelligence', 'Campaigns', 'Automation'],
    summary: 'CRM administration, reporting and marketplace growth across B2B, B2C and Corporate.',
    highlights: [
      {
        title: 'CRM Administration & Optimization',
        text: 'Configure, maintain and enhance CRM platforms to improve operational efficiency and customer engagement.',
      },
      {
        title: 'Business Intelligence & Reporting',
        text: 'Develop data-driven insights through ad-hoc and automated reporting that support decision-making and strategy refinement.',
      },
      {
        title: 'Marketing Campaign Execution',
        text: 'Work with marketing teams to design, execute and analyze targeted campaigns, using CRM insights for segmentation and performance tracking.',
      },
      {
        title: 'Marketplace Growth Strategy',
        text: 'Analyze marketplace trends and customer behavior to drive growth initiatives, optimize product positioning and enhance revenue streams.',
      },
      {
        title: 'Process Automation & Integration',
        text: 'Streamline operations by automating workflows and integrating the CRM with third-party tools for seamless data flow.',
      },
      {
        title: 'Stakeholder Collaboration & Support',
        text: 'Work across sales, marketing and operations teams to align CRM capabilities, improve user adoption and enhance the user experience.',
      },
    ],
  },
  {
    id: 'wildcraft-intern',
    company: 'Wildcraft India',
    title: 'CRM Administrator & Development Intern',
    period: 'Mar 2022 – Sep 2022',
    tags: ['CRM Configuration', 'User Training', 'Workflows'],
    summary: 'Hands-on CRM set-up, support and training.',
    highlights: [
      {
        title: 'CRM Configuration & Customization',
        text: 'Assisted in setting up workflows, custom fields and dashboards to align CRM functionality with business requirements.',
      },
      {
        title: 'User Support & Training',
        text: 'Provided troubleshooting support, created user guides and ran training sessions to improve CRM adoption and efficiency.',
      },
      {
        title: 'System Performance & Enhancements',
        text: 'Monitored CRM performance, assisted with system updates and supported the rollout of new features.',
      },
      {
        title: 'Process Automation & Workflow Optimization',
        text: 'Automated routine tasks, set up workflows and configured triggers to improve efficiency.',
      },
    ],
  },
];

export interface Stage {
  id: string;
  label: string;
  when: string;
  org: string;
  detail: string;
  current?: boolean;
}

/** Career "Path" (Salesforce-style chevrons) on the home page. */
export const PATH: Stage[] = [
  {
    id: 'be',
    label: 'B.E. Mechatronics',
    when: '2018 – 2022',
    org: 'Dr. Mahalingam College of Engineering and Technology',
    detail: 'Bachelor of Engineering in Mechatronics Engineering, GPA 8.6.',
  },
  {
    id: 'intern',
    label: 'CRM Intern',
    when: 'Mar 2022',
    org: 'Wildcraft India',
    detail:
      'CRM Administrator & Development Intern: workflows, custom fields, dashboards, user guides and training.',
  },
  {
    id: 'analyst',
    label: 'Business & CRM Analyst',
    when: 'Sep 2022',
    org: 'Wildcraft India',
    detail:
      'CRM administration, BI reporting, campaign execution and marketplace growth strategy.',
  },
  {
    id: 'mba',
    label: 'MBA · Tech Mgmt',
    when: '2022 – 2024',
    org: 'Madras Institute of Technology',
    detail:
      'Master of Business Administration in Technology Management, GPA 8.2. Threads: SaaS & Business Technology.',
  },
  {
    id: 'ghl',
    label: 'CRM Specialist · GHL',
    when: 'Nov 2025',
    org: 'Park Intelli Solutions',
    detail:
      'GoHighLevel implementation, workflow automation, integrations, dashboards and user support.',
    current: true,
  },
];

export const CRM_PLATFORMS = ['GoHighLevel (GHL)', 'HubSpot', 'Zoho', 'SFDC', 'OCA'];

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/education', label: 'Education' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
] as const;

export const LINKS = {
  github: 'https://github.com/Deepakdd1402',
  linkedin: 'https://www.linkedin.com/in/deepak-dharshan-278b48199',
  email: 'deepakdharshan22@gmail.com',
};
