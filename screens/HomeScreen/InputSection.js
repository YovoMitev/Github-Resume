import React, { useState } from 'react'
import { Colors } from '../../constants'
import { Input } from '../../components'
import { View, Button, StyleSheet } from 'react-native'

const InputSection = props => {
  const { handleButtonPress } = props
  const [username, setUsername] = useState('')

  return (
    <View style={styles.inputContainer}>
      <Input
        style={styles.input}
        blurOnSubmit
        placeholder='Enter a github username'
        autoCapitalize='none'
        value={username}
        onChangeText={value => setUsername(value)}
        autoCorrect={false}
      />
      <View style={styles.btnContainer}>
        <Button
          color={Colors.secondary}
          title='Add'
          onPress={() => {
            if (username) {
              handleButtonPress(username)
              setUsername('')
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingTop: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-around'
  },
  input: {
    width: 200,
    maxWidth: '80%',
    alignItems: 'center'
  }
})

export default InputSection
