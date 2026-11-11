import { Mascot } from 'page-mascot';
import { useRouter } from 'next/router';

/**
 * Deepak's cursor-tracking mascot (page-mascot). The sheets live in
 * public/mascots; basePath keeps them working on a GitHub Pages sub-path.
 */
function SiteMascot({ size = 48, className }: { size?: number; className?: string }) {
  const { basePath } = useRouter();
  return (
    <Mascot
      directions={`${basePath}/mascots/deepak-directions.webp`}
      reactions={`${basePath}/mascots/deepak-reactions.webp`}
      size={size}
      label="Deepak"
      className={className}
    />
  );
}

export default SiteMascot;
