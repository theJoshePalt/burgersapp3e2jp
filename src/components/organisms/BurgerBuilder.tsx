import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BurgerCanvas from '../molecules/BurgerCanvas';
import { supabase } from '../../../lib/core/supabase/client.supabase'; // Importa tu cliente
export default function BurgerBuilder() {
    const [step, setStep] = useState(0);
    const [isEaten, setIsEaten] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const saveOrderInSupabase = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const { error } = await supabase
          .from('orders') // Asegúrate de tener esta tabla en Supabase
          .insert([
            { 
              user_id: user?.id, 
              status: 'completed',
              details: 'Hamburguesa 3D Bonjour' 
            },
          ]);
  
        if (error) throw error;
        console.log("Orden guardada con éxito");
      } catch (error) {
        console.error("Error al guardar orden:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleNextStep = async () => {
      if (step < 5) {
        setStep(step + 1);
      } else {
        // 1. Guardamos en Supabase antes de que desaparezca
        await saveOrderInSupabase();
        
        // 2. Animación de comer
        setIsEaten(true);
        
        // 3. Reset
        setTimeout(() => {
          setStep(0);
          setIsEaten(false);
        }, 1000);
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <BurgerCanvas step={step} isEaten={isEaten} />
      </View>

      <View style={styles.uiContainer}>
        <Text style={styles.title}>Bonjour BURGER 🍔</Text>
        <Text style={styles.subtitle}>Paso {step} de 5</Text>
        
        <TouchableOpacity 
          style={[styles.button, step === 5 && styles.buttonFinish]} 
          onPress={handleNextStep}
        >
          <Text style={styles.buttonText}>
            {step === 0 ? "Empezar Orden" : step === 5 ? "¡COMETELO!" : "Agregar Ingrediente"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  canvasContainer: { flex: 3 }, // El 3D ocupa la mayor parte
  uiContainer: { flex: 1, padding: 20, alignItems: 'center' },
  title: { color: '#FFBA00', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#FFF', marginBottom: 20 },
  button: { backgroundColor: '#E67E22', padding: 15, borderRadius: 10, width: '100%' },
  buttonFinish: { backgroundColor: '#27AE60' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }
});