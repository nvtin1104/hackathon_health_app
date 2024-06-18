import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>Home</Text>
              <View style={styles.weather}>
                  <Text style={styles.weatherText}>26°C</Text>
              </View>
          </View>

          <View style={styles.card}>
              <View style={styles.header}>
                  <Image
                      source={{ uri: 'https://media.istockphoto.com/id/1193452789/vector/health-or-fitness-tracker-app-on-mobile-phone-vector-flat-cartoon-smartphone-steps-or-run.jpg?s=612x612&w=0&k=20&c=3Y5z0oOT0gheYlyHn6b9BHg9zcAgqrAp5wputLPzZG8=' }}
                      style={styles.icon}
                  />
                  <TouchableOpacity style={styles.measureButton}>
                      <Text style={styles.measureButtonText}>Measure Now →</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                  <Text style={styles.lastReportText}>Last Report: Jun 17, 2024</Text>
                  <TouchableOpacity>
                      <Text style={styles.historyText}>History</Text>
                  </TouchableOpacity>
              </View>
          </View>

          <Text style={styles.sectionTitle}>Health Diary</Text>

          <View style={styles.grid}>
              <View style={styles.gridItem}>
                  <Image source={{ uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTU16X4WszbGrKmYCnY0j9hOu3kfL4q-G1nD6NqoOSlPQmgn_Ky' }} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>Step Counter</Text>
                  <Text style={styles.gridValue}>0/6000</Text>
              </View>
              <View style={styles.gridItem}>
                  <Image source={{ uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ41vD7gYu6LC6Tx3RUGFvdknXV-2AbN_UaLxOrL-Lhhpk2LcnC' }} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>Weight & BMI</Text>
                  <Text style={styles.gridValue}>-- KG</Text>
              </View>
              <View style={styles.gridItem}>
                  <Image source={{ uri: 'https://play-lh.googleusercontent.com/o1EimUcLmc9bfIHMZSifKrzorD24t6zfRHoqRijZRX3tyQdFiktMKN2qSqGUl9U3usE' }} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>Water Reminder</Text>
                  <Text style={styles.gridValue}>200/2000 ml</Text>
              </View>
              <View style={styles.gridItem}>
                  <Image
                      resizeMode="cover"
                      source={{ uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC' }} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>AI Doctor</Text>
                  <Text style={styles.gridValue}>Ask any doctor</Text>

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
        width: 100,
        height: 100,
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
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
    icon: {
        width: 100,
        height: 100,
        marginRight: 16,
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
    borderRadius: 20,
    },
});