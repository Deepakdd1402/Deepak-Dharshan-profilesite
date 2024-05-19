import Head from 'next/head';
import TechLogo from '../components/TechLogo';

function Skills() {
  return (
    <div>
      <Head>
        <title>Deepak Dharshan | My Skills</title>
      </Head>
      <main className="flex-1 p-4" style={{ paddingTop: '5rem' }}>
        <div className="max-w-4xl mx-auto ">
          <p className="sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 text-white text-center">
            My Skills
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-1xl text-white">
            Here, you&apos;ll find a comprehensive and ever-growing list of the
            technologies I&apos;ve worked with and used in my projects and my
            professional work. My experience spans across various domains,
            whether it&apos;s front-end, databases, & SAAS
            .
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-3 bg-blue-100 rounded-lg p-4">
            <TechLogo
              href="https://git-scm.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png"
              alt="Git"
            />
            <TechLogo
              href="https://python.org"
              src="https://seeklogo.com/images/P/python-logo-C50EED1930-seeklogo.com.png"
              alt="Python"
            />
            <TechLogo
              href="https://en.wikipedia.org/wiki/C%2B%2B"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/120px-ISO_C%2B%2B_Logo.svg.png"
              alt="C++"
            />
            <TechLogo
              href="https://en.wikipedia.org/wiki/C_(programming_language)"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/The_C_Programming_Language_logo.svg/100px-The_C_Programming_Language_logo.svg.png"
              alt="C"
            />
            <TechLogo
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png"
              alt="JavaScript"
            />
            <TechLogo
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/120px-HTML5_logo_and_wordmark.svg.png"
              alt="HTML"
            />
            <TechLogo
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/600px-CSS3_logo_and_wordmark.svg.png"
              alt="CSS"
            />
            {/* GitHub */}
            <TechLogo
              href="https://www.github.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
              alt="GitHub"
            />
            {/* GitLab */}
            <TechLogo
              href="https://www.gitlab.com/"
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/144_Gitlab_logo_logos-512.png"
              alt="GitLab"
            />
            <TechLogo
              href="https://en.wikipedia.org/wiki/Microsoft_Excel"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/120px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
              alt="Microsoft Excel"
            />
            <TechLogo
              href="https://en.wikipedia.org/wiki/Microsoft_Power_BI"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Power_BI_logo.svg/70px-Power_BI_logo.svg.png"
              alt="Microsoft Power BI"
            />
            <TechLogo
              href="https://react.dev/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
              alt="React"
            />
            <TechLogo
              href="https://nextjs.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/394px-Nextjs-logo.svg.png"
              alt="Next.js"
            />
            <TechLogo
              href="https://tailwindcss.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/2560px-Tailwind_CSS_logo.svg.png"
              alt="Tailwind CSS"
            />
            {/* docker */}
            <TechLogo
              href="https://www.docker.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/2560px-Docker_%28container_engine%29_logo.svg.png"
              alt="Docker"
            />
            <TechLogo
              href="https://www.fly.io/"
              src="https://1526789230-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FYrzxpMpCQh51K4O99y0o%2Fuploads%2FMoSiK0dG5BrFfBpZ3DkK%2Fflyio-logo.png?alt=media&token=25528521-92c7-43b7-95f2-895fe0c52d53"
              alt="Fly.io"
            />

            <TechLogo
              href="https://heroku.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/2560px-Heroku_logo.svg.png"
              alt="Heroku"
            />
            <TechLogo
              href="https://www.google.com/cloud/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1280px-Google_Cloud_logo.svg.png"
              alt="Google Cloud Platform"
            />
            <TechLogo
              href="https://azure.microsoft.com/en-us/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/2560px-Microsoft_Azure_Logo.svg.png"
              alt="Microsoft Azure"
            />
            <TechLogo
              href="https://matlab.mathworks.com/"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/800px-Matlab_Logo.png"
              alt="MATLAB"
            />
            <TechLogo
              href="https://www.lua.org/"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg"
              alt="Lua"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Skills;
