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
    
    const acceptProfessor = async () => {
        const db = getFirestore();
        const professorDocRef = doc(db, "Academias", professor.academia, "Professores", professor.email);

        try {
            // Obtenha os dados do documento do professor
            const professorDocSnap = await getDoc(professorDocRef);

            if (professorDocSnap.exists()) {
                const professorData = professorDocSnap.data();

                // Verifique se o status existe
                if (!professorData.status) {
                    // Se não existir, crie o campo 'status'
                    await updateDoc(professorDocRef, { status: "Aceito" });
                } else {
                    // Se já existir, atualize o status
                    await updateDoc(professorDocRef, { status: "Aceito" });
                }
                Alert.alert("Professor aceito com sucesso!", "O status foi atualizado para 'Aceito'.");
            } else {
                // Caso o documento do professor não exista
                await setDoc(professorDocRef, { status: "Aceito" }, { merge: true });
                Alert.alert("Professor aceito!", "O documento do professor foi criado com o status 'Aceito'.");
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao aceitar o professor, tente novamente', error.message);
        }
    };

    return (
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
                    
                    <View style={[style.containerBotao, style.botao,style.areaBotoes]}>
                        <AntDesign name="warning" size={150} color="red" />
                    </View>

            <Text style={[estilo.tituloH333px, estilo.centralizado, estilo.textoCorDanger]} > ATENÇÃO!! </Text>

                        <Text style={[estilo.textoSmall16px, estilo.textoCorSecundaria, {margin: 50}]}>
                            Realmente deseja aceitar esse professor?
                            {'\n'}
                            {'\n'}
                            Professor:{professor.nome}
                            {'\n'}
                            CPF:{professor.cpf}
                            {'\n'}
                            Telefone: {professor.telefone}
                            {'\n'}
                            {'\n'}
                        </Text>
                        <Text style={[estilo.textoCorDanger, estilo.tituloH619px, style.alerta]}>
                            A partir disso o professor poderá ter acesso aos dados medicos dos alunos de sua academia
                        </Text>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, { marginTop: 100 }]} onPress={() => acceptProfessor()}>
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
    alerta: {
        textAlign: 'center',
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