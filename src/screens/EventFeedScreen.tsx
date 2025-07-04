// src/screens/EventFeedScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // Componente StatusBar do Expo

// Defina uma interface para o tipo Evento
interface EventItem {
  id: string;
  name: string;
  artist: string;
  date: string;
  location: string;
  type: string;
  imageUrl: string;
  genres: string[];
}

// Dados de eventos mockados para demonstração
const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    name: 'Rock in Rio Brasil 2025',
    artist: 'Diversos Artistas de Rock e Pop',
    date: '13-22 de Setembro de 2025',
    location: 'Parque Olímpico, Rio de Janeiro',
    type: 'Festival',
    imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Rock+Rio', // Imagem de exemplo
    genres: ['Rock', 'Pop', 'Metal']
  },
  {
    id: '2',
    name: 'Show da Taylor Swift - The Eras Tour',
    artist: 'Taylor Swift',
    date: '10 de Novembro de 2025',
    location: 'Allianz Parque, São Paulo',
    type: 'Show',
    imageUrl: 'https://via.placeholder.com/150/C71585/FFFFFF?text=Taylor+S',
    genres: ['Pop']
  },
  {
    id: '3',
    name: 'Festival de Jazz de Montreux',
    artist: 'Vários Artistas de Jazz',
    date: '5-12 de Julho de 2025',
    location: 'Montreux, Suíça',
    type: 'Festival',
    imageUrl: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=Jazz+F',
    genres: ['Jazz', 'Blues']
  },
  {
    id: '4',
    name: 'Concerto da Orquestra Sinfônica',
    artist: 'Orquestra Filarmônica de SP',
    date: '25 de Outubro de 2025',
    location: 'Sala São Paulo, São Paulo',
    type: 'Concerto',
    imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=Classica',
    genres: ['Clássica']
  },
  {
    id: '5',
    name: 'Show do Ed Sheeran',
    artist: 'Ed Sheeran',
    date: '20 de Agosto de 2025',
    location: 'Estádio do Morumbi, São Paulo',
    type: 'Show',
    imageUrl: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=Ed+Sheeran',
    genres: ['Pop', 'Folk']
  },
  // Adicione mais eventos de exemplo aqui
];

const EventFeedScreen = () => {
  const events = MOCK_EVENTS;

  // Tipagem adicionada para o 'item'
  const renderEventItem = ({ item }: { item: EventItem }) => (
    <View style={styles.eventCard}>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.eventImage} /> */}
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventArtist}>{item.artist}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventType}>{item.type} | {item.genres.join(', ')}</Text>
        {/* Adicionar botão "Marcar Presença" futuramente */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BeatMates</Text>
        {/* Ícones de perfil e notificação virão aqui */}
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.feedListContent}
        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>Eventos Próximos a Você</Text>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyFeedText}>Nenhum evento encontrado para seus gostos.</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    padding: 15,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight! + 10 : 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 20,
    color: '#333',
  },
  feedListContent: {
    paddingBottom: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  eventArtist: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  eventDate: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyFeedText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default EventFeedScreen;