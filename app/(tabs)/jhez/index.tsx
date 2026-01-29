import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MotiView } from 'moti';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { router } from '@/.expo/types/router';
import { useRouter } from 'expo-router';



const { width } = Dimensions.get('window');

export default function Jhez() {
  const router = useRouter();

  return (
    <ScrollView
  contentContainerStyle={styles.container}
  showsVerticalScrollIndicator={false}
> 
      {/* Card principale */}
      <View style={styles.card}>
          {/* 💜 coeurs décoratifs */}
  <Text style={[styles.bgHeart, { top: 20, left: 20 }]}>♡</Text>
  <Text style={[styles.bgHeart, { top: 60, right: 30 }]}>♡</Text>
  <Text style={[styles.bgHeart, { bottom: 40, left: 50 }]}>♡</Text>
  <Text style={[styles.bgHeart, { bottom: 20, right: 60 }]}>♡</Text>
        <MotiView
  from={{ scale: 1 }}
  animate={{ scale: 1.2 }}
  transition={{
    type: 'timing',
    duration: 700,
    loop: true,
  }}
>
  <Text style={styles.heart}>♡</Text>
</MotiView>

        <Text style={styles.title}>قائمة جهاز العروس</Text>

        <Text style={styles.description}>
         "قائمة الجهاز" هي الطريقة الأذكى لتنظيم كل احتياجات العروسة للبيت والخدمات قبل العرس. بدل الأوراق والصور المبعثرة، تجمعين كل ما يلزمك في مكان واحد واضح وسهل التتبّع — من الأدوات المنزلية والديكور إلى الأجهزة الكهربائية.
        </Text>

        {/* Boutons */}
        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonText}>سهل الاستخدام</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonText}>منظم وعملي</Text>
        </TouchableOpacity>
             <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonText}>ذكي واحترافي</Text>
        </TouchableOpacity>
        {/* ✅ CARD BLANCHE À L’INTÉRIEUR */}
  <View style={styles.innerCard}>

    {/* statistiques */}
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>163,000</Text>
        <Text style={styles.statLabel}>د.ت</Text>
        <Text style={styles.statSub}>إجمالي الميزانية</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>2</Text>
        <Text style={styles.statSub}>عدد القوائم</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>8</Text>
        <Text style={styles.statSub}>عدد الفئات</Text>
      </View>
    </View>

    {/* progress bar */}
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>التقدم العام: 1%</Text>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
    </View>

  </View>
      
      </View>

  {/* ===== CARD CATEGORIES ===== */}
<View style={styles.categoryCard}>

  {/* HEADER */}
  <View style={styles.categoryHeader}>
    <Text style={styles.categoryTitle}>قائمة جهاز العروس ♡</Text>
    <Text style={styles.categorySubtitle}>
      اختاري إحدى الفئات أدناه لعرض المنتجات المرتبطة بها
      وإضافة مشترياتك بسهولة.
    </Text>
  </View>

  {/* BODY */}
  <View style={styles.categoryBody}>

    {[
  { title: 'المطبخ' },
  { title: 'غرفة النوم' },
  { title: 'الصالون' },
  { title: 'الحمام' },
  { title: 'الأجهزة' },
  { title: 'الديكور' },
  { title: 'التنظيف' },
  { title: 'أخرى' },
].map((item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.categoryItem}
    activeOpacity={0.8}
    onPress={() =>
      router.push({
        pathname: '/jhez/liste-jhez',
        params: { category: item.title },
      })
    }
  >
    <View style={styles.categoryImage} />
    <Text style={styles.categoryText}>{item.title}</Text>
  </TouchableOpacity>
))}
  </View>

</View>

<View style={{
  backgroundColor: '#f8e1ef',
  borderRadius: 20,
  padding: 20,
  marginTop: 20,
   marginBottom: 20,
   marginRight: 20,
   marginLeft: 20,
  shadowColor: '#B96FA2',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 30,
  elevation: 5,
}}>
  <Text style={{ color: '#b96fa2', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>نبذة عن جهازي</Text>
  <Text style={{ color: '#6c3a7a', textAlign: 'center', marginTop: 10, lineHeight: 20 }}>
    جهازي هو رفيقكِ الذكي لتنظيم قائمة جهازك بكل سهولة واحترافي
أضيفي كل المنتجات التي تحتاجينها، علّمي المشتريات المنجزة، وتابعي ميزانيتك لحظة بلحظة.
استمتعي بتجربة حديثة وأنيقة، مصممة خصيصًا لتلبية احتياجات العرائس.
  </Text>
</View>


</ScrollView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: 40,
    alignItems: 'center',
  },

  card: {
    width: width * 0.9,
    backgroundColor: '#B76AA6',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },

  heart: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },

  buttonWhite: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
  },

  buttonText: {
    color: '#0000',
    fontWeight: 'bold',
  },

  buttonOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  buttonOutlineText: {
    color: '#fff',
  },
  innerCard: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 15,
  marginTop: 20,
},
statsRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 15,
},

statItem: {
  alignItems: 'center',
},

statNumber: {
  fontSize: 16,
  fontWeight: 'bold',
},

statLabel: {
  fontSize: 12,
  color: '#777',
},

statSub: {
  fontSize: 12,
  color: '#777',
},

progressContainer: {
  marginTop: 5,
},

progressText: {
  fontSize: 12,
  color: '#777',
  marginBottom: 6,
},

progressBar: {
  height: 8,
  backgroundColor: '#E5E5E5',
  borderRadius: 10,
  overflow: 'hidden',
},

progressFill: {
  width: '1%',
  height: '100%',
  backgroundColor: '#B76AA6',
},

  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width * 0.9,
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 15,
    justifyContent: 'space-around',
    elevation: 3,
  },

  bgHeart: {
  position: 'absolute',
  fontSize: 26,
  color: '#E0E0E0',
  opacity: 0.25,
},
categoryCard: {
  width: width * 0.9,
  backgroundColor: '#fff',
  borderRadius: 25,
  marginTop: 20,
  overflow: 'hidden',
  elevation: 3,
},

categoryHeader: {
  backgroundColor: '#B76AA6',
  padding: 15,
},

categoryTitle: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'right',
  fontWeight: 'bold',
  marginBottom: 4,
},

categorySubtitle: {
  color: '#fff',
  textAlign: 'right',
  fontSize: 12,
  lineHeight: 18,
},

categoryBody: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 15,
  justifyContent: 'space-between',
},

categoryItem: {
  width: '47%',
  alignItems: 'center',
  marginBottom: 20,
},

categoryImage: {
  width: '100%',
  height: 90,
  backgroundColor: '#F1F1F1',
  borderRadius: 15,
  marginBottom: 6,
},

categoryText: {
  fontSize: 13,
  fontWeight: '600',
  color: '#333',
},
aboutCard: {
  borderRadius: 20,
  padding: 20,
  marginTop: 20,
  alignItems: 'center',
  shadowColor: '#B96FA2', // couleur approximative du shadow
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 30,
  elevation: 5, // pour Android
},

aboutTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 12,
  color: '#333',
  textAlign: 'center',
},

aboutText: {
  fontSize: 14,
  color: '#333',
  lineHeight: 20,
  textAlign: 'center',
},


});
