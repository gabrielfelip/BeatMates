// src/screens/TopArtistsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // Para o ícone de remover artista

// Interface para tipar os artistas (essencial para TypeScript)
interface ArtistItem {
  id: string;
  name: string;
}

// Dados de artistas mockados para simular sugestões ou busca.
// Na vida real, isso viria de uma API (Spotify, Last.fm, etc.)
const MOCK_ARTISTS: ArtistItem[] = [
  { id: '1', name: 'Queen' },
  { id: '2', name: 'The Beatles' },
  { id: '3', name: 'Led Zeppelin' },
  { id: '4', name: 'Pink Floyd' },
  { id: '5', name: 'AC/DC' },
  { id: '6', name: 'Michael Jackson' },
  { id: '7', name: 'Madonna' },
  { id: '8', name: 'Beyoncé' },
  { id: '9', name: 'Taylor Swift' },
  { id: '10', name: 'Ed Sheeran' },
  { id: '11', name: 'Coldplay' },
  { id: '12', name: 'Imagine Dragons' },
  { id: '13', name: 'Maroon 5' },
  { id: '14', name: 'Linkin Park' },
  { id: '15', name: 'Metallica' },
  { id: '16', name: 'Iron Maiden' },
  { id: '17', name: 'Guns N Roses' },
  { id: '18', name: 'Red Hot Chili Peppers' },
  { id: '19', name: 'Nirvana' },
  { id: '20', name: 'System Of A Down' },
  { id: '21', name: 'Eminem' },
  { id: '22', name: 'Drake' },
  { id: '23', name: 'Kendrick Lamar' },
  { id: '24', name: 'Bad Bunny' },
  { id: '25', name: 'Anitta' },
  { id: '26', name: 'Gusttavo Lima' },
  { id: '27', name: 'Marília Mendonça' },
  { id: '28', name: 'Jorge & Mateus' },
  { id: '29', name: 'Alok' },
  { id: '30', name: 'Vintage Culture' },
  { id: '31', name: 'Capital Inicial' },
  { id: '32', name: 'Charlie Brown Jr.' },
  { id: '33', name: 'Legião Urbana' },
  { id: '34', name: 'Titãs' },
  { id: '35', name: 'Tim Maia' },
  { id: '36', name: 'Elis Regina' },
  { id: '37', name: 'Gilberto Gil' }
];


const TopArtistsScreen = () => {
  console.log('TopArtistsScreen está sendo renderizada!'); // Log para depuração

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtists, setSelectedArtists] = useState<ArtistItem[]>([]); // Array de objetos ArtistItem
  const router = useRouter();

  // Função para adicionar um artista
  const addArtist = (artistItem: ArtistItem) => {
    if (artistItem && !selectedArtists.some(a => a.id === artistItem.id)) { // Verifica pelo ID
      setSelectedArtists([...selectedArtists, artistItem]);
      setSearchTerm(''); // Limpa o campo de busca após adicionar
    }
  };

  // Função para remover um artista
  const removeArtist = (artistToRemoveId: string) => { // Recebe o ID para remover
    setSelectedArtists(selectedArtists.filter(artist => artist.id !== artistToRemoveId));
  };

  // Simula a busca: retorna artistas que incluem o termo digitado e que não estão já selecionados
  const filteredArtists = MOCK_ARTISTS.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedArtists.some(sa => sa.id === artist.id) // Garante que não sugere o que já está selecionado
  );

  const handleSubmit = () => {
    if (selectedArtists.length < 5) {
      Alert.alert('Atenção', 'Por favor, selecione no mínimo 5 artistas favoritos.');
      return;
    }
    console.log('Artistas Favoritos Selecionados:', selectedArtists);
    router.push('/profile/dream-artists'); // PRÓXIMA ROTA
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seus Artistas Favoritos</Text>
        <Text style={styles.subtitle}>Selecione no mínimo 5 artistas que você mais gosta.</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ou adicionar artista..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          // Sem onSubmitEditing para adicionar o termo digitado diretamente,
          // Focamos em selecionar das sugestões para garantir artistas válidos.
          // Se quiser adicionar um botão "Adicionar" para o termo digitado, pode ser implementado.
        />

        {searchTerm.length > 0 && filteredArtists.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {filteredArtists.slice(0, 5).map((artist) => ( // Mostra até 5 sugestões
              <TouchableOpacity
                key={artist.id} // Use o ID do artista
                style={styles.suggestionButton}
                onPress={() => addArtist(artist)} // Passa o objeto completo do artista
              >
                <Text style={styles.suggestionButtonText}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {searchTerm.length > 0 && filteredArtists.length === 0 && (
            <Text style={styles.noResultsText}>Nenhum artista encontrado nas sugestões. Tente digitar um nome diferente.</Text>
        )}

        <Text style={styles.sectionTitle}>Artistas Selecionados ({selectedArtists.length}/5+)</Text>
        <View style={styles.selectedArtistsContainer}>
          {selectedArtists.length === 0 ? (
            <Text style={styles.placeholderText}>Nenhum artista selecionado ainda.</Text>
          ) : (
            <FlatList
              data={selectedArtists}
              keyExtractor={(item) => item.id} // Use o ID do artista para a key
              numColumns={2} // Duas colunas para os artistas selecionados
              renderItem={({ item }) => (
                <View style={styles.selectedArtistTag}>
                  <Text style={styles.selectedArtistText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeArtist(item.id)}> {/* Passa o ID para remover */}
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
          disabled={selectedArtists.length < 5} // Desabilita o botão se menos de 5 artistas
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f4f7',
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
    minHeight: 100, // Altura mínima para mostrar placeholder
    padding: 10,
    marginBottom: 30,
  },
  selectedArtistsList: {
    justifyContent: 'center',
  },
  selectedArtistTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff', // Azul claro
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    flexShrink: 1, // Permite que o texto encolha
  },
  selectedArtistText: {
    fontSize: 15,
    color: '#007AFF',
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

export default TopArtistsScreen;