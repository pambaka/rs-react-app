'use client';

import FallbackUi from '@/components/fallback-ui';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <FallbackUi />
      </body>
    </html>
  );
}
