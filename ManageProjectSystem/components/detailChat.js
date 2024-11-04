import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const messagesData = [
  { id: "1", sender: "Ttv", message: "Chư x", time: "1 giờ" },
  { id: "2", sender: "Để đẹp chai vãi ò", message: "Ok", time: "48 phút" },
  {
    id: "3",
    sender: "Media Box",
    message: "Báo Mới: Tiếp tục xô đổ đỉnh cũ, vàng...",
    time: "5 giờ",
  },
  // Thêm nhiều tin nhắn ở đây...
];

const DetailChat = ({ route }) => {
  const { name, imgSrc } = route.params; // Nhận tên và ảnh từ route params
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Gửi tin nhắn (có thể cập nhật state hoặc gửi tới server)
      setNewMessage(""); // Reset input sau khi gửi
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imgSrc }} style={styles.avatar} />
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageSender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <FontAwesome name="paper-plane" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    flexGrow: 0,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  messageSender: {
    fontWeight: "bold",
  },
  messageText: {
    marginVertical: 2,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: "#000",
  },
});

export default DetailChat;
