import { Stack } from "expo-router";
import { AuthProvider } from '../lib/modules/auth/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack /> {/* El resto de tu app */}
    </AuthProvider>
  );
}