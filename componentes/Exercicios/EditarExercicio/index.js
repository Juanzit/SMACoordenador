import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList , Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import { coordenadorLogado } from '../../LoginScreen';
import BotaoSelect from '../../BotaoSelect';

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

export default ({ navigation, route }) => {
    const [conexao, setConexao] = useState(true);
    const [exercicios, setExercicios] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const carregarExercicios = async () => {
            try {
                const exercicios = [];

                const querySnapshot = await getDocs(collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'ExerciciosForça'));
                querySnapshot.forEach((doc) => {
                    exercicios.push({ id: doc.id, ...doc.data() });
                });
                const querySnapshot2 = await getDocs(collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'ExerciciosAlongamento'));
                querySnapshot2.forEach((doc) => {
                    exercicios.push({ id: doc.id, ...doc.data() });
                });
                const querySnapshot3 = await getDocs(collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'ExerciciosAerobicos'));
                querySnapshot3.forEach((doc) => {
                    exercicios.push({ id: doc.id, ...doc.data() });
                });
                setExercicios(exercicios);
            } catch (error) {
                console.error('Erro ao carregar exercícios:', error);
            }
        };

        carregarExercicios();
    }, []);

    const handleSelecionarExercicio = (exercicio) => {
        setExercicioSelecionado(exercicio);
        setNomeSelecionado(exercicio.nome || '');
        setImagem(exercicio.imagem || null);
        setDescricao(exercicio.descricao || '')
        setExecucao(exercicio.execucao || '')
        
    };

    const [nomeSelecionado, setNomeSelecionado] = useState('')
    
    
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelecionarExercicio(item)}>
            <Text style={[estilo.textoP16px, estilo.textoCorPrimaria]}>{item.nome}</Text>
        </TouchableOpacity>
    );
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
    const tiposDisponiveis = ["Alongamentos", "Aeróbicos", "Força"];

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
    const [descricaoInvalida, setDescricaoInvalida] = useState(false)

    const validaDescricao = (text) => {
        const descricaoValida = text.length >= 3;

        setDescricao(text);
        setDescricaoInvalida(!descricaoValida)
    };

    const [variacao, setVariacao] = useState([])


    const updateVariacao = (text, index) => {
        const updatedVariacao = [...variacao];
        updatedVariacao[index] = text;
        setVariacao(updatedVariacao);
    };



    const [execucao, setExecucao] = useState([])




    const [imagem, setImagem] = useState(null)


    const [braco, setBraco] = useState('')
    const [postura, setPostura] = useState('')
    const [implemento, setImplemento] = useState('')
    const [posicaoDosPes, setPosicaoDosPes] = useState('')
    const [pegada, setPegada] = useState('')
    const [amplitude, setAmplitude] = useState('')
    const [quadril, setQuadril] = useState('')
    const handleFinalizarCadastro = async () => {
        const execucaoArray = execucao ? execucao.split(', ') : ''
        const bracoArray = braco ? braco.split(', '): ''
        const posturaArray = postura?  postura.split(', '): ''
        const implementoarray = implemento ? implemento.split(', ') : ''
        const posicaoDosPesArray = posicaoDosPes? posicaoDosPes.split(', ') : ''
        const pegadaArray = pegada ? pegada.split(', '): ''
        const amplitudeArray = amplitude ? amplitude.split(', ') : ''
        const quadrilArray = quadril ? quadril.split(', ') : ''
        const tipoExercicio = tipo === 'Alongamentos' ? 'ExerciciosAlongamento' : tipo === 'Aeróbicos' ? 'ExerciciosAerobicos' : 'ExerciciosForça';

        const storage = getStorage(); // Storage
        const storeRef = ref(storage, 'Teste.jpg');
    
        const imageBlob = await getBlobFromUri(imagem);
        const uploadTask = uploadBytesResumable(storeRef, imageBlob);
        await uploadBytesResumable(storeRef, imageBlob);
    
        const downloadURL = await getDownloadURL(storeRef);
    
        const exercicioRef = collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), tipoExercicio);
        
        await addDoc(exercicioRef, {
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
            imagem: downloadURL, 
        });
    
        Alert.alert(
            'Exercício cadastrado com sucesso!',
            'O exercício foi cadastrado com sucesso no Banco de Dados.'
        );

        await atualizarExercicio(nomeSelecionado, nome)
    

        navigation.goBack();
    }
    const atualizarExercicio = async (nomeAnterior, nomeAtualizado) => {
        const db = getFirestore()

        const alunosRef = collection(db, "Academias", coordenadorLogado.getAcademia(), "Alunos")
        const alunosSnapshot = await getDocs(alunosRef)
        const imageBlob = await getBlobFromUri(imagem);

        alunosSnapshot.forEach(async (aluno) => {

            const fichasRef = collection(alunosRef,aluno.data().email, "FichaDeExercicios")
            const fichasSnashot = await getDocs(fichasRef)
            fichasSnashot.forEach(async(ficha) => {
                const exerciciosRef = collection(fichasRef, ficha.id, "Exercicios")
                const exerciciosSnapshot = await getDocs(exerciciosRef)

                console.log(ficha)
                exerciciosSnapshot.forEach(async (exercicio) => {
                    const exercicioData = exercicio.data()
                
                    console.log(exercicioData.Nome.exercicio)
                    if (exercicioData.Nome.exercicio.includes(nomeAnterior)) {
                        const novoNome = exercicioData.Nome.exercicio.replace(nomeAnterior, nomeAtualizado);
                        const exercicioDocRef = doc(exerciciosRef, exercicio.id);
                    
                        await updateDoc(exercicioDocRef, {
                            Nome: {
                                exercicio: novoNome,
                                imagem: imageBlob
                            }
                        })
                        .then(() => {
                            Alert.alert(
                                "Nome atualizado com sucesso!",
                                "Todas as fichas e diários tiveram o nome do exercício atualizado."
                            );
                        })
                        .catch((erro) => {
                            Alert.alert("Não foi possível atualizar o exercício.", erro.message);
                        });
                    }
                    
                })
            })
        })
    }
    const handleExcluirExercicio = async () => {
        try {
            const tipoExercicio = tipo == 'Alongamentos' ? "ExerciciosAlongamento" : tipo == 'Aeróbicos' ? "ExerciciosAerobicos" : "ExerciciosForça"


            deleteDoc(doc(
                firebaseBD,
                'Academias',
                coordenadorLogado.getAcademia(),
                tipoExercicio,
                exercicioSelecionado.nome
            ));

            // Atualizar a lista de exercícios após a exclusão
            const updatedExercicios = exercicios.filter(
                (exercicio) => exercicio.id !== exercicioSelecionado.id
            );
            setExercicios(updatedExercicios);

            // Limpar os campos de input após a exclusão
            setExercicioSelecionado(null);
            setNome('');
            setTipo('');
            setMusculos('');
            setDescricao('');
            setVariacao([]);
            setExecucao([]);
            setImagem(null);

            Alert.alert('Exercício excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir exercício:', error);
            Alert.alert('Erro ao excluir exercício. Tente novamente.');
        }
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


    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            {!conexao ? (
                <ModalSemConexao />
            ) : (
                <SafeAreaView style={styles.container}>

                    <View>
                        <View style={{ alignContent: 'center' }}>
                            <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria, styles.titulos]}>EDITAR EXERCÍCIO</Text>
                        </View>

                        {/* Lista de exercícios */}
                        <Text>Exercícios:</Text>

                        <FlatList
                            data={exercicios}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={<Text>Nenhum exercício encontrado</Text>}
                        />

                        <View style={styles.inputArea}>
                            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME:</Text>
                            <View>
                                <TextInput
                                    placeholder={nomeSelecionado}
                                    placeholderTextColor={'#CFCDCD'}
                                    style={[
                                        estilo.sombra,
                                        estilo.corLight,
                                        styles.inputText,
                                        nomeInvalido ? { borderWidth: 1, borderColor: 'red' } : {}
                                    ]}
                                    keyboardType={'default'}
                                    onChangeText={(text) => { validaNome(text) }}
                                ></TextInput>
                            </View>
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
                                    keyboardType={'default'}
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
                                        descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                    ]}
                                    keyboardType={'default'}
                                    value={descricao}
                                    onChangeText={(text) => { validaDescricao(text) }}
                                ></TextInput>
                            </View>
                        </View>

                        {exercicioSelecionado ? <View style={styles.inputArea}>
                            {exercicioSelecionado.implemento ?

                                <Text style={estilo.tituloH619px}>Implemento:</Text> : null}
                            {exercicioSelecionado.implemento ?


                                <>
                                    <Text style={estilo.tituloH619px}>Implemento:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setImplemento(text) }}
                                    ></TextInput>
                                </>
                                : null}
                            {exercicioSelecionado.postura ?


                                <>
                                    <Text style={estilo.tituloH619px}>Postura:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setPostura(text) }}
                                    ></TextInput>
                                </>
                                : null}
                            {exercicioSelecionado.pegada ?


                                <>
                                    <Text style={estilo.tituloH619px}>Pegada:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setPegada(text) }}
                                    ></TextInput>
                                </>
                                : null}

                            {exercicioSelecionado.braco ?


                                <>
                                    <Text style={estilo.tituloH619px}>Braço:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setBraco(text) }}
                                    ></TextInput>
                                </>
                                : null}

                            {exercicioSelecionado.posicaoDosPes ?


                                <>
                                    <Text style={estilo.tituloH619px}>Quadril:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setQuadril(text) }}
                                    ></TextInput>
                                </>
                                : null}

                            {exercicioSelecionado.amplitude ?


                                <>
                                    <Text style={estilo.tituloH619px}>Amplitude:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setAmplitude(text) }}
                                    ></TextInput>
                                </>
                                : null}


                            {exercicioSelecionado.quadril ?


                                <>
                                    <Text style={estilo.tituloH619px}>Quadril:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}

                                        onChangeText={(text) => { setQuadril(text) }}
                                    ></TextInput>
                                </>
                                : null}

                            {exercicioSelecionado.execucao ? (
                                <>
                                    <Text style={estilo.tituloH619px}>Execução:</Text>
                                    <TextInput
                                        placeholder={'Descricao'}
                                        placeholderTextColor={'#CFCDCD'}
                                        style={[
                                            estilo.sombra,
                                            estilo.corLight,
                                            styles.inputText,
                                            descricaoInvalida ? { borderWidth: 1, borderColor: 'red' } : {}
                                        ]}
                                        keyboardType={'default'}
                                        onChangeText={(text) => setExecucao(text)}
                                    />
                                </>
                            ) : null}




                        </View>
                            : null}
                        <View>
                            <Text>IMAGEM:</Text>
                            <Image
                            width={160}
                            height={160}
                            source={{uri: imagem}}
                            />
                            <View>
                                
                                <TouchableOpacity
                                    style={[estilo.botao, estilo.sombra]}
                                    onPress={() => {pickImage()}}>
                                    <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>Selecionar Imagem</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                                onPress={() => {
                                    handleFinalizarCadastro()
                                }
                                }>
                                <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>SALVAR ALTERAÇÕES</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[estilo.botao, estilo.sombra, styles.botaoExcluir]}
                                onPress={() => {
                                    if (exercicioSelecionado) {
                                        Alert.alert(
                                            'Excluir Exercício',
                                            `Deseja realmente excluir o exercício "${exercicioSelecionado.nome}"?`,
                                            [
                                                {
                                                    text: 'Cancelar',
                                                    style: 'cancel',
                                                },
                                                { text: 'Excluir', onPress: () => handleExcluirExercicio() },
                                            ]
                                        );
                                    } else {
                                        Alert.alert('Nenhum exercício selecionado para excluir.');
                                    }
                                }}>
                                <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>EXCLUIR EXERCÍCIO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </ScrollView>
    );
};

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
        height: 50,
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
    botaoExcluir: {
        backgroundColor: 'red',
    }

})
