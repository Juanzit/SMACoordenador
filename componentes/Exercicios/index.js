import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import estilo from '../estilo';
import { collection, getDocs } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercicio } from '../../classes/Exercicio';
import { coordenadorLogado } from '../LoginScreen';
import Cardios from './Cardios';
import ForcaInferiores from './ForcaInferiores';
import ForcaSuperiores from './ForcaSuperiores';
import Alongamentos from './Alongamentos';

export default ({ navigation }) => {
  const [exercicioData, setExercicioData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Arrays para armazenar exercícios de cada tipo
  const [alongamentoExercicios, setAlongamentoExercicios] = useState([]);
  const [aerobicoExercicios, setAerobicoExercicios] = useState([]);
  const [forcaExercicios, setForcaExercicios] = useState([]);

  useEffect(() => {
    fetchExercicioData();
  }, []);

  const fetchExercicioData = async () => {
    try {
      const exercicios = []
      const exerciciosForca = []
      const exerciciosCardio = []
      const exercicioRef1 = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "ExerciciosAlongamento");
      const exercicioSnapshot = await getDocs(exercicioRef1);
      for (const exercicioDoc of exercicioSnapshot.docs) {
        const exercicioData = exercicioDoc.data();
        console.log('exercicioData', exercicioData)
        exercicios.push(exercicioData);
      }
      const exercicioRef2 = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "ExerciciosForça");
      const exercicioSnapshot2 = await getDocs(exercicioRef2);
      for (const exercicioDoc of exercicioSnapshot2.docs) {
        const exercicioData = exercicioDoc.data();
        console.log('exercicioData', exercicioData)
        exerciciosForca.push(exercicioData);
      }
      const exercicioRef3 = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "ExerciciosAerobicos");
      const exercicioSnapshot3 = await getDocs(exercicioRef3);
      for (const exercicioDoc of exercicioSnapshot3.docs) {
        const exercicioData = exercicioDoc.data();
        console.log('exercicioData', exercicioData)
        exerciciosCardio.push(exercicioData);
      }

      setAerobicoExercicios( [...exerciciosCardio, ...Cardios])
      setForcaExercicios( [...exerciciosForca, ...ForcaSuperiores[0].exercicios, ...ForcaSuperiores[1].exercicios, ...ForcaSuperiores[2].exercicios,
        ...ForcaSuperiores[3].exercicios, ...ForcaSuperiores[4].exercicios, ...ForcaSuperiores[5].exercicios,
        ...ForcaSuperiores[6].exercicios, ...ForcaSuperiores[7].exercicios, ...ForcaSuperiores[8].exercicios,
        ...ForcaSuperiores[9].exercicios, ...ForcaSuperiores[10].exercicios, ...ForcaSuperiores[11].exercicios, 
        ...ForcaInferiores[0].exercicios, ...ForcaInferiores[1].exercicios
      
      ])
      
      
      setAlongamentoExercicios( [...exercicios, ...Alongamentos[0].exercicios, ...Alongamentos[2].exercicios,...Alongamentos[3].exercicios
      ,...Alongamentos[4].exercicios, ...Alongamentos[5].exercicios, ...Alongamentos[6].exercicios, ...Alongamentos[7].exercicios
      ,...Alongamentos[8].exercicios, ...Alongamentos[9].exercicios, ...Alongamentos[10].exercicios, ...Alongamentos[11].exercicios
      ,...Alongamentos[12].exercicios, ...Alongamentos[13].exercicios, ...Alongamentos[14].exercicios, ...Alongamentos[15].exercicios
      ,...Alongamentos[16].exercicios, ...Alongamentos[17].exercicios, ...Alongamentos[18].exercicios, ...Alongamentos[19].exercicios]
      
      
      
      );
    } catch (error) {
      console.log(error);
      console.log('Sem exercicios cadastrados')
    }
  }

  console.log(ForcaInferiores.length)
  return (
    <SafeAreaView style={[estilo.corLightMenos1, { flex: 1 }]}>
      <View style={[style.containerBotao, estilo.corLightMenos1]}>

        <View >
          {/* Botão exercícios do tipo alongamento */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: alongamentoExercicios, tipo: 'Alongamentos' })}
          >
            <Text style={estilo.tituloH427px}>ALONGAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo aeróbico */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: aerobicoExercicios })}
          >
            <Text style={estilo.tituloH427px} >AERÓBICO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo força membros superiores */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão para cadastrar exercicios*/}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
            onPress={() => navigation.navigate('Cadastro Exercicios')}
          >
            <Text style={[estilo.tituloH427px, estilo.textoCorLight]}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão para editar os exercicios */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
            onPress={() => navigation.navigate('Editar Exercicios')}
          >
            <Text style={[estilo.tituloH427px, estilo.textoCorLight]}>EDITAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({

  containerBotao: {
    marginVertical: '5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '80%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
  },
  modalText: {
    fontSize: 18,
    color: "#FF6262",
    marginBottom: 20,
  },
});
