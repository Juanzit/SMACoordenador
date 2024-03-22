import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import Logo from '../Logo';
import estilo from '../estilo';
import { getDocs, collection } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import { coordenadorLogado } from '../LoginScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSemConexao from '../ModalSemConexao';
import NetInfo from '@react-native-community/netinfo';

export default ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [carregandoAlunos, setCarregandoAlunos] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const academiaRef = collection(firebaseBD, 'Academias');
        const querySnapshot = await getDocs(academiaRef);

        const newArrayAlunos = [];

        for (const academiaDoc of querySnapshot.docs) {
          const academiaNome = academiaDoc.get('nome');

          if (academiaNome === coordenadorLogado.getAcademia()) {
            const alunoRef = collection(
              firebaseBD,
              'Academias',
              coordenadorLogado.getAcademia(),
              'Alunos'
            );

            const alunoSnapshot = await getDocs(alunoRef)

            for (const alunoDoc of alunoSnapshot.docs) {
              const alunoData = alunoDoc.data();

              newArrayAlunos.push(alunoData);
            }
          }
        }

        setAlunos(newArrayAlunos);
        setCarregandoAlunos(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlunos();
  }, 
  []);

  const alunosAtivos = alunos.filter((aluno) => !aluno.inativo);
  const alunosInativos = alunos.filter((aluno) => aluno.inativo);

  // Organiza os alunos ativos por turma
  const alunosAtivosPorTurma = alunosAtivos.reduce((acc, aluno) => {
    acc[aluno.turma] = acc[aluno.turma] || [];
    acc[aluno.turma].push(aluno);
    return acc;
  }, {});

  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const redirecionarParaPerfilAluno = (aluno) => {
    navigation.navigate('Perfil Aluno', { aluno: aluno });
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <>
          <Logo />
          {!conexao ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Modo Offline",
                  "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
                );
              }}
              style={[estilo.centralizado, { marginVertical: '3%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
            >
              <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
              <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
            </TouchableOpacity>
          ) : null}
          <Text style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]} numberOfLines={2}>
            Selecione o aluno para continuar.
          </Text>
          {Object.entries(alunosAtivosPorTurma).map(([turma, alunosDaTurma]) => (
            <View key={turma}>
              <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { margin: 10 }]}>{turma}</Text>
              {alunosDaTurma.map((aluno) => (
                <TouchableOpacity
                  key={aluno.cpf}
                  style={[estilo.botao, estilo.corPrimaria, style.botao]}
                  onPress={() => navigation.navigate('Perfil Aluno', { aluno: aluno })}
                >
                  <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                    {aluno.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, { margin: 10 }]}>Inativos</Text>
          {alunosInativos.map((aluno) => (
            <TouchableOpacity
              key={aluno.cpf}
              style={[estilo.botao, estilo.corDisabled, style.botao]}
              onPress={() => navigation.navigate('Perfil Aluno', { aluno: aluno })}
            >
              <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>
                {aluno.nome} - inativo
              </Text>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: '5%',
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
  },
  textoAlinhado: {
    marginLeft: '5%',
    marginTop: '15%',
    textDecorationLine: 'underline',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'space-around', // Alinha os itens horizontalmente
  },
});
