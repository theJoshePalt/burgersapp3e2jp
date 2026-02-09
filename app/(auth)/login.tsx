import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/core/supabase/client.supabase';
import { useRouter } from 'expo-router'; // Para navegar entre pantallas

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert("Error", error.message);
            setLoading(false);
        } else {
            // No hace falta router.replace aquí si tu archivo Entry ya escucha el estado de Auth
            Alert.alert("Bienvenido", "Iniciando sesión...");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFBA00' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                Bonjour BURGER 🍔
            </Text>
            
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ backgroundColor: 'white', marginBottom: 10, padding: 12, borderRadius: 8 }}
                autoCapitalize="none"
            />
            
            <TextInput 
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ backgroundColor: 'white', marginBottom: 20, padding: 12, borderRadius: 8 }}
            />

            <Button 
                title={loading ? "Entrando..." : "Iniciar Sesión"} 
                onPress={handleLogin} 
                disabled={loading}
                color="#E67E22"
            />

            <TouchableOpacity 
                onPress={() => router.push('/(auth)/register')} 
                style={{ marginTop: 20 }}
            >
                <Text style={{ textAlign: 'center', color: '#333' }}>
                    ¿No tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Regístrate aquí</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}