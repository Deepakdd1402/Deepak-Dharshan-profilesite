import Head from 'next/head';
import ExperienceCard from '../components/ExperienceCard';

function Experience() {
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Work Experience</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Work Experience
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2">
            Here, you&apos;ll find a list of positions & roles
            I&apos;ve held, the companies I&apos;ve worked for, the projects
            that I worked on, some of the responsibilities I had, and what I
            learned.
          </p>
          <ExperienceCard
            companyName="Wildcraft India"
            subCompanyDescription="Reward & Loyalty"
            dateRange="September 2022 - Current"
            jobTitle="Catalogue Business Operations"
            logoUrl="https://wildcraft.com/logo-vum.png"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                Driving business growth through exceptional customer experiences.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                With an extensive background in CRM software and a deep understanding of SAAS products and technologies, 
                I've had the privilege of working with diverse partners across Rewards Fulfillment, Channel Loyalty, Consumer Loyalty,
                and Employee Recognition. Whether in B2B or B2C domains, my focus has always been on elevating customer engagement and satisfaction.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                y expertise lies in optimizing and maximizing the potential of loyalty programs to foster lasting relationships and drive brand advocacy. I thrive on leveraging technology to create innovative solutions that empower businesses and elevate customer loyalty to new heights.
                </p>

                <p>
                  <strong>
                  This experience highlighted my effective leadership, collaborative teamwork, ability to quickly grasp new concepts, and innovative problem-solving skills.
                  </strong>
                </p>
              </div>
            }
            links={[
              {
                url: 'https://wildcraft.com/who-we-are/',
                displayText: 'Company Website',
              },
            ]}
          />
          <ExperienceCard
            companyName="Wildcraft India"
            subCompanyDescription="CRM Soultion Development"
            dateRange="March 2022 - August 2022"
            jobTitle="CRM Administration & Development Intern"
            logoUrl="https://wildcraft.com/logo-vum.png"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                During my tenure as a CRM Administration & Development intern, I actively managed the sales and operational CRM system, contributing significantly to business expansion.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                My responsibilities included configuring and integrating the CRM solution to align with the specific needs and requirements of the sales channel, thereby playing a pivotal role in enhancing organizational efficiency and effectiveness.
                </p>

                <p>
                  I am proud to have contributed to the development of {' '}
                  <a
                    href="https://wildcraft.kapturecrm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Bangalore
                  </a>
                  {'. '}
                  <strong>
                    This experience not only honed my technical skills but also
                    reinforced my passion and its
                    potential to create impactful and innovate solutions in the
                    field.
                  </strong>
                </p>
              </div>
            }
            links={[
              {
                url: 'wildcraft.kapturecrm.com',
                displayText: 'Company Website',
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}

export default Experience;
