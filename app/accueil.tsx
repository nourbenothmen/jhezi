import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // <-- import useRouter

export default function Accueil() {
  const router = useRouter(); // <-- hook router

  return (
    <View style={styles.container}>

      {/* Card Prestataire */}
      <LinearGradient
        colors={['#fde1ef', '#f7c7e1']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <Image
          source={require('../assets/images/prestataire.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.prestataireText}>Prestataire</Text>
      </LinearGradient>

      {/* Card Future mariée */}
      <TouchableOpacity
        onPress={() => router.push('/Mariee/authentification/Login')} // <-- navigation vers Login
      >
        <LinearGradient
          colors={['#fbe8ff', '#e9d1ff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.card}
        >
          <Image
            source={require('../assets/images/future-mariee.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Future mariée</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff', // ton background corrigé
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 260,
    height: 260,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,

    // Border
    borderWidth: 1,
    borderColor: 'rgba(185, 111, 162, 0.25)',

    // Shadow pour iOS
    shadowColor: 'rgba(185, 111, 162, 0.18)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 26,

    // Shadow pour Android
    elevation: 10,
  },

  image: {
    width: '70%',
    height: '70%',
  },

  cardText: {
    marginTop: 10, // espace entre image et texte
    textDecorationLine: 'none',
    fontWeight: '800',
    fontSize: 16, // 1rem
    color: '#6e3a8b',
    textAlign: 'center', // pour centrer le texte sous l'image
  },
  prestataireText: {
    marginTop: 10,
    textDecorationLine: 'none',
    fontWeight: '800',
    fontSize: 16,
    color: '#8b3a6a', // Prestataire
    textAlign: 'center',
  },
});
