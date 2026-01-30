// components/BuyModal.tsx (ou modals/BuyModal.tsx)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal as RNModal,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Product {
  title: string;
  image: any; // require() ou { uri: string }
  recommendedQty: number;
}

interface BuyModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (data: {
    quantity: number;
    price: string;
    place: string;
    note: string;
  }) => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  visible,
  onClose,
  product,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(product.recommendedQty);
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [note, setNote] = useState('');

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
       <View style={[styles.modalHeader, { backgroundColor: '#f8e1ef' }]}>
  <Text style={styles.modalTitle}>إدخال بيانات الشراء</Text>

  <Pressable onPress={onClose} style={styles.closeButton}>
    <MaterialCommunityIcons 
      name="close" 
      size={28} 
      color="#D367BB"  // ou #333 selon ce qui contraste le mieux
    />
  </Pressable>
</View>
        {/* Infos produit : détails à gauche, image à droite */}
{/* Infos produit */}
<View style={styles.productInfo}>
  {/* Label "المنتج" tout seul au-dessus de l’image */}
  <Text style={styles.fieldLabel}>المنتج</Text>

  {/* Conteneur horizontal : détails à gauche + image à droite */}
  <View style={styles.productHorizontal}>
    {/* Détails à gauche (titre + quantité) */}
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.recommendedQty}>
        الكمية الموصى بها: {product.recommendedQty}
      </Text>
    </View>

    {/* Image à droite */}
    <View style={styles.productImageContainer}>
      <Image 
        source={product.image} 
        style={styles.productImage} 
        resizeMode="contain" 
      />
    </View>
  </View>
</View>
        {/* Quantité + Prix sur la même ligne */}
<View style={styles.fieldRowHorizontal}>
  {/* Quantité à gauche */}
{/* الكمية – design exact comme dans l'image */}
{/* الكمية – avec CaretDown et CaretUp */}
<View style={styles.quantityField}>
  <Text style={styles.fieldLabel}>الكمية</Text>

  <View style={styles.quantitySelector}>
    {/* Bouton diminuer – CaretDown */}
    <Pressable style={styles.qtyCircle} onPress={decreaseQty}>
      <MaterialCommunityIcons name="chevron-down" size={24} color="#a969ac" />
    </Pressable>

    {/* Nombre au milieu */}
    <View style={styles.qtyNumberContainer}>
      <Text style={styles.qtyNumber}>{quantity}</Text>
    </View>

    {/* Bouton augmenter – CaretUp */}
    <Pressable style={styles.qtyCircle} onPress={increaseQty}>
      <MaterialCommunityIcons name="chevron-up" size={24} color="#a969ac" />
    </Pressable>
  </View>
</View>

  {/* Prix à droite */}
  <View style={styles.priceWrapper}>
    <Text style={styles.fieldLabel}>السعر</Text>
    <TextInput
      style={styles.priceInput}
      value={price}
      onChangeText={setPrice}
      keyboardType="numeric"
      placeholder=" "
      placeholderTextColor="#ccc"
    />
  </View>
