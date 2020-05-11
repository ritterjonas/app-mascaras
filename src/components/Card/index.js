import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

import { Container, Left, Avatar, Name, Button, SubName, ButtonText, Lines, Preview, CenteredView, ModalView, CloseButton, TextStyle } from './styles';

const random = Math.random();

export default function Card({ data, text, onPress, onLongPress }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container
      activeOpacity={0.9}
      onLongPress={onLongPress}
      key={data}
      style={{
        backgroundColor: data.kids ? '#b3e5fc' : 'white',
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
            <Preview source={{ uri: `https://firebasestorage.googleapis.com/v0/b/venda-mascaras.appspot.com/o/${data.product}.jpg?alt=media&cache=${random}` }} />

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
        <Avatar source={{ uri: `https://firebasestorage.googleapis.com/v0/b/venda-mascaras.appspot.com/o/${data.product}.jpg?alt=media&cache=${random}` }} />
      </TouchableOpacity>

        <Lines>
          <Name>{data.productName} ({data.qty})</Name>
          <SubName>{data.seller} para {data.client}</SubName>
        </Lines>
      </Left>
      <Button onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Container>
  );
}
