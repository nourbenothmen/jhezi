import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
   TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

/* ===================== CATEGORIES ===================== */


const CATEGORIES = [
  {
    id: '1',
    title: 'أجهزة كهرومنزلية',
    image: require('../../../assets/images/Categories-Jhez/electromenagers.png'),
  },
  {
    id: '2',
    title: 'تجميل \nوعناية شخصية',
    image: require('../../../assets/images/Categories-Jhez/beauté-soin.jpeg'),
  },
  {
    id: '3',
    title: 'غرفة النوم \nوالمفروشات',
    image: require('../../../assets/images/Categories-Jhez/chambreacoucher.png'),
  },
  {
    id: '4',
    title: 'الحمام',
    image: require('../../../assets/images/Categories-Jhez/salle-de-bain.jpg'),
  },
  {
    id: '5',
    title: 'المطبخ',
    image: require('../../../assets/images/Categories-Jhez/cuisine.jpg'),
  },
  {
    id: '6',
    title: 'الصالون',
    image: require('../../../assets/images/Categories-Jhez/sallon.jpg'),
  },
  {
    id: '7',
    title: 'البلاستيك',
    image: require('../../../assets/images/Categories-Jhez/plastiques.jpg'),
  },
];

/* ===================== PRODUCTS ===================== */

const PRODUCTS = [
  {
    id: '1',
    title: 'مكنسة كهربائية',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046871.png',
    categoryId: '1',
  },
  {
    id: '2',
    title: 'مجفف شعر',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    categoryId: '1',
  },
   {
    id: '3',
    title: 'مجفف شعر',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    categoryId: '1',
  },
   {
    id: '4',
    title: 'مجفف شعر',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    categoryId: '1',
  },
     {
    id: '5',
    title: 'مجفف شعر',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    categoryId: '1',
  },
];

/* ===================== CARD ===================== */

const JhezCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Icône boutique à gauche */}
      <TouchableOpacity style={styles.leftIconBox} onPress={() => alert('Store clicked!')}>
        <Ionicons name="storefront-outline" size={24} color="#fd7e14" />
      </TouchableOpacity>

      {/* Conteneur texte + image */}
      <View style={styles.middleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardSubtitle}>
            الكمية الموصى بها: 1
          </Text>
        </View>

        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* Bouton + à droite */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="#8b5a8a" />
      </TouchableOpacity>
    </View>
  );
};
/* ===================== SCREEN ===================== */

export default function ListeJhez() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const [selectedCategory, setSelectedCategory] = useState('1');
  const [search, setSearch] = useState('');

const filteredProducts = PRODUCTS.filter(p =>
  p.categoryId === selectedCategory &&
  p.title.includes(search)
);


return (
  <View style={styles.container}>
    <View style={styles.categoryListWrapper}>
  <FlatList
    horizontal
    data={CATEGORIES}
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.categoryList}
    renderItem={({ item }) => {
      const active = item.id === selectedCategory;

      return (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory(item.id)}
        >
          <View
            style={[
              styles.categoryCircle,
              active && styles.activeCategory,
            ]}
          >
            <Image source={item.image} style={styles.categoryImage} />
          </View>

          <Text
            style={[
              styles.categoryText,
              active && styles.activeText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    }}
  />
</View>

  

    {/* Espace entre FlatList catégories et barre de recherche 
    <View style={{ height: 16 }} />*/}

    {/* Barre de recherche */}
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color="#999" />
      <TextInput
        placeholder="ابحث عن منتج..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#999"
        textAlign="right"
      />
    </View>

    {/* Espace avant la card parent 
    <View style={{ height: 16 }} />*/}
    {/* PARENT CARD */}
    <View style={styles.parentCard}>
      {/* Header */}
      <View style={styles.parentCardHeader}>
        {/* Bouton retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => alert('Retour')}
        >
          <Text style={styles.backButtonText}>رجوع</Text>
        </TouchableOpacity>

        {/* Titre */}
        <Text style={styles.headerTitle}>أجهزة كهرومنزلية</Text>
      </View>

      {/* Contenu - liste des cartes */}
<FlatList
  key="one-column"   // 🔥 TRÈS IMPORTANT
  data={filteredProducts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <JhezCard item={item} />}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: 16,
    paddingBottom: 24,
  }}
