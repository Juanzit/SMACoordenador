import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, Button, View, SafeAreaView, StyleSheet, Alert, Image } from 'react-native'
import estilo from "../../estilo"

import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc,deleteDoc } from "firebase/firestore";
import BotaoSelect from "../../BotaoSelect";
import { AntDesign } from '@expo/vector-icons';

import Spinner from "react-native-loading-spinner-overlay"

export default ({ navigation, route }) => {
    const {professor} = route.params
    console.log('teste:',professor)
    const deleteProfessor = async () => {
        const db = getFirestore()
        const academiaDocRef = doc(db, "Academias", professor.academia, "Professores", professor.email);
        //const usuarioDocRef = doc(db, "Academias", "Teste","Coordenador", );
        try {
            await deleteDoc(academiaDocRef,usuarioDocRef);
          Alert.alert("Professor deletado com sucesso!", "A turma foi atualizada com sucesso.")
          navigation.goBack()
        } catch (error) {
            Alert.alert('Erro ao deletar professor, tente denovo')
        }
      }

      

    return (
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
                    
                    <View style={[style.containerBotao, style.botao,style.areaBotoes]}>
                        <AntDesign name="warning" size={150} color="red" />
                    </View>

            <Text style={[estilo.tituloH333px, estilo.centralizado, estilo.textoCorDanger]} > ATENÇÃO!! </Text>

                        <Text style={[estilo.textoSmall16px, estilo.textoCorSecundaria, {margin: 50}/*estilo.centralizado*/ ]}>
                            Você está prestes a deletar 

                            Professor:{professor.nome}
                            {'\n'}
                            CPF:{professor.cpf}
                            {'\n'}
                            Data de Nascimento: {professor.diaNascimento}/{professor.mesNascimento}/{professor.anoNascimento}
                            {'\n'}
                            Telefone:          {professor.telefone}
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Text style={[estilo.textoCorDanger, estilo.tituloH619px]}>
                        Não poderá mais fazer login novamente com esse usuário, certifique-se de que está fazendo a escolha correta.

                        </Text>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, { marginTop: 100 }]} onPress={() => deleteProfessor()}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>
                        Confirmar
                    </Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    inputArea: {
        width: '95%'
    },
    areaLogo: {
        paddingTop: '5%',
        height: '10%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '5%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '3%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    areaNavigation: {
        height: '7%',
        marginTop: 'auto',
        alignSelf: 'baseline',
        borderWidth: 1,
        width: '100%'
    },
    containerBotao: {
        width: '40%',
        height: '100%',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        borderRadius: 15,
        padding: 5
    },

    iconeBotao: {
        padding: 5,
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

})