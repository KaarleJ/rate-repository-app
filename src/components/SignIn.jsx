import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignContent: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    flexBasis: 250
  },
  field: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 15
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 2
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='username' style={styles.field}/>
      <FormikTextInput name='password' placeholder='password' secureTextEntry={true} style={styles.field}/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username minimum length is 3 characters')
    .required('username missing'),
  password: yup
    .string()
    .min(8, 'Password minimum length is 8 characters')
    .required('password missing'),
});

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;