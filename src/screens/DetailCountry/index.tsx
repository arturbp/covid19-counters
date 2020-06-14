import React, { } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { Countries } from '../../utils/interfaces';
import GoBack from '../../components/GoBack';
import { RectButton } from 'react-native-gesture-handler';
import { numberMask } from '../../utils/normalize';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const route = useRoute();

    const routeParams = route.params as Countries;

    const {
        cases,
        confirmed,
        deaths,
        recovered,
        alpha2Code,
        country,
        updated_at
    } = routeParams;

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Covid-19: Contadores - Dúvidas/críticas/sugestões',
            recipients: ['oxe.desenvolvimento@gmail.com'],
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <GoBack />
                <View style={{ marginHorizontal: 5 }}>
                    <Image
                        style={styles.flag}
                        source={{ uri: `https://www.countryflags.io/${alpha2Code}/shiny/64.png` }}
                    />
                </View>
                <View>
                    <Text style={styles.countryTitle}>{country}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.title}>Casos Ativos</Text>
                    <Text style={styles.counter}>{numberMask(String(cases))}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Confirmados</Text>
                    <Text style={styles.counter}>{numberMask(String(confirmed))}</Text>

                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Mortes</Text>
                    <Text style={styles.counter}>{numberMask(String(deaths))}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.title}>Recuperados</Text>
                    <Text style={styles.counter}>{numberMask(String(recovered))}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>Para dúvidas/críticas/sugestões</Text>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#dcdce6',
        justifyContent: 'center',
        paddingTop: 20
    },
    header: {
        flexDirection: "row",
        padding: 10,
        paddingTop: 60,
        alignItems: 'center',
        backgroundColor: '#dcdce6',
    },
    flag: {
        width: 32,
        height: 32,
        resizeMode: 'cover',
    },
    countryTitle: {
        fontSize: 25,
        fontFamily: 'Ubuntu_700Bold',
    },
    title: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16
    },
    box: {
        width: '45%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 8,
        margin: '1%',
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    counter: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 8,
    },
    footer: {
        backgroundColor: '#dcdce6',
        paddingVertical: 20,
        paddingHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTitle: {
        marginBottom: 10,
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        fontStyle: 'italic'
    },
    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});