import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import { Coordenador } from '../../classes/Coordenador'; // Importe o módulo Coordenador corretamente, ajustando o caminho conforme necessário
import { Endereco } from '../../classes/Endereco'; // Importe o módulo Endereco corretamente, ajustando o caminho conforme necessário
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Importe o módulo NavigationContainer do React Navigation
import { AppLoading } from 'expo'; // Se estiver usando Expo, importe AppLoading
import { collection, setDoc, doc, getDocs, getFirestore } from "firebase/firestore"; // Importe as funções Firestore necessárias para interagir com o banco de dados
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'; // Importe as instâncias do Firebase e a configuração do Firebase
import NetInfo from "@react-native-community/netinfo"; // Importe o módulo NetInfo para verificar a conexão com a Internet
import ModalSemConexao from "../ModalSemConexao"; // Importe o componente ModalSemConexao, se necessário
import RadioBotao from "../RadioBotao"; // Importe o componente RadioBotao
import BotaoSelect from "../BotaoSelect"; // Importe o componente BotaoSelect
import estilo from "../estilo";


export default ({navigation}) => {
    const novoCoordenador = new Coordenador('', '', '', '', '', '', '')
    const enderecoCoordenador = new Endereco('', '', '', '', '', '', '')

  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])


    const [nome, setNome] = useState('')
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


    const [cpf, setCpf] = useState('')
    const [cpfInvalido, setCpfInvalido] = useState(false);


    const [diaNascimento, setDiaNascimento] = useState('')
    const [mesNascimento, setMesNascimento] = useState('')
    const [anoNascimento, setAnoNascimento] = useState('')

    const limitarDiaNascimento = (dia) => {
      const diaMaximo = 31;
      const diaDigitado = parseInt(dia);
      if (!diaDigitado) { // verifica se a entrada é vazia ou não numérica
        return '';
      }
      if (diaDigitado > diaMaximo) {
        return diaMaximo.toString();
      }
      return diaDigitado.toString();
    }
  //Validação do mes
  const limitarMesNascimento = (mes) => {
      const mesMaximo = 12;
      const mesDigitado = parseInt(mes);
      if (!mesDigitado) { // verifica se a entrada é vazia ou não numérica
        return '';
      }
      if (mesDigitado > mesMaximo) {
        return mesMaximo.toString();
      }
      return mesDigitado.toString();
    }

  //Validação do ano
  const limitarAnoNascimento = (ano) => {
      const data = new Date();
      const anoMaximo = data.getFullYear();
      const anoDigitado = parseInt(ano);
      if (anoDigitado > anoMaximo) {
        return anoMaximo.toString();
      }
      return ano;
    }


    const validaProfissao = (text) => {
      const profissaoValida = /^[a-zA-Z\s]*$/;
      if (profissaoValida.test(text)) {
        setProfissaoInvalida(false);
      } else {
        setProfissaoInvalida(true);
      }
      setProfissao(text);
    };

    const [telefone, setTelefone] = useState('')
    const [telefoneValido, setTelefoneValido] = useState(true);

    const validaTelefone = (text) => {
      const telefoneNumeros = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      setTelefoneValido(telefoneNumeros.length >= 10);
      setTelefone(text);
    };

    const [profissao, setProfissao] = useState('')
    const [profissaoInvalida, setProfissaoInvalida] = useState(false)

    const [cep, setCep] = useState('')
    const [cepInvalido, setCepInvalido] = useState(false)

    const [sexo, setSexo] = useState('')

    const [estado, setEstado] = useState('')
    const [estadoInvalido, setEstadoInvalido] = useState(false)

    const [cidade, setCidade] = useState('')
    const [cidadeInvalida, setCidadeInvalida] = useState(false);
    
    const [bairro, setBairro] = useState('')
    const [bairroInvalido, setBairroInvalido] = useState(false)

    const [rua, setRua] = useState('')
    const [ruaInvalida, setRuaInvalida] = useState(false)

    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    
    const [email, setEmail] = useState('')
    const [emailInvalido, setEmailInvalido] = useState(false)

    const [senha, setSenha] = useState('')
    const [senhaInvalida, setSenhaInvalida] = useState(false)

    const [selectedOption, setSelectedOption] = useState('');
    const [selected, setSelected] = useState(0)

    const [academiasCadastradas, setAcademiasCadastradas] = useState([])
    const [academia, setAcademia] = useState('')

    const handleSelectChange = (value) => {
      setSelectedOption(value)
      setAcademia(value);
      console.log(value)
      }

      const handleFinalizarCadastro = async () => {
        const coordenadorRef = collection(firebaseBD, `Academias/${novoCoordenador.getAcademia()}/Coordenador`);
        const coordenadorSnapshot = await getDocs(coordenadorRef);
    
        if (!coordenadorSnapshot.empty) {
            Alert.alert("Erro no cadastro", "Não é permitido cadastrar mais de um coordenador por academia, a academia selecionada já possui um coordenador.");
            return;
        }
    
        const data = new Date();
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
    
        firebase.auth().createUserWithEmailAndPassword(novoCoordenador.getEmail(), novoCoordenador.getSenha())
            .then((userCredential) => {
                console.log(userCredential);
    
                setDoc(doc(firebaseBD, `Academias/${novoCoordenador.getAcademia()}/Coordenador`, `${novoCoordenador.getEmail()}`), {
                    nome: novoCoordenador.getNome(),
                    cpf: novoCoordenador.getCpf(),
                    dataNascimento: novoCoordenador.getDataNascimento(),
                    telefone: novoCoordenador.getTelefone(),
                    profissao: novoCoordenador.getProfissao(),
                    sexo: novoCoordenador.getSexo(),
                    academia: novoCoordenador.getAcademia(),
                    endereco: {
                        rua: enderecoCoordenador.getRua(),
                        cidade: enderecoCoordenador.getCidade(),
                        estado: enderecoCoordenador.getEstado(),
                        numero: enderecoCoordenador.getNumero(),
                        complemento: enderecoCoordenador.getComplemento(),
                    },
                    email: novoCoordenador.getEmail(),
                    senha: novoCoordenador.getSenha(),
                }).then(() => {
                    Alert.alert("Novo usuário criado com sucesso!");
    
                    setDoc(doc(firebaseBD, `Academias/${novoCoordenador.getAcademia()}/Coordenador/${novoCoordenador.getEmail()}`, "Notificações", `Notificação${ano}|${mes}|${dia}`), {
                        data: `${dia}/${mes}/${ano}`,
                        nova: false,
                        remetente: 'Gustavo & cia',
                        texto: "É um prazer recebê-lo em nosso aplicativo. Desenvolvido por Gustavo Vaz Teixeira, João Bastista, Mateus Novaes, Sérgio Muinhos e Marcelo Patrício, em parceria com o Instituto Federal do Sudeste de Minas Gerais, o ShapeMeApp foi criado para proporcionar a você uma experiência interativa e personalizada durante seus treinos.",
                        tipo: "sistema",
                        titulo: "Bem-vindo ao ShapeMeApp!"
                    });
    
                    navigation.navigate("Login");
                }).catch(error => {
                    let errorMessage = '';
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            errorMessage = 'O email fornecido já está em uso por outra conta.';
                            break;
                        case 'auth/invalid-email':
                            errorMessage = 'O email fornecido é inválido.';
                            break;
                        case 'auth/weak-password':
                            errorMessage = 'A senha fornecida é muito fraca. Escolha uma senha mais forte.';
                            break;
                        default:
                            errorMessage = 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
                    }
    
                    Alert.alert('Erro no cadastro', errorMessage);
                    console.log(error);
                });
            }).catch((error) => {
                let errorMessage = '';
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'O email fornecido já está em uso por outra conta.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'O email fornecido é inválido.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'A senha fornecida é muito fraca. Escolha uma senha mais forte.';
                        break;
                    default:
                        errorMessage = 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
                }
    
                Alert.alert('Erro no cadastro', errorMessage);
                console.log(error);
            });
    }
    
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

    //Validação da cidade
    const validaCidade = (text) => {
      // Apenas um exemplo simples de validação: a cidade deve ter pelo menos 2 caracteres
      const cidadeValida = text.length >= 3;
    
      // Atualize o estado da cidade e o estado de validação
      setCidade(text);
      setCidadeInvalida(!cidadeValida);
    };

    //Validação do bairro
    const validaBairro = (text) => {
        const bairroValido = text.length >= 5;
    
        setBairro(text)
        setBairroInvalido(!bairroValido)
      }
    
      //Validação da rua
      const validaRua = (text) => {
        const ruaValida = text.length >= 5;
    
        setRua(text)
        setRuaInvalida(!ruaValida)
      }
    
      //Validação do numero
    
      //Validação do complemento
    
       //Validação do Email
      const validaEmail = (text) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(text)) {
          setEmailInvalido(false);
        } else {
          setEmailInvalido(true);
        }
        setEmail(text);
      };
    
      //Validação da senha
      const validaSenha = (text) => {
        if (text.length >= 6) {
          setSenhaInvalida(false);
        } else {
          setSenhaInvalida(true);
        }
        setSenha(text);
      };
      
      useEffect(() => {
        const carregarAcademias = async () => {
          try {
            const db = getFirestore();
            const academiasRef = collection(db, "Academias");
            const querySnapshot = await getDocs(academiasRef);
        
            const academias = [];
            querySnapshot.forEach((doc) => {
              const nome = doc.data().nome;
              academias.push(nome);
            });
        
            setAcademiasCadastradas(academias);
          } catch (error) {
            console.log(error);
          }
        };
        carregarAcademias();
      }, [])

    return (
                <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
                  {!conexao ? <ModalSemConexao/> 
                  : 
                  <SafeAreaView style={style.container}>      

                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria,  style.titulos]}>Agora, identifique-se</Text>
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME COMPLETO:</Text>
                      <View>
                      <TextInput 
                      placeholder={'Informe seu nome completo'} 
                      placeholderTextColor={'#CFCDCD'} 
                      style={[
                          estilo.sombra, 
                          estilo.corLight, 
                          style.inputText,
                          nomeInvalido? {borderWidth: 1, borderColor: 'red'} : {}
                      ]}
                      keyboardType={'default'}
                      value={nome}
                      onChangeText={(text) => {validaNome(text)}}
                      >
                      </TextInput>
                      </View>                        
                  </View>
  
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>CPF:</Text>
                      <TextInputMask 
                              type={'cpf'}
                              placeholder={'Informe seu cpf'} 
                              placeholderTextColor={'#CFCDCD'} 
                              style={[
                              estilo.sombra, 
                              estilo.corLight, 
                              style.inputText,
                              cpfInvalido ? {borderWidth: 1, borderColor: 'red'} : {}
                              ]}
                              value={cpf}
                              onChangeText={(text) => setCpf(text)}   
                          >
                          </TextInputMask>

                          </View>
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>ACADEMIA:</Text>
                      <BotaoSelect     selecionado={selectedOption == '' ? false : true}  onChange={handleSelectChange} titulo='Academias cadastradas' max={1} options={academiasCadastradas}>
                      </BotaoSelect>
                  </View>
  
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>DATA DE NASCIMENTO:</Text>
                          <View style={[style.areaInputDataNascimento]}>
                          <TextInput 
                              style={[style.botaoInputDataNascimento, estilo.sombra]} placeholder="dia"
                              value={diaNascimento}
                              onChangeText={(text) => setDiaNascimento(limitarDiaNascimento(text))}
                              maxLength={2}
                              keyboardType='numeric'
                              ></TextInput>

                              <TextInput 
                              style={style.botaoInputDataNascimento} placeholder="mês"
                              value={mesNascimento}
                              onChangeText={(text) => setMesNascimento(limitarMesNascimento(text))}
                              maxLength={2}
                              keyboardType='numeric'
                              ></TextInput>
                              <TextInput 
                              style={style.botaoInputDataNascimento} 
                              placeholder="ano"
                              value={anoNascimento}
                              onChangeText={(text) => setAnoNascimento(limitarAnoNascimento(text))}
                              maxLength={4}
                              keyboardType='numeric'
                              />
                          </View>
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>NÚMERO DE TELEFONE:</Text>
                      <TextInputMask
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        telefoneValido ? {} : {borderWidth: 1, borderColor: 'red'}
                      ]}
                      placeholder="(00)000000000"
                      value={telefone}
                      onChangeText={(text) => validaTelefone(text)}
                      type={'cel-phone'}
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                      }}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>OCUPAÇÃO:</Text>
                      <TextInput 
                      style={[
                      style.inputText, 
                      estilo.sombra, 
                      estilo.corLight,
                      profissaoInvalida ? { borderColor: '#FF6262', borderWidth: 1 } : {}
                      ]}
                      placeholder="ex: Professor"
                      value={profissao}
                      onChangeText={(text) => validaProfissao(text)}
                  ></TextInput>
                  </View>

                  <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria,{marginBottom:10}]}>SEXO:</Text>
                  <RadioBotao horizontal options={['Feminino',  'Masculino']}  
                  selected={selected}
                  onChangeSelect={(opt, i) => {
                  setSelected(i)}}
                  value={selected}
                  ></RadioBotao>
                  </View>

                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.titulos]}>Agora, informe sua residência</Text>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>INFORME SEU CEP:</Text>
                      <TextInputMask 
                          style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight
                                              ]}
                          placeholder="ex: 36180-000"
                          value={cep}
                          type={'zip-code'}
                          onChangeText={(text) => setCep(text)}
                          keyboardType='numeric'
                      ></TextInputMask>
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>ESTADO:</Text>
                      <TextInput 
                          style={[
                              style.inputText, 
                              estilo.sombra, 
                              estilo.corLight,
                              estadoInvalido ? { borderColor: '#FF6262', borderWidth: 1 } : {}
                          ]}
                          placeholder="ex: MG"
                          value={estado}
                          onChangeText={(text) => validaEstado(text)}
                          maxLength={2}
                          ></TextInput>
                      </View>


                      <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>CIDADE:</Text>
                    <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        cidadeInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua cidade"
                      value={cidade}
                      onChangeText={(text) => validaCidade(text)}
                    />
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>BAIRRO:</Text>
                      <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        bairroInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe seu bairro"
                      value={bairro}
                      onChangeText={(text) => validaBairro(text)}
                    />
                  </View>


                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>RUA:</Text>
                      <TextInput
                      style={[
                        style.inputText,
                        estilo.sombra,
                        estilo.corLight,
                        ruaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua rua"
                      value={rua}
                      onChangeText={(text) => validaRua(text)}
                    />
                  </View>

                  <View style={style.alinhamentoBotoesPequenos}>
                      <View style={[style.inputArea, style.campoPequeno]}>
                          <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NÚMERO:</Text>
                          <TextInput 
                              style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="Número da sua residência"
                              value={numero}
                              keyboardType='numeric'
                              onChangeText={(text) => setNumero(text)}
                              
                              ></TextInput>
                      </View>
                      <View style={[style.inputArea, style.campoPequeno]}>
                          <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>COMPLEMENTO:</Text>
                          <TextInput 
                              style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="complemento"
                              value={complemento}
                              onChangeText={(text) => setComplemento(text)}
                              ></TextInput>
                      </View> 
                  </View>
                  <Text style={[estilo.textoP16px, estilo.textoCorSecundaria , style.titulos]}>Por fim, seus dados de login:</Text>
                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>EMAIL:</Text>
                      <TextInput 
                      style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight,
                          emailInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe seu e-mail"
                      value={email}
                      onChangeText={(text) => validaEmail(text)}
                      ></TextInput>
                  </View>

                  <View style={style.inputArea}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>SENHA:</Text>
                      <TextInput 
                      secureTextEntry={true}
                      style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight,
                          senhaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                      ]}
                      placeholder="Informe sua senha"
                      value={senha}
                      onChangeText={(text) => validaSenha(text)}
                      ></TextInput>
                  </View>
                  <TouchableOpacity 
                    style={[estilo.corPrimaria, style.botao, estilo.sombra, estilo.botao]}
                    onPress={()=>{

                      novoCoordenador.setNome(nome)
                      novoCoordenador.setCpf(cpf)
                      novoCoordenador.setDataNascimento(`${diaNascimento}/${mesNascimento}/${anoNascimento}`)
                      novoCoordenador.setTelefone(telefone)
                      novoCoordenador.setProfissao(profissao)
                      novoCoordenador.setAcademia(academia)
                      enderecoCoordenador.setCep(cep)
                      enderecoCoordenador.setEstado(estado)
                      enderecoCoordenador.setCidade(cidade)
                      enderecoCoordenador.setBairro(bairro)
                      enderecoCoordenador.setRua(rua)
                      enderecoCoordenador.setNumero(numero)
                      enderecoCoordenador.setComplemento(complemento)
                      novoCoordenador.setEmail(email)
                      novoCoordenador.setSenha(senha)
                      novoCoordenador.setEndereco(enderecoCoordenador)
                      console.log(novoCoordenador)
                      selected == 0 ? novoCoordenador.setSexo('Feminino') : novoCoordenador.setSexo('Masculino')


                      if(novoCoordenador.getNome() == ''
                      || novoCoordenador.getCpf() == '' || novoCoordenador.getDataNascimento() == '' || novoCoordenador.getEmail() == '' 
                      || novoCoordenador.getSenha() == '' || novoCoordenador.getSexo() == '' || novoCoordenador.getTelefone() == '' 
                      || enderecoCoordenador.getCep() == '' || enderecoCoordenador.getCidade() == '' || enderecoCoordenador.getEstado() == ''
                      || enderecoCoordenador.getRua() == ''){
                        Alert.alert("Há campos não preenchidos.", "Preencha os campos antes de prosseguir.")
                        if(novoCoordenador.getNome() == '') setNomeInvalido(true)
                        if(novoCoordenador.getCpf() == '') setCpfInvalido(true)
                        if(novoCoordenador.getTelefone() == '') setTelefoneValido(false)
                        if(novoCoordenador.getProfissao() == '') setProfissaoInvalida(true)
                        if(enderecoCoordenador.getCep() == '') setCepInvalido(true)
                        if(enderecoCoordenador.getRua() == '') setRuaInvalida(true)
                        if(enderecoCoordenador.getEstado() == '') setEstadoInvalido(true)
                        if(enderecoCoordenador.getCidade() == '') setCidadeInvalida(true)
                        if(enderecoCoordenador.getBairro() == '') setBairroInvalido(true)
                        if(novoCoordenador.getEmail() == '') setEmailInvalido(true)
                        
                      } else {
                        handleFinalizarCadastro()
                      }
                    }}>
                        <Text 
                    style={[estilo.tituloH523px, estilo.textoCorLight]}>CADASTRAR-SE</Text>
                  </TouchableOpacity>
                  </SafeAreaView>
                  }
                   

                </ScrollView>
        )
}

const style = StyleSheet.create({
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
})