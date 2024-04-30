import Head from 'next/head';
import ProjectCard from '../components/ProjectCard';
import { FaHackerrank } from 'react-icons/fa';

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
function Projects({ descriptions }: ProjectsProps) {
  // const isLoading = Object.values(descriptions).includes(loadingMessage);
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | My Projects</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <p className="text-3xl font-bold mb-2 text-center text-blue-200 underline pt-4">
          Completed Projects
        </p>
        <div className="flex flex-wrap justify-center -mx-2 bg-blue-300 bg-opacity-30 rounded">
          <ProjectCard
            name="Simulation Study of Footstep Power Generation"
            description="Project description."
          />
          <ProjectCard
            name="Autonomous Vehicle Modeling"
            description={
              descriptions['Project Description'] || loadingMessage
            }
            githubLink="https://github.com/Deepakdd1402/Autonomous-Vehicle-Modeling"
          />
          <ProjectCard
            name="Responsive Photo Gallery Website"
            description={
              descriptions['Project Description'] || loadingMessage
            }
            githubLink="https://deepakdd1402.github.io/Responsive-Photo-Gallery-Website/"
          />
          <ProjectCard
            name="Responsive Photo Gallery Website"
            description={
              descriptions['Project Description'] || loadingMessage
            }
            githubLink="https://deepakdd1402.github.io/Responsive-Photo-Gallery-Website/"
          /> 
        </div>
        
      </main>
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
