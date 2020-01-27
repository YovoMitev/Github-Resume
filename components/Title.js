import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
  const { title } = props
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  title: {
    fontSize: 24,
    fontFamily: 'open-sans-bold'
  }
})

export default Title
