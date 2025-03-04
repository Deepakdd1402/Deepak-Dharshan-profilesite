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
            subCompanyDescription="Business Analyst - B2B, B2C, Corporate"
            dateRange="September 2022 - Current"
            jobTitle="Business & CRM Analyst "
            logoUrl="https://wildcraft.com/logo-vum.png"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                Driving business growth through exceptional business analyst experience.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                Experienced in monitoring and evaluating the effectiveness of business strategies and operational processes. 
                Skilled in creating regular and ad-hoc reports that deliver actionable insights to stakeholders, enhancing overall business performance.
                Proficient in formulating and implementing data-driven strategies to inform decision-making.
                Adept at overseeing the configuration, maintenance, and continuous improvement of CRM platforms, while also supporting development projects through requirement gathering, feature testing, and constructive feedback.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                My expertise lies in optimizing and maximizing the potential of loyalty programs to foster lasting relationships and drive brand advocacy. I thrive on leveraging business analysis to create innovative solutions that empower businesses and elevate customer loyalty to new heights.
                </p>

                <p>
                  <strong>
                  This experience highlighted my effective leadership, collaborative teamwork, ability to quickly grasp new concepts, and problem-solving skills.
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
            subCompanyDescription="CRM Solution Development"
            dateRange="March 2022 - August 2022"
            jobTitle="CRM Administration & Development Intern"
            logoUrl="https://wildcraft.com/logo-vum.png"
            jobDescription={
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                During my tenure as a CRM Administration & Development intern, I actively managed the sales and operational CRM system, contributing significantly to business expansion.
                </p>

                <p style={{ marginBottom: '0.5rem' }}>
                Proficient in configuring and customizing CRM systems to align with specific business needs, including the setup of workflows, custom fields, and dashboards.
                Experienced in providing user support by troubleshooting issues, addressing queries, and creating user guides and training materials to enhance user engagement with the CRM system. Skilled in monitoring system performance, implementing regular updates and upgrades, and introducing new features and functionalities.
                Focused on improving operational efficiency by automating routine tasks and processes within the CRM, including the establishment of automated workflows and triggers.
                </p>

                <p>
                  I am proud to have contributed to the development & Implementation of CRM in our channel
                  <a
                    href="https://wildcraft.kapturecrm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    
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
