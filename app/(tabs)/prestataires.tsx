import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
   TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useAppFonts } from '@/constants/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

export default function Prestataires() {
   const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) return null;
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== CARD HEADER ===== */}
      <View style={styles.card}>

        <Text style={styles.title}>Prestataires de mariage</Text>

        <Text style={styles.bullet}>• Prestataires vérifiés, près de chez vous</Text>
        <Text style={styles.bullet}>• Pour tous les budgets</Text>
        <Text style={styles.bullet}>• Des idées pour un jour inoubliable</Text>

        {/* ===== SLIDER ===== */}
        <View style={styles.sliderContainer}>

          <Swiper
            autoplay
            autoplayTimeout={3}
            showsPagination
            dotStyle={styles.dash}
            activeDotStyle={styles.activeDash}
          >
            <Image
              source={require('../../assets/images/banner-default.jpg')}
              style={styles.image}
            />

            <Image
              source={require('../../assets/images/imagemariage2.jpg')}
              style={styles.image}
            />

            <Image
              source={require('../../assets/images/imagemariage3.jpg')}
              style={styles.image}
            />
          </Swiper>

          {/* TEXTE SUR IMAGE */}
          <View style={styles.textContainer}>
            <Text style={styles.titleImage}>Le Jour J</Text>
          </View>

        </View>

      </View>
      {/* ===== NOUVELLE SECTION : NOS UNIVERS DE PRESTATAIRES ===== */}
     <View style={styles.userCard}>
  <Text style={styles.UserTitle}>
    Bonjour <Text style={styles.boldName}>Nour Ben Othmen</Text>,
  </Text>

  <Text style={styles.UserTitle}>
    Qu'est ce que vous avez en train de chercher ?
  </Text>
</View>
      {/* Barre de recherche + univers prestataires */}
      <View style={styles.universContainer}>
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="robe mariage"
            placeholderTextColor="#A47350"
            autoCapitalize="none"
          />
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
        </View>

        <Text style={styles.universTitle}>Nos univers de prestataires</Text>

        {/* Grille des catégories */}
        <View style={styles.grid}>
          {/* Ligne 1 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/salle-de-fetes.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Salles de fêtes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/robe-mariage.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Robes de mariée</Text>
            </TouchableOpacity>
          </View>

          {/* Ligne 2 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/coiffeuse.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Salon beauté</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/spa.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Spa & Beauté</Text>
            </TouchableOpacity>
          </View>

          {/* Ligne 3 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/coiffeur.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Coiffeur</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <Image source={require('../../assets/images/costume-mariage.jpg')} style={styles.itemImage} />
              <Text style={styles.itemText}>Costumes de mariage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ===== SECTION : POURQUOI CHOISIR NOS PRESTATAIRES ===== */}
      <View style={styles.whyChooseContainer}>
        <Text style={styles.whyChooseTitle}>Pourquoi choisir nos prestataires ?</Text>
        <Text style={styles.whyChooseSubtitle}>
          Des garanties pour un mariage réussi
        </Text>

       <View style={styles.whyChooseCards}>
  {/* Carte 1 - Prestataires Vérifiés */}
  <View style={styles.whyCard}>
    <LinearGradient
      colors={['#A78BFA', '#EC4899']} // violet → rose (comme ton image pour l'étoile)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.iconCircle}
    >
      <MaterialCommunityIcons name="star-outline" size={36} color="#ffffff" />
    </LinearGradient>
    <Text style={styles.cardTitle}>Prestataires Vérifiés</Text>
    <Text style={styles.cardSubtitle}>Confiance & sécurité</Text>
    <Text style={styles.cardDescription}>
      Tous nos prestataires sont soigneusement sélectionnés et vérifiés pour garantir la qualité de leurs services.
    </Text>
  </View>

  {/* Carte 2 - Services Sécurisés */}
  <View style={styles.whyCard}>
    <LinearGradient
      colors={['#43e97b', '#38f9d7']} // ton dégradé vert → cyan
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.iconCircle}
    >
      <MaterialCommunityIcons name="shield-check-outline" size={36} color="#ffffff" />
    </LinearGradient>
    <Text style={styles.cardTitle}>Services Sécurisés</Text>
    <Text style={styles.cardSubtitle}>Sérénité garantie</Text>
    <Text style={styles.cardDescription}>
      Profitez de services sécurisés avec des prestataires de confiance pour votre Jour J.
    </Text>
  </View>

  {/* Carte 3 - Expérience Unique */}
  <View style={styles.whyCard}>
    <LinearGradient
      colors={['#fc5c7d', '#6a82fb']} // ton dégradé rose → bleu-violet
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.iconCircle}
    >
      <MaterialCommunityIcons name="heart-outline" size={36} color="#ffffff" />
    </LinearGradient>
    <Text style={styles.cardTitle}>Expérience Unique</Text>
    <Text style={styles.cardSubtitle}>Souvenirs inoubliables</Text>
    <Text style={styles.cardDescription}>
      Créez des souvenirs inoubliables avec nos prestataires spécialisés dans les mariages.
    </Text>
  </View>
