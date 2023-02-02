import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { useReview } from '../hooks/useReview';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignContent: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    flexBasis: 500
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
  ownerName: '',
  repositoryName: '',
  rating: null,
  text: ''
}

const Review = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' style={styles.field}/>
      <FormikTextInput name='repositoryName' placeholder='Repository name' style={styles.field}/>
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' style={styles.field}/>
      <FormikTextInput name='text' placeholder='Review' style={styles.field}/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>create a review</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name missing'),
  repositoryName: yup
    .string()
    .required('Repository name missing'),
  rating: yup
    .number()
    .required('Rating is missing')
    .min(0, 'Minimun for rating is 0')
    .max(100, 'Maximum for rating is 100'),
  text: yup
    .string()

});

const ReviewForm = () => {
  const [ sendReview ] = useReview();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const data = await sendReview({ ownerName, repositoryName, rating: Number(rating), text })
      console.log(data.createReview.repositoryId)
      navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.error(e)
    }

  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <Review onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default ReviewForm;