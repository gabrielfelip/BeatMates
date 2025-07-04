// app/profile/_layout.tsx
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      {/* Cada `Stack.Screen` aqui corresponde ao nome do arquivo na pasta `app/profile/` */}
      <Stack.Screen name="musical-styles" options={{ title: 'Estilos Musicais' }} />
      <Stack.Screen name="top-artists" options={{ title: 'Artistas Favoritos' }} />
      <Stack.Screen name="dream-artists" options={{ title: 'Artistas para Ver' }} />
      <Stack.Screen name="festivals" options={{ title: 'Festivais Preferidos' }} />
      <Stack.Screen name="vibe" options={{ title: 'Sua Vibe em Shows' }} />
    </Stack>
  );
}