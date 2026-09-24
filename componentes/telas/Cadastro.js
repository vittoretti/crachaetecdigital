import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { MascaraTel } from '../mascaras/mascaraTel';

export default function TelaCadastro({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [rm, setRM] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState(null);
  const { colors } = useTheme();
  const [show, setShow] = useState(false);

  const [data, setData] = useState(new Date());

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const dataSelecionada = data.toLocaleDateString('pt-BR');

  // Máscara para telefone
  function Mascara2(value) {
    const telmascarado = MascaraTel(value);
    setTelefone(telmascarado);
  }

  //Constante para selecionar algo da galeria ou tirar foto
  const selecionarFoto = () => {
    Alert.alert(
      'Foto de Perfil',
      'Escolha uma opção:',
      [
        {
          text: 'Tirar Foto',
          onPress: tirarFoto,
        },
        {
          text: 'Escolher da Galeria',
          onPress: escolherDaGaleria,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'É necessário acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'É necessário acesso à câmara.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={(flex = 1)}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <ScrollView style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.paragraph}>Insira suas informações:</Text>
          //Botão para selecionar foto
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={selecionarFoto}>
              {foto ? (
                <Image source={{ uri: foto }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>+ Foto</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.tituloinput}>Nome completo:</Text>
          <TextInput
            style={styles.caixatexto}
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
          <Text style={styles.tituloinput}>RM:</Text>
          <TextInput
            style={styles.caixatexto}
            placeholder="XXXXX"
            value={rm}
            onChangeText={setRM}
            maxLength={5}
            keyboardType="number-pad"
          />
          <Text style={styles.tituloinput}>Telefone:</Text>
          <TextInput
            style={styles.caixatexto}
            placeholder="(00) 00000-0000"
            value={telefone}
            onChangeText={Mascara2}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <Text style={styles.tituloinput}>Insira sua data de nascimento:</Text>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text style={[styles.caixatexto, styles.caixadata]}>
              {dataSelecionada}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={data}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              if (!nome.trim() || !rm.trim() || !telefone.trim()) {
                Alert.alert(
                  'Erro no Cadastro',
                  'Por favor, preencha todos os dados para finalizar seu crachá.'
                );
              } else {
                navigation.navigate('ExibirDados', {
                  nome: nome,
                  rm: rm,
                  telefone: telefone,
                  data: dataSelecionada,
                  foto: foto, 
                });
              }
            }}>
            <Text style={styles.textobotao}>Finalizar cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tituloinput: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 14,
    marginTop: 10,
  },
  subcontainer: {
    width: '100%',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 15,
  },
  avatarButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e2e8f0',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: 'bold',
  },
  caixatexto: {
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    height: 50,
    marginHorizontal: 14,
    borderColor: 'black',
  },
  caixadata: {
    lineHeight: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  botao: {
    borderRadius: 10,
    backgroundColor: 'rgb(217, 50, 50)',
    margin: 10,
    marginTop: 20,
  },
  textobotao: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
});
