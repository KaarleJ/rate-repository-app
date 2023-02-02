import { FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce'

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
  },
  menu: {
    zIndex: -1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const OrderMenu = ({ order, setOrder }) => {

  return (
    <Picker
      selectedValue={order}
      onValueChange={(itemValue) =>
        setOrder(itemValue)
    }>
      <Picker.Item label='Latest Repositories' value='latest' />
      <Picker.Item label='Highest rated repositories' value='highest' />
      <Picker.Item label='Lowest rated repositories' value='lowest' />
    </Picker>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const Header = ({ order, setOrder, word, setWord}) => {
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={setWord}
        value={word}
        style= {{ margin: 10}}
      />
      <OrderMenu order={order} setOrder={setOrder}/>
    </>
  )
}

const parseParam = (param) => {
  switch (param) {
    case 'latest':
      return { orderBy: 'CREATED_AT', orderDirection: "DESC"};
    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: "DESC"};
    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: "ASC"};
    default: 
    return { orderBy: 'CREATED_AT', orderDirection: "DESC"};
  }
}

const RepositoryList = () => {
  const [ order, setOrder] = useState();
  const [ word, setWord ] = useState('');
  const [ debouncedWord ] = useDebounce(word, 500);

  const { repositories, fetchMore } = useRepositories(parseParam(word), debouncedWord, 8);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
      <FlatList
      data={repositoryNodes}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      ListHeaderComponent={<Header order={order} setOrder={setOrder} word={word} setWord={setWord}/>}
      renderItem={({item, index}) => 
      <RepositoryItem item={item} index={index} />
      }
    />
  );
};

export default RepositoryList;

export const RepositoryListContainer = ({ repositories }) => {

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
}