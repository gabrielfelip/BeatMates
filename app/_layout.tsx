// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* Rota inicial que renderiza BasicInfoScreen. 'index' é a raiz '/' */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/*
          Esta é a rota que engloba todas as telas do fluxo de perfil.
          O Expo Router vai usar o `app/profile/_layout.tsx` para gerenciar as rotas
          `profile/musical-styles`, `profile/top-artists`, etc.
        */}
        <Stack.Screen name="profile" options={{ headerShown: false }} />

        {/* A tela principal do aplicativo após o perfil. */}
        <Stack.Screen name="home" options={{ headerShown: false }} />

        {/* A tela de "não encontrado" */}
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}