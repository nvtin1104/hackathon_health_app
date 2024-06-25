import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Image, Modal, Button, } from 'react-native';
import { GiftedChat, Actions, Bubble  } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import { getChatHistoryByUserIdAndBot, createAnswerFromBot, createMessage } from '@/services/chatServices';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { botId } = useLocalSearchParams();
  const [imageUri, setImageUri] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchChatHistory = useCallback(async (botId) => {
    try {
      const chatData = await getChatHistoryByUserIdAndBot({ botId });
      if (chatData.data.length > 0) {
        const parsedMessages = chatData.data.map((message) => ({
          _id: message._id, // Ensure each message has a unique ID
          text: message.message,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.isBot ? 2 : 1,
            name: message.isBot ? 'bot' : 'me',
          },
        }));
        setMessages(parsedMessages);
      } else {
        setMessages([
          {
            _id:  Math.floor(Math.random() * 10001),
            text: "Tôi là bot health care có thể giúp gì cho bạn?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'bot',
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (botId) {
      fetchChatHistory(botId);
    }
  }, [botId, fetchChatHistory]);

  const onSend = async (newMessages = []) => {

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const payload = {
      botId: botId,
      message: newMessages[0].text,
    };

    setIsTyping(true);

    try {
      const answerUser = await createMessage(payload);
      const answer = await createAnswerFromBot(payload);

      if (answer.data) {
        const message = answer.data
        const botMessage = {
          _id: message._id,
          text: message.message,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.isBot ? 2 : 1,
            name: message.isBot ? 'bot' : 'me',
          },
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setIsTyping(false);
    }
  };

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      console.log("Image not selected");
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      console.log("Photo not taken");
    }
  };

  const confirmImage = () => {
    const imageMessage = {
      _id: Math.floor(Math.random() * 10001),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'me',
      },
      image: selectedImage,
    };

    console.log("imageMessage:", imageMessage);

    setMessages((previousMessages) => GiftedChat.append(previousMessages, [imageMessage]));
    setSelectedImage(null);
  };



  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.icon} />;
  }


  const renderActions = (props) => (
    <Actions
      {...props}
      options={{
        ['Choose From Library']: pickImageFromLibrary,
        ['Take Photo']: takePhoto,
      }}
      icon={() => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/000000/image.png' }}
            style={{ width: 32, height: 32 }}
          />
        </View>
      )}
      onSend={(args) => console.log(args)}
    />
  );

  return (
    <View style={styles.container}>
      <Image
            source={{ uri: imageUri || '' }}
            style={{ width: 32, height: 32 }}
          />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
        renderActions={renderActions}
        renderMessageImage={(props) => {
          console.log(props)
          return  (
            <View style={{ padding: 5 }}>
              <Image
                source={{ uri: props.currentMessage.image }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
            </View>
          )
        }}
      />
      {selectedImage && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <Button title="OK" onPress={confirmImage} />
              <Button title="Cancel" onPress={() => setSelectedImage(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
