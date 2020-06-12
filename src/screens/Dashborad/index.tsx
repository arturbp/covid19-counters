import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Feather as Icon } from '@expo/vector-icons';
import { numberMask } from '../../utils/normalize';

export interface CountryCounter {
  Country: string;
  CountryCode: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

interface GlobalCounter {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

interface Sumary {
  Global: GlobalCounter;
  Countries: CountryCounter[];
}

// interface Countries {
//   Country: string;
//   Slug: string;
//   ISO2: string;
// }

export default function Dashboard() {
  const navigation = useNavigation();

  /*function navigationToDetail(CountryCode: string) {
    navigation.navigate('Detail', {Code: CountryCode});
  }*/

  const [cards, setCards] = useState<CountryCounter[]>([])
  const [globalCounter, setGlobalCounter] = useState<GlobalCounter>({} as GlobalCounter)

  useEffect(() => {
    api.get<Sumary>('summary').then(resp => {
      const countriesFiltered = resp.data.Countries.filter(item => {
        if (
          item.CountryCode === 'BR' ||
          item.CountryCode === 'US' ||
          item.CountryCode === 'CN' ||
          item.CountryCode === 'IT' ||
          item.CountryCode === 'ES' ||
          item.CountryCode === 'ZA'
        ) {
          return true
        }
      })
      setCards(countriesFiltered.map(item => {
        const obj = {
          Country: item.Country,
          CountryCode: item.CountryCode,
          NewConfirmed: item.NewConfirmed,
          TotalConfirmed: item.TotalConfirmed,
          NewDeaths: item.NewDeaths,
          TotalDeaths: item.TotalDeaths,
          NewRecovered: item.NewRecovered,
          TotalRecovered: item.TotalRecovered,
        }
        return obj
      }))
      setGlobalCounter(resp.data.Global)
    });

    // api.get<Countries[]>('countries').then(resp => {
    //   setCountries(resp.data.sort())
    // });

  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: '#dcdce6' }}>
      {/* <FlatList
        data={countries}
        renderItem={({ item }: { item: Countries }) => renderCountry(item)}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <View style={styles.container}>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Os contadores são atualizados diariamente (nos dias úteis).</Text>

        <View style={styles.globalStatus}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon name="globe" style={{ fontSize: 20, marginRight: 5 }} />
            <Text style={styles.globalStatusTitle}>No mundo</Text>
          </View>
          <Text style={styles.globalDescriptionText}> Casos confirmados</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.TotalConfirmed))}</Text>
          <Text style={styles.globalDescriptionText}> Total Mortos</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.TotalDeaths))}</Text>
          <Text style={styles.globalDescriptionText}> Total recuperados</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.TotalRecovered))}</Text>
          <Text style={styles.globalDescriptionText}> Novos confirmados</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.NewConfirmed))}</Text>
          <Text style={styles.globalDescriptionText}> Novos mortos</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.NewDeaths))}</Text>
          <Text style={styles.globalDescriptionText}> Novos recuperados</Text>
          <Text style={styles.globalStatusText}>{numberMask(String(globalCounter.NewRecovered))}</Text>
        </View>
      </View>

      <View style={styles.list}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {cards.map((item, index) => (

            <TouchableOpacity key={index} onPress={() =>navigation.navigate('Detail', item)}>
              <View style={styles.card}>
                <Image
                  style={styles.flag}
                  source={{ uri: `https://www.countryflags.io/${item.CountryCode}/shiny/64.png` }}
                />
                <Text style={styles.country}>{item.Country.length < 15 ? item.Country : item.CountryCode}</Text>
                {/* <Text style={styles.counter}>{item.Country}</Text> */}
                <Text style={styles.counterDescription}>Casos confirmados</Text>
                <Text style={styles.counter}>{numberMask(String(item.TotalConfirmed))}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <View style={styles.card}>
              <Icon name="search" size={40} color="black" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },
  globalStatus: {
    backgroundColor: '#FFF',
    marginTop: 30,
    padding: 20
  },
  globalStatusTitle: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
  },
  globalStatusText: {
    fontFamily: 'Ubuntu_700Bold',
    paddingEnd: 7,
    marginLeft: 5,
  },
  globalDescriptionText: {
    fontFamily: 'Roboto_400Regular',
    paddingTop: 7,
    paddingVertical: 3,
  },

  list: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
  card: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginRight: 20,
    backgroundColor: '#FFF',
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flag: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  country: {
    fontFamily: 'Ubuntu_700Bold',
    paddingBottom: 10,
    fontSize: 18

  },
  counterDescription: {
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  counter: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    paddingVertical: 5
  }
})