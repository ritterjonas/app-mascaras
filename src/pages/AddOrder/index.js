import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert, Switch } from 'react-native';
import {} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import { Container, Title, List, Content, ContentSelected, Form, FormInput, SubmitButton } from './styles';

import CardProduct from '~/components/CardProduct';

import moment from 'moment';

export default function AddOrder({ navigation }) {
  const [name, setName] = useState();
  const [qtd, setQtd] = useState();
  const [kids, setKids] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user.profile);

  useEffect(() => {
    function onResult(query) {
      const list = query.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });

      setProducts(list);
    }

    function onError(error) {
      console.error(error);
    }

    firestore()
      .collection('Products')
      .onSnapshot(onResult, onError);
  }, []);

  async function add() {
    if (!name || !qtd) {
      Alert.alert('Atenção', 'Preencha todos os campos para adicionar o pedido');
      return;
    }

    setLoading(true);
    await firestore().collection('Orders').add({
      client: name,
      date: moment().format('YYYY-MM-DD'),
      seller: user.name,
      sellerId: user.id,
      productName: selected.name,
      product: selected.id,
      status: 1,
      qty: qtd,
      kids: kids
    })
    setLoading(false);

    setName(null);
    setSelected(null);
    setQtd(null);
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <Title>{ selected ? 'Inclusão de Pedido' : 'Selecione a Máscara desejada' }</Title>

      { !selected &&
        <Content>
          <List
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CardProduct data={item} onPress={(item) => setSelected(item)} text="Selecionar" />}
            />
        </Content>
      }

      { selected &&
        <ContentSelected>
          <CardProduct data={selected} onPress={() => setSelected(null)} text="Remover" />


          <Form>
            <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome do Cliente"
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="unfold-more"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Quantidade de máscaras"
              value={qtd}
              keyboardType={'numeric'}
              onChangeText={setQtd}
            />

            <Text style={{ color: 'white', marginTop: 10 }}>Infantil?</Text>
            <Switch onValueChange={setKids} value={kids}/>

            <SubmitButton onPress={add} loading={loading}>Criar pedido</SubmitButton>
          </Form>
        </ContentSelected>
      }
    </Container>
  );
}

AddOrder.navigationOptions = {
  tabBarLabel: 'Adicionar Pedido',
  tabBarIcon: ({ tintColor }) => <Icon name="add-circle" size={20} color={tintColor} />
}
