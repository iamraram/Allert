import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from '@env';
import { app } from '../scripts/firebase/config'; // 경로 맞게!
import colors from '../constants/Colors';

WebBrowser.maybeCompleteAuthSession();

export default function Splash({  }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type === 'success') {
        try {
          const { id_token } = response.params;
          const auth = getAuth(app);
          const credential = GoogleAuthProvider.credential(id_token);
          const result = await signInWithCredential(auth, credential);
          // Firestore 유저 저장
          const db = getFirestore(app);
          const user = result.user;
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date(),
          }, { merge: true });

          // 로그인 성공 시 이동
          Alert.alert('로그인 성공', `${user.displayName}님 환영합니다!`);
          // navigation.replace('/(tabs)/index') 등 원하는 페이지 이동
        } catch (e) {
          Alert.alert('구글 로그인 오류', e.message);
        }
      }
    };
    loginWithGoogle();
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex1} />
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <View style={styles.flex1} />
      <View style={styles.googleButtonWrapper}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image source={require('../assets/images/google.png')} style={styles.googleLogo} />
          <Text style={styles.googleButtonText}>Google 계정으로 계속하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, justifyContent: 'flex-end', alignItems: 'center' },
  flex1: { flex: 1 },
  logo: { width: 183, height: 52, alignSelf: 'center' },
  googleButtonWrapper: { width: '100%', paddingBottom: 16 },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  googleLogo: { width: 20, height: 20, marginRight: 10 },
  googleButtonText: { fontSize: 19, fontWeight: '600', color: colors.darkGray },
});