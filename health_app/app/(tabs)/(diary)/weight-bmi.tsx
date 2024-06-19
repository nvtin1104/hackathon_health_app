import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Image, Platform, View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link} from 'expo-router';
import {uri} from "@sideway/address";
import React from "react";

export default function WeighBMIScreen() {
    return (
        <ScrollView style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <TouchableOpacity>*/}
            {/*        <Text style={styles.backButton}>←</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Text style={styles.headerTitle}>Weight & BMI</Text>*/}
            {/*    <View style={styles.headerIcons}>*/}
            {/*        <Text style={styles.icon}>⏰</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}

            <View style={styles.dateRange}>
                <Text style={styles.dateRangeText}> Detail</Text>
                <Text style={styles.dateRangeText}>Jun 19,2023 - Jun 19,2024
                    <Image
                        source={{uri: 'https://cdn-icons-png.flaticon.com/512/107/107799.png'}}
                        style={styles.editIcon}/>
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Weight</Text>
                <Text style={styles.unit}>Unit: kg</Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Max</Text>
                        <Text style={styles.statValue}>60.0</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Min</Text>
                        <Text style={styles.statValue}>60.0</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Average</Text>
                        <Text style={styles.statValue}>60.0</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <Text style={styles.chartValue}>60.0</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>BMI</Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Max</Text>
                        <Text style={styles.statValue}>22.0</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Min</Text>
                        <Text style={styles.statValue}>22.0</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Average</Text>
                        <Text style={styles.statValue}>22.0</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <Text style={styles.chartValue}>22.0</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Record</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#E5E5E5',},
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#4CAF50', padding: 16,
    }, backButton: {fontSize: 24, color: '#FFF',},
    headerTitle: {fontSize: 20, color: '#FFF', fontWeight: 'bold',}, headerIcons: {
        flexDirection:
            'row',
    }, icon: {fontSize: 24, color: '#FFF', marginLeft: 16,}, dateRange: {
        flexDirection: 'row',
        backgroundColor:
            '#4CAF50', padding: 8, alignItems: 'center',justifyContent: 'space-between',
    }, dateRangeText: {color: '#FFF', fontSize: 16,},
    card: {backgroundColor: '#FFF', margin: 16, borderRadius: 8, padding: 16,}, cardTitle: {
        fontSize:
            18, fontWeight: 'bold',
    }, unit: {alignSelf: 'flex-end', fontSize: 14, color: '#555',}, stats: {
        flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16,
    }, stat: {
        alignItems:
            'center',
    }, statLabel: {fontSize: 14, color: '#555',}, statValue: {
        fontSize: 24, fontWeight:
            'bold',
    }, chart: {alignItems: 'center', marginVertical: 16,}, chartValue: {
        fontSize: 24,
        fontWeight: 'bold', color: '#4CAF50',
    }, addButton: {
        backgroundColor: '#4CAF50', margin: 16,
        borderRadius: 8, padding: 16, alignItems: 'center',
    }, addButtonText: {
        color: '#FFF', fontSize: 18,
        fontWeight: 'bold',
    },
    editIcon: {
        width: 20, height: 20,
    },
});
