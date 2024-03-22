import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import estilo from '../estilo';

const ListaTurmas = ({ turma, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.botaoTurma, estilo.sombra, estilo.corLight]}
            onPress={onPress}>
            <Text style={[estilo.textoCorDark, estilo.tituloH427px]}>{turma.nome}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: '15%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '20%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '10%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
    },
});


export default ListaTurmas;
