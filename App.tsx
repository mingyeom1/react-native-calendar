import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigators/tab.navigator';

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
