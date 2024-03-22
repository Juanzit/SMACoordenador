import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../estilo'
import SentarAlcancar from './Tabelas/SentarAlcancar'
import DinamometriaMembrosInferiores from './Tabelas/DinamometriaMembrosInferiores'


export default ({route, navigation}) => {

    return (
        <ScrollView style={estilo.corLightMenos1}>

            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat]}>SENTAR E ALCANÇAR</Text>
            </SafeAreaView>
            <View style={{marginVertical: '5%'}}>
                <SentarAlcancar/>
            </View>

            <DinamometriaMembrosInferiores/>
            <Text style={[estilo.centralizado, estilo.textoCorSecundaria, estilo.textoP16px, {textAlign: 'center', marginBottom: '3%'}]}>Para pessoas com mais de 50 anos, reduza as pontuações em 10% para ajustar a perda de tecido muscular devido ao envelhecimento.</Text>
                
            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => navigation.navigate('Testes2')}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>PROSSEGUIR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', backgroundColor: '#FFFF', height: 50 ,borderRadius: 5, paddingLeft: 15, marginTop: '3%'}
})