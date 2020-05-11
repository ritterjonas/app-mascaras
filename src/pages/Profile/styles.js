import styled from "styled-components/native";
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ff4081;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #FFF;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Logout = styled(Button)`
  margin: 15px 30px 0 30px;
`;
