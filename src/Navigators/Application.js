import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import Persons from '../Containers/Persons'
import Albums from '../Containers/Albums'
import Photos from '@/Containers/Photos'
import { navigationRef } from './utils'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import { navigations } from './ScreenNames'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name={navigations.main}
            component={Persons}
            options={{
              title: 'Photos',
              headerShown: true,
              headerTintColor: Colors.black,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: normalize(34),
              },
            }}
          />
          <Stack.Screen
            name={navigations.albums}
            component={Albums}
            options={{
              title: 'Photos',
              headerShown: true,
              headerTintColor: Colors.black,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: normalize(18),
              },
            }}
          />
          <Stack.Screen
            name={navigations.photos}
            component={Photos}
            options={{
              title: 'Photos',
              headerShown: true,
              headerTintColor: Colors.black,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: normalize(18),
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
