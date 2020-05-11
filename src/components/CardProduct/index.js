import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import { Container, Left, Avatar, Name, Button, Preview, ButtonText, CenteredView, ModalView, CloseButton, TextStyle } from './styles';

import firestore from '@react-native-firebase/firestore';

const random = Math.random();

export default function CardProduct({ data, onPress, text }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container
      key={data}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <CenteredView>
          <ModalView>
            <Preview source={{ uri: `https://firebasestorage.googleapis.com/v0/b/venda-mascaras.appspot.com/o/${data.id}.jpg?alt=media&cache=${random}` }} />

            <CloseButton
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TextStyle>Fechar</TextStyle>
            </CloseButton>
          </ModalView>
        </CenteredView>
      </Modal>
      <Left>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar source={{ uri: `https://firebasestorage.googleapis.com/v0/b/venda-mascaras.appspot.com/o/${data.id}.jpg?alt=media&cache=${random}` }} />
        </TouchableOpacity>

        <Name>{data.name}</Name>
      </Left>
      <Button onPress={() => onPress(data)} >
        <ButtonText>{text}</ButtonText>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    backgroundColor: "#f50057",
    borderRadius: 10,
    padding: 10,
    width: 100,
    elevation: 2,
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
