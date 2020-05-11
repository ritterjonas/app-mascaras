import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { NavigationActions } from 'react-navigation';

import { signInSuccess, signFailure, signUpSuccess } from './actions';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function getUserFirebase(uid) {
  return await firestore()
    .collection('Users')
    .doc(uid)
    .get();
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call([auth(), auth().signInWithEmailAndPassword], email, password);

    if (response.user && response.user.emailVerified === false) {
      Alert.alert('Atenção', 'Este email ainda não foi confirmado, gostaria de enviar novamente o email de confirmação?', [
        { text: 'SIM', onPress: () => response.user.sendEmailVerification() },
        { text: 'NÃO', onPress: () => {}, style: 'cancel' },
      ]);
      yield put(signFailure());
    } else {
      const firebaseUser = yield call(getUserFirebase, response.user.uid);
      console.log('FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOI');
      console.log(firebaseUser.data());
      yield put(signInSuccess(firebaseUser.data()));
    }
  } catch (err) {
    console.tron.log(err);
    Alert.alert('Falha na autenticação', 'Verifique seus dados');

    yield put(signFailure());
  }
}

async function saveUserFirebase(user) {
  return await firestore()
    .collection('Users')
    .doc(user.id)
    .set(user);
}

export function* signUp({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call([auth(), auth().createUserWithEmailAndPassword], email, password);
    const user = response.user;

    const responseUpdate = yield call([user, user.updateProfile], { displayName: payload.name });

    const responseMail = yield call([user, user.sendEmailVerification]);
    Alert.alert(`Enviamos um email de confirmação para ${email}, confirme seu cadastro e faça o login`);

    const firebaseUser = {
      id: user.uid,
      name: payload.name,
      lat: null,
      lon: null
    }
    const firebaseSuccess = yield call(saveUserFirebase, firebaseUser)

    yield put(signUpSuccess());

    payload.callback();
  } catch (err) {
    let message = 'Ocorreu um erro, tente novamente mais tarde';

    switch(err.code) {
      case 'auth/email-already-in-use':
        message = 'O email digitado já está em uso';
        break;
      case 'auth/invalid-email':
        message = 'O email digitado não é válido';
        break;
      case 'auth/weak-password':
        message = 'A senha digita é fraca demais';
        break;
    }
    Alert.alert('Falha no cadastro', message);

    yield put(signFailure());
  }
}

export function redirectSignIn() {
  NavigationActions.navigate({ routeName: 'SignIn', params: {} });
}


export function signOut() {
  // auth().signOut();
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_UP_SUCCESS', redirectSignIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
