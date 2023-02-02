import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList'
import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm';
import { SingleRepositoryItem } from './RepositoryItem';
import Reviews from './Reviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact/>
        <Route path='/signin' element={<SignIn />} exact/>
        <Route path='/signup' element={<SignUp />} exact/>
        <Route path='/repositories/:id' element={<SingleRepositoryItem />} exact/>
        <Route path='/review' element={<ReviewForm />} exact />
        <Route path='/myreviews/' element={<Reviews/>} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;