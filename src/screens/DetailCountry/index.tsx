import React, { } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, MaterialIcons } from '@expo/vector-icons';
import { CountryCounter } from '../../utils/interfaces';
import { Roboto_900Black } from '@expo-google-fonts/roboto';
import { numberMask } from '../../utils/normalize';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as CountryCounter;

    return (
        <>
            <View style={styles.container}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={25} color="black" />
                    </TouchableOpacity>
                </View>

                <View >
                    <Text style={styles.TextHeader}>
                        Informações detalhadas
                </Text>
                </View>
                <View style={styles.Country}>
                    <View style={styles.Teste}>
                    <Image
                            //style={styles.flag}
                            source={{ uri: `https://www.countryflags.io/${routeParams.CountryCode}/shiny/64.png` }}
                        />
                    </View>
                </View>
                <View style={styles.Country}>
                    <View style={styles.Teste}>
                        <Text style={styles.CountryTitle}>{routeParams.Country}</Text>
                    </View>
                </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.NewConfirmed))}</Text>
                            <Text >Novos confirmados </Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.TotalConfirmed))}</Text>
                            <Text >Total confirmados</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.NewDeaths))}</Text>
                            <Text >Novos mortos</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.TotalDeaths))}</Text>
                            <Text >Total de mortos</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.NewRecovered))}</Text>
                            <Text >Novos recuperados</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.counterDescription}>
                            <Text style={styles.counter}>{numberMask(String(routeParams.TotalRecovered))}</Text>
                            <Text >Total de recuperados</Text>
                        </View>
                    </View>
                </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#FFF'
    },
    button: {
        flexDirection: "column",
    },
    TextHeader: {
        flex: 1,
        width: '100%',
        fontSize: 40,
        fontFamily: 'Ubuntu_700Bold',
        flexWrap: "wrap",
        flexDirection: "row",
        textAlign: 'center',
    },
    flag: {
        flex: 1,
        //resizeMode: 'cover',
        paddingVertical: 30,
        backgroundColor: '#000080',
    },
    Country: {
        width: '100%',
        height: '15%',
        padding: 20,
    },
    CountryTitle: {
        flex: 1,
        fontSize: 30,
        fontFamily: 'Ubuntu_700Bold',
        //textAlign: 'center',
    },
    Teste: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        alignItems: "center",
        textAlign: 'center',
    },
    box: {
        width: '50%',
        height: '15%',
        paddingHorizontal: 20,
        padding: 10,
    },
    counterDescription: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        borderWidth: 2,
        borderColor: "#C0C0C0",
        borderRadius: 8,
        alignItems: "center",
        textAlign: 'center',
        minHeight: 80,
    },
    counter: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 8,
    },
})