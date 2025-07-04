// src/screens/BasicInfoScreen.tsx
import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native'; // View foi re-adicionada para garantir que está importada, se for usar no futuro
import { useRouter } from 'expo-router';


const BasicInfoScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    // Por enquanto, vamos apenas exibir os dados para confirmar que estão sendo capturados
    Alert.alert(
      'Dados do Perfil',
      `Nome: ${name}\nIdade: ${age}\nGênero: ${gender}\nLocalização: ${location}\nBio: ${bio}`
    );
    // Futuramente, aqui será a lógica para salvar os dados no backend ou navegar
    router.push('/profile/musical-styles');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Conte-nos sobre você!</Text>

      <Text style={styles.label}>Nome de Exibição</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome ou apelido"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Sua idade"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Gênero</Text>
      {/* Futuramente, usaremos um componente de seleção de gênero aqui */}
      <TextInput
        style={styles.input}
        placeholder="Masculino, Feminino, Não Binário..."
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Localização (Cidade/Estado)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Caçapava, SP"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Uma Pequena Bio (Opcional)</Text>
      <TextInput
        style={styles.inputArea}
        placeholder="Fale um pouco sobre você e sua paixão por música!"
        multiline
        numberOfLines={4}
        value={bio}
        onChangeText={setBio}
      />

      {/* O botão agora chama a função handleSubmit */}
      <Button title="Próximo" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
    color: '#555',
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputArea: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default BasicInfoScreen;