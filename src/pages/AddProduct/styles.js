import { Platform } from 'react-native';
import styled from "styled-components/native";

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ff4081;

  padding: 0 30px

  align-items: center;
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;

  align-items: center;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  width: 100%;
`;

export const Preview = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 25px;
`;

export const RemoveButton = styled(Button)`
  margin-top: 50px;
  width: 100%;
  background: #EFEFEF;
`;
