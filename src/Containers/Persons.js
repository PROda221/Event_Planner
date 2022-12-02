import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import FlatlistComponent from '@/Components/FlatlistComponent.js'
import Loader from '@/Components/loader.js'
import { debounce } from 'lodash'
import { getSearch } from '@/redux/actions/app.actions.js'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const SearchMovies = props => {
  const [states, setStates] = useState({ pageNo: 1, forceUpdate: false })
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const flatListRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    if (searchText != '') {
      setLoading(true)
      props.getSearch({ searchText: searchText, pageNo: states.pageNo })
    }
  }, [states])

  useEffect(() => {
    inputRef.current = debounce(getSearchData, 800)
  }, [])

  useEffect(() => {
    if (props.searchSuccess) {
      if (props.searchSuccess?.Response !== 'False') {
        let temp = [...props.searchSuccess?.Search]

        if (states.pageNo > 1) {
          setSearchData([...searchData, ...temp])
        } else {
          setSearchData(temp)
        }
      } else {
        setError(props.searchSuccess?.Error)
        setLoading(false)
        setSearchData([])
      }
    }
  }, [props.searchSuccess])

  useEffect(() => {
    if (searchData.length > 0) {
      setLoading(false)
    }
  }, [searchData])

  const seperator = () => {
    return <View style={styles.seperatorView} />
  }
  const getSearchData = () => {
    setStates(prevStates => {
      return { ...prevStates, forceUpdate: !prevStates.forceUpdate, pageNo: 1 }
    })
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.panelView}>
        <View style={styles.bodyView}>
          <Text
            style={[
              styles.bodyTextStyle,
              { fontWeight: 'bold', marginBottom: heightScale(10) },
            ]}
          >
            {item?.Title}
          </Text>
          <Image
            style={styles.imagePreview}
            source={{
              uri: `${item?.Poster}`,
            }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'flex-start' }}>
            <View style={styles.bodyStyle}>
              <Text style={[styles.bodyTextStyle, { fontWeight: 'bold' }]}>
                {'Year:'}
              </Text>
              <Text style={styles.bodyTextStyle}>{item?.Year}</Text>
            </View>
            <View style={styles.bodyStyle}>
              <Text style={[styles.bodyTextStyle, { fontWeight: 'bold' }]}>
                {'Imdb ID:'}
              </Text>
              <Text style={styles.bodyTextStyle}>{item?.imdbID}</Text>
            </View>
            <View style={styles.bodyStyle}>
              <Text style={[styles.bodyTextStyle, { fontWeight: 'bold' }]}>
                {'Type:'}
              </Text>
              <Text style={styles.bodyTextStyle}>{item?.Type}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.main}>
      <SafeAreaView style={{ backgroundColor: Colors.grayWhite2 }} />
      {props.searchLoading || loading ? <Loader /> : null}
      <View style={styles.mainPadding}>
        <View style={styles.searchBar}>
          <View style={styles.searchImageView}>
            <Image source={require('../Assets/Images/SearchIcon.png')} />
          </View>
          <TextInput
            style={styles.searchTextView}
            value={searchText}
            placeholder={'Search'}
            placeholderTextColor={Colors.tripGray}
            onChangeText={value => {
              inputRef.current(value)
              setSearchText(value)
            }}
          />
        </View>

        <FlatlistComponent
          error={error}
          reference={flatListRef}
          style={styles.flatlistStyle}
          showsVerticalScrollIndicator={true}
          data={searchData}
          thresholdValue={0.8}
          ItemSeparatorComponent={seperator}
          renderItem={renderItem}
          currentPage={states.pageNo}
          onPageChange={value => {
            setStates({ ...states, pageNo: value })
          }}
          totalItemCount={props.searchSuccess?.totalResults}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flatlistStyle: {
    marginBottom: moderateScale(20),
  },
  mainPadding: {
    flex: 1,
    paddingHorizontal: moderateScale(25),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: heightScale(10),
    backgroundColor: Colors.white,
  },
  buttonCall: {
    flexDirection: 'row',
    height: moderateScale(45),
    width: moderateScale(147),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grassGreen,
    borderRadius: moderateScale(50),
  },
  buttonText: {
    fontWeight: '700',
    fontSize: normalize(16),
    color: Colors.white,
    marginLeft: widthScale(5),
  },
  buttonChat: {
    flexDirection: 'row',
    height: moderateScale(45),
    width: moderateScale(147),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tripGray,
    borderRadius: moderateScale(50),
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: Colors.tripGray,
    height: moderateScale(45),
  },
  searchImageView: {
    justifyContent: 'center',
    marginLeft: widthScale(12),
  },
  searchTextView: {
    flex: 1,
    marginLeft: widthScale(10),
    fontWeight: '600',
    color: Colors.black,
  },
  seperatorView: {
    borderBottomColor: Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  panelView: {
    paddingVertical: heightScale(20),
  },
  bodyTextStyle: {
    paddingTop: heightScale(20),
    fontSize: normalize(12),

    fontWeight: '400',
    color: Colors.Black1,
  },
  imagePreview: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  bodyView: {
    alignItems: 'center',
    padding: moderateScale(0),
  },
  bodyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const mapStateToProps = ({ App, Auth }) => {
  const { searchLoading, searchSuccess, searchFail, supportNumber } = App
  return { searchLoading, searchSuccess, searchFail, supportNumber }
}

const mapDispatchToProps = { getSearch }

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies)
