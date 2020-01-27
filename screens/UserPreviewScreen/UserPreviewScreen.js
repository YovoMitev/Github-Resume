import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Loading } from '../../components'
import TitleSection from './TitleSection'
import Section from './Section'

const BASE_URL = 'http://api.github.com/users'

const UserPreviewScreen = props => {
  const { navigation } = props

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [username, setUsername] = useState('')
  const [userOgranizations, setUserOgranizations] = useState([])
  const [userRepos, setUserRepos] = useState([])
  const [userLanguages, setUserLanguages] = useState({})

  useEffect(() => {
    const username = navigation.getParam('username')
    setUsername(username.toUpperCase())
    fetchData(username)
  }, [])

  const fetchData = async username => {
    const getUserProfileUrl = `${BASE_URL}/${username}`
    const getUserOgranizationsUrl = `${BASE_URL}/${username}/orgs`
    const getUserReposUrl = `${BASE_URL}/${username}/repos?per_page=50`

    try {
      const userProfile = await axios(getUserProfileUrl)
      const userOgranizations = await axios(getUserOgranizationsUrl)
      const userRepos = await axios(getUserReposUrl)
      if (
        !userProfile.data ||
        (userProfile.data && userProfile.data.message === 'Not Found')
      ) {
        setUserInfo(null)
        return
      }

      const {
        name,
        followers,
        bio,
        location,
        public_repos,
        blog
      } = userProfile.data
      const description = `${name} is developer based in ${location} with ${public_repos ||
        0} repos and ${followers || 0} followers.`
      const userDescription = name && location ? description : '  ----  '
      const user = {
        name,
        bio,
        description: userDescription,
        website: blog
      }

      const ogranizations =
        userOgranizations.data &&
        userOgranizations.data.map(ogranizations => {
          const { login, description } = ogranizations
          return {
            name: login,
            description
          }
        })

      let topThreeRepos = []
      const userLanguages = {}
      let totalLanguagesCount = 0
      userRepos.data &&
        userRepos.data.map(repo => {
          const { name, description, language } = repo

          if (topThreeRepos.length < 3 && name && description) {
            topThreeRepos.push({
              name,
              description
            })
          }

          if (!language) {
            return
          }

          totalLanguagesCount++
          if (!userLanguages[language]) {
            userLanguages[language] = 1
          } else {
            userLanguages[language] = userLanguages[language] + 1
          }
        })

      const userLanguagesPercentage = {}
      Object.keys(userLanguages).map(key => {
        const percentage = Math.floor(
          (userLanguages[key] / totalLanguagesCount) * 100
        )
        userLanguagesPercentage[key] = `${percentage} %`
      })

      setUserInfo(user)
      setUserOgranizations(ogranizations)
      setUserRepos(topThreeRepos)
      setUserLanguages(userLanguagesPercentage)
      setLoading(false)
    } catch (err) {
      console.log('Error ->', err)
      setHasError(true)
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text
          style={styles.errorMessage}
        >{`Something went wrong with given Username: ${username}. Please try with another user :)`}</Text>
      </View>
    )
  }

  const { name, bio, description, website } = userInfo
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollableContainer}>
        <View style={styles.titleContainer}>
          <TitleSection username={name || username} bio={bio} />
        </View>
        <Section title='Github Profile'>
          <Text style={styles.description}>{description}</Text>
        </Section>
        <Section title='Website'>
          <Text style={styles.description}>{website || '  ----  '}</Text>
        </Section>
        <Section title='Languages'>
          {Object.keys(userLanguages).map((key, index) => (
            <Text key={index} style={styles.description}>{`${index +
              1} ${key} ${userLanguages[key]}`}</Text>
          ))}
        </Section>
        <Section title='Top 3 Repos'>
          {userRepos.map((repo, index) => (
            <View key={index} style={styles.sectionListContainer}>
              <View style={styles.sectionListTitleContainer}>
                <Text style={styles.sectionListTitle}>{repo.name}</Text>
              </View>
              <Text style={styles.description}>
                {repo.description || '  ----  '}
              </Text>
            </View>
          ))}
        </Section>
        <Section title='Organizations'>
          {userOgranizations.map((org, index) => (
            <View key={index} style={styles.sectionListContainer}>
              <View style={styles.sectionListTitleContainer}>
                <Text style={styles.sectionListTitle}>{org.name}</Text>
              </View>
              <Text style={styles.description}>
                {org.description || '  ----  '}
              </Text>
            </View>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollableContainer: {
    flexGrow: 1,
    width: '100%'
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  titleContainer: {
    marginBottom: 30
  },
  description: {
    fontFamily: 'open-sans'
  },
  sectionListTitleContainer: {
    alignItems: 'center',
    marginBottom: 3
  },
  sectionListTitle: {
    fontSize: 14,
    fontFamily: 'open-sans-bold'
  },
  sectionListContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'flex-start'
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
    fontSize: 16,
    fontFamily: 'open-sans-bold'
  }
})

export default UserPreviewScreen
