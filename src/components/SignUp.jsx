import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

import { useSignUp } from '../hooks/useSignIn';

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
    flexBasis: 350
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
  passwordConfirmation: '',
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='username' style={styles.field}/>
      <FormikTextInput name='password' placeholder='password' secureTextEntry={true} style={styles.field}/>
      <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true} style={styles.field}/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>sign up</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username minimum length is 1 characters')
    .max(30,'Username maximum length is 30 characters')
    .required('username missing'),
  password: yup
    .string()
    .min(5, 'Password minimum length is 5 characters')
    .max(50, 'Password maximum length is 50 character')
    .required('password missing'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
    
});

const SignUp = () => {
  const [ signUp ] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate('/')
    } catch (e) {
      console.error(e);
    }

  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignUp;

