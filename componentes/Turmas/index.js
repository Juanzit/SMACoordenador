import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ListaTurmas from './ListaTurmas'; // Importando o componente ListaTurmas
let ScreenHeight = Dimensions.get("window").height;

export default ({ navigation }) => {
    const [turmas, setTurmas] = useState([]);
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const buscarTurmas = async () => {
            try {
                const turmasRef = collection(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`);

                const turmasSnapshot = await getDocs(turmasRef);

                const listaTurmas = [];

                console.log(turmasSnapshot.docs)
                turmasSnapshot.docs.forEach((doc) => {
                    listaTurmas.push({ id: doc.id, ...doc.data() });
                });

                setTurmas(listaTurmas);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        buscarTurmas();
    }, []);

    return (
        <ScrollView style={[estilo.corLightMenos1]}>

                <View style={styles.areaFrase}>
                    <Text style={[estilo.tituloH523px, estilo.centralizado]}>Selecione uma turma para prossseguir!</Text>
                </View>

                <View style={styles.areaBotoes}>
                    {
                        turmas.map((turma) => (
                            <TouchableOpacity
                                key={turma.id}
                                style={[estilo.botao, { borderWidth: 2 }]}
                                turma={turma}
                                onPress={() => navigation.navigate('Dados Turma', { turma: turma })} >
                                <Text>Turma {turma.nome}</Text>
                            </TouchableOpacity>
                        ))
                    }

                        <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]} onPress={() => navigation.navigate('Cadastro Turmas')}>
                            <Text style={[estilo.textoCorLight, estilo.tituloH523px]}>CADASTRAR TURMA</Text>
                        </TouchableOpacity>

                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '20%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '10%',
        alignItems: 'center',
        marginBottom: '20%'
    },
    botaoTurma: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 80,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        border: 3,
        borderColor: 'black'
    },
});
