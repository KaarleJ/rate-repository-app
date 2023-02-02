import { View, StyleSheet, Image, Pressable, FlatList  } from "react-native"
import { useNavigate, useParams } from "react-router-native";
import * as Linking from 'expo-linking'

import { useRepository } from '../hooks/useRepositories';
import Text from "./Text";
import theme from "../theme";
import Review from './Review'

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: 'white',
    flexBasis: 190,
    zIndex: 1,
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
  },
  buttonRow: {
    flexGrow: 0,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 2,
    margin: 15,
    color: 'white',
    textAlign: 'center'
  },
  separator: {
    height: 10,
    display: 'flex',
    flexDirection: 'column'
  },
});

const rounded = (number) => number > 999 ? `${(number/1000).toFixed(1)}k` : String(number)

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ item, index }) => {
  const navigate = useNavigate();

  return (
  <>
    <View testID='repositoryItem' key={index} style={styles.container}>
      <Pressable onPress={() => navigate(`/repositories/${item.id}`)} >
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
      </Pressable>
    </View>
  </>
  )
}

const Header = ({item}) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
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
          <Pressable onPress={() => Linking.openURL(item.url)} style={styles.buttonRow}>
            <Text style={styles.buttonStyle}>open in github</Text>
          </Pressable>
    </View>
  )
}

export const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id, 8);

  
  
  if (!repository) {
    return null
  }

  const item = repository;
  const reviews = item.reviews.edges.map((edge) => edge.node);
  
  return (
    <>
    <FlatList
      data={reviews}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.25}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Header item={item} />}
      renderItem={({item, index}) => 
      <Review item={item} index={index} />
      }
    />
  </>
  );
};

export default RepositoryItem