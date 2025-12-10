import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from '../components/Sidebar';
import HomeScreen from '../screens/HomeScreen';
import POSScreen from '../screens/POSScreen';
import TransactionScreen from '../screens/TransactionScreen';
import InventoryScreen from '../screens/InventoryScreen';
import FinanceScreen from '../screens/FinanceScreen';
import { colors } from '../utils/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="POS" component={POSScreen} />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="Finance" component={FinanceScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const navigationRef = React.useRef();
  const [activeRoute, setActiveRoute] = React.useState('Home');

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        if (state) {
          const currentRoute = state.routes[state.index].name;
          setActiveRoute(currentRoute);
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.sidebarContainer}>
          <Sidebar navigation={navigationRef.current} activeRoute={activeRoute} />
        </View>
        <View style={styles.mainContent}>
          <MainNavigator />
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  sidebarContainer: {
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
  },
});

export default AppNavigator;
