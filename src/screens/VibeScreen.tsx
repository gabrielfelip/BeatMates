// src/screens/VibeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router'; // Para navegação

const vibeOptions: string[] = [ // Adicionado tipagem para garantir que é um array de strings
  'Gosto de ir pra galera/curtir a muvuca',
  'Prefiro ficar mais de boa no fundo',
  'Curto ir em eventos pequenos/intimistas',
  'Adoro descobrir bandas novas',
  'Só vou pelos clássicos/hits',
  'Vou pra dançar/pular sem parar',
  'Gosto de conversar e socializar',
  'Fico mais na minha, só curtindo o som',
  'Sempre procuro um bom lugar para comer/beber',
  'Vou pra fazer networking e conhecer pessoas',
  'Registro tudo com fotos e vídeos',
  'Desligo o celular e aproveito o momento'
];

const VibeScreen = () => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]); // Estado para armazenar as vibes selecionadas
  const router = useRouter();

  const toggleVibe = (vibe: string) => { // Adicionado tipagem do parâmetro
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  const handleSubmit = () => {
    // Por enquanto, apenas loga as vibes selecionadas
    console.log('Vibes Selecionadas:', selectedVibes);
    // Futuramente, aqui será o ponto onde o perfil do usuário estará "completo"
    // e ele será redirecionado para a tela principal do aplicativo (Ex: Feed de Eventos).
    router.push('/home'); // PRÓXIMA ROTA
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Qual a sua Vibe em Shows/Eventos?</Text>
        <Text style={styles.subtitle}>Selecione as opções que mais combinam com você.</Text>

        <View style={styles.vibesGrid}>
          {vibeOptions.map((vibe: string) => ( // Adicionado tipagem do parâmetro
            <TouchableOpacity
              key={vibe}
              style={[
                styles.vibeButton,
                selectedVibes.includes(vibe) && styles.selectedVibeButton
              ]}
              onPress={() => toggleVibe(vibe)}
            >
              <Text
                style={[
                  styles.vibeButtonText,
                  selectedVibes.includes(vibe) && styles.selectedVibeButtonText
                ]}
              >
                {vibe}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Finalizar Perfil"
          onPress={handleSubmit}
          disabled={selectedVibes.length === 0} // Desabilita se nada selecionado
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#e7f0fa', // Cor de fundo diferente
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  vibesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  vibeButton: {
    borderWidth: 1,
    borderColor: '#6a5acd', // Azul lavanda
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 7,
    backgroundColor: '#fff',
  },
  selectedVibeButton: {
    backgroundColor: '#6a5acd',
    borderColor: '#6a5acd',
  },
  vibeButtonText: {
    color: '#6a5acd',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedVibeButtonText: {
    color: '#fff',
  },
});

export default VibeScreen;