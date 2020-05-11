import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signUpRequest } from '~/store/modules/auth/actions';
import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText, Logo } from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (!name || !email || !password || !confirmPassword){
      Alert.alert('Atenção', 'Preencha todos os dados para efetuar o cadastro');
      return;
    }

    if (password !== confirmPassword){
      Alert.alert('Atenção', 'As senhas digitadas não são iguais');
      return;
    }

    dispatch(signUpRequest(name, email, password, signUpSuccess));
  }

  function signUpSuccess() {
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <Form>

        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do vendedor"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />

        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="E-mail"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          ref={passwordRef}
          placeholder="Senha"
          returnKeyType="send"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          value={password}
          onChangeText={setPassword}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          ref={confirmPasswordRef}
          placeholder="Confirmação de senha"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>Cadastrar</SubmitButton>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Form>
    </Container>
  );
}
