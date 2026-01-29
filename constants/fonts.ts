import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  return useFonts({
    Caladea: require('../assets/fonts/Caladea-Regular.ttf'),
  });
};
