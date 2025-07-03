import {NavigationContainer} from '@react-navigation/native'
import {TabNavigator} from './src/navigators/tab.navigator'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <TabNavigator />
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default App
