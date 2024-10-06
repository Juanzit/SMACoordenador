import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { getDocs, collection, query, getFirestore, filter, where } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';

export default ({ navigation }) => {
const [professores, setProfessores] = useState([]);

useEffect(() => {
    const buscarProfessores = async () => {
    try {
        const professoresRef = collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Professores');
        const q = query(professoresRef, where('status', 'in', ['Pendente', ' ']));
        const querySnapshot = await getDocs(q);

        const listaProfessores = [];
        querySnapshot.forEach((doc) => {
            const professor = doc.data();
            if (professor.status == 'Aceito') {
            }else {
                listaProfessores.push(professor);
            }
        });
        //const listaProfessoresAtt = [];
        //listaProfessoresAtt = filter((listaProfessores) => listaProfessores.status !== 'Aceito');

        setProfessores(listaProfessores);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
    }
    };

    buscarProfessores();
}, []);

return (
    <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
        <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>
            <View style={styles.areaFrase}>
                        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, estilo.centralizado]}>Selecione os Professores com Pendencia de Cadastro</Text>
                    </View>

            <View>
                {professores.map((professor) => (
                    <TouchableOpacity
                        key={professor.nome}
                        onPress={() => navigation.navigate('Perfil ProfessorSolicitacao', { professor: professor })}
                        style={[estilo.botao, professor.excluido ? estilo.corDanger : estilo.corPrimaria]}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>{professor.nome} {professor.excluido? "- excluido" : null }</Text>
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
    areaFrase: {
        top: 30,
        marginVertical: '4%',
        height: '5%',
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'center',
    },
});
