import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import { connect } from 'react-redux'
import { albumsCount } from '@/redux/actions/app.actions.js'
import { navigations } from '@/Navigators/ScreenNames.js'
import Loader from '@/Components/loader.js'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const Albums = props => {
  const { name, userId } = props.route.params

  const [albumCount, setAlbumCount] = useState({})

  useEffect(() => {
    props.navigation.setOptions({ title: name })
    props.albumsCount(userId)
  }, [])

  useEffect(() => {
    if (props.albumCountSuccess) {
      let tempCount = props.albumCountSuccess.map((value, index, array) => {
        return { ...value, albumId: index + 1 }
      })
      setAlbumCount(tempCount)
    }
  }, [props.albumCountSuccess])

  useEffect(() => {
    if (props.albumCountFail) {
      console.log(props.albumCountFail)
      // setPeopleData(props.albumCountFail)
    }
  }, [props.albumCountFail])

  const navigatePhotos = item => {
    props.navigation.navigate(navigations.photos, {
      name: name,
      albumId: item?.albumId,
    })
  }

  const CardData = props => {
    return (
      <View>
        <View style={props.style}></View>
        <View>
          <Text style={styles.albumText}>{`Album ${props.albumId}`}</Text>
          <Text style={styles.albumCountText}>{'50'}</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderItemView}
        onPress={() => navigatePhotos(item)}
      >
        <CardData style={styles.thumbnail} albumId={item?.albumId} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.main}>
      <View style={styles.seperator} />
      {props.albumCountLoading ? (
        <Loader />
      ) : (
        <View>
          <Text style={styles.title}>Albums</Text>
          <FlatList
            numColumns={2}
            nestedScrollEnabled
            style={styles.flatList}
            data={albumCount.length > 0 ? albumCount : []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  )
}

const mapStateToProps = ({ App, Auth }) => {
  const { albumCountLoading, albumCountSuccess, albumCountFail } = App
  const {} = Auth
  return {
    albumCountLoading,
    albumCountSuccess,
    albumCountFail,
  }
}

const mapDispatchToProps = { albumsCount }

export default connect(mapStateToProps, mapDispatchToProps)(Albums)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  seperator: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    marginLeft: widthScale(20),
    marginTop: heightScale(10),
    fontSize: normalize(22),
    fontWeight: '700',
    color: Colors.black,
  },
  renderItemView: {
    marginLeft: moderateScale(18),
    marginBottom: moderateScale(18),
  },
  cardView: {
    height: moderateScale(200),
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.border,
    marginBottom: heightScale(16),
  },
  flatList: {
    marginTop: heightScale(16),
    marginBottom: heightScale(25),
  },
  innerCardView: {
    margin: widthScale(16),
  },
  name: {
    fontSize: normalize(22),
    fontWeight: '700',
    color: Colors.black,
  },
  emailText: {
    fontWeight: '500',
    fontSize: normalize(16),
    color: Colors.newGray,
    marginTop: heightScale(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightScale(12),
  },
  company: {
    color: Colors.newGray,
    fontSize: normalize(16),
    fontWeight: '500',
  },
  flatlistView: {
    height: moderateScale(400),
  },
  analyticsView: {
    height: moderateScale(400),
  },
  thumbnail: {
    height: moderateScale(150),
    backgroundColor: Colors.LightPink1,
    width: moderateScale(150),
    borderColor: Colors.Black1,
    borderWidth: moderateScale(1),
  },
  thumbnailLeft: {
    height: moderateScale(150),
    backgroundColor: Colors.LightPink1,
    width: moderateScale(150),
    borderColor: Colors.Black1,
    borderWidth: moderateScale(1),
    marginLeft: widthScale(11),
  },
  albumText: {
    fontSize: normalize(15),
    color: Colors.black,
    fontWeight: '500',
  },
  albumCountText: {
    fontWeight: '400',
    color: Colors.black,
    opacity: 0.5,
  },
})
