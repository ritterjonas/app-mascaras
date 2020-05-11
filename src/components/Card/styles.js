import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';

export const Container = styled.TouchableOpacity`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background: #FFF;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Lines = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-left: 8px;
`;

export const SubName = styled.Text`
  font-size: 11px;
  color: #777;
  margin-left: 8px;
`;

export const Button = styled.TouchableOpacity`
  background: #f50057;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

export const Preview = styled.Image`
  width: 100%;
  aspect-ratio: 1;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: #f50057;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  margin-top: 20px;
`;

export const TextStyle = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;
