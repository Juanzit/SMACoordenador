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

export default ({navigation}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
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
    }, [])
  
    useEffect(() => {
      const fetchAlunos = async () => {
        try {
          const academiaRef = collection(firebaseBD, 'Academias');
          const querySnapshot = await getDocs(academiaRef);
  
          const newArrayAlunos = [];
  
              const professoresRef = collection(
                firebaseBD,
                'Academias',
                coordenadorLogado.getAcademia(),
                'Alunos'
              );
              console.log("ZZZZZZZZzz");
              const alunosSnapshot = await getDocs(professoresRef);
              
              alunosSnapshot.docs.forEach((item) => {
                newArrayAlunos.push(item.data())
              })


  
          setAlunos(newArrayAlunos);
          setCarregandoAlunos(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchAlunos();
    }, []);

      
    return (
        <SafeAreaView 
        style={style.container}>
            {conexao ?  carregandoAlunos ? (
            <>
            <Spinner
            visible={carregandoAlunos}
            textContent={'Carregando alunos...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
            />
            <Text 
            style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado, style.container]}
              numberOfLines={2}
              >Selecione o aluno para continuar.</Text>

            </>
) : (
  alunos.map((aluno) => (
    <TouchableOpacity
      key={aluno.cpf}
      style={[estilo.botao, estilo.corPrimaria, style.botao]}
      onPress={() => navigation.navigate('Avaliações Análise do Programa de Treino', {aluno: aluno, navigation: navigation})}
    >

      {console.log(aluno.cpf)}
      <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{aluno.nome}</Text>
    </TouchableOpacity>
  ))
): <ModalSemConexao ondeNavegar={'Home'} navigation={navigation}/>}
        </SafeAreaView>
    )
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