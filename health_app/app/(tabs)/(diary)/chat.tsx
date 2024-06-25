import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import { getChatHistoryByUserIdAndBot } from '@/services/chatServices';
import { Colors } from '@/constants/Colors';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { botId } = useLocalSearchParams();
  // Function   to handle sending a new message
  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  useEffect(() => {
    // Fetch all bots when the component mounts
    const fetchBots = async (botId) => {
      try {
        const chatData = await getChatHistoryByUserIdAndBot({botId});
        console.log(chatData.data.length);
        if(chatData.data.length > 0) {
          const parseMessage = chatData.data.map((message) => {
            console.log(message)
            return {
              _id: message._id,
              text: message.message,
              createdAt: new Date(),
              user: {
                _id: !message.isBot ?  1 : 2,
                name: !message.isBot ?  'bot' : 'me',
              },
            }
          })
          console.log(JSON.stringify(parseMessage));
          setMessages(parseMessage);
          setLoading(false);
        }
       
      } catch (err: any) {
        setError(err.message);
      }
    };

    if(botId) {
      fetchBots(botId);
    }

  }, [botId]);
  
  if(loading) {
    return  <ActivityIndicator size="large" color={`${Colors.light.icon}`} />
  }
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1, // Current user ID
        }}
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
