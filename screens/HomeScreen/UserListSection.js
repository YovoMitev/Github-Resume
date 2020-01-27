import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'

const UserListSection = props => {
  const { enteredUsernames, navigateToPreviewScreen } = props

  const renderListItem = itemData => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => {
          navigateToPreviewScreen(itemData.item)
        }}
      >
        <Text style={styles.title}>{`${itemData.index + 1}. ${
          itemData.item
        }`}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entered Usernames:</Text>
      {enteredUsernames && enteredUsernames.length ? (
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => `${item}-${index}`}
            data={enteredUsernames}
            renderItem={renderListItem}
            contentContainerStyle={styles.list}
          />
        </View>
      ) : (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultTitle}>No usernames entered !</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    marginVertical: 40
  },
  noResultContainer: {
    marginVertical: 5,
    paddingLeft: 5
  },
  noResultTitle: {
    fontSize: 14,
    fontFamily: 'open-sans'
  },
  title: {
    fontSize: 16,
    fontFamily: 'open-sans'
  },
  listContainer: {
    marginVertical: 10
  },
  listItem: {
    marginVertical: 5,
    paddingLeft: 10
  },
  list: {
    flexGrow: 1
  }
})

export default UserListSection
