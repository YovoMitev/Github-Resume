import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from '../../components'

const TitleSection = props => {
  const { username, bio } = props
  return (
    <View style={styles.titleContainer}>
      <Title title={username} />
      <View style={styles.userBioContainer}>
        <Text style={styles.userBio}>{bio}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center'
  },
  userBioContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userBio: {
    fontFamily: 'open-sans'
  }
})

export default TitleSection
