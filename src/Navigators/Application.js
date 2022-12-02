import React from 'react'
import { SafeAreaView, StatusBar, Appearance } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import Persons from '../Containers/Persons'
import { navigationRef } from './utils'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import { navigations } from './ScreenNames'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const colorScheme = Appearance.getColorScheme()
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name={navigations.main}
            component={Persons}
            options={{
              title: 'Movies',
              headerShown: true,
              headerTintColor: Colors.black,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: normalize(34),
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
