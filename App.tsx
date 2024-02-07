import React from 'react';
import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import Navigator from './src/navigator/Navigator';
// import {AuthProvider} from './src/context/AuthContext';
import {ErrorsProvider} from './src/context/ErrorsContext';
// import {UserProvider} from './src/context/UserContext';
// import {ItemPressProvider} from './src/context/ItemPressContext';
// import {SearchBarProvider} from './src/context/SearchContext';
const queryClient = new QueryClient();

const AppState = ({children}: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorsProvider>{children}</ErrorsProvider>
    </QueryClientProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <AppState>
          <Navigator />
        </AppState>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
