import React from 'react'
import { Colors } from '../constants'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading
