import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import scaling from '../Theme/normalize.js'
import { Colors } from '@/Theme/Variables'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const EmptyListComponent = ({ error = 'No Data Found' }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.noDataFound}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noDataFound: {
    fontSize: heightScale(14),
    color: Colors.greyishBrownTwo,
  },
})

export default EmptyListComponent
