import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { supabase } from '../../lib/core/supabase/client.supabase';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            // 1. Crear usuario en Auth
            const { data: { session, user }, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            // 2. Crear Perfil para disparar el Trigger
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: user?.id, email: user?.email, first_name: 'Usuario', last_name: 'Nuevo' }]);
            
            if (profileError) {
                 console.error("Error creando perfil:", profileError);
                 // No bloqueamos el flujo, pero es bueno saberlo
            }

            Alert.alert("¡Éxito!", "Usuario creado. Espera tu notificación...");

        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Crear Cuenta (Test)</Text>
            
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 }}
                autoCapitalize="none"
            />
            
            <TextInput 
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 20, padding: 8, borderRadius: 4 }}
            />

            <Button 
                title={loading ? "Registrando..." : "Crear Cuenta"} 
                onPress={handleRegister} 
                disabled={loading}
            />
        </View>
    );
}