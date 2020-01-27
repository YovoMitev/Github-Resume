import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const SuggestionSection = props => {
  const { navigateToPreviewScreen } = props
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Github Usernames:</Text>
      <View style={styles.usersContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateToPreviewScreen('DEFUNKT')
          }}
        >
          <Text style={styles.userTitle}>DEFUNKT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigateToPreviewScreen('MXCL')
          }}
        >
          <Text style={styles.userTitle}>MXCL</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    marginVertical: 10
  },
  userTitle: {
    fontSize: 14,
    fontFamily: 'open-sans-bold'
  },
  usersContainer: {
    marginVertical: 5,
    width: '60%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default SuggestionSection
