import React from 'react';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './UserContext';

export default function RootLayout() {

  return (
    <UserProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </GestureHandlerRootView>
    </UserProvider>
  );
};