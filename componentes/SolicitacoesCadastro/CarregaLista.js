import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';

export default ({ navigation }) => {
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        const buscarProfessores = async () => {
            try {
                const professoresRef = collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Professores');

                // Query para filtrar professores com status "Pendente" ou vazio
                const professoresQuery = query(professoresRef, where('status', 'in', ['Pendente', '', null]));

                const querySnapshot = await getDocs(professoresQuery);

                const listaProfessores = [];
                querySnapshot.forEach((doc) => {
                    const professor = doc.data(); // Obtendo os dados do professor
                    listaProfessores.push(professor); // Adicionando à lista de professores
                });

                setProfessores(listaProfessores); // Atualizando o estado com a lista filtrada
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        };

        buscarProfessores(); // Chama a função para buscar professores
    }, []);

    const redirecionarParaPerfil = (professor) => {
        navigation.navigate('Perfil Professor', { professor });
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>
                <View>
                    {professores.map((professor) => (
                        <TouchableOpacity
                            key={professor.nome}
                            onPress={() => redirecionarParaPerfil(professor)} // Navega para o perfil do professor
                            style={[estilo.botao, professor.excluido ? estilo.corDanger : estilo.corPrimaria]}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>
                                {professor.nome} {professor.excluido ? "- excluído" : null}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
});
