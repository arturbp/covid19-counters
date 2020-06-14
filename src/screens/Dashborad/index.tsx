import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Feather as Icon } from '@expo/vector-icons';
import { numberMask } from '../../utils/normalize';
import { Countries, GlobalCounter } from '../../utils/interfaces';
import axios from 'axios';

interface DataCountries {
  data: Countries[]
}

export default function Dashboard() {
  const [cards, setCards] = useState<Countries[]>([]);
  const [globalCounter, setGlobalCounter] = useState<GlobalCounter>({} as GlobalCounter);
  const [loading, setLoading] = useState(true);

  const {
    cases,
    confirmed,
    deaths,
    recovered,
  } = globalCounter;

  const navigation = useNavigation();

  useEffect(() => {
    getCounters();
  }, []);

  async function getCounters() {
    await api.get<DataCountries>('countries').then(async resp => {
      const allCountries = resp.data.data;

      let cases = 0;
      let confirmed = 0;
      let deaths = 0;
      let recovered = 0;

      for (let i = 0; i < allCountries.length; i++) {
        cases += allCountries[i].cases
        confirmed += allCountries[i].confirmed
        deaths += allCountries[i].deaths
        recovered += allCountries[i].recovered
      }

      setGlobalCounter({
        cases,
        confirmed,
        deaths,
        recovered
      })

      const filteredCountries = allCountries.filter(item =>
        item.country === 'Brazil' ||
        item.country === 'China' ||
        item.country === 'US' ||
        item.country === 'Italy' ||
        item.country === 'Spain' ||
        item.country === 'South Africa'
      );

      const getFlag = filteredCountries.map(async item => {
        const country = item.country.length > 3 ? item.country
          :
          await getCountry(item.country);


        const alpha2Code = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fields=alpha2Code`).then(resp => {
          return resp.data[0].alpha2Code
        });
        return { ...item, alpha2Code, country: country }
      });

      const alreadyFinish = await Promise.all(getFlag);

      setCards(alreadyFinish);
      setLoading(false);
    });
  };

  async function getCountry(alpahCode: string) {
    const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${alpahCode}`).then(resp => resp.data.name)
    return response
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#dcdce6' }}>
      <View style={styles.container}>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Os contadores são atualizados diariamente.</Text>

        <View style={styles.globalStatus}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon name="globe" style={{ fontSize: 20, marginRight: 5 }} />
            <Text style={styles.globalStatusTitle}>No mundo</Text>
            <View style={{ width: '56%', alignItems: 'flex-end', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  setLoading(true);
                  getCounters();
                }}
              >
                <Icon name="rotate-cw" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.globalDescriptionText}>Casos Ativos</Text>
          <Text style={styles.globalStatusText}>{!loading ? numberMask(String(cases)) : 'Carregando...'}</Text>
          <Text style={styles.globalDescriptionText}>Total Confirmados</Text>
          <Text style={styles.globalStatusText}>{!loading ? numberMask(String(confirmed)) : 'Carregando...'}</Text>
          <Text style={styles.globalDescriptionText}>Total Mortos</Text>
          <Text style={styles.globalStatusText}>{!loading ? numberMask(String(deaths)) : 'Carregando...'}</Text>
          <Text style={styles.globalDescriptionText}>Total recuperados</Text>
          <Text style={styles.globalStatusText}>{!loading ? numberMask(String(recovered)) : 'Carregando...'}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {!loading && <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {cards.sort((a, b) => b.confirmed - a.confirmed).map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', item)}>
              <View style={styles.card}>
                <Image
                  style={styles.flag}
                  source={{ uri: `https://www.countryflags.io/${item.alpha2Code}/shiny/64.png` }}
                />
                <Text style={styles.country}>{item.country}</Text>
                {/* <Text style={styles.counter}>{item.Country}</Text> */}
                <Text style={styles.counterDescription}>Casos confirmados</Text>
                <Text style={styles.counter}>{numberMask(String(item.confirmed))}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() =>
            // navigation.navigate('List')
            alert("Lista de todos os países em breve")
          }>
            <View style={styles.card}>
              <Icon name="search" size={40} color="black" />
            </View>
          </TouchableOpacity>
        </ScrollView>}
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
    padding: 20,
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
    alignItems: 'center',
  },
  flag: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  country: {
    fontFamily: 'Ubuntu_700Bold',
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  counterDescription: {
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  counter: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    paddingVertical: 5,
  }
})