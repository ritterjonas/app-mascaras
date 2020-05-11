import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import {} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import { Container, Title, List, Content, AddButton, AddButtonText } from './styles';

import CardProduct from '~/components/CardProduct';

export default function ManageProducts({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    function onResult(query) {
      const list = query.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });

      setOrders(list);
    }

    function onError(error) {
      console.error(error);
    }

    firestore()
      .collection('Products')
      .onSnapshot(onResult, onError);
  }, []);

  function add() {
    navigation.navigate('AddProduct');
  }

  return (
    <Container>
      <Title>Máscaras</Title>

      <Content>
        <List
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardProduct data={item} onPress={(item) => navigation.navigate('AddProduct', item)} text="Editar" />}
          />
      </Content>

      <AddButton onPress={add}>
        <AddButtonText>+</AddButtonText>
      </AddButton>
    </Container>
  );
}
