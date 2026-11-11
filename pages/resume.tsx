import React, { useEffect } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import { FiDownload, FiFileText } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

declare global {
  interface Window {
    AdobeDC: any;
    adobe_dc_sdk: any;
    adobe_dc_view_sdk: any;
  }
}
interface ResumeProps {
  adobeClientId: string;
}

function Resume({ adobeClientId }: ResumeProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 846px)' });
  useEffect(() => {
    function initializeAdobeDCView() {
      var adobeDCView = new window.AdobeDC.View({
        clientId: adobeClientId,
        divId: 'adobe-dc-view',
      });
      adobeDCView.previewFile(
        {
          content: {
            location: {
              url: process.env.NEXT_PUBLIC_RESUME_LINK,
            },
          },
          metaData: { fileName: 'Deepak_Dharshan_CV.pdf' },
        },
        {
          embedMode: 'FULL_WINDOW',
          defaultViewMode: 'FIT_WIDTH',
          showFullScreen: true,
          showAnnotationTools: false,
          showZoomControl: true,
          focusOnRendering: true,
          showDownloadPDF: true,
        }
      );
    }

    function loadViewerScript() {
      if (window.AdobeDC?.View) {
        setTimeout(initializeAdobeDCView, 100); // Delay the call to ensure the SDK is loaded
      } else {
        var viewerScript = document.createElement('script');
        viewerScript.src =
          'https://acrobatservices.adobe.com/view-sdk/viewer.js';
        viewerScript.onload = function () {
          setTimeout(initializeAdobeDCView, 100); // Delay the call to ensure the SDK is loaded
        };
        document.body.appendChild(viewerScript);
      }
    }

    loadViewerScript();

    return () => {
      window.AdobeDC = undefined;
      window.adobe_dc_sdk = undefined;
      window.adobe_dc_view_sdk = undefined;
    };
  }, [adobeClientId]);

  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Resume</title>
      </Head>
      <PageHeader icon={FiFileText} eyebrow="Document" title="Resume">
        <a
          href="Deepak_Dharshan_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          <FiDownload size={14} /> Download PDF
        </a>
      </PageHeader>
      <div className="overflow-hidden rounded-[22px] border border-sf-g5 bg-white p-2 shadow-widget">
        {isMobile ? (
          <p className="p-6 text-center text-sm text-sf-weak">
            You are on a mobile device. For the best experience, please use the
            Download PDF button above to view the resume.
          </p>
        ) : (
          <>
            <p className="px-3 py-2 text-xs text-sf-weak">
              Trouble viewing the PDF?{' '}
              <a href="Deepak_Dharshan_CV.pdf" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-500 underline">
                Open or download it directly
              </a>
              .
            </p>
            <div id="adobe-dc-view" className="mx-auto h-[78vh] max-w-5xl" />
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const adobeClientId = process.env.ADOBE_CLIENT_ID ?? null;

  return {
    props: {
      adobeClientId,
    },
    // revalidate: 300,
  };
}

export default Resume;
// export const runtime = 'experimental-edge';
