import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function DoctorScreen() {
    return (
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.textContainer}>
                        <Text style={styles.questionText}>Do you have any question for a doctor?</Text>
                        <TouchableOpacity style={styles.button}>
                            <MaterialCommunityIcons name="message-text-outline" color="black" style={styles.icon} />
                            <Text style={styles.buttonText}>Ask Question</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        resizeMode="cover"
                        source={{
                            uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC',
                        }}
                        style={styles.doctorImage}
                    />
                </View>
                <View style={styles.specialityContainer}>
                    <Text style={styles.sectionTitle}>Doctor Speciality</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal style={styles.specialityList}>
                    {['Cardiologists', 'Hematologists', 'Endocrinologists', 'Internists'].map((speciality, index) => (
                        <View key={index} style={styles.specialityItem}>
                            <Image source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC'}} style={styles.specialityImage}/>
                            <Text style={styles.specialityText}>{speciality}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.historyContainer}>
                    <Text style={styles.sectionTitle}>History</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.historyItem}>
                    <Image source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC'}} style={styles.historyImage}/>
                    <View style={styles.historyTextContainer}>
                        <Text style={styles.historyText}>Based on your symptoms, it is possible that you have...</Text>
                        <Text style={styles.historySubText}>Emma</Text>
                        <Text style={styles.historySubText}>2024-06-17 12:58:28</Text>
                    </View>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 16,
    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: 18,
        width: 20,
        height: 20,
        marginRight: 16,
    },

    backArrow: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    creditsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    credits: {
        fontSize: 16,
        marginLeft: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#4CAF50',
        fontSize: 16,
    },
    doctorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    specialityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAll: {
        fontSize: 16,
        color: '#00796b',
    },
    specialityList: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    specialityItem: {
        alignItems: 'center',
        marginRight: 16,
    },
    specialityImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
    specialityText: {
        fontSize: 14,
        textAlign: 'center',
    },
    historyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    historyItem: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    historyImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    historyTextContainer: {
        flex: 1,
    },
    historyText: {
        fontSize: 16,
        marginBottom: 4,
    },
    historySubText: {
        fontSize: 14,
        color: '#757575',
    },
});

