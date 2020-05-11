import styled from "styled-components/native";
import { BaseButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ff4081;

  align-items: center;
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 20, paddingTop: 20 }
})``;

export const AddButton = styled(BaseButton)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  background: #f8bbd0;
  width: 70px;
  height: 70px;

  border-radius: 35px;
  align-items: center;
  justify-content: center;
`;

export const AddButtonText = styled.Text`
  color: black;
  font-size: 24px
`;
