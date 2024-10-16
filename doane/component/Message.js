import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

const MessageScreen = ({ route, navigation }) => {
  const { group, adminMessage, avatar, updateNotification } = route.params;

  // State to manage user input and messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ text: adminMessage || 'No message', sender: 'admin' }]);

  // Ref to the FlatList to scroll to the bottom when new messages arrive
  const flatListRef = useRef(null);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear input after sending

      // Update the notification when a new message is sent
      updateNotification(group, newMessage.text);
    }
  };

  // Auto scroll to the bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.title}>{group}</Text>
      </View>

      {/* Display the chat messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessageContainer : styles.adminMessageContainer,
          ]}>
            {item.sender !== 'user' && <Image source={{ uri: avatar }} style={styles.messageAvatar} />}
            <Text style={[
              styles.messageText,
              item.sender === 'user' ? styles.userMessageText : styles.adminMessageText,
            ]}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}  // Ensure messages are justified to the end
      />

      {/* Input field to type new message */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Aa"
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0084ff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    padding: 10,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    marginBottom: 2,
  },
  adminMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4e6eb',
    padding: 10,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  adminMessageText: {
    color: '#000',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MessageScreen;