/>


    </View>
  </View>
);
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },



  categoryItem: {
    alignItems: 'center',
    marginRight: 18,
  },

  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
  },

  activeCategory: {
    borderWidth: 2,
    borderColor: '#D367BB',
  },

  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'cover',
  },

  categoryText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    width: 80,
  },

  activeText: {
    color: '#D367BB',
    fontWeight: 'bold',
  },
/*
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },

  leftIconBox: {
    width: 70,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFF4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'right',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
    textAlign: 'right',
  },

  cardImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginHorizontal: 6,
  },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF1F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  flexDirection: 'row',
  alignItems: 'center',
  height: 100, 
  paddingHorizontal: 0, 
  marginHorizontal: 16,
  marginBottom: 12,
  elevation: 2,
  overflow: 'hidden', 
},

leftIconBox: {
  width: 50,
  height: '100%',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  backgroundColor: '#FFF4EC',
  justifyContent: 'center',
  alignItems: 'center',
},

addButton: {
  width: 50, 
  height: '100%',
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  backgroundColor: '#FFF1F7',
  justifyContent: 'center',
  alignItems: 'center',
},*/

parentCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#b96fa2',
  paddingVertical: 12,
  paddingHorizontal: 16,
},

backButton: {
  backgroundColor: '#E0E0E0', 
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
},

backButtonText: {
  color: '#000000', 
  fontWeight: 'bold',
},

headerTitle: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'right',
},

searchInput: {
  flex: 1,
  fontSize: 14,
  marginLeft: 8,
  color: '#000',
},
parentCard: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  marginHorizontal: 16,
  marginBottom: 12,
  overflow: 'hidden',
  elevation: 3,
},

searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginBottom: 10,  
   marginTop: 10,          
  borderRadius: 12,
  paddingHorizontal: 12,
  height: 48,                 
  elevation: 2,
},

categoryList: {
  paddingVertical: 6,
  paddingHorizontal: 12,
},

/*
card: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  marginHorizontal: 8,
  marginBottom: 16,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  minHeight: 100,
},*/
middleContainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 6,
  //minWidth: 0,
}
,

textContainer: {
  flex: 1,
  alignItems: 'flex-end',
  paddingRight: 8,
  marginRight: 2,
}
,
cardTitle: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#222',
  textAlign: 'right',
  marginBottom: 4,
},

cardSubtitle: {
  fontSize: 12,
  color: '#777',
  textAlign: 'right',
},
cardImage: {
  width: 60,
  height: 60,
  marginLeft: 8,
  flexShrink: 0, // ne pas rétrécir
}
,

/*
leftIconBox: {
  width: 50,
  height: 80,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  backgroundColor: '#FFF4EC',
  justifyContent: 'center',
  alignItems: 'center',
},

addButton: {
  width: 50,
  height: 80,
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  backgroundColor: '#FFF1F7',
  justifyContent: 'center',
  alignItems: 'center',
},*/
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  flexDirection: 'row',
  alignItems: 'center',
  height: 100,
  marginBottom: 12,
  elevation: 2,
  overflow: 'hidden',
}
,

leftIconBox: {
  width: 50, 
  height: '100%',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  backgroundColor: '#FFF4EC',
  justifyContent: 'center',
  alignItems: 'center',
},

addButton: {
  width: 50, 
  height: '100%',
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  backgroundColor: '#FFF1F7',
  justifyContent: 'center',
  alignItems: 'center',
},
categoryListWrapper: {
  height: 120,
}


});
