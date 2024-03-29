import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import estilo from '../../estilo'

import { useNavigation } from '@react-navigation/native'

export default ({navigation, route}) => {
    const { professor } = route.params;

    console.log("Professor", professor)
    return (
            <SafeAreaView style={[estilo.corLightMenos1,{height: '100%', padding: 15}]}>


                <View style={[estilo.corLightMenos1]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>NOME:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.nome}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>CPF:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.cpf}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Data de nascimento:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.dataNascimento}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Telefone:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.telefone}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Login:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.email}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Profissão:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.profissao}</Text>
                    {/*
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Endereço:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{enderecoCoordenador.getRua()},{enderecoCoordenador.getNumero()}, {enderecoCoordenador.getCidade()}, {enderecoCoordenador.getEstado()}</Text>
                    */}
                <View>
                <TouchableOpacity
                        style={[estilo.botao, estilo.corPrimaria]}
                        onPress={()=> navigation.navigate('Transferir Turma Professor', {professor})}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]} 
                            >TRANSFERIR DE TURMA</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                        style={[estilo.botao, estilo.corDisabled]}
                        onPress={()=> navigation.navigate('Transferir Turma Professor', {professor})}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}
                            >INATIVAR PROFESSOR</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                        style={[estilo.botao, estilo.corDanger]} 
                        onPress={() => navigation.navigate('Deletar Professor', {professor: professor})}
                        >
                            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>DELETAR PROFESSOR</Text>
                    </TouchableOpacity>
                </View>
                </View>


            </SafeAreaView>
    )

}

const styles = StyleSheet.create({

})