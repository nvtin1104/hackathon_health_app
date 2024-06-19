import {StyleSheet, View, Text, Image, Platform, SafeAreaView} from 'react-native';
import React from 'react';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link} from 'expo-router';


export default function StepCounterScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.goalSection}>
                <Text style={styles.dailyGoalText}>Daily Goal</Text>
                <Text style={styles.goalNumber}>6000
                    <Image
                        source={{uri: 'https://static.vecteezy.com/system/resources/previews/026/627/528/non_2x/edit-icon-symbol-design-illustration-vector.jpg'}}
                        style={styles.editIcon}/></Text>

            </View>
            <View style={styles.progressSection}>
                <Text style={styles.steps}>0</Text>
                <Image source={{uri: 'https://www.iconsdb.com/icons/preview/gray/gas-xxl.png'}}
                       style={styles.fireIcon}/>
                <Text style={styles.kcalText}>0.00 Kcal</Text>
            </View>
            <View style={styles.statsSection}>
                <View style={styles.statBox}>
                    <Image
                        source={{uri: 'https://static.vecteezy.com/system/resources/previews/008/925/051/non_2x/clock-icon-design-templates-free-vector.jpg'}}
                        style={styles.clockIcon}/>
                    <Text style={styles.statText}>0h 0m</Text>
                </View>
                <View style={styles.statBox}>
                    <Image
                        source={{uri: 'https://static.vecteezy.com/system/resources/previews/010/833/007/non_2x/arrow-icon-sign-symbol-logo-illustration-vector.jpg'}}
                        style={styles.arrowIcon}/>
                    <Text style={styles.statText}>0 m</Text>
                </View>
            </View>
            <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Detail</Text>
                <View style={styles.chart}>
                    {/* Placeholder for the chart */}
                    <Image source={{uri: 'https://placehold.co/300x150'}} style={styles.chartImage}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    goalSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    dailyGoalText: {
        fontSize: 16,
        color: '#888',
    },
    goalNumber: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    progressSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    steps: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    fireIcon: {
        width: 20,
        height: 20,
    },
    kcalText: {
        fontSize: 16,
        color: '#888',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    clockIcon: {
        width: 30,
        height: 30,
    },
    arrowIcon: {
        width: 30,
        height: 30,
    },
    statText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailSection: {
        marginVertical: 20,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chart: {
        marginTop: 10,
        alignItems: 'center',
    },
    chartImage: {
        width: 300,
        height: 150,
    },

});