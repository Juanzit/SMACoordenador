import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import estilo from '../estilo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default ({navigation, route}) => {

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text style={[estilo.tituloH619px, estilo.centralizado]}>PRESSONE PARA VISUALIZAR OS TESTES REALIZADOS</Text>
        </View>

        <View>
          <TouchableOpacity
            style={[
              estilo.botao,
              estilo.sombra,
              estilo.corPrimaria,
            ]}
            onPress={() => navigation.navigate('Testes1')}
          >
            <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>PROSSEGUIR</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
