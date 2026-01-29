import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <Text style={styles.label}>Adresse email</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="mail-outline" size={20} color="#A66EA0" />
        </View>
        <TextInput
          placeholder="Votre adresse email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <Text style={styles.label}>Mot de passe</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="lock-closed-outline" size={20} color="#A66EA0" />
        </View>
        <TextInput
          placeholder="Votre mot de passe"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <Text style={styles.forgotText}>Mot de passe oublié ?</Text>

      {/* Bouton Se connecter avec effet press */}
      <Pressable style={{ marginBottom: 20 }}>
        {({ pressed }) => (
          <LinearGradient
            colors={pressed ? ['#b96fa2', '#f8e1ef'] : ['#fff', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.loginButton,
              {
                borderColor: pressed ? '#a05a8a' : '#b96fa2',
                shadowOffset: { width: 0, height: pressed ? 6 : 2 },
                shadowOpacity: pressed ? 0.13 : 0.07,
                shadowRadius: pressed ? 24 : 8,
                transform: pressed ? [{ translateY: -2 }, { scale: 1.03 }] : [],
              },
            ]}
          >
            <Text style={[styles.loginButtonText, { color: pressed ? '#fff' : '#b96fa2' }]}>
              Se connecter
            </Text>
          </LinearGradient>
        )}
      </Pressable>

      {/* Section Créer un compte */}
      <LinearGradient
        colors={['#fff5f8', '#f8f0ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.signupContainerGradient}
      >
        <Text style={styles.signupText}>Pas encore de compte ?</Text>
        <Pressable style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Créer mon compte</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#A66EA0', marginBottom: 30, textAlign: 'center' },
  label: { color: '#b96fa2', fontWeight: '600', marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#E2DAF0', borderRadius: 30, overflow: 'hidden' },
  iconBackground: { backgroundColor: '#F6E6F6', padding: 15 },
  input: { flex: 1, paddingVertical: 15, paddingHorizontal: 10, fontSize: 16, color: '#333' },
  forgotText: { alignSelf: 'flex-end', color: '#333', marginBottom: 20, fontWeight: '500' },
  loginButton: {
    borderWidth: 2,
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 0,
    alignItems: 'center',
    shadowColor: '#b96fa2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButtonText: { fontWeight: '700', fontSize: 18 },
  signupContainerGradient: { textAlign: 'center', marginTop: 32, padding: 24, borderRadius: 24, borderWidth: 2, borderColor: 'rgba(185, 111, 162, 0.1)', position: 'relative', overflow: 'hidden', alignItems: 'center' },
  signupText: { marginBottom: 10, fontWeight: '500', color: '#333' },
  signupButton: { backgroundColor: '#A66EA0', borderRadius: 30, paddingVertical: 12, paddingHorizontal: 25 },
  signupButtonText: { color: '#fff', fontWeight: 'bold' },
});
