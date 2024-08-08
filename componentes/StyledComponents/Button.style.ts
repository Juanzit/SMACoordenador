import styled from 'styled-components/native';
import Estilo from '../estilo';

const ButtonStyled = styled.TouchableOpacity<{ isActive?: boolean }>`
  ${Estilo.sombra}
  ${Estilo.botao}
  ${Estilo.corPrimaria}
`;

const TextStyled = styled.Text<{ isActive?: boolean }>`
  ${Estilo.textoP16px}
  ${Estilo.textoCorLight}
`;

export { ButtonStyled, TextStyled };