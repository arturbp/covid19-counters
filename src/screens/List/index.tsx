import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CountryCounter, Sumary } from '../../utils/interfaces';

export default function List() {
  const [countries, setCountries] = useState<CountryCounter[]>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    api.get<Sumary>('summary').then(resp => {
      setCountries(resp.data.Countries)
    });
  }, []);

  function renderCountry(item: CountryCounter) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', item)}>
        <View style={styles.country}>
          <Image
            style={styles.flag}
            source={{ uri: `https://www.countryflags.io/${item.CountryCode}/shiny/64.png` }}
          />
          <Text style={styles.countryText}>{item.Country}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Icon style={styles.searchIcon} name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={
          search === '' ? countries 
          : 
          countries.filter(item =>
            item.Country.toLowerCase().includes(search.toLowerCase()))
        }
        renderItem={({ item }: { item: CountryCounter }) => renderCountry(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
    backgroundColor: '#dcdce6',
  },
  arrow: {
    marginVertical: 10,
    marginRight: 250,
  },
  country: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryText: {
    fontFamily: 'Ubuntu_700Bold',
  },
  flag: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    marginRight: 10
  },
  search: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  searchIcon: {

  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#dcdce6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Roboto_400Regular',
  }
});