import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function healthScreen() {
  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <View style={styles.weather}>
            <Text style={styles.weatherText}>26°C</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: 'https://placehold.co/100x100' }} style={styles.cardImage} />
          <TouchableOpacity style={styles.measureButton}>
            <Text style={styles.measureButtonText}>Measure Now</Text>
          </TouchableOpacity>
          <Text style={styles.lastReport}>Last Report: Jun 17, 2024</Text>
          <TouchableOpacity>
            <Text style={styles.historyButton}>History</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Health Diary</Text>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Image source={{ uri: 'https://placehold.co/50x50' }} style={styles.gridImage} />
            <Text style={styles.gridTitle}>Blood Pressure</Text>
            <Text style={styles.gridValue}>100/76 mmHg</Text>
          </View>
          <View style={styles.gridItem}>
            <Image source={{ uri: 'https://placehold.co/50x50' }} style={styles.gridImage} />
            <Text style={styles.gridTitle}>Blood Sugar</Text>
            <Text style={styles.gridValue}>-- mmol/L</Text>
          </View>
          <View style={styles.gridItem}>
            <Image source={{ uri: 'https://placehold.co/50x50' }} style={styles.gridImage} />
            <Text style={styles.gridTitle}>Weight & BMI</Text>
            <Text style={styles.gridValue}>-- KG</Text>
          </View>
          <View style={styles.gridItem}>
            <Image source={{ uri: 'https://placehold.co/50x50' }} style={styles.gridImage} />
            <Text style={styles.gridTitle}>Water Reminder</Text>
            <Text style={styles.gridValue}>200/2000 ml</Text>
          </View>
        </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weather: {
    backgroundColor: '#E0F7FA',
    borderRadius: 16,
    padding: 8,
  },
  weatherText: {
    fontSize: 16,
    color: '#00796B',
  },
  card: {
    backgroundColor: '#C8E6C9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  measureButton: {
    backgroundColor: '#388E3C',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
  },
  measureButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  lastReport: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  historyButton: {
    color: '#388E3C',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  gridImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 14,
    color: '#757575',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 14,
    color: '#757575',
  },
});