</View>

          {/* Lieu */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>مكان الشراء</Text>
            <TextInput
              style={styles.textInput}
              value={place}
              onChangeText={setPlace}
              placeholder=" "
            />
          </View>

          {/* Note */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ملاحظة</Text>
            <TextInput
              style={[styles.textInput, styles.noteInput]}
              value={note}
              onChangeText={setNote}
              placeholder="مثال: هدية، اللون:..."
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Boutons */}
          <View style={styles.footerButtons}>
            <Pressable style={[styles.footerButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>إلغاء</Text>
            </Pressable>
            <LinearGradient
  colors={['#b96fa2', '#a05a8a']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}  // 135 degrés = du haut-gauche vers bas-droite
  style={[styles.footerButton, { borderRadius: 16 }]}
>
  <Pressable
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={() => {
      onConfirm({ quantity, price, place, note });
      onClose();
    }}
  >
    <Text style={styles.confirmText}>تأكيد الشراء</Text>
  </Pressable>
</LinearGradient>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

// Styles (copie-colle ici ou dans un fichier styles séparé)
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
modalContainer: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 24,
  //overflow: 'hidden',             // ← coupe tout ce qui dépasse
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.25,
  shadowRadius: 20,
  elevation: 12,
},
/*
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  paddingBottom: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#f0e0ee', 
  backgroundColor: '#f8e1ef',
},
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D367BB',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 28,
    color: '#D367BB',
    fontWeight: 'bold',
  },
  productInfo: {
    flexDirection: 'row',              // ligne horizontale
   justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },*/
  productDetailsLeft: {
  flex: 1,
  alignItems: 'flex-end',            // texte aligné à droite (RTL arabe)
  paddingRight: 16,
},
/*
productImageContainer: {
  width: 100,
  height: 100,
  backgroundColor: '#fdf9fc',
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E8D5E5',
  overflow: 'hidden',
},
productImage: {
  width: 80,
  height: 80,
},
  productDetails: {
    flex: 1,
  },*/
productTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#333',
  marginBottom: 6,
  textAlign: 'right',
},
recommendedQty: {
  fontSize: 14,
  color: '#555',
  textAlign: 'right',
},
  fieldRow: {
    marginBottom: 18,
  },
fieldLabel: {
  fontSize: 15,
  fontWeight: '600',
  color: '#E91E63',
  marginBottom: 8,
  textAlign: 'right',          // ← AJOUTE ÇA (ou remplace si déjà présent)
},
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: '#fdf9fc',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
  },
  noteInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    gap: 16,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#D367BB',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  }
  ,
  modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  borderBottomWidth: 0,           // pas de bordure inférieure
},

modalTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#E91E63',               // texte blanc comme demandé
  letterSpacing: 0.5,
},

closeButton: {
  padding: 4,
},

// Si tu utilises MaterialCommunityIcons pour la croix
// (optionnel mais plus joli que le "×" texte)
closeIcon: {
  fontSize: 28,
  color: '#ffffff',
},
// Ligne horizontale pour quantité + prix
fieldRowHorizontal: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 20,
  gap: 16,
},

// Wrapper quantité (gauche)
quantityWrapper: {
  flex: 1,
  maxWidth: '50%',
},

// Wrapper prix (droite)
priceWrapper: {
  flex: 1,
  maxWidth: '50%',
},

// Input prix (plus large et aligné)
priceInput: {
  backgroundColor: '#fdf9fc',
  borderRadius: 16,
  borderWidth: 1.5,
  borderColor: '#E8D5E5',
  paddingVertical: 14,
  paddingHorizontal: 16,
  fontSize: 16,
  color: '#222',
  textAlign: 'right',
},
quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fdf9fc',
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#E8D5E5',
  paddingVertical: 8,
  paddingHorizontal: 12,
},

// Conteneur principal (vertical pour le label)
productInfo: {
  marginBottom: 28,
  alignItems: 'flex-end',            // texte aligné à droite (RTL arabe)
},

// Conteneur horizontal pour détails + image
productHorizontal: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 16,
},

// Détails texte à gauche
productDetails: {
  flex: 1,
  alignItems: 'flex-end',
  paddingRight: 16,
},

// Image à droite (comme avant)
productImageContainer: {
  width: 100,
  height: 100,
  backgroundColor: '#fdf9fc',
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E8D5E5',
  overflow: 'hidden',
},

productImage: {
  width: 80,
  height: 80,
},
quantityField: {
  marginBottom: 20,
  alignItems: 'flex-end', // pour RTL (label à droite)
},

quantitySelector: {
  flexDirection: 'row',
  alignItems: 'center',
  //backgroundColor: '#f8e1ef', // fond rose très clair comme le header
  //borderRadius: 50,
  paddingHorizontal: 8,
  paddingVertical: 4,
  //borderWidth: 1,
  //borderColor: '#E8D5E5',
},

qtyCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#a969ac',
},

qtyNumberContainer: {
  width: 50,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 8,
  backgroundColor: '#f2eded',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E8D5E5',
},

qtyNumber: {
  fontSize: 18,
  fontWeight: '700',
  color: '#333',
},
});