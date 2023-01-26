import { View, StyleSheet, Image  } from "react-native"
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white'
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'flex-start',
    margin: 15
  },
  valuesRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  valuesColumn: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  headerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  languageStyle: {
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 8
  },
  descriptionStyle: {
    color: theme.colors.textSecondary
  }
});

const rounded = (number) => number > 999 ? `${(number/1000).toFixed(1)}k` : String(number)

const RepositoryItem = ({ item, index }) => {
  return (
    <View key={index} style={styles.container}>
      <View style={styles.headerRow}>
        <Image style={styles.image} source={{uri: item.ownerAvatarUrl}}/>
        <View style={styles.headerColumn}>
        <Text fontWeight='bold'>{item.fullName}</Text>
        <Text style={styles.descriptionStyle}>{item.description}</Text>
        <Text style={styles.languageStyle}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.valuesRow}>
        <View style={styles.valuesColumn}>
          <Text style={styles.descriptionStyle}>Stars</Text>
          <Text fontWeight='bold'>{rounded(item.stargazersCount)}</Text>
        </View>
        <View style={styles.valuesColumn}>
          <Text style={styles.descriptionStyle}>Forks</Text>
          <Text fontWeight='bold'>{rounded(item.forksCount)}</Text>
        </View>
        <View style={styles.valuesColumn}>
          <Text style={styles.descriptionStyle}>Reviews</Text>
          <Text fontWeight='bold'>{rounded(item.reviewCount)}</Text>
        </View>
        <View style={styles.valuesColumn}>
          <Text style={styles.descriptionStyle}>Rating</Text>
          <Text fontWeight='bold'>{rounded(item.ratingAverage)}</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem