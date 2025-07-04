// src/screens/DreamArtistsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button, KeyboardAvoidingView, Platform, ScrollView,  } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // Para o ícone de remover artista

// Interface para tipar os artistas (reutilizamos a mesma)
interface ArtistItem {
  id: string;
  name: string;
}

// Lista de artistas de exemplo (pode ser a mesma ou diferente da de Top Artists)
const MOCK_DREAM_ARTISTS: ArtistItem[] = [
  { id: 'da1', name: 'Pink Floyd' },
  { id: 'da2', name: 'Queen' },
  { id: 'da3', name: 'Led Zeppelin' },
  { id: 'da4', name: 'Beatles' },
  { id: 'da5', name: 'Freddy Mercury' },
  { id: 'da6', name: 'Jimi Hendrix' },
  { id: 'da7', name: 'Elvis Presley' },
  { id: 'da8', name: 'The Doors' },
  { id: 'da9', name: 'Legião Urbana' },
  { id: 'da10', name: 'Mamonas Assassinas' },
  { id: 'da11', name: 'Amy Winehouse' },
  { id: 'da12', name: 'Nirvana' },
  // Adicione mais artistas que as pessoas poderiam sonhar em ver
];

const DreamArtistsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dreamArtists, setDreamArtists] = useState<ArtistItem[]>([]); // Array de artistas dos sonhos
  const router = useRouter();

  // Função para adicionar um artista dos sonhos
  const addDreamArtist = (artistItem: ArtistItem) => {
    if (artistItem && !dreamArtists.some(a => a.id === artistItem.id)) {
      setDreamArtists([...dreamArtists, artistItem]);
      setSearchTerm(''); // Limpa o campo de busca após adicionar
    }
  };

  // Função para remover um artista dos sonhos
  const removeDreamArtist = (artistToRemoveId: string) => {
    setDreamArtists(dreamArtists.filter(artist => artist.id !== artistToRemoveId));
  };

  // Simula a busca: retorna artistas que incluem o termo digitado e que não estão já selecionados
  const filteredDreamArtists = MOCK_DREAM_ARTISTS.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !dreamArtists.some(da => da.id === artist.id)
  );

  const handleSubmit = () => {
    // Não há um mínimo obrigatório aqui, mas podemos adicionar se quisermos forçar.
    // Alert.alert('Artistas dos Sonhos', `Artistas selecionados: ${dreamArtists.map(a => a.name).join(', ')}`);
    console.log('Artistas dos Sonhos Selecionados:', dreamArtists);
    router.push('/profile/festivals'); // PRÓXIMA ROTA
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Artistas que Sonha em Ver ao Vivo</Text>
        <Text style={styles.subtitle}>Liste artistas ou bandas que você adoraria ver em um show, mas talvez não tenha tido a chance.</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ou adicionar artista..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {searchTerm.length > 0 && filteredDreamArtists.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {filteredDreamArtists.slice(0, 5).map((artist) => ( // Mostra até 5 sugestões
              <TouchableOpacity
                key={artist.id}
                style={styles.suggestionButton}
                onPress={() => addDreamArtist(artist)}
              >
                <Text style={styles.suggestionButtonText}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {searchTerm.length > 0 && filteredDreamArtists.length === 0 && (
            <Text style={styles.noResultsText}>Nenhum artista encontrado nas sugestões. Tente digitar um nome diferente.</Text>
        )}

        <Text style={styles.sectionTitle}>Artistas na Sua Lista dos Sonhos ({dreamArtists.length})</Text>
        <View style={styles.selectedArtistsContainer}>
          {dreamArtists.length === 0 ? (
            <Text style={styles.placeholderText}>Nenhum artista na lista dos sonhos ainda.</Text>
          ) : (
            <FlatList
              data={dreamArtists}
              keyExtractor={(item) => item.id}
              numColumns={2} // Duas colunas
              renderItem={({ item }) => (
                <View style={styles.selectedArtistTag}>
                  <Text style={styles.selectedArtistText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeDreamArtist(item.id)}>
                    <Entypo name="circle-with-cross" size={20} color="#FF6347" />
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.selectedArtistsList}
            />
          )}
        </View>

        <Button
          title="Próximo"
          onPress={handleSubmit}
          // Não há desabilitação por quantidade mínima para artistas dos sonhos
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f7f0e0', // Cor de fundo da tela
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
  searchInput: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  suggestionsContainer: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
  },
  suggestionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionButtonText: {
    fontSize: 16,
    color: '#555',
  },
  noResultsText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  selectedArtistsContainer: {
    width: '100%',
    minHeight: 100,
    padding: 10,
    marginBottom: 30,
  },
  selectedArtistsList: {
    justifyContent: 'center',
  },
  selectedArtistTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0', // Laranja claro
    borderColor: '#ff9800', // Laranja
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    flexShrink: 1,
  },
  selectedArtistText: {
    fontSize: 15,
    color: '#ff9800',
    marginRight: 8,
    flexShrink: 1,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default DreamArtistsScreen;