import Head from 'next/head';
import EducationCard from '../components/EducationCard';

function Education() {
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | My Education</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Education
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white mb-2 text-center">
            Here, you&apos;ll find a list of my educational experiences,
            associations, activities/societies, and awards/achievements.
          </p>
          <EducationCard
            schoolName="Madras Institute of Technology"
            subschoolDescription="College of Technology & Management"
            dateRange="September 2022 - Expected September 2024"
            credential="Master of Business Administration - Technology Management"
            logoUrl="https://www.mitindia.edu/templates/ja_university_t3/images/logo.png"
            links={[
              {
                url: 'https://www.annauniv.edu/',
                displayText: 'University Website',
              },
              {
                url: 'https://www.mitindia.edu/',
                displayText: 'College Website',
              },
            ]}
            eduDescription={
              <p>
                <b>Threads:</b> SAAS & Business Technology 
              </p>
            }
            gpa="8.2"
          />
          <EducationCard
            schoolName="Dr.Mahalingam College of Engineering and Technology"
            subschoolDescription="College of Engineering & Technology"
            dateRange="June 2018 - May 2022"
            credential="Bachelor of Enigneering - Mechatronics Engineering"
            location="Pollachi, Coimbatore"
            logoUrl="https://drmcet.ac.in/wp-content/themes/mcet/img/logo.jpg"
            links={[
              {
                url: 'https://drmcet.ac.in/',
                displayText: 'College Website',
              },
            ]}
            gpa="8.6"
          />
          <EducationCard
            schoolName="VIDYA NETHRRA MATRIC HIGHER SECONDARY SCHOOL"
            subschoolDescription="High School"
            dateRange="June 2016 - May 2018"
            credential="High School"
            location="Pollachi, Coimbatore"
            logoUrl="https://cbse.vidyanethrra.com/wp-content/uploads/2021/08/cropped-Vidya-Nethra-Logo1-192x192.png"
            links={[
              {
                url: 'https://cbse.vidyanethrra.com/',
                displayText: 'School Website',
              },
            ]}
            gpa="7.2"
          />
        </div>
      </main>
    </div>
  );
}

export default Education;
