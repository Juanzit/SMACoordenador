import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import estilo from '../estilo'
import {ButtonStyled, TextStyled} from "../StyledComponents/Button.style.ts"
import { useNavigation } from '@react-navigation/native'
import { coordenadorLogado } from '../LoginScreen'
import { Academia } from '../../classes/Academia'
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { collection, setDoc, doc, getDoc, getFirestore, where, query, addDoc, querySnapshot, QueryStartAtConstraint } from "firebase/firestore";
import Logo from '../Logo'
import EditarAcademia from './EditarAcademia';

export default ({ navigation }) => {
    const [academia, setAcademia] = useState(null);

    // Função para buscar dados da academia no Firebase
    useEffect(() => {
        const buscarDadosAcademia = async () => {
            try {
                const academiaRef = doc(firebaseBD, "Academias", coordenadorLogado.getAcademia());
                const academiaDoc = await getDoc(academiaRef);
                
                if (academiaDoc.exists()) {
                    const academiaData = academiaDoc.data();
                    setAcademia(academiaData);
                } else {
                    console.error('Nenhuma academia encontrada com este ID.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados da academia:', error);
            }
        };

        buscarDadosAcademia();
    }, []); // Chama a função ao carregar o componente


    return (
        <ScrollView style={[estilo.corLightMenos1, {height: '100%'}]}>

                {academia ? (
                    <SafeAreaView style={[styles.container]}>
                        <Logo tamanho='grande'></Logo>
                        <View style={[estilo.corLight, styles.areaTexto, estilo.centralizado]}>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Nome:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.nome}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>CNPJ:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.cnpj}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Endereço:</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Rua:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.rua}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Bairro:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.bairro}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Cidade:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.cidade}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Estado:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.estado}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>CEP:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.cep}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Numero:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.numero}</Text>
                            <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>Complemento:</Text>
                            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>{academia.endereco.complemento}</Text>
                        </View>
                        <View >
                            {/* Botão para editar os dados */}
                            <TouchableOpacity
                                style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                                onPress={() => navigation.navigate('Editar Academia', { academia: academia })}
                            >
                                <Text style={[estilo.textoP16px, estilo.textoCorLight]}>EDITAR DADOS</Text>
                            </TouchableOpacity>
                        </View>
                        <ButtonStyled style={[{marginBottom: '10%'}]} onPress={() => navigation.navigate('Lista Professores')} isActive={true}>
                            <TextStyled isActive={true}>Lista De Professores</TextStyled>
                        </ButtonStyled>
                    </SafeAreaView>
                ) : (
                    <Text>Carregando...</Text>
                )}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '2%',
        height: '100%'
    },
    areaTexto:{
        marginTop: '10%',
        height: 480,
        width: '90%',
        padding: 20,
        borderRadius: 17,
        borderWidth: 1,
    }
})
