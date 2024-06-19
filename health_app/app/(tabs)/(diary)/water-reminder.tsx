import Ionicons from '@expo/vector-icons/Ionicons';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform, SafeAreaView} from 'react-native';
import React from 'react';
import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link} from 'expo-router';

export default function WaterReminderScreen() {
    return (
            <ThemedView style={styles.titleContainer}>
                <View style={styles.container}>
                    <Text style={styles.waterAmount}>0ml</Text>
                    <View style={styles.infoBox}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>Daily Goal:</Text>
                            <Text style={styles.infoValue}>2000ml
                                <Image
                                    source={{uri: 'https://static.vecteezy.com/system/resources/previews/026/627/528/non_2x/edit-icon-symbol-design-illustration-vector.jpg'}}
                                    style={styles.editIcon}/>
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>Last Drink:</Text>
                            <Text style={styles.infoValue}>--ml</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>Number:</Text>
                            <Text style={styles.infoValue}>0 Cup</Text>
                        </View>
                        <TouchableOpacity style={styles.historyButton}>
                            <Text style={styles.historyText}>History and Statistics</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.recordButton}>
                        <Text style={styles.recordText}>Tap Here to record your first drink today!</Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.minusButton}>
                            <Text style={styles.minusText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton}>

                            <Image source={require('../../../assets/images/plusglass.png')} style={styles.addIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.footerText}>200ml</Text>
                    </View>
                </View>
            </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f4f8',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    waterAmount: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoBox: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    historyButton: {
        marginTop: 10,
    },
    historyText: {
        fontSize: 18,
        color: '#007bff',
    },
    recordButton: {
        backgroundColor: '#ffcc00',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    recordText: {
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
    },
    minusButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 50,
    },
    minusText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 50,
    },
    addIcon: {
        width: 100,
        height: 100,
    },
    footerText: {
        fontSize: 18,
    },
    editIcon: {
        width: 20,
        height: 20,
    },
});
