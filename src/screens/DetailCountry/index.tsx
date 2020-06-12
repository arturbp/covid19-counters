import React, { } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, MaterialIcons } from '@expo/vector-icons';
import { CountryCounter } from '../../utils/interfaces';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as CountryCounter;

    return (
        <>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="black" />
                </TouchableOpacity>
            </View>

            <View >
                <Text style={styles.Text}>
                    Informações detalhadas
                </Text>
            </View>
            <View>
                <Image
                    style={styles.flag}
                    source={{ uri: `https://www.countryflags.io/${routeParams.CountryCode}/shiny/64.png` }}
                />
            </View>
            <View>
                <Text style={styles.counterDescription}>Novos confirmados</Text>
                <Text style={styles.counter}>{routeParams.NewConfirmed}</Text>
                <Text style={styles.counterDescription}>Total confirmado confirmados</Text>
                <Text style={styles.counter}>{routeParams.TotalConfirmed}</Text>
                <Text style={styles.counterDescription}>Novos mortos</Text>
                <Text style={styles.counter}>{routeParams.NewDeaths}</Text>
                <Text style={styles.counterDescription}>Total de mortos</Text>
                <Text style={styles.counter}>{routeParams.TotalDeaths}</Text>
                <Text style={styles.counterDescription}>Novos Recuperados</Text>
                <Text style={styles.counter}>{routeParams.NewRecovered}</Text>
                <Text style={styles.counterDescription}>Total recuperado</Text>
                <Text style={styles.counter}>{routeParams.TotalRecovered}</Text>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        paddingTop: 30,
        paddingLeft: 5,
        marginStart: 10,
        marginRight: 320,
        marginVertical: 10,
    },
    description: {
        color: '#6C6C80',
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
    },
    container: {
        padding: 32,
        paddingTop: 20,
    },
    flag: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        paddingStart: 50,
        marginLeft: 75,
        paddingVertical: 30,
    },
    Text: {
        fontSize: 30,
        paddingTop: 20,
        textAlign: 'center',
        fontFamily: 'Ubuntu_700Bold',
    },
    counterDescription: {
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
    },
    counter: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 5
    },
})