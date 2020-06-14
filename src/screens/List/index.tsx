import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Countries } from '../../utils/interfaces';
import GoBack from '../../components/GoBack';
import axios from 'axios';

interface DataResponse {
  data: Countries[]
}

export default function List() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    await api.get<DataResponse>('countries').then(async resp => {
      const getFlag = resp.data.data.map(async item => {
        const country = item.country.length > 3 ? item.country
          :
          await getCountry(item.country);

        const alpha2Code = await axios.get(`https://restcountries.eu/rest/v2/name/${item.country}?fields=alpha2Code`).then(resp => {
          return resp.data[0].alpha2Code
        }).catch(() => item.country.substring(0, 2));

        return { ...item, alpha2Code, country: country };
      });

      const alreadyFinish = await Promise.all(getFlag);

      setCountries(alreadyFinish);
      setLoading(false);
    });
  };

  async function getCountry(alpahCode: string) {
    const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${alpahCode}`)
      .then(resp => resp.data.name)
      .catch(() => '');
      
    return response;
  }

  function renderCountry(item: Countries) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', item)}>
        <View style={styles.country}>
          <Image
            style={styles.flag}
            source={{ uri: `https://flagpedia.net/data/flags/normal/${item.alpha2Code.toLowerCase()}.png` }}
          />
          <Text style={styles.countryText}>{item.country}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <GoBack />
      </View>
      <View style={styles.search}>
        <Icon name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {!loading ? <FlatList
        data={
          search === '' ? countries
            :
            countries.filter(item =>
              item.country.toLowerCase().includes(search.toLowerCase()))
        }
        renderItem={({ item }: { item: Countries }) => renderCountry(item)}
        keyExtractor={(item, index) => index.toString()}
      />
        :
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
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
    width: 64,
    height: 40,
    resizeMode: 'cover',
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'silver'
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
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#dcdce6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Roboto_400Regular',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 30
  }
});