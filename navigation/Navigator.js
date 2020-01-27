import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { HomeScreen, UserPreviewScreen } from '../screens'
import { Colors } from '../constants'

const Navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Preview: UserPreviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

export default createAppContainer(Navigator)
