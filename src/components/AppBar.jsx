import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';

import Text from './Text';
import useMe from '../hooks/useMe'
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  tab: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AppBar = () => {
  const { me } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const user = me
    ? me.username
    : null;

  const logOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <Pressable onPress={() => console.log('hello')}>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <Link to='/' style={styles.tab}>
            <Text color='textHeading' fontSize='subheading' fontWeight='bold'>Repositories</Text>
          </Link>
          {user === null ?
            <Link to='/signin' style={styles.tab}>
              <Text color='textHeading' fontSize='subheading' fontWeight='bold'>signin</Text>
            </Link>
          :
            null
          }
          {user ?
            <Pressable style={styles.tab} onPress={logOut}>
              <Text color='textHeading' fontSize='subheading' fontWeight='bold'>signout</Text>
            </Pressable>
          :
            null
          }
        </ScrollView>
      </View>
    </Pressable>
  )
};

export default AppBar;