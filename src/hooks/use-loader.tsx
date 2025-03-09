import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });

    return () => {
      router.events.off('routeChangeStart', () => {});
      router.events.off('routeChangeComplete', () => {});
      router.events.off('routeChangeError', () => {});
    };
  }, [router.events]);

  return [isLoading, setIsLoading];
};

export default useLoader;
