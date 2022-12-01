import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const Loader = ({ animating, transparent = true }) => {
  return (
    <View style={styles.loadingContainer}>
      <View style={[styles.loadingSubContainer]}>
        <ActivityIndicator
          color={'#fff'}
          style={[!transparent && styles.bgColor]}
          animating={animating}
          size="large"
        />
      </View>
    </View>
  )
}
export default Loader

const backgroundColor = '#ffffff'
const styles = StyleSheet.create({
  bgColor: {
    backgroundColor,
  },
  loadingContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  loadingSubContainer: {
    backgroundColor: '#000',
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
