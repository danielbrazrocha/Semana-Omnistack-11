import React from 'react'; // Para utilizarmos o JSX, assim como no React.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator(); // Conteúdo de createStackNavigator
																				 // armazenado na varíavel AppStack.
import Incidents from './pages/Incidents'; // Importação da página, index.js.
import Detail from './pages/Detail';

export default function Routes() {
  return (
    <NavigationContainer> 
     <AppStack.Navigator screenOptions={{ headerShown: false }}> 
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}