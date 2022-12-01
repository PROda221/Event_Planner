import 'react-native-gesture-handler'
import React from 'react'
import { LogBox } from 'react-native'
import { StatusBar, SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import ApplicationNavigator from '@/Navigators/Application'

import { SafeAreaProvider } from 'react-native-safe-area-context'

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
        <ApplicationNavigator />
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
