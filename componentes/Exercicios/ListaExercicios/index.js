import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';


export default ({navigation, route}) => {
    const { exercicios } = route.params;
    console.log('exercicios', exercicios)
    return (
        <SafeAreaView style={estilo.corLightMenos1}>
            <ScrollView alwaysBounceVertical={true} style={[style.container, estilo.corLightMenos1]}>
           
                <View>
                    {exercicios.map((exercicio, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[estilo.botao, estilo.sombra, style.exercicioBotao, estilo.corPrimaria]}
                            onPress={ () => navigation.navigate('Dados Exercícios', { exercicio: exercicio })}
                        >
                        <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>{exercicio.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    exercicioBotao: {
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
