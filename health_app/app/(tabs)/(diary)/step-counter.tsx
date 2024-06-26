import {
    Button,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    Platform,
    PermissionsAndroid,
    Dimensions, ScrollView
} from 'react-native';
import React, { useEffect, useState } from "react";
import {
    BarChart,
    PieChart
} from "react-native-chart-kit";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";



export default function StepCounterScreen() {
    // counter
    const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
    const [StepCount, SetStepCount] = useState(0);
    let WindowHeight = Dimensions.get("window").height;
    let Dist = StepCount / 1300;
    let DistanceCovered = Dist.toFixed(4);
    let cal = DistanceCovered * 60;
    let caloriesBurnt = cal.toFixed(4);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text: string) => {
        setInputValue(text);
    }


    const stepData = [StepCount, StepCount, StepCount, StepCount, StepCount, StepCount, StepCount]; // replace this with actual data

    const validateInput = () => {
        const value = Number(inputValue);
        if (isNaN(value)) {
            alert("Đầu vào không phải là số");
            setInputValue('');
            return;
        }
        if (value < 500 || value > 90000) {
            alert("Vui lòng nhập một số từ 500 đến 90000");
            setInputValue('');
            return;
        }
    }

    const data = {
        datasets: [
            {
                data: stepData,
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(76,175,80, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    const requestAndroidPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
                {
                    title: "Activity Recognition Permission",
                    message: "This app needs access to your activity recognition to count your steps.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the pedometer");
            } else {
                console.log("Pedometer permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestAndroidPermission();
        }
        subscribe();
    }, []);


    const subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            SetStepCount(result.steps);
        });

        Pedometer.isAvailableAsync().then(
            (result) => {
                SetPedomaterAvailability(String(result));
            },
            (error) => {
                SetPedomaterAvailability(error);
            }
        );
    };

    return (
        <>
            <ScrollView style={styles.container}>

                <View style={styles.goalSection}>
                    <Text style={styles.dailyGoalText}>Mục Tiêu Hàng Ngày</Text>
                    <TouchableOpacity style={styles.goalSection} onPress={() => setModalVisible(true)}>
                        <Text style={styles.goalNumber}>6000</Text>
                        <Image
                            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/026/627/528/non_2x/edit-icon-symbol-design-illustration-vector.jpg' }}
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.progressSection}>
                    <CircularProgress
                        value={StepCount}
                        maxValue={6500}
                        radius={150}
                        textColor={"#ecf0f1"}
                        activeStrokeColor={"#000"}
                        inActiveStrokeColor={"#4CAF50"}
                        inActiveStrokeOpacity={0.5}
                        inActiveStrokeWidth={40}
                        activeStrokeWidth={40}
                        title={"Số Bước Đi"}
                        titleColor={"#ecf0f1"}
                        titleStyle={{ fontWeight: "bold" }}
                    />
                    <Image source={{ uri: 'https://www.iconsdb.com/icons/preview/gray/gas-xxl.png' }}
                        style={styles.fireIcon} />
                    <Text style={styles.kcalText}>{caloriesBurnt} Kcal</Text>
                </View>
                <View style={styles.statsSection}>
                    <View style={styles.statBox}>
                        <Image
                            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/925/051/non_2x/clock-icon-design-templates-free-vector.jpg' }}
                            style={styles.clockIcon} />
                        <Text style={styles.statText}>0h 0m</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Image
                            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/833/007/non_2x/arrow-icon-sign-symbol-logo-illustration-vector.jpg' }}
                            style={styles.arrowIcon} />
                        <Text style={styles.statText}> Khoảng Cách Đã Đi : {DistanceCovered} km</Text>
                    </View>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Chi Tiết</Text>
                    <View style={styles.chart}>
                        <BarChart
                            data={data}
                            width={Dimensions.get("window").width - 40} // trừ đi 40 để thêm một số đệm
                            height={220}
                            chartConfig={chartConfig}
                            fromZero={true}
                        />
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />

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
                            onChangeText={handleInputChange}
                            value={inputValue}
                            placeholder={"500-90000"}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text >Hủy</Text>
                            </TouchableOpacity>
                            <Button
                                style={styles.okButton}
                                title="OK"
                                color={inputValue === '' ? '#ccc' : '#4CAF50'}
                                onPress={() => {
                                    // Xử lý khi nhấn nút OK
                                    validateInput();
                                    setModalVisible(!modalVisible);
                                }}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </>

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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