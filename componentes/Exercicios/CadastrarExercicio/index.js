import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, Alert, Image } from 'react-native'
import { collection, setDoc, doc, getDocs, where, query, addDoc } from 'firebase/firestore';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { Exercicio } from '../../../classes/Exercicio'
import { FontAwesome6 } from '@expo/vector-icons';
import BotaoSelect from '../../BotaoSelect'
import * as ImagePicker from 'expo-image-picker';
import { coordenadorLogado } from '../../LoginScreen';
import NetInfo from "@react-native-community/netinfo";
import estilo from "../../estilo";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

const Component = ({ navigation }) => {

    const novoExercicio = new Exercicio()
    const [braco, setBraco] = useState('')
    const [postura, setPostura] = useState('')
    const [implemento, setImplemento] = useState('')
    const [posicaoDosPes, setPosicaoDosPes] = useState('')
    const [pegada, setPegada] = useState('')
    const [amplitude, setAmplitude] = useState('')
    const [quadril, setQuadril] = useState('')
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const [nome, setNome] = useState('')
    const [nomeInvalido, setNomeInvalido] = useState(false);

    const validaNome = (text) => {
        const nomeValido = /^[\p{L}\s]*$/u;
        if (nomeValido.test(text)) {
            setNomeInvalido(false);
        } else {
            setNomeInvalido(true);
        }
        setNome(text);
    };

    // Olhar como definir 4 tipos que serão coleções no firebase
    const [tipo, setTipo] = useState('')
    const tiposDisponiveis = ["Alongamentos", "Aeróbicos", "Força - Membros Superiores", "Força - Membros Inferiores"];

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (value) => {
        setSelectedOption(value)
        setTipo(value);
    }

    const [musculos, setMusculos] = useState('')
    const [musculosInvalido, setMusculosInvalido] = useState(false)

    const validaMusculos = (text) => {
        const musculosValidos = /^[a-zA-Z\s]*$/;
        if (musculosValidos.test(text)) {
            setMusculosInvalido(false);
        } else {
            setMusculosInvalido(true);
        }
        setMusculos(text);
    };

    const [descricao, setDescricao] = useState('')
    const [descricaoInvalida, setDescricaoInvalida] = useState() 
    const validaDescricao = (text) => {
        const descricaoValida = text.length >= 3;

        setDescricao(text);
        setDescricaoInvalida(!descricaoValida)
    };

    const [variacao, setVariacao] = useState([])

    const addVariacao = () => {
        setVariacao([...variacao, ""]); // Adiciona um novo elemento vazio
    };

    const updateVariacao = (text, index) => {
        setVariacao(text);
    };



    const [execucao, setExecucao] = useState('')

    /* Definir como adicionar imagem */
    const [imagem, setImagem] = useState(null)

    const options = {
        title: 'Selecione uma imagem',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };




    const pickImage = async () => {
        console.log("Deu erro aqui1");

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {


                setImagem(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const getBlobFromUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        return blob;
    };

    const handleFinalizarCadastro = async () => {
        const storage = getStorage(); // Storage
        const storeRef = ref(storage, 'Teste.jpg');

        const imageBlob = await getBlobFromUri(imagem);
        const uploadTask = uploadBytesResumable(storeRef, imageBlob);

        const execucaoArray = execucao.split(', ')
        const bracoArray = braco.split(', ')
        const posturaArray = postura.split(', ')
        const implementoarray = implemento.split(', ')
        const posicaoDosPesArray = posicaoDosPes.split(', ')
        const pegadaArray = pegada.split(', ')
        const amplitudeArray = amplitude.split(', ')
        const quadrilArray = quadril.split(', ')
        // Corrigir a função uploadBytesResumable para aceitar apenas dois argumentos
        await uploadBytesResumable(storeRef, imageBlob);
        console.log(variacao)
        console.log(execucao)
        const tipoExercicio = tipo == 'Alongamentos' ? "ExerciciosAlongamento" : tipo == 'Aeróbicos' ? "ExerciciosAerobicos" : "ExerciciosForça"
        const downloadURL = await getDownloadURL(storeRef);


        setDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), tipoExercicio, `${novoExercicio.getNome()}`), {
            nome: nome,
            tipo: tipo,
            descricao: descricao,
            braco: bracoArray,
            postura: posturaArray,
            implemento: implementoarray,
            posicaoDosPes: posicaoDosPesArray,
            pegada: pegadaArray,
            amplitude: amplitudeArray,
            quadril: quadrilArray,
            execucao: execucaoArray,
            exercicio: nome,
            imagem: downloadURL, // Use o link de download da imagem
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe um exercício cadastrado com esse nome.`)
        }).then(() => {
            Alert.alert("Exercício Cadastrado com sucesso!", "O exercício foi cadastrado com sucesso no Banco de Dados e já pode ser inserido nas Fichas de Exercícios.")
            navigation.goBack()
        });
    }


    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
          {!conexao ? "" :
            <SafeAreaView style={styles.container}>
              <View>
                <View style={{ alignContent: 'center', }}>
                  <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria, styles.titulos]}>CADASTRAR EXERCÍCIO</Text>
                </View>
      
                <View style={styles.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME:</Text>
                  <View>
                    <TextInput
                      placeholder={'Nome do exercicio'}
                      placeholderTextColor={'#CFCDCD'}
                      style={[
                        estilo.sombra,
                        estilo.corLight,
                        styles.inputText,
                        nomeInvalido ? { borderWidth: 1, borderColor: 'red' } : {}
                      ]}
                      keyboardType={'default'}
                      value={nome}
                      onChangeText={(text) => { validaNome(text) }}
                    ></TextInput>
                  </View>
                </View>
      
                <View style={styles.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>TIPO:</Text>
                  <BotaoSelect
                    selecionado={selectedOption == '' ? false : true}
                    options={tiposDisponiveis}
                    onChange={handleSelectChange}
                    titulo="Selecione o Tipo"
                    max={1}
                  />
                </View>
      
                <View style={styles.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>ATUAÇÃO MUSCULAR:</Text>
                  <View>
                    <TextInput
                      placeholder={'Atuacao'}
                      placeholderTextColor={'#CFCDCD'}
                      style={[
                        estilo.sombra,
                        estilo.corLight,
                        styles.inputText,
                        musculosInvalido ? { borderWidth: 1, borderColor: 'red' } : {}
                      ]}
                      value={musculos}
                      onChangeText={(text) => { validaMusculos(text) }}
                    ></TextInput>
                  </View>
                </View>
      
                <View style={styles.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>DESCRIÇÃO:</Text>
                  <View>
                    <TextInput
                      placeholder={'Descricao'}
                      placeholderTextColor={'#CFCDCD'}
                      style={[
                        estilo.sombra,
                        estilo.corLight,
                        styles.inputText,
                    
                      ]}
                      keyboardType={'default'}
                      value={descricao}
                      onChangeText={(text) => { validaDescricao(text) }}
                    ></TextInput>
                  </View>
                </View>
      
                {/* Implemento */}
                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Implemento:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setImplemento(text) }}
                  />
                </View>
      
                {/* Postura */}
                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Postura:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setPostura(text) }}
                  />
                </View>
      
                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Pegada:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setPegada(text) }}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Braço:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setBraco(text) }}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Quadril:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setQuadril(text) }}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Execução:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setExecucao(text) }}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Amplitude:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setAmplitude(text) }}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={estilo.tituloH619px}>Posição dos Pés:</Text>
                  <TextInput
                    placeholder={'Descricao'}
                    placeholderTextColor={'#CFCDCD'}
                    style={[
                      estilo.sombra,
                      estilo.corLight,
                      styles.inputText,
                
                    ]}
                    keyboardType={'default'}
                    onChangeText={(text) => { setPosicaoDosPes(text) }}
                  />
                </View>

                {/* Imagem */}
                <View>
                  <Text>IMAGEM:</Text>
                  <View>
                    <Image
                      width={100}
                      height={100}
                      source={{ uri: imagem }} />
                    <TouchableOpacity
                      style={[estilo.botao, estilo.textoCorDisabled, { borderWidth: 3 }]}
                      onPress={() => pickImage()}>
                      <Text style={[estilo.tituloH523px, estilo.textoCorDark]}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                  </View>
                </View>
      
                <View>
                  <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                    onPress={() => {
                      novoExercicio.setNome(nome)
                      novoExercicio.setTipo(tipo)
                      novoExercicio.setMusculos(musculos)
                      novoExercicio.setDescricao(descricao)
                      novoExercicio.setVariacao(variacao)
                      novoExercicio.setExecucao(execucao)
                      novoExercicio.setImagem(imagem)
      
                      if (novoExercicio.getNome() == '' || novoExercicio.getTipo() == '') {
                        Alert.alert('Informe o nome do exercicio para cadasrtá-lo!!!')
                      } else {
                        handleFinalizarCadastro()
                      }
                    }}>
                    <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>ADICIONAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          }
        </ScrollView>
      )
      
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAFF',
        marginVertical: '2%',
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    titulos: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    inputText: {
        width: '90%',
        height: 60,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    botaoAdd: {
        backgroundColor: '#CFCDCD',
        width: 213,
        height: 29,
        borderRadius: 5,
    },

})

export default Component;
