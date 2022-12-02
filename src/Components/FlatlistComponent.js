import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import EmptyListComponent from './emptyList'
import scaling from '../Theme/normalize.js'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const FlatlistComponent = ({
  error,
  currentPage,
  data,
  renderItem,
  reference,
  onPageChange,
  thresholdValue,
  totalItemCount,
  ItemSeparatorComponent,
  ...props
}) => {
  const incrementPage = () => {
    if (data.length < totalItemCount) {
      const incrementedPage = currentPage + 1
      onPageChange(incrementedPage)
    }
  }

  return (
    <View>
      <FlatList
        ListEmptyComponent={<EmptyListComponent error={error} />}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        onEndReached={incrementPage}
        ref={reference}
        onEndReachedThreshold={thresholdValue}
        ItemSeparatorComponent={ItemSeparatorComponent}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
export default FlatlistComponent
