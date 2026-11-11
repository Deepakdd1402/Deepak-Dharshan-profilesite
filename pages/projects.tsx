import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiFolder, FiGithub, FiGlobe } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

// const github_pat = process.env.GITHUB_PAT;

const loadingMessage =
  'Failed to fetch GitHub Repository description. Please try again later.';
// const projectsWithDescriptions = [''];

async function getRepoDescription(githubRepoUrl: string) {
  const [, owner, repo] = new URL(githubRepoUrl).pathname.split('/');
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${github_pat}`,
      //   },
      // }
    );
    const data = await response.json();
    return data.description || loadingMessage;
  } catch (error) {
    console.error(`Error: ${error}`);
    return 'Error: Could not fetch GitHub Repository description. Please try again later.';
  }
}

// Add your GitHub Repository names here to fetch descriptions from GitHub API
const projectsWithDescriptions = [
  'CutieBot',
  'portfolio',
  'leetcode',
  'Lets-Surf',
  'eduNFT',
  'Triggering-Insanity',
  'Noneuclidean-World',
  'WindowsXPWebsite',
  'Evade-And-Deceive',
  'fixed_pytorch_mpiigaze_demo',
  'Dark-Ascent',
  'hackerrank',
  'Arkanoid',
  'Unity3D-FishingRodMotion',
  'GlimpseShare',
  'UCLA-CS31-Project-2-Winter-2024',
  'Autonomous-Vehicle-Modeling',
  'Responsive-Photo-Gallery-Website',
  
];

// function LoadingCard() {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
//     </div>
//   );
// }
interface ProjectsProps {
  descriptions: { [key: string]: string };
}
interface ProjectItem {
  name: string;
  repo?: string;
  description?: string;
  githubLink?: string;
  demoLink?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    name: 'Simulation Study of Footstep Power Generation',
    description: 'Project description.',
  },
  {
    name: 'Autonomous Vehicle Modeling',
    repo: 'Autonomous-Vehicle-Modeling',
    githubLink: 'https://github.com/Deepakdd1402/Autonomous-Vehicle-Modeling',
  },
  {
    name: 'Responsive Photo Gallery Website',
    repo: 'Responsive-Photo-Gallery-Website',
    demoLink: 'https://deepakdd1402.github.io/Responsive-Photo-Gallery-Website/',
  },
];

function Projects({ descriptions }: ProjectsProps) {
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Projects</title>
      </Head>
      <PageHeader icon={FiFolder} eyebrow="Opportunities closed" title="Completed projects" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-[22px] border border-sf-g5 bg-white p-5 shadow-widget"
          >
            <span className="w-fit rounded-full bg-sf-success/10 px-2.5 py-1 text-xs font-semibold text-sf-success">
              Completed
            </span>
            <h2 className="mt-3 text-base font-semibold leading-snug text-sf-ink">{p.name}</h2>
            <p className="mt-2 text-sm text-sf-weak">
              {p.description || (p.repo && descriptions[p.repo]) || loadingMessage}
            </p>
            <div className="mt-auto flex gap-2 pt-4">
              {p.githubLink && (
                <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-sf-g5 px-3 py-1.5 text-xs font-medium text-sf-ink transition-colors hover:bg-brand-50 hover:text-brand-500">
                  <FiGithub size={13} /> GitHub
                </a>
              )}
              {p.demoLink && (
                <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-600">
                  <FiGlobe size={13} /> Live demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const descriptions: { [key: string]: string } = {};
  console.log('Fetching descriptions...');

  // if length of descriptions is 0, then we need to fetch descriptions
  if (Object.keys(descriptions).length === 0) {
    try {
      console.log('Attempting to fetch descriptions...');
      // Fetch all descriptions in parallel
      const descriptionPromises = projectsWithDescriptions.map((project) =>
        getRepoDescription(`https://github.com/Deepakdd1402/${project}`)
          .then((description) => {
            descriptions[project] = description;
          })
          .catch((error) => {
            console.error(
              `Error fetching description for ${project}: ${error}`
            );
            descriptions[project] =
              'Error: Could not fetch GitHub Repository description. Please try again later.';
          })
      );

      await Promise.all(descriptionPromises);
      console.log('Finished fetching descriptions!');
    } catch (error) {
      console.error(`Error fetching descriptions: ${error}`);
    }
  }

  return {
    props: {
      descriptions,
    },
    // revalidate: projectsWithDescriptions.length * 60,
  };
}

export default Projects;
// Comment out this line if you are doing npm run dev
// export const runtime = 'experimental-edge';
