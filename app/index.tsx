// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // On attend le montage complet du layout
    const timeout = setTimeout(() => {
      router.replace('/ConnexionScreen');
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null; // écran vide pendant la redirection
}
