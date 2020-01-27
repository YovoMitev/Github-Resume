import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { Title } from '../../components'
import InputSection from './InputSection'
import SuggestionSection from './SuggestionSection'
import UserListSection from './UserListSection'

const Homescreen = props => {
  const {
    navigation: { navigate }
  } = props
  const [enteredUsernames, setEnteredUsernames] = useState([])

  useEffect(() => {
    Keyboard.dismiss()
  }, [enteredUsernames.length])

  const navigateToPreviewScreen = username => {
    username = username.toLowerCase()
    navigate({
      routeName: 'Preview',
      params: { username }
    })
  }

  const handleButtonPress = username => {
    navigateToPreviewScreen(username)
    setEnteredUsernames([...enteredUsernames, username])
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Title title='Github Resume' />
        <InputSection handleButtonPress={handleButtonPress} />
        <SuggestionSection navigateToPreviewScreen={navigateToPreviewScreen} />
        <UserListSection
          enteredUsernames={enteredUsernames}
          navigateToPreviewScreen={navigateToPreviewScreen}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  }
})

export default Homescreen
