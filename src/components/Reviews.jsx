import { View, FlatList, StyleSheet } from "react-native";

import { useMeReviews } from "../hooks/useMe";
import { AReview } from "./Review";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    marginTop: 100,
    marginBottom: 10
  },
  menu: {
    zIndex: -1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const { reviews, fetchMore } = useMeReviews(4);

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={reviewNodes}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      renderItem={({item, index}) => 
      <AReview item={item} index={index} />
      }
    />
  )
}

export default Reviews;