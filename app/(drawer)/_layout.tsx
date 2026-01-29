// app/(drawer)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


function MinimalDrawerContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU TEST</Text>
      
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Item 1</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Item 2</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Item 3</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <MinimalDrawerContent />}
      screenOptions={{
        drawerStyle: {
          width: '75%',
          backgroundColor: '#fff',
        },
        headerShown: false,
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen
        name="test"               // ← écran de test simple
        options={{
          drawerLabel: () => null, // cache dans la liste drawer
          headerShown: false,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});