import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Turmas } from '../../../classes/Turmas';
import { setDoc, doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import NetInfo from "@react-native-community/netinfo";
import estilo from "../../estilo";
import { coordenadorLogado } from '../../LoginScreen';


export default ({ route, navigation }) => {
    const [conexao, setConexao] = useState(true);
    const {turma} = route.params

    console.log('turma', turma)
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const [nome, setNome] = useState('');
    const [horario, setHorario] = useState('');
    const [dia, setDia] = useState('');
    const [vaga, setVaga] = useState('');

    useEffect(() => {
        const carregarDadosTurma = async () => {
            try {


                const turmaRef = doc(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`, turma.nome);
                const turmaSnap = await getDoc(turmaRef);
                const turmaData = turmaSnap.data();
                console.log("turma data", turmaData)
                if (turmaData) {
                    setNome(turmaData.nome || '');
                    setHorario(turmaData.horario || '');
                    setDia(turmaData.dias || '');
                    setVaga(turmaData.vaga || '');
                }
            } catch (error) {
                console.error('Erro ao carregar dados da turma:', error);
            }
        };

        carregarDadosTurma();
    }, []);

    const handleEdicaoTurma = async () => {
        try {
            updateDoc(doc(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`, turma.nome), {
                nome: nome,
                horario: horario,
                dias: dia,
                vaga: vaga,
            });

            const alunosRef = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Alunos")

            const alunosSnapshot = await getDocs(alunosRef)

            alunosSnapshot.docs.forEach((item) =>{
                console.log('item no for each', item)
                const alunoData = item.data()
                updateDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Alunos', alunoData.email), {
                    turma: nome
                })
            })

            Alert.alert('Turma editada com sucesso!');
        } catch (error) {
            console.error('Erro ao editar turma:', error);
            Alert.alert('Erro ao editar turma. Tente novamente mais tarde.');
        }
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={styles.container}>

                <View style={styles.inputArea}>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>EDITE OS DADOS DA TURMA!</Text>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>CASO NÃO QUEIRA, FINALIZE A EDIÇÃO.</Text>
                </View>
                <View style={styles.inputArea}>
                    <View style={styles.inputArea}>
                        <Text>Nome da turma:</Text>
                        <View>
                            <TextInput placeholder={turma.nome}  style={[estilo.sombra, estilo.corLight, styles.inputText,]} onChangeText={(text) => setNome(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Horário da turma:</Text>
                        <View>
                            <TextInput placeholder={turma.horario} style={[estilo.sombra, estilo.corLight, styles.inputText,]}  onChangeText={(text) => setHorario(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Dias da turma:</Text>
                        <View>
                            <TextInput placeholder={turma.dias}  style={[estilo.sombra, estilo.corLight, styles.inputText,]} onChangeText={(text) => setDia(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Vagas da turma:</Text>
                        <View>
                            <TextInput placeholder={turma.vagas} style={[estilo.sombra, estilo.corLight, styles.inputText,]} onChangeText={(text) => setVaga(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <TouchableOpacity style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}
                            onPress={() => {
                                handleEdicaoTurma();
                                // Navegue para a tela desejada após a edição (por exemplo, a lista de turmas)
                                navigation.goBack();
                            }}>
                            <Text>EDITAR TURMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '2%',
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
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    aviso: {
        color: 'red',
    }
});
