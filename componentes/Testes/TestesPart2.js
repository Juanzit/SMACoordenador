import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../estilo'
import ResistenciaAbdominal18anos from './Tabelas/ResistenciaAbdominal18anos'
import ResistenciaAbdominal from './Tabelas/ResistenciaAbdominal'


export default ({route, navigation}) => {

    return (
        <ScrollView style={estilo.corLightMenos1}>
            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
                <Text style={[estilo.centralizado, estilo.textoCorSecundaria, estilo.textoP16px, {textAlign: 'center', marginVertical: '3%'}]}>
                Jovens de até 17 anos realizam o teste com duração de 1 minuto.                    
                </Text>

            </SafeAreaView>
            <View style={{marginVertical: '5%'}}>
                <ResistenciaAbdominal/>

            </View>
            <View style={[{marginTop: '5%', width: '100%'}]}>
            <ResistenciaAbdominal18anos/>

            </View>
            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => navigation.navigate('Testes3')}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>PROSSEGUIR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', backgroundColor: '#FFFF', height: 50 ,borderRadius: 5, paddingLeft: 15, marginTop: '3%'},

})