import { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Platform } from 'react-native';

import TelaCadastro from './componentes/telas/Cadastro'
import ExibirDados from './componentes/telas/ExibirDados'

const Stack = createNativeStackNavigator();

//Criação de um tema padrão para o app (Headers, cor de fundo, texto, etc)
const Tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: 'rgb(217, 50, 50)',
    background: 'rgb(255, 255, 255)',
    text: 'rgb(255, 255, 255)',
  },
};


export default function App() {
  const [dadosAluno, setDadosAluno] = useState(null);

  return (
    <NavigationContainer theme={Tema}>
      <Stack.Navigator
        initialRouteName="TelaCadastro"
        screenOptions={{
          headerShown: true,
          headerStatusBarHeight:
            Platform.OS === 'android' ? StatusBar.currentHeight : undefined,
        }}
      >
        <Stack.Screen name="TelaCadastro" options={{ title: 'Cadastro de Crachá' }}>
          {(props) => (
            <TelaCadastro {...props} dadosAluno={dadosAluno}/>
          )}
        </Stack.Screen>
        <Stack.Screen name="ExibirDados" options={{ title: 'Dados cadastrados' }}>
          {(props) => (
            <ExibirDados {...props} dadosAluno={dadosAluno}/>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}