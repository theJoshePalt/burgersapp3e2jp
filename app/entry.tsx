// app/entry.tsx o index.tsx (dependiendo de tu estructura de carpetas)
import { Redirect } from "expo-router";

export default function Entry() {
  // Este archivo sirve como el "túnel" de inicio.
  // Al entrar, Expo Router buscará el _layout más cercano.
  // Como tu _layout ya tiene el useEffect con router.replace,
  // simplemente podemos redirigir a la pantalla de carga o al login por defecto.
  
  return <Redirect href="/(auth)/login" />;
}