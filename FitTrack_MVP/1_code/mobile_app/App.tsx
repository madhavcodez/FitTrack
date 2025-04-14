import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox } from 'react-native';

// Ignore specific warnings to prevent console noise
LogBox.ignoreLogs([
  'TurboModule registry',
  'Require cycle:',
  'ViewPropTypes will be removed from React Native',
]);

const App = () => {
  useEffect(() => {
    // Initialize any services or configuration here
    console.log('FitTrack App initialized');
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App; 