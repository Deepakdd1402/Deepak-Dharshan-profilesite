import './globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import { useRouter, NextRouter } from 'next/router';
import Head from 'next/head';
import StarBackground from '../components/StarBackground';
import Layout from '../components/RootLayout';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  return (
    <main className={inter.className}>
      <StarBackground />
      <AnimatePresence mode="wait">
        <div key={router.pathname} className="font-inter">
          <Head>
            <meta charSet="utf-8" />
            <title>Deepak Dharshan | CRM Business Analyst </title>
            <meta
              name="description"
              content="Personalized Portfolio Highlighting the Proficiency, Expertise, and Achievements of a skilled CRM Business Analyst within the realms of Ethical Business Practices and Technology."
            />
            <meta
              name="keywords"
              content="Deepak Dharshan, Personalized Portfolio Highlighting the Proficiency, Expertise, and Achievements of a skilled CRM Business Analyst within the realms of Ethical Business Practices and Technology."
            />
            <meta name="author" content="Kevin Kwan" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              property="og:title"
              content="Kevin Kwan | Software Engineering Portfolio"
            />
            <meta
              property="og:description"
              content="Personalized Portfolio Highlighting the Proficiency, Expertise, and Achievements of a skilled CRM Business Analyst within the realms of Ethical Business Practices and Technology."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="/logo.png" />
            <meta property="og:image:width" content="448" />
            <meta property="og:image:height" content="448" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </AnimatePresence>
    </main>
  );
}

export default App;
