import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert, Image } from 'react-native';
import {} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { Container, Title, Form, FormInput, SubmitButton, Preview, RemoveButton } from './styles';

import CardProduct from '~/components/CardProduct';

import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Selecione o método de entrada',
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
};

const random = Math.random();

export default function AddProduct({ navigation }) {
  const [id, setId] = useState(navigation.getParam('id'));
  const [name, setName] = useState(navigation.getParam('name'));
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);


  function takePicture() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response);
      }
    });
  }

  function add() {
    if (!name || (!id && !image)) {
      Alert.alert("Atenção", "Preencha todos os campos para salvar");
      return;
    }

    setLoading(true);
    if(id) {
      firestore()
        .collection('Products')
        .doc(id)
        .set({ name })
        .then(async () => {
          if (image) {
            await storage().ref(`${id}.jpg`).putFile(image.uri);
          }
          navigation.goBack();
        })
    } else {
      firestore()
        .collection('Products')
        .add({ name })
        .then(async (doc) => {
          if (image) {
            await storage().ref(`${doc.id}.jpg`).putFile(image.uri);
          }
          navigation.goBack();
        })
    }
  }

  async function remove() {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja excluir esse produto?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => {
            await firestore().collection('Products').doc(id).delete();
            navigation.goBack();
          }
        }
      ]
    );
  }

  function getPreviewImage() {
    if (image) {
      return `data:image/jpeg;base64,${image.data}`;
    }
    if (id) {
      return `https://firebasestorage.googleapis.com/v0/b/venda-mascaras.appspot.com/o/${id}.jpg?alt=media&cache=${random}`;
    }
    return false;
  }

  return (
    <Container>
      <Title>Adicionar Máscara</Title>
      <Form>
        <FormInput
          icon="create"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome da máscara"
          value={name}
          onChangeText={setName}
        />

        { getPreviewImage() && <Preview source={{ uri: getPreviewImage() }} /> }

        <SubmitButton onPress={takePicture}>Adicionar Foto</SubmitButton>
        <SubmitButton onPress={add} loading={loading}>Cadastrar</SubmitButton>
        { id && <RemoveButton onPress={remove}>Excluir</RemoveButton> }
      </Form>
    </Container>
  );
}
