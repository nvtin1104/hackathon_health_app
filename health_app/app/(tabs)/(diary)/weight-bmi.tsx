import React, {useState} from 'react';
import {Button, Dimensions, StyleSheet, Image, Platform, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function WeighBMIScreen() {

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(76,175,80, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        // legend: ["Rainy Days"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(126, 126, 126, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const [selectedDate, setSelectedDate] = useState(new Date(2023, 5, 19)); // Start date
    const [endDate, setEndDate] = useState(new Date(2024, 5, 19)); // End date
    const [showDatePicker, setShowDatePicker] = useState(false);
    let date = new Date();
    date.setDate(date.getDate() - 30);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.dateRange}>
                <Text style={styles.dateRangeText}> Detail</Text>
                <Text
                    style={styles.dateRangeTextShow}>   {`${selectedDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`} {/* Display the date range */} </Text>
                <Text style={styles.dateRangeText}>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Image
                            source={{uri: 'https://cdn-icons-png.flaticon.com/512/107/107799.png'}}
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <RNDateTimePicker
                            value={selectedDate}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setSelectedDate(selectedDate);
                                }
                                setShowDatePicker(Platform.OS === 'ios' ? true : false);
                            }}
                            dateFormat="dayofweek day month"
                            minimumDate={date} // 7 days before today
                            maximumDate={new Date()} // Today's date
                        />
                    )}

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
                    <BarChart
                        data={data}
                        width={Dimensions.get("window").width - 40} // subtracting 40 to add some padding
                        height={220}
                        chartConfig={chartConfig}
                        fromZero={true}
                    />
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
                    <BarChart
                        data={data}
                        width={Dimensions.get("window").width - 40} // subtracting 40 to add some padding
                        height={220}
                        chartConfig={chartConfig}
                        fromZero={true}
                    />
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
            '#4CAF50', padding: 8, alignItems: 'center', justifyContent: 'space-between',
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
    dateRangeTextShow  : {
        backgroundColor: '#ffffff',
        color: '#4CAF50',
        padding: 5,
        borderRadius : 10,
        fontWeight: 'bold',

    }  ,
});
