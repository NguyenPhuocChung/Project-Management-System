import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Todo from './compoment/todo';  // Đường dẫn đến file Todo
import Detail from './compoment/detail';  // Đường dẫn đến file Detail

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={Todo} options={{ title: 'Tasks' }} />
        <Stack.Screen name="Detail" component={Detail} options={{ title: 'Task Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


