import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import { connect } from 'react-redux'
import { getPhotos } from '@/redux/actions/app.actions.js'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Loader from '@/Components/loader.js'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const Photos = props => {
  const { name, albumId } = props.route.params

  const [photos, setPhotos] = useState({})
  const [modalData, setModalData] = useState({ isVisible: false, url: '' })

  useEffect(() => {
    props.navigation.setOptions({ title: name })
    props.getPhotos(albumId)
  }, [])

  useEffect(() => {
    if (props.getPhotosSuccess) {
      setPhotos(props.getPhotosSuccess)
    }
  }, [props.getPhotosSuccess])

  const enlargeImg = value => {
    return (
      <Modal
        style={{ justifyContent: 'center', alignItems: 'center' }}
        isVisible={modalData.isVisible}
        hasBackdrop
        onBackdropPress={() => {
          setModalData({ isVisible: false, url: '' })
        }}
      >
        {value ? (
          <View>
            <TouchableOpacity
              style={styles.cross}
              activeOpacity={0.8}
              onPress={() => setModalData({ isVisible: false, url: '' })}
            >
              <Image source={require('../Assets/Images/cross.png')} />
            </TouchableOpacity>
            <Image
              style={styles.imageView}
              source={{
                uri: `${value}.png`,
              }}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </Modal>
    )
  }

  const CardData = props => {
    return (
      <View>
        <Image
          style={styles.imagePreview}
          source={{
            uri: `${props.thumbnailUrl}.png`,
          }}
          resizeMode="contain"
        />
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderItemView}
        onPress={() => {
          setModalData({ isVisible: true, url: item?.url })
        }}
      >
        <CardData
          style={styles.thumbnail}
          albumId={item?.albumId}
          thumbnailUrl={item?.thumbnailUrl}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.main}>
      {props.getPhotosLoading ? (
        <Loader />
      ) : (
        <View>
          {enlargeImg(modalData.url)}
          <View style={styles.seperator} />
          <Text style={styles.title}>Photos</Text>
          <FlatList
            numColumns={2}
            nestedScrollEnabled
            style={styles.flatList}
            data={photos.length > 0 ? photos : []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  )
}

const mapStateToProps = ({ App, Auth }) => {
  const { getPhotosLoading, getPhotosSuccess, getPhotosFail } = App
  const {} = Auth
  return {
    getPhotosLoading,
    getPhotosSuccess,
    getPhotosFail,
  }
}

const mapDispatchToProps = { getPhotos }

export default connect(mapStateToProps, mapDispatchToProps)(Photos)

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
  imageView: {
    width: moderateScale(300),
    height: moderateScale(300),
    borderRadius: moderateScale(10),
  },
  imagePreview: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  cross: {
    backgroundColor: Colors.white,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40 / 2),
    zIndex: 10,
    position: 'absolute',
    left: moderateScale(270),
    top: moderateScale(-10),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
