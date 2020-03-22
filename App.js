/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';
import renderif from './renderif';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [estado, setEstado] = useState();
  const [resultado, setResultado] = useState('');

  const calcular = () => {
    let real_altura = parseFloat(altura.replace(',', '.'));

    const estado = peso / (real_altura * 2);
    let resultado = '';
    
    // Menos do que 18,5 	Abaixo do peso
    if(estado < 18.5){
      resultado = 'Abaixo do peso';
    }
    // Entre 18,5 e 24,9 	Peso normal
    else if(estado > 18.5 && estado < 24.9){
      resultado = 'Peso normal';
    }
    // Entre 25 e 29,9 	Sobrepeso
    else if(estado > 25 && estado < 29.9){
      resultado = 'Sobrepeso';
    }
    // Entre 30 e 34,9 	Obesidade grau 1
    else if(estado > 30 && estado < 34.9){
      resultado = 'Obesidade grau 1';
    }
    // Entre 35 e 39,9 	Obesidade grau 2
    else if(estado > 35 && estado < 39.9){
      resultado = 'Obesidade grau 2';
    }
    // Mais do que 40 	Obesidade grau 3
    else if(estado > 40){
      resultado = 'Obesidade grau 3';
    }
    setEstado(estado);
    setResultado(`${Math.trunc(estado*100) / 100}: ${resultado}`);
  }

  const reiniciar = () => {
    setEstado('');
    setResultado('');
  }

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>
      <ScrollView style={styles.body} contentContainerStyle={styles.contentStyle}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Altura" keyboardType="numeric" style={styles.input} value={String(altura)} onChangeText={(text) => setAltura(text)} />
          <TextInput placeholder="Massa" keyboardType="numeric" style={styles.input} value={String(peso)} onChangeText={(text) => setPeso(text)}/>
        </View>

        {renderif(resultado=='')(
          <>
            <TouchableOpacity onPress={calcular} style={styles.botao}>
              <Text style={styles.botaoText}>Calcular</Text>
            </TouchableOpacity>
            <Text style={[styles.resultado, styles.descResultado]}>Clique no botão acima para obter o resultado</Text>
          </>
        )}

        {renderif(resultado!='') ( 
          <>
            <Text style={styles.resultado}>{resultado}</Text>
            <TouchableOpacity  onPress={reiniciar} style={styles.botao}>
              <Text style={styles.botaoText}>Reiniciar</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#99ccff',
  },
  contentStyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '100%',
  },
  titulo: {
    fontSize: 36,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#FFF',
    margin: 5,
    padding: 5,
    height: 60,
    fontSize: 36,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#99ccff',
    borderWidth: 1,
    width: '45%'
  },
  botao: {
    backgroundColor: '#3399ff',
    borderRadius: 5,
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  botaoText: {
    color: '#FFF',
    height: 60,
    fontSize: 36,
  },
  resultado: {
    color: '#666',
    height: 60,
    fontSize: 24,
  },
  descResultado: {
    fontSize: 16,
    height: 18
  }
});

export default App;
