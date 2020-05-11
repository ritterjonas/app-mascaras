import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import {} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import { Container, Title, List, Content, Separator } from './styles';

import Card from '~/components/Card';
import Background from '~/components/Background';

export default function Dashboard() {
  const user = useSelector(state => state.user.profile);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    function onResult(query) {
      const list = query.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      console.log(list);
      setOrders(list);
    }

    function onError(error) {
      console.error(error);
    }

    firestore()
      .collection('Orders')
      .onSnapshot(onResult, onError);
  }, []);

  function getButtonText(id) {
    switch(id) {
      case 1: return 'Avançar';
      case 2: return 'Entregar';
      case 3: return 'Pago';
      case 4: return 'Concluída';
    }
    return null;
  }

  function getMessage(id) {
    switch(id) {
      case 1: return 'Tem certeza que esse pedido está pronto?';
      case 2: return 'Tem certeza que esse pedido foi entregue?';
      case 3: return 'Tem certeza que esse pedido foi pago?';
      case 4: return 'Concluída';
    }
    return null;
  }

  function hasAccess(status) {
    return user.admin || status != 1;
  }

  function next(item) {
    if (item.status >= 4 || !hasAccess(item.status)) return;
    Alert.alert(
      'Atenção',
      getMessage(item.status),
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => await firestore().collection('Orders').doc(item.id).update({ status: item.status + 1 })
        }
      ]
    );
  }

  function removeOrder(item) {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja remover esse pedido?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => await firestore().collection('Orders').doc(item.id).delete()
        }
      ]
    );
  }

  function getOrdersByStatus(id) {
    return orders.filter(o => o.status == id && (o.sellerId == user.id || user.admin));
  }

  return (
    <Background>
      <Container>
        <Title>Pedidos</Title>

        <Content>
          {
            getOrdersByStatus(1).length > 0  &&
            <>
              <Separator>Pedidos Pendentes</Separator>
              <List
                data={getOrdersByStatus(1)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Card onPress={() => next(item)} data={item} onLongPress={() => removeOrder(item)} text={getButtonText(item.status)} />}
                />
            </>
          }

          {
            getOrdersByStatus(2).length > 0  &&
            <>
              <Separator>Produção Finalizada</Separator>
              <List
                data={getOrdersByStatus(2)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Card onPress={() => next(item)} data={item} onLongPress={() => removeOrder(item)} text={getButtonText(item.status)} />}
                />
            </>
          }

          {
            getOrdersByStatus(3).length > 0  &&
            <>
              <Separator>Pendente de Pagamento</Separator>
              <List
                data={getOrdersByStatus(3)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Card onPress={() => next(item)} data={item} onLongPress={() => removeOrder(item)} text={getButtonText(item.status)} />}
                />
            </>
          }

          {
            getOrdersByStatus(4).length > 0  &&
            <>
              <Separator>Concluídas</Separator>
              <List
                data={getOrdersByStatus(4)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Card onPress={() => next(item)} data={item} onLongPress={() => removeOrder(item)} text={getButtonText(item.status)} />}
                />
            </>
          }
        </Content>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Pedidos',
  tabBarIcon: ({ tintColor }) => <Icon name="phonelink-ring" size={20} color={tintColor} />
}
