import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText, Logo } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (!email || !password){
      Alert.alert('Atenção', 'Preencha todos os dados para efetuar o login');
      return;
    }

    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Digite sua senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>Acessar</SubmitButton>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar Conta</SignLinkText>
        </SignLink>
      </Form>
    </Container>
  );
}
