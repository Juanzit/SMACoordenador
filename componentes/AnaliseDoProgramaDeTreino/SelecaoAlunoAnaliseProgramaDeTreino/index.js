import React, {useState, useEffect} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native"
import estilo from "../../estilo"
import { FontAwesome5 } from '@expo/vector-icons'; 
import {firebase, firebaseBD} from '../../configuracoes/firebaseconfig/config'
import { collection,setDoc,doc, getDocs, getDoc,getFirestore, where , query , addDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { coordenadorLogado } from "../../LoginScreen";
import Spinner from "react-native-loading-spinner-overlay";
import ModalSemConexao from "../../ModalSemConexao";
import NetInfo from "@react-native-community/netinfo";

export default ({navigation, route}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [carregandoAlunos, setCarregandoAlunos] = useState(true)

    const [conexao, setConexao] = useState(true);

  const{alunos} = route.params
      
  return (
    <SafeAreaView style={style.container}>
        {alunos.map((aluno) => (
            <TouchableOpacity
                key={aluno.cpf}
                style={[estilo.botao, estilo.corPrimaria, style.botao]}
                onPress={() => navigation.navigate('Avaliações Análise do Programa de Treino', {aluno: aluno, navigation: navigation})}
            >
                {console.log(aluno.cpf)}
                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{aluno.nome}</Text>
            </TouchableOpacity>
        ))}
    </SafeAreaView>
);
        }

const style = StyleSheet.create({
    container: {
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        marginTop: '15%',
        textDecorationLine: 'underline',
    },
    foto: {
        width: 50,
        height: 50, 
        borderRadius: 25
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
        justifyContent: 'space-around', // Alinha os itens horizontalmente

    }

})