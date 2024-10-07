import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import estilo from "./estilo"
import Logo from "./Logo"
import { MaterialCommunityIcons, AntDesign,Foundation } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { coordenadorLogado } from "./LoginScreen";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default ({ route, navigation }) => {
    const [conexao, setConexao] = useState(true);
    const {alunos} = route.params 

    console.log(alunos)
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
        unsubscribe()
        }
    }, [])

    return (
    <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
      <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} scrollEnabled={true}>

        <View style={style.area}>

            <View style={style.areaBotoes}>
                  <View style={style.containerBotao}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Analise do Programa de Treino', { alunos: alunos })}>
                      <View style={style.iconeBotao}>
                      <Foundation name="clipboard-pencil" size={120} color="white" />
                      </View>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MONTAR TREINO</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.containerBotao}>
                    <TouchableOpacity 
                      style={[estilo.corPrimaria, style.botao]} 
                      onPress={() => navigation.navigate('Seleção Aluno Análise do Programa de Treino', { alunos })}>
                      <View style={style.iconeBotao}>
                        <MaterialCommunityIcons name="clipboard-text-search-outline" size={110} color="white" />
                      </View>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>
                        AVALIAÇÕES E FICHAS
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={style.areaBotoes}>
                <View style={style.containerBotao}>
                  <TouchableOpacity 
                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                    onPress={() => navigation.navigate('Evolução')} disabled={!conexao}>
                  <View style={style.iconeBotao}>
                    <AntDesign name="linechart" size={110} color="white" />
                  </View>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>
                    EVOLUÇÃO DO TREINO {!conexao ? "Offline" : null}
                  </Text>
                  </TouchableOpacity>
                </View>

                <View style={style.containerBotao}>
                  <TouchableOpacity 
                    style={[estilo.corPrimaria, style.botao]} 
                    onPress={() => navigation.navigate('Seleção Aluno CSV')}>
                    <View style={style.iconeBotao}>
                      <MaterialCommunityIcons name="file-export" size={110} color="white" />
                    </View>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>
                      EXPORTAR DADOS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            <View style={style.areaBotoes}>
              <View style={style.containerBotao}>
                <TouchableOpacity 
                  style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                  onPress={() => navigation.navigate('Chat')} disabled={!conexao}>
                  <View style={style.iconeBotao}>
                    <AntDesign name="wechat" size={110} color="white" />
                  </View>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>
                    MENSAGENS {!conexao ? "Offline" : null}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[style.containerBotao]} >
              <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => { navigation.navigate('Nova avaliação', { alunos: alunos }) }}>
              <View style={[style.iconeBotao]}>
                <MaterialCommunityIcons name="clipboard-list-outline" size={120} color="white" />
              </View>
              <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>REALIZAR AVALIAÇÃO</Text>
              </TouchableOpacity>
              </View>
              </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
        flex: 1,
        //height: '100%',
    },
    areaLogo: {
        paddingTop: '8%',
        height: '10%',
    },
    area: {
        flex: 1,
        marginTop: '10%'
    },
    areaBotoes: {
        height: '30%',
        marginTop: '5%',
        flex: 1,
        //width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '80%'
    },
    containerBotao: {
      width: '40%',
      height: '110%',
      paddingBottom: 20,
      paddingBottom: 30,
      paddingTop: 10
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        padding: 5
    },
    iconeBotao: {
        padding: 5,
    },
    textoBotao: {
        paddingBottom: 5,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
