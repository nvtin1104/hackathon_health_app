import Ionicons from '@expo/vector-icons/Ionicons';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    SafeAreaView,
    Modal,
    TextInput,
    ScrollView
} from 'react-native';
import React, {useState} from 'react';
import {ThemedView} from '@/components/ThemedView';

export default function WaterReminderScreen() {


    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    return (
        <>
            <ScrollView>
                <ThemedView style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.waterAmount}>0 lít</Text>
                        <View style={styles.infoBox}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Daily Goal:</Text>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Text style={styles.infoValue}>2 lít
                                        <Image
                                            source={{uri: 'https://static.vecteezy.com/system/resources/previews/026/627/528/non_2x/edit-icon-symbol-design-illustration-vector.jpg'}}
                                            style={styles.editIcon}/>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Last Drink:</Text>
                                <Text style={styles.infoValue}>--l</Text>
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
                            <TouchableOpacity style={styles.plusButton}>
                                <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrIYhKJ-HYV8DYjUYD7UFKFGBAAJo4QlwT0fDBKLPHA1Nxwxh"}}
                                       style={styles.addIcon}/>
                                <Text style={styles.footerText}>200ml</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ThemedView>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setInputValue(text)}
                            value={inputValue}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    ...styles.okButton,
                                    backgroundColor: inputValue === '' ? '#ccc' : '#4CAF50',
                                }}
                                onPress={() => {
                                    // Handle OK button press
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text >OK</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </>


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
    plusButton: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        borderRadius: 50,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
    },
    okButton: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
});
