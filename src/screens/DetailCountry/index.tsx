import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Feather as Icon } from '@expo/vector-icons';

export default function Detail() {
    const navigation = useNavigation();

    function navigationToDashboard() {
        navigation.navigate('Dashboard');
    };

    return (
        <TouchableOpacity onPress={navigationToDashboard}>
            <View>
                <Icon name="arrow-right" size={40} color="black" />
            </View>
        </TouchableOpacity>
    );
};