</View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },

  card: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 20,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  bullet: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
  },

  sliderContainer: {
    marginTop: 15,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 180,
  },

textContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 40, // 20 px au-dessus du bas
  alignItems: 'center',
  //backgroundColor: 'rgba(0,0,0,0.25)',
  paddingVertical: 5,
},


titleImage: {
  fontFamily: 'Caladea',
  fontSize: 28,
  color: '#fff',
  letterSpacing: 2,
},


  line: {
    color: '#fff',
    fontSize: 20,
    marginTop: 6,
  },
dash: {
  width: 16,
  height: 3,
  borderRadius: 2,
  backgroundColor: '#ccc',
  marginHorizontal: 4,
},

activeDash: {
  width: 22,
  height: 3,
  borderRadius: 2,
  backgroundColor: '#312A2A',
  marginHorizontal: 4,
},
// Nouveaux styles pour la section univers
  universContainer: {
    width: width * 0.9,
    marginTop: 20,
    alignItems: 'center',
  },

  universTitle: {
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    //alignSelf: 'flex-start',
  },

  grid: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  item: {
    width: (width * 0.9 - 20) / 2, // 2 colonnes avec un petit espace
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  itemImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },

  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
UserTitle: {
    fontSize: 16,              // ← j'ai augmenté un peu pour que ça ait plus de présence
    fontWeight: '400',         // regular/normal
    textAlign: 'left',
    marginBottom: 6,
    color: '#000',
  },

  boldName: {
    fontWeight: 'bold',        // ou '700' si tu veux être plus précis
    fontSize: 16,   
    color: '#2C1A5A',           // même taille que le parent
  },

  userCard: {
    width: width * 0.9,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,      // petit padding optionnel
  },
  searchContainer: {
    width: '80%',
    height: 40,
    backgroundColor: '#F6F4DC',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0D9B8', // léger contour plus foncé pour mieux définir la barre
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',              // couleur du texte tapé (plus foncé que le placeholder)
    fontWeight: '400',
  },

  searchIconContainer: {
    marginLeft: 8,
  },

  searchIcon: {
    fontSize: 20,
    color: '#A47350',
  },
whyChooseContainer: {
  width: width * 0.9,
  marginTop: 32,
  marginBottom: 24,
  alignItems: 'center',
  backgroundColor: '#e3e9f7',          // ← couleur demandée
  borderRadius: 0,                    // optionnel : pour un look plus doux
  paddingVertical: 24,                 // optionnel : un peu d'espace interne
  paddingHorizontal: 16,               // optionnel
},

  whyChooseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },

  whyChooseSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },

  whyChooseCards: {
    width: '100%',
    // plus de flexDirection row ni flexWrap → les enfants s'empilent naturellement
  },

  whyCard: {
    width: '100%',                    // ← changement principal : pleine largeur
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,                 // espace entre les deux cartes
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Les styles iconCircle, iconEmoji, cardTitle, cardSubtitle, cardDescription
  // restent identiques
iconCircle: {
  width: 72,           // légèrement plus grand pour les outlined
  height: 72,
  borderRadius: 36,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,    // un peu plus d'espace sous l’icône
},

  iconEmoji: {
    fontSize: 32,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#7b8ca7',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight:'bold'
  },

  cardDescription: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    lineHeight: 18,
  },
});