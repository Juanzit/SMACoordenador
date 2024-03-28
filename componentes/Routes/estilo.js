import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './../Home'
import {Text} from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Turmas from '../Turmas';
import Logo from '../Logo';
import Parq from '../Parq';
import PerfilCoordenador from '../PerfilCoordenador';
import Notificacoes from '../Notificacoes';
import NetInfo from "@react-native-community/netinfo"
import { collection, getDocs } from 'firebase/firestore';
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { coordenadorLogado } from '../LoginScreen';


const Tab = createBottomTabNavigator()

export default function Routes(){
    const [carregando, setCarregando] = useState(true)
    const [alunos, setAlunos] = useState([])
    const [carregandoAlunos, setCarregandoAlunos] = useState(true)
    const [conexao, setConexao] = useState(true);
    
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          setConexao(state.type === 'wifi' || state.type === 'cellular')
        })
        return () => {
          unsubscribe()
        }
      }, [conexao])

      useEffect(() => {
        fetchAlunosWifi()
      }, [])
    const fetchAlunosWifi = async () => {
        const newArrayAlunos = [];
    
        try {
    
          const academiaRef = collection(firebaseBD, 'Academias');
          const querySnapshot = await getDocs(academiaRef);
    
          for (const academiaDoc of querySnapshot.docs) {
            const academiaNome = academiaDoc.get('nome');
    
            if (academiaNome === coordenadorLogado.getAcademia()) {
                const alunoRef = collection(
                  firebaseBD,
                  'Academias',
                  coordenadorLogado.getAcademia(),
                  'Alunos',
                );
                const alunoSnapshot = await getDocs(alunoRef);
    
                for (const alunoDoc of alunoSnapshot.docs) {
                  const alunoData = alunoDoc.data();
    
                  const avaliacoesRef = collection(
                    firebaseBD,
                    'Academias',
                    coordenadorLogado.getAcademia(),
                    'Alunos',
                    `${alunoData.email}`,
                    'Avaliações'
                  );
                  const avaliacoesSnapshot = await getDocs(avaliacoesRef);
                  alunoData.avaliacoes = avaliacoesSnapshot.docs.map(avaliacaoDoc => avaliacaoDoc.data());
    
                  const fichasRef = collection(
                    firebaseBD,
                    'Academias',
                    coordenadorLogado.getAcademia(),
                    'Alunos',
                    `${alunoData.email}`,
                    'FichaDeExercicios'
                  );
                  const fichasSnashot = await getDocs(fichasRef);
                  let index = 0;
                  fichasSnashot.forEach(async (fichaDoc) => {
    
                    const fichaData = fichaDoc.data()
                    alunoData.fichas = fichasSnashot.docs.map(fichaDoc => fichaDoc.data());
    
                    const exerciciosRef = collection(
                      firebaseBD,
                      'Academias',
                      coordenadorLogado.getAcademia(),
                      'Alunos',
                      `${alunoData.email}`,
                      'FichaDeExercicios',
                      fichaDoc.id,
                      'Exercicios'
                    );
                    const arrayExerciciosFicha = []
                    const exerciciosSnapshot = await getDocs(exerciciosRef);
                    exerciciosSnapshot.forEach((exDoc) => {
                      arrayExerciciosFicha.push(exDoc.data())
                    })
                    alunoData.fichas[index].exercicios = arrayExerciciosFicha
                    index++
                  }
                  )
                  newArrayAlunos.push(alunoData)
                }
    
              
            }
          }
          setAlunos(newArrayAlunos);
          setCarregando(false)
    
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      };
    
    

      if(!carregando){
        return (
            <Tab.Navigator   screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#182128',
                    borderTopColor: '#182128'
                    
                },
                tabBarActiveTintColor: '#0066FF',
                tabBarInactiveTintColor: '#CFCDCD',            
              }}>
                <Tab.Screen 
                name="Home" 
                component={Home}
                initialParams={{ alunos }}
                options={{
                    tabBarIcon: ({size, color}) => (<Ionicons name="home-outline" size={size} color={color} />)
                }}/>
                <Tab.Screen 
                name="Turmas" 
                component={Turmas}
                options={{
                    tabBarIcon: ({size, color}) => (<Ionicons name="people" size={size} color={color} />)
                }}/>
                <Tab.Screen 
                name="Perfil" 
                component={PerfilCoordenador}
                options={{
                    tabBarIcon: ({size, color}) => (<AntDesign name="user" size={size} color={color} />)
                }}/>
                <Tab.Screen 
                name="Notificações" 
                component={Notificacoes}
                options={{
                    tabBarIcon: ({size, color}) => (<Ionicons name="notifications-outline" size={size} color={color} />)
    
                }}/>
    
            </Tab.Navigator>
        )
      } else {
        return(
            <Text>
                Carregando...
            </Text>
        )
      }
}