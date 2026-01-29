// app/(tabs)/_layout.tsx
import { Tabs, useNavigation } from 'expo-router';  // ← ajoute useNavigation ici
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { DrawerNavigationProp } from '@react-navigation/drawer';  // ← IMPORT ESSENTIEL
import { DrawerActions } from '@react-navigation/native';

type DrawerParamList = {
  test: undefined; // ici, liste de tes écrans drawer
};
// Composant HeaderRight (inchangé sauf couleurs corrigées)
const HeaderRight = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="cart-outline" size={24} color='#0000' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="heart-outline" size={24} color='#0000' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={24} color='#0000' />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMenu} style={styles.avatarButton}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Mon compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Devenir VIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Parrainage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const HeaderLeft = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const handleOpen = () => {
    navigation.openDrawer(); // ✅ TypeScript ne râlera plus
  };

  return (
    <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleOpen}>
      <Ionicons name="menu" size={28} color="#0000" />
    </TouchableOpacity>
  );
};

const HeaderLogo = () => (
  <Image
    source={require('@/assets/images/jhezi_logo.png')}
    style={{ width: 80, height: 30, resizeMode: 'contain' }}
  />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].text,
      }}
    >
      <Tabs.Screen
        name="prestataires"
        options={{
          title: 'Prestataires',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase" color={color} />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: 'center',
        }}
      />

      <Tabs.Screen
        name="boutique"
        options={{
          title: 'Boutique',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bag" color={color} />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: 'center',
        }}
      />

      <Tabs.Screen
        name="jhez"
        options={{
          title: 'Jhez',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: 'center',
        }}
      />

      <Tabs.Screen
        name="mes-achats"
        options={{
          title: 'Mes Achats',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart" color={color} />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: 'center',
        }}
      />

      <Tabs.Screen
        name="forum"
        options={{
          title: 'Forum',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bubble.left" color={color} />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}

// Styles (j'ai corrigé les couleurs #0000 → #000 ou Colors.primary)
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,          // ← j'ai remis un gap raisonnable (0 → 16)
    marginRight: 16,
  },
  iconButton: {
    padding: 2,
  },
  avatarButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownMenu: {
    marginTop: 60,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 160,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});