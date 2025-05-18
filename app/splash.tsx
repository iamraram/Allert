import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../constants/Colors';

export default function Splash() {

  return (
    <SafeAreaView style={styles.container}>
      {/* 로고를 세로 중앙에 띄우기 위해 flex 분리 */}
      <View style={styles.flex1} />
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <View style={styles.flex1} />
      <View style={styles.googleButtonWrapper}>
        <View style={styles.googleButton}>
          <Image
            source={require('../assets/images/google.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>
            Google 계정으로 계속하기
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  logo: {
    width: 183,
    height: 52,
    // backgroundColor: 'black',
    alignSelf: 'center',
  },
  googleButtonWrapper: {
    width: '100%',
    paddingBottom: 16, // 홈 인디케이터 고려해서 여백!
  },
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
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.darkGray,
  },
});