import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import estilo from "./estilo"
import Logo from "./Logo"
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { coordenadorLogado } from "./LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default ({navigation}) => {

    const [conexao, setConexao] = useState(true);

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
            <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} scrollEnabled={true} >

                    <View style={style.areaLogo}>
                        <Logo />
                    </View>

                    <View style={style.areaFrase}>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado]}>Boas vindas { coordenadorLogado.getNome() || 'Coordenador'}!</Text>
                    </View>

                    <View style={style.area}>

                        <View style={style.areaBotoes}>
                            {/* Botão para as turmas */}
                            <View style={style.containerBotao}>
                                <TouchableOpacity 
                                    style={[estilo.corPrimaria, style.botao]} 
                                    onPress={() => navigation.navigate('Turmas')}>
                                <Foundation name="clipboard-pencil" size={70} color="white" />
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>TURMAS</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Botão para dados da academia */}
                            <View style={style.containerBotao}>
                                <TouchableOpacity 
                                    style={[estilo.corPrimaria, style.botao]} 
                                    onPress={() => navigation.navigate('Perfil Academia')}>
                                <View style={[style.iconeBotao]}>
                                    <FontAwesome5 name="building" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>ACADEMIA</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.areaBotoes}>
                            {/* Botão para os dados de treinos */}
                            <View style={style.containerBotao}  >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate('Evolução')} disabled={!conexao}>
                                <View style={[style.iconeBotao]}>
                                    <AntDesign name="linechart" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EVOLUÇÃO DO TREINO {!conexao ? "Offline" : null} </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Botão para exportar os dados em CSV */}
                            <View style={[style.containerBotao]} >
                                <TouchableOpacity 
                                    style={[estilo.corPrimaria, style.botao]} 
                                    onPress={() => { navigation.navigate('Seleção Aluno CSV') }}>
                                <View style={[style.iconeBotao]}>
                                    <MaterialCommunityIcons name="file-export" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EXPORTAR DADOS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.areaBotoes}>
                            {/* Botão para lista de professores */}
                            <View style={style.containerBotao}  >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate('Lista Professores')} disabled={!conexao}>
                                <View style={[style.iconeBotao]}>
                                    <FontAwesome5 name="chalkboard-teacher" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>LISTA PROFESSORES  {!conexao ? "Offline" : null} </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Botão para lista de alunos */}
                            <View style={style.containerBotao}  >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate("Alunos")} disabled={!conexao}>
                                <View style={[style.iconeBotao]}>
                                    <FontAwesome5 name="clipboard-list" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>LISTA ALUNOS  {!conexao ? "Offline" : null} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={style.areaBotoes}>

                            {/* Botão para os exercícios */}
                            <View style={style.containerBotao}  >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate("Exercicios")} disabled={!conexao}>
                                <View style={[ style.iconeBotao]}>
                                    <Ionicons name="barbell-outline" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EXERCICIOS</Text>
                                </TouchableOpacity>
                            </View>
                            
                            {/* Botão para o chat */}
                            <View style={[style.containerBotao]} >
                                <TouchableOpacity 
                                    style={[conexao ? estilo.corPrimaria : estilo.corDisabled, style.botao]} 
                                    onPress={() => navigation.navigate('Chat')} disabled={!conexao}>
                                <View style={[style.iconeBotao]}>
                                    <AntDesign name="wechat" size={70} color="white" />
                                </View>
                                <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MENSAGENS {!conexao ? "Offline" : null}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.areaBotoes}>

                            <View style={style.containerBotao}>
                                <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Seleção Aluno Análise do Programa de Treino')}>
                                    <View style={[style.iconeBotao]}>
                                        <MaterialCommunityIcons name="clipboard-text-search-outline" size={70} color="white" />
                                    </View>
                                    <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>AVALIAÇÕES E FICHAS</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.containerBotao}>
                                <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Testes')}>
                                    <View style={[style.iconeBotao]}>
                                        <Ionicons name="body-outline" size={70} color="white" />
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
        marginTop: '2%',
        flex: 1,
        //height: '100%',
    },
    areaLogo: {
        paddingTop: '8%',
        height: '10%',
    },
    areaFrase: {
        marginVertical: '4%',
        height: '5%',
    },
    area: {
        flex: 1,
    },
    areaBotoes: {
        height: '30%',
        marginTop: '3%',
        flex: 1,
        //width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 30
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '80%'
    },
    containerBotao: {
        width: '46%',
        height: '120%',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
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
