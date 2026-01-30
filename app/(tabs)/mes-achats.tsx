import React, { useState, useEffect ,useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

// Date du mariage (change-la par la vraie date)
const WEDDING_DATE = new Date('2026-11-19T00:00:00');

export default function MesAchats() {


const fadeAnim = useRef(new Animated.Value(0)).current;
const scaleAnim = useRef(new Animated.Value(0.9)).current;

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }),
  ]).start();
}, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Calcul du temps restant
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Carte header – Mariés + Compteur + Dropdown */}
      <ImageBackground
        source={require('../../assets/images/wedding-bg.jpg')} // ← mets ton image ici
        style={styles.headerCard}
        imageStyle={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
      >
        {/* Overlay sombre pour lisibilité */}
        <View style={styles.overlay} />

        {/* Contenu centré */}
        <View style={styles.headerContent}>
          <Text style={styles.heartIcon}>♥</Text>
          <Text style={styles.coupleNames}>Nour & Cristiano</Text>
          <Animated.Text
  style={[
    styles.weddingDate,
    {
      opacity: fadeAnim,
      transform: [{ scale: scaleAnim }],
    },
  ]}
>
  19 Novembre 2026
</Animated.Text>

          {/* Compteur */}
          <View style={styles.countdownContainer}>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timeLeft.days}</Text>
              <Text style={styles.countdownLabel}>jours</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timeLeft.hours.toString().padStart(2, '0')}</Text>
              <Text style={styles.countdownLabel}>heures</Text>
            </View>
            <Text style={styles.countdownColon}>:</Text>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</Text>
              <Text style={styles.countdownLabel}>min</Text>
            </View>
            <Text style={styles.countdownColon}>:</Text>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</Text>
              <Text style={styles.countdownLabel}>s</Text>
            </View>
          </View>
        </View>

        {/* Bouton dropdown en haut à droite */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}
        >
          <MaterialCommunityIcons name="chevron-down" size={28} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      {/* Dropdown menu */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.dropdownOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                alert('Modifier le mariage');
                setDropdownVisible(false);
              }}
            >
              <MaterialCommunityIcons name="pencil" size={20} color="#333" />
              <Text style={styles.dropdownText}>Modifier</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                alert('Partager le lien');
                setDropdownVisible(false);
              }}
            >
              <MaterialCommunityIcons name="share-variant" size={20} color="#333" />
              <Text style={styles.dropdownText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Ici tu mets le vrai contenu de Mes Achats */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Mes achats</Text>
        {/* Ajoute ta liste d'achats, panier, etc. ici */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  headerCard: {
    height: 300,
    width: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  heartIcon: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 12,
  },

  coupleNames: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  weddingDate: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 32,
  },

  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  countdownItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },

  countdownNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },

  countdownLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.85,
    marginTop: 4,
  },

  countdownColon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 4,
  },

  dropdownButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  dropdownMenu: {
    marginTop: 80,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  dropdownText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
});