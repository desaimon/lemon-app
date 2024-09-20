import React from 'react';
import { Drawer } from 'expo-router/drawer';


export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{     
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      headerShown: false,
      }}
    >
      <Drawer.Screen
        name="profile" 
        options={{
          drawerLabel: 'Profile',
          title: 'User Profile',
        }}
      />
      
    </Drawer>
  );
}
