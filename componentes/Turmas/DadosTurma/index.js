import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import estilo from '../../estilo';


export default ({ navigation,route }) => {
    const { turma } = route.params;

    return (
        <View style={styles.container}>

            <View>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Detalhes da Turma</Text>
                <View style={styles.detalhesContainer}>
                    <Text style={[styles.label]}>Nome da Turma:</Text>
                    <Text style={[styles.valor, estilo.textoP16px, estilo.textoCorSecundaria]}>{turma.nome}</Text>

                    <Text style={[styles.label]}>Horário da Turma:</Text>
                    <Text style={[styles.valor, estilo.textoP16px, estilo.textoCorSecundaria]}>{turma.horario}</Text>

                    <Text style={[styles.label]}>Dias da Turma:</Text>
                    <Text style={[styles.valor, estilo.textoP16px, estilo.textoCorSecundaria]}>{turma.dias}</Text>

                    <Text style={[styles.label]}>Vagas da Turma:</Text>
                    <Text style={[styles.valor, estilo.textoP16px, estilo.textoCorSecundaria]}>{turma.vaga}</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]}
                    onPress={() =>navigation.navigate('Editar Turmas', { turma: turma })}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH333px]}>EDITAR TURMA</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    detalhesContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    valor: {
        fontSize: 16,
        marginBottom: 15,
    },
});
