import React from 'react';
import Link from 'next/link';
import { FiCompass } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-[22px] border border-sf-g5 bg-white p-8 text-center shadow-widget">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
          <FiCompass size={26} />
        </span>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-sf-ink">404</h1>
        <p className="mt-2 text-sm text-sf-weak">
          This record doesn&apos;t exist. You may have followed a broken link or
          typed a URL that isn&apos;t part of this site.
        </p>
        <Link href="/" className="mt-5 inline-block rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
