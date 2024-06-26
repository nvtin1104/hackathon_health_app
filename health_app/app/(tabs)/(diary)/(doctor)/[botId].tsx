import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'tomnyson',
      },
    },
    {
      _id: 2,
      text: 'Hi, how are you?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Heath AI',
      },
    },
  ]);

  // Function to handle sending a new message
  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

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
