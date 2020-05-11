import React from 'react';
import { Text } from 'react-native';


import Background from '~/components/Background'

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions'

import { Container, Title, Logout } from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.profile);

  function logout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Olá, {user.name}</Title>
        { user.admin && <Logout onPress={() => navigation.navigate('ManageProducts', { })}>Gerenciar máscaras</Logout>}
        <Logout onPress={logout}>Sair</Logout>
      </Container>
    </Background>
  );
}
