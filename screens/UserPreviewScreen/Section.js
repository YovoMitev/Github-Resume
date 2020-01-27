import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Section = props => {
  const { title, children } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.descriptionContainer}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '90%',
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  descriptionContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '60%'
  }
})

export default Section
