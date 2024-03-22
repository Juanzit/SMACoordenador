import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { getDocs, collection, query, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';

export default ({ navigation }) => {
const [professores, setProfessores] = useState([]);

useEffect(() => {
    const buscarProfessores = async () => {
    try {
        const professoresRef = collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Professores');
        const querySnapshot = await getDocs(professoresRef);

        const listaProfessores = [];
        querySnapshot.forEach((doc) => {
            const nome = doc.data();
            listaProfessores.push(nome);
        });

        setProfessores(listaProfessores);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
    }
    };

    buscarProfessores();
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
                        onPress={() => navigation.navigate('Perfil Professor', { professor: professor })}
                        style={[estilo.botao, estilo.corPrimaria]}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>{professor.nome}</Text>
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
