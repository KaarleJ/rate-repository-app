import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    marginTop: 100,
    marginBottom: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      renderItem={({item, index}) => 
      <RepositoryItem item={item} index={index} />
      }
    />
  );
};

export default RepositoryList;