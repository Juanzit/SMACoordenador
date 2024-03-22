import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../estilo'
import IMC from './Tabelas/IMC'
import FrequenciaCardiacaDeRepouso from './Tabelas/FrequenciaCardiacaDeRepouso'
import PressaoArterial from './Tabelas/PressaoArterial'

export default ({navigation, route}) => {
    
    return (
        <ScrollView style={estilo.corLightMenos1}>
            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
             
            </SafeAreaView>
            
            <View style={{marginVertical: '5%'}}>
                <IMC></IMC>
            </View>

            <View>
            <PressaoArterial></PressaoArterial>
            </View>

            <View>
                <FrequenciaCardiacaDeRepouso></FrequenciaCardiacaDeRepouso>
            </View>

            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={() => navigation.navigate('Principal')}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>INÍCIO</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', height: 50},
    textInputPequeno:  {width: '50%', height: 50 },
    formatacaoTextInput: {backgroundColor: '#FFFF', borderRadius: 5, paddingLeft: 15}
})