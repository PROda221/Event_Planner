import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import scaling from '../Theme/normalize.js'
import { connect } from 'react-redux'
import { personData, albumData } from '@/redux/actions/app.actions.js'
import { navigations } from '@/Navigators/ScreenNames.js'
import Loader from '@/Components/loader.js'
import PieChart from 'react-native-pie-chart'

const { normalize, widthScale, heightScale, moderateScale } = scaling

const Persons = props => {
  const [donutData, setDonutData] = useState([])
  const [sliceColor, setSliceColor] = useState([])

  const [albumCount, setAlbumCount] = useState({})
  const [peopleData, setPeopleData] = useState([])

  useEffect(() => {
    props.personData()
    props.albumData()
  }, [])

  useEffect(() => {}, [sliceColor])

  useEffect(() => {
    if (Object.keys(albumCount).length > 0) {
      let tempDonutData = []
      let tempDonutColor = []
      for (let i in albumCount) {
        tempDonutData.push(albumCount[i])
        tempDonutColor.push(generateColor())
      }
      setSliceColor(tempDonutColor)
      setDonutData(tempDonutData)
    }
  }, [albumCount])

  useEffect(() => {
    if (props.personDataSuccess) {
      setPeopleData(props.personDataSuccess)
    }
  }, [props.personDataSuccess])

  useEffect(() => {
    if (props.albumDataSuccess) {
      let tempCount = {}
      props.albumDataSuccess.map((value, index, array) => {
        if (tempCount[value?.userId]) {
          tempCount[value?.userId] += 1
        } else {
          tempCount[value?.userId] = 1
        }
      })
      setAlbumCount(tempCount)
    }
  }, [props.albumDataSuccess])

  useEffect(() => {
    if (props.albumDataFail) {
      console.log(props.albumDataFail)
      // setPeopleData(props.albumDataFail)
    }
  }, [props.albumDataFail])

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
    return `#${randomColor}`
  }

  const processNumber = phone => {
    let processedPhone = ''
    let count = 0
    for (let i of phone) {
      if (count == 10) {
        return processedPhone
      } else {
        checkNumber = Number(i)
        if (!isNaN(checkNumber)) {
          count++
          processedPhone = processedPhone + i.toString()
        }
      }
    }
  }

  const navigateAlbums = item => {
    props.navigation.navigate(navigations.albums, {
      name: item?.name,
      userId: item?.id,
    })
  }

  const ShowDonutDistribution = () => {
    Object.entries(albumCount).map(function (value, index, array) {
      return (
        <View>
          <Text>{value}</Text>
        </View>
      )
    })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderItemView}
        onPress={() => navigateAlbums(item)}
      >
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.emailText}>{item?.email}</Text>
            <Text style={[styles.emailText, { marginTop: heightScale(4) }]}>
              {processNumber(item?.phone)}
            </Text>
            <View style={[styles.seperator, { marginTop: heightScale(24) }]} />
            <View style={styles.row}>
              <Text style={styles.company}>{item?.company?.name}</Text>
              <Text style={styles.company}>{albumCount[item?.id]}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.main}>
      {props.personDataLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.seperator} />
          <Text style={styles.title}>People</Text>
          <View style={styles.flatlistView}>
            <FlatList
              nestedScrollEnabled
              style={styles.flatList}
              data={peopleData.length > 0 ? peopleData : []}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Text style={styles.title}>Analytics</Text>
          <View style={styles.analyticsView}>
            <Text style={styles.analyticsTitle}>People</Text>
            {Object.keys(sliceColor).length > 0 &&
            Object.keys(donutData).length > 0 ? (
              <PieChart
                style={styles.pieChartStyle}
                widthAndHeight={moderateScale(200)}
                series={donutData}
                sliceColor={sliceColor}
                doughnut={true}
                coverRadius={0.8}
                // coverFill={'#FFF'}
              />
            ) : null}
            <View>
              {peopleData?.map((value, index, array) => {
                return (
                  <View
                    style={[
                      styles.row,
                      { alignItems: 'center', justifyContent: 'flex-start' },
                    ]}
                  >
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor: sliceColor[value?.id - 1],
                        },
                      ]}
                    ></View>
                    <Text style={styles.colorNames}>{value?.name}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const mapStateToProps = ({ App, Auth }) => {
  const {
    personDataLoading,
    personDataSuccess,
    personDataFail,
    albumDataLoading,
    albumDataSuccess,
    albumDataFail,
  } = App
  const {} = Auth
  return {
    personDataLoading,
    personDataSuccess,
    personDataFail,
    albumDataLoading,
    albumDataSuccess,
    albumDataFail,
  }
}

const mapDispatchToProps = { personData, albumData }

export default connect(mapStateToProps, mapDispatchToProps)(Persons)

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
    marginHorizontal: moderateScale(24),
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
    marginTop: heightScale(15),
    marginHorizontal: widthScale(14),
    borderRadius: moderateScale(12),
    borderColor: Colors.border,
    borderWidth: moderateScale(1),
    alignItems: 'center',
  },
  analyticsTitle: {
    marginTop: heightScale(30),
    fontSize: normalize(25),
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
  },
  pieChartStyle: {
    marginTop: heightScale(40),
  },
  circle: {
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: moderateScale(7),
    backgroundColor: 'red',
  },
  colorNames: {
    fontSize: normalize(20),
    fontWeight: '400',
    marginLeft: widthScale(17),
  },
})
