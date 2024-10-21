
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import CreateNewAccount from './src/screens/CreateNewAccount';
import ForgotPassword from './src/screens/ForgotPassword';
import Home from './src/screens/Home';
import ItemList from './src/screens/ItemList';
import ItemDetail from './src/screens/ItemDetail';
import EditProfile from './src/screens/EditProfile';
import Profile from './src/screens/Profile';
import Weather from './src/screens/Weather';
import Favorites from './src/screens/Favorites';
import Transportation from './src/screens/Transportation';
import Notification from './src/screens/Notification';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={Login}  options={{headerShown: false}}/>
        <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="ItemList" component={ItemList}  options={{headerShown: false}} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} options={{headerShown: false}} /> 
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        <Stack.Screen name="Weather" component={Weather} options={{headerShown: false}} />
        <Stack.Screen name="Favorites" component={Favorites} options={{headerShown: false}} />
        <Stack.Screen name="Transportation" component={Transportation} />
        <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




