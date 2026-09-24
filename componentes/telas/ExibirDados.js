import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function TelaExibirDados({ route, navigation }) {
  // Recebe os dados passados através do react navigation
  const {
    nome = 'Não informado',
    rm = 'XXXXX',
    telefone = 'Não informado',
    data = 'Não informada',
    foto = null,
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Dados Cadastrados</Text>

        <View style={styles.card}>
          <View style={styles.avatarWrapper}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>Sem Foto</Text>
              </View>
            )}
          </View>

          <Text style={styles.nomeText}>{nome}</Text>

          <View style={styles.divisor} />

          <View style={styles.infoGroup}>
            <Text style={styles.label}>RM:</Text>
            <Text style={styles.valor}>{rm}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.valor}>{telefone}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Data de Cadastro:</Text>
            <Text style={styles.valor}>{data}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'TelaCadastro' }],
            })
          }>
          <Text style={styles.textoBotao}>Voltar / Novo Cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#16c911',
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  nomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  divisor: {
    height: 1,
    backgroundColor: '#e2e8f0',
    width: '100%',
    marginVertical: 16,
  },
  infoGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
  },
  valor: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: 'rgb(22, 201, 17)',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
