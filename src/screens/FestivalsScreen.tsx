// src/screens/FestivalsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // Para o ícone de remover (instalação necessária se não tiver)

// Interface para tipar os Festivais
interface FestivalItem {
  id: string;
  name: string;
}

// Lista de festivais de exemplo para simular sugestões ou busca.
// Na vida real, isso viria de uma API.
const MOCK_FESTIVALS: FestivalItem[] = [
  { id: 'f1', name: 'Rock in Rio Brasil' },
  { id: 'f2', name: 'Lollapalooza Brasil' },
  { id: 'f3', name: 'Tomorrowland Brasil' },
  { id: 'f4', name: 'The Town' },
  { id: 'f5', name: 'Primavera Sound São Paulo' },
  { id: 'f6', name: 'MITA Festival' },
  { id: 'f7', name: 'João Rock' },
  { id: 'f8', name: 'Planeta Atlântida' },
  { id: 'f9', name: 'Ultra Brasil' },
  { id: 'f10', name: 'Warung Day Festival' },
  { id: 'f11', name: 'XXXperience' },
  { id: 'f12', name: 'Gopala Folk Festival' },
  { id: 'f13', name: 'Psychic Carnival' },
  { id: 'f14', name: 'Rock in Rio Lisboa' },
  { id: 'f15', name: 'Glastonbury' },
  { id: 'f16', name: 'Coachella' },
  { id: 'f17', name: 'Tomorrowland (Bélgica)' },
  { id: 'f18', name: 'Sziget Festival' },
  { id: 'f19', name: 'Exit Festival' },
  { id: 'f20', name: 'Roskilde Festival' },
  { id: 'f21', name: 'Montreux Jazz Festival' },
  { id: 'f22', name: 'Fuji Rock Festival' },
  { id: 'f23', name: 'Reading & Leeds' },
  { id: 'f24', name: 'Download Festival' }
];

const FestivalsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFestivals, setSelectedFestivals] = useState<FestivalItem[]>([]); // Array de objetos FestivalItem
  const router = useRouter();

  // Função para adicionar um festival
  const addFestival = (festivalItem: FestivalItem) => {
    if (festivalItem && !selectedFestivals.some(f => f.id === festivalItem.id)) { // Verifica pelo ID
      setSelectedFestivals([...selectedFestivals, festivalItem]);
      setSearchTerm(''); // Limpa o campo de busca após adicionar
    }
  };

  // Função para remover um festival
  const removeFestival = (festivalToRemoveId: string) => { // Recebe o ID para remover
    setSelectedFestivals(selectedFestivals.filter(festival => festival.id !== festivalToRemoveId));
  };

  // Simula a busca: retorna festivais que incluem o termo digitado e que não estão já selecionados
  const filteredFestivals = MOCK_FESTIVALS.filter(festival =>
    festival.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedFestivals.some(sf => sf.id === festival.id) // Garante que não sugere o que já está selecionado
  );

  const handleSubmit = () => {
    if (selectedFestivals.length < 3) {
      Alert.alert('Atenção', 'Por favor, selecione no mínimo 3 festivais favoritos.');
      return;
    }
    console.log('Festivais Favoritos Selecionados:', selectedFestivals);
    router.push('/profile/vibe'); // PRÓXIMA ROTA
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Seus Festivais de Música Preferidos</Text>
        <Text style={styles.subtitle}>Selecione no mínimo 3 festivais que você gostaria de ir.</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ou adicionar festival..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {searchTerm.length > 0 && filteredFestivals.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {filteredFestivals.slice(0, 5).map((festival) => ( // Mostra até 5 sugestões
              <TouchableOpacity
                key={festival.id} // Use o ID do festival
                style={styles.suggestionButton}
                onPress={() => addFestival(festival)} // Passa o objeto completo do festival
              >
                <Text style={styles.suggestionButtonText}>{festival.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {searchTerm.length > 0 && filteredFestivals.length === 0 && (
            <Text style={styles.noResultsText}>Nenhum festival encontrado nas sugestões. Tente digitar um nome diferente.</Text>
        )}

        <Text style={styles.sectionTitle}>Festivais Selecionados ({selectedFestivals.length}/3+)</Text>
        <View style={styles.selectedFestivalsContainer}>
          {selectedFestivals.length === 0 ? (
            <Text style={styles.placeholderText}>Nenhum festival selecionado ainda.</Text>
          ) : (
            <FlatList
              data={selectedFestivals}
              keyExtractor={(item) => item.id} // Use o ID do festival para a key
              numColumns={2} // Duas colunas para os festivais selecionados
              renderItem={({ item }) => (
                <View style={styles.selectedFestivalTag}>
                  <Text style={styles.selectedFestivalText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeFestival(item.id)}> {/* Passa o ID para remover */}
                    <Entypo name="circle-with-cross" size={20} color="#FF6347" />
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.selectedFestivalsList}
            />
          )}
        </View>

        <Button
          title="Próximo"
          onPress={handleSubmit}
          disabled={selectedFestivals.length < 3} // Desabilita o botão se menos de 3 festivais
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f7f0', // Cor de fundo diferente
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
  selectedFestivalsContainer: {
    width: '100%',
    minHeight: 100,
    padding: 10,
    marginBottom: 30,
  },
  selectedFestivalsList: {
    justifyContent: 'center',
  },
  selectedFestivalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0ffe0', // Verde claro
    borderColor: '#28a745', // Verde
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    flexShrink: 1,
  },
  selectedFestivalText: {
    fontSize: 15,
    color: '#28a745',
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

export default FestivalsScreen;