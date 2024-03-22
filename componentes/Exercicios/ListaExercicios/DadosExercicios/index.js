import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import estilo from '../../../estilo';
import { useNavigation } from '@react-navigation/native';


export default ({ navigation, route }) => {
    const { exercicio } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [musculos, setMusculos] = useState([])
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    console.log('exercicio dados', exercicio.implemento)

    return (
        <SafeAreaView style={[estilo.corLightMenos1, { height: '100%', justifyContent: 'center', padding: 30 }]}>
            <ScrollView alwaysBounceVertical={true} style={style.container}>

                <View>
                    <View>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image source={{ uri: exercicio.imagem ? exercicio.imagem : "" }} style={style.imagemExercicio} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={estilo.tituloH619px}>{exercicio.nome}</Text>

                        {exercicio.implemento ? <Text style={estilo.tituloH619px}>Implemento:</Text> : null}
                        {exercicio.implemento ? Object.values(exercicio.implemento).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}
                        {exercicio.postura ? <Text style={estilo.tituloH619px}>Postura:</Text> : null}
                        {exercicio.postura ? Object.values(exercicio.postura).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}
                        {exercicio.pegada ? <Text style={estilo.tituloH619px}>Pegada:</Text> : null}
                        {exercicio.pegada ? Object.values(exercicio.pegada).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}

                        {exercicio.braco ? <Text style={estilo.tituloH619px}>Braço:</Text> : null}
                        {exercicio.braco ? Object.values(exercicio.braco).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}


                        {exercicio.posicaoDosPes ? <Text style={estilo.tituloH619px}>Posição dos Pés:</Text> : null}
                        {exercicio.posicaoDosPes ? Object.values(exercicio.posicaoDosPes).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}


                        {exercicio.amplitude ? <Text style={estilo.tituloH619px}>Amplitude:</Text> : null}
                        {exercicio.amplitude ? Object.values(exercicio.amplitude).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}


                        {exercicio.quadril ? <Text style={estilo.tituloH619px}>Quadril:</Text> : null}
                        {exercicio.quadril ? Object.values(exercicio.quadril).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}

                        {exercicio.execucao ? <Text style={estilo.tituloH619px}>Execução:</Text> : null}
                        {exercicio.execucao ? Object.values(exercicio.execucao).map((variacaoItem, index) => (
                            <Text key={index} style={estilo.textoP16px}>{variacaoItem}</Text>
                        )) : null}
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={style.modalContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image source={{ uri: exercicio.imagem }} style={style.imagemExercicioExpandida} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    imagemExercicio: {
        width: '100%',
        height: 200, // Ajuste a altura conforme necessário
        resizeMode: 'cover',
    },
    imagemExercicioExpandida: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
