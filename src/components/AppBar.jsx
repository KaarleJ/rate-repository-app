import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';

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
  return (
    <Pressable onPress={() => console.log('hello')}>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <Link to='/' style={styles.tab}>
            <Text color='textHeading' fontSize='subheading' fontWeight='bold'>Repositories</Text>
          </Link>
          <Link to='/signin' style={styles.tab}>
            <Text color='textHeading' fontSize='subheading' fontWeight='bold'>signin</Text>
          </Link>
        </ScrollView>
      </View>
    </Pressable>
  )
};

export default AppBar;