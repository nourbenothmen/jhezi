import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  headerShown: false,
};
export default function Connexion() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/bride.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
     <TouchableOpacity
  style={styles.button}
  onPress={() => router.replace('/accueil')}
>
  <Text style={styles.buttonText}>Connexion</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E0EE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: { width: 200, height: 200, marginBottom: 40 },
  button: {
    backgroundColor: '#D367BB',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
