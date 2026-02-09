import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import BurgerBuilder from '../../src/components/organisms/BurgerBuilder';
import { Stack } from 'expo-router';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Configuramos el Header aquí mismo para que diga Bonjour BURGER */}
      <Stack.Screen 
        options={{
          headerTitle: "Bonjour BURGER 🍔",
          headerStyle: { backgroundColor: '#1A1A1A' },
          headerTintColor: '#FFBA00',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          headerLeft: () => null, // Ocultar botón de atrás si existe
        }} 
      />

      <View style={{ flex: 1 }}>
        <BurgerBuilder />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Fondo oscuro para que el 3D resalte
  },
});