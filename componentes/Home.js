import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import estilo from "./estilo"
import Logo from "./Logo"
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { coordenadorLogado } from "./LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default ({route,navigation}) => {

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
    console.log(coordenadorLogado.getAcademia())
    return (
        
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
            <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} scrollEnabled={true} >

                    <View style={style.areaLogo}>
                        <Logo />
                    </View>

                    <View style={style.areaFrase}>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado]}>Boas vindas { coordenadorLogado.getNome() || 'Coordenador'}!</Text>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado]}>Sua Academia: {coordenadorLogado.getAcademia()}</Text>
                    </View>

                    <View style={style.area}>

                        <View style={style.areaBotoes}>
                            <View style={style.containerBotao}>
                                <TouchableOpacity 
                                    style={[estilo.corPrimaria, style.botao]} 
                                    onPress={() => navigation.navigate('Perfil Academia')}>
                                <View style={[style.iconeBotao]}>
                                    <FontAwesome5 name="building" size={120} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>ACADEMIA</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.containerBotao}>
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate("Funções Professor", {alunos})} disabled={!conexao}>
                                <View style={[ style.iconeBotao]}>
                                    <MaterialIcons name="smartphone" size={120} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>FUNÇÕES PROFESSOR</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                        <View style={style.areaBotoes}>
                            <View style={style.containerBotao}  >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate("Exercicios")} >
                                <View style={[ style.iconeBotao]}>
                                    <Ionicons name="barbell-outline" size={120} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EXERCICIOS</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.containerBotao}>
                                <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Testes')}>
                                    <View style={[style.iconeBotao]}>
                                        <Ionicons name="body-outline" size={120} color="white" />
                                    </View>
                                    <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>TESTES</Text>
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
        marginTop: '5%',
        flex: 1,
        backgroundColor: 'white'
        //height: '120%',
    },
    areaLogo: {
        paddingTop: '8%',
        height: '10%',
    },
    areaFrase: {
        top: 40,
        marginVertical: '4%',
        height: '5%',
    },
    area: {
        flex: 1,
        marginTop: '20%'
    },
    areaBotoes: {
        height: '30%',
        marginTop: '3%',
        flex: 1,
        //width: '120%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 10
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '80%'
    },
    containerBotao: {
        width: '48%',
        height: '90%',
        paddingBottom: 15,
        paddingTop: 8
      },
      botao: {
          alignItems: 'center',
          justifyContent: 'center',
          width: '95%',
          height: '110%',
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
