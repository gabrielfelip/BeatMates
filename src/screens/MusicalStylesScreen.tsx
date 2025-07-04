// src/screens/MusicalStylesScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router'; // Para navegação

const musicalStyles: string[] = [ // Adicionado tipagem para garantir que é um array de strings
  'Rock', 'Pop', 'Sertanejo', 'Eletrônica', 'MPB', 'Indie', 'Hip-Hop',
  'Clássica', 'Jazz', 'Blues', 'Reggae', 'Funk', 'Forró', 'Gospel',
  'Metal', 'Punk', 'Samba', 'Pagode', 'Axé', 'Country', 'R&B', 'Soul'
];

const MusicalStylesScreen = () => {
  // Corrigido a tipagem de useState para ser um array de strings
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const router = useRouter();

  // Corrigido a tipagem do parâmetro 'style'
  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleSubmit = () => {
    console.log('Estilos Musicais Selecionados:', selectedStyles);
    router.push('/profile/top-artists'); // PRÓXIMA ROTA
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seus Estilos Musicais Preferidos</Text>
        <Text style={styles.subtitle}>Selecione todos que você ama (mínimo de 3 recomendado)</Text>

        <View style={styles.stylesGrid}>
          {/* Corrigido a tipagem do parâmetro 'style' no .map */}
          {musicalStyles.map((style: string) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.styleButton,
                selectedStyles.includes(style) && styles.selectedStyleButton
              ]}
              onPress={() => toggleStyle(style)}
            >
              <Text
                style={[
                  styles.styleButtonText,
                  selectedStyles.includes(style) && styles.selectedStyleButtonText
                ]}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Próximo"
          onPress={handleSubmit}
          disabled={selectedStyles.length < 3}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#e0f2f7',
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
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  styleButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 7,
    backgroundColor: '#fff',
  },
  selectedStyleButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  styleButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedStyleButtonText: {
    color: '#fff',
  },
});

export default MusicalStylesScreen;