import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import estilo from '../../estilo';
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../../ModalSemConexao";


export default function EditarAcademia({ route, navigation }) {
    const { academia } = route.params;

    
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
        unsubscribe()
        }
    }, [])

    const checkWifiConnection = () => {
        NetInfo.fetch().then((state) => {
        if (state.type === 'wifi' || state.type === 'cellular') {
            console.log('Conectado ao Wi-Fi');
            setConexao(true)
        } else {
            console.log('Não conectado ao Wi-Fi');
            setConexao(false)
        }
        });
    };
    useEffect(() => {
        checkWifiConnection();
    }, []);


    const [nome, setNome] = useState(academia.nome);
    const [nomeInvalido, setNomeInvalido] = useState(false);
    const validaNome = (text) => {
        const nomeValido = /^[\p{L}\s]*$/u;
            if (nomeValido.test(text)) {
                setNomeInvalido(false);
            } else {
                setNomeInvalido(true);
            }
        setNome(text);
    };

    const [cnpj, setCnpj] = useState(academia.cnpj);
    const [cnpjInvalido, setCnpjInvalido] = useState(false);

    const validaECorrigeCnpj = (text) => {
        setCnpj(text);
        setCnpjInvalido(!cnpj);
    };

    const [cep, setCep] = useState(academia.endereco.cep);

    const [estado, setEstado] = useState(academia.endereco.estado);
    const [estadoInvalido, setEstadoInvalido] = useState(false)
        //Validação do estado
    const estadosBrasileiros = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    const validaEstado = (text) => {
        const estadoUpper = text.toUpperCase();
        if (estadosBrasileiros.includes(estadoUpper)) {
            setEstadoInvalido(false);
        } else {
            setEstadoInvalido(true);
        }
        setEstado(estadoUpper);
    };
        
    const [cidade, setCidade] = useState(academia.endereco.cidade);
    const [cidadeInvalida, setCidadeInvalida] = useState(false);
    //Validação da cidade
    const validaCidade = (text) => {
    // Apenas um exemplo simples de validação: a cidade deve ter pelo menos 2 caracteres
    const cidadeValida = text.length >= 3;
        
        // Atualize o estado da cidade e o estado de validação
        setCidade(text);
        setCidadeInvalida(!cidadeValida);
    };
    
            
    const [bairro, setBairro] = useState(academia.endereco.bairro);
    const [bairroInvalido, setBairroInvalido] = useState(false)
    //Validação do bairro
    const validaBairro = (text) => {
        const bairroValido = text.length >= 5;
    
            setBairro(text)
            setBairroInvalido(!bairroValido)
    }
        
    const [rua, setRua] = useState(academia.endereco.rua);
    const [ruaInvalida, setRuaInvalida] = useState(false)
    //Validação da rua
    const validaRua = (text) => {
        const ruaValida = text.length >= 5;

        setRua(text)
        setRuaInvalida(!ruaValida)
    }

    const [numero, setNumero] = useState(academia.endereco.numero);
    const [complemento, setComplemento] = useState(academia.endereco.complemento);

    const handleEditarAcademia = async () => {
        try {
            const academiaRef = doc(firebaseBD, "Academias", academia.nome);
            await updateDoc(academiaRef, {
                nome: nome,
                cnpj: cnpj,
                endereco: {
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    rua: rua,
                    numero: numero,
                    complemento: complemento
                }
            });
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao editar academia:', error);
        }
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
        {!conexao ? <ModalSemConexao/> 
        : 
        <SafeAreaView style={styles.container}>     

        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Nome:</Text>
            <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria]}>{nome}</Text>

        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>CNPJ:</Text>
            <TextInputMask
                type={'cnpj'}
                style={[styles.inputText, estilo.sombra, estilo.corLight, cnpjInvalido ? {borderWidth: 1, borderColor: 'red'} : {}]}
                value={cnpj}
                onChangeText={(text) => validaECorrigeCnpj(text)}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>CEP:</Text>
            <TextInputMask
                style={[styles.inputText, estilo.sombra, estilo.corLight]}
                value={cep}
                type={'zip-code'}
                onChangeText={(text) => setCep(text)}
                keyboardType='numeric'
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Estado:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight, estadoInvalido ? { borderColor: '#FF6262', borderWidth: 1 } : {}]}
                value={estado}
                onChangeText={(text) => validaEstado(text)}
                maxLength={2}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Cidade:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight, cidadeInvalida ? { borderColor: 'red', borderWidth: 1 } : {}]}
                value={cidade}
                onChangeText={(text) => validaCidade(text)}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Bairro:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight, bairroInvalido ? { borderColor: 'red', borderWidth: 1 } : {}]}
                value={bairro}
                onChangeText={(text) => validaBairro(text)}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Rua:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight, ruaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}]}
                value={rua}
                onChangeText={(text) => validaRua(text)}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Número:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight]}
                value={numero}
                keyboardType='numeric'
                onChangeText={(text) => setNumero(text)}
            />
        </View>
        <View style={styles.inputArea}>
            <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>Complemento:</Text>
            <TextInput
                style={[styles.inputText, estilo.sombra, estilo.corLight]}
                value={complemento}
                onChangeText={(text) => setComplemento(text)}
            />
        </View>
        <View>
            <TouchableOpacity
                style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}
                onPress={() => handleEditarAcademia()}
            >
                <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>SALVAR ALTERAÇÕES</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    }
    

    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: '2%',
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    titulos: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    inputText: {
        width: '90%',
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    areaInputDataNascimento: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    botaoInputDataNascimento: {
        width:'30%',
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,

    },

    campoPequeno: {
        width: '40%'
    },
    alinhamentoBotoesPequenos: {
        flexDirection: 'row',
        width: '100%'
    }
});