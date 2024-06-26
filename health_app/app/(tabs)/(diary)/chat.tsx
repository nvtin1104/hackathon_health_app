import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { GiftedChat  } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import { getChatHistoryByUserIdAndBot, createAnswerFromBot, createMessage } from '@/services/chatServices';
import { Colors } from '@/constants/Colors';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { botId } = useLocalSearchParams();

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
            name: message.isBot ?  message.bot.name : message.user.name,
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



  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.icon} />;
  }



  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
