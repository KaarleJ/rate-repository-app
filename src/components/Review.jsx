import { View, StyleSheet, Pressable, Alert } from "react-native"
import { format } from 'date-fns'
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import { useReviewRemove } from "../hooks/useReview";
import { useMeReviews } from "../hooks/useMe";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    display: 'flex',
    flexBasis: 150,
    padding: 10
  },
  row: {
    flexDirection: 'row',
  },
  rating: {
    color: theme.colors.primary,
    margin: 10,
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  textualColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',

  },
  header: {
    fontWeight: 'bold'
  },
  date: {
    color: theme.colors.textSecondary
  },
  review: {
    wordWrap: 'break-word',
    marginRight: 50
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 2,
    margin: 5
  },
  buttonRed: {
    backgroundColor: '#d73a4a',
    padding: 5,
    borderRadius: 2,
    margin: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});

const Review = ({ item, index }) => {
  const date = format(new Date(item.createdAt), 'dd/MM/yyyy')

  return (
    <View key={index} style={styles.container}>
      <View>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
      <View style={styles.textualColumn}>
        <Text style={styles.header}>{item.user.username}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.review}>{item.text}</Text>
      </View>
    </View>
  )
};

export default Review;

export const AReview = ({ item, index }) => {
  const date = format(new Date(item.createdAt), 'dd/MM/yyyy')
  const navigate = useNavigate();
  const [ deleteReview ]  = useReviewRemove();
  const { refetch } =  useMeReviews();

  const handleDelete = (id) => {
    Alert.alert('Delete review','Are you sure you want to delete this review?', [
      {
        text: 'cancel',
        onPress: () => console.log('cancelled'),
        style: 'cancel'
      },
      {
        text: 'delete',
        onPress: () => {
          deleteReview(id);
          refetch()
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View key={index} style={styles.row}>
        <View>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.textualColumn}>
          <Text style={styles.header}>{item.user.username}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.review}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => navigate(`/repositories/${item.repositoryId}`)}>
          <Text style={styles.text}>View repository</Text>
        </Pressable>
        <Pressable style={styles.buttonRed} onPress={() => handleDelete(item.id)}>
          <Text style={styles.text}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
};