import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 라우팅 시스템이 완전히 준비된 이후 실행
    setTimeout(() => {
      setReady(true);
    }, 100); // 0.1초만 기다려도 충분함
  }, []);

  useEffect(() => {
    if (ready) {
      router.replace('/splash');
    }
  }, [ready]);

  return (
    <View>
    </View>
  );
}