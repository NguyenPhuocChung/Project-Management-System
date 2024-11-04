import { FontAwesome } from "@expo/vector-icons"; // Bạn có thể sử dụng FontAwesome trong React Native
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const ChatItem = ({ imgSrc, name, message, time, unread }) => (
  <View style={styles.chatItem}>
    <Image source={{ uri: imgSrc }} style={styles.avatar} />
    <View style={styles.chatInfo}>
      <Text style={styles.chatName}>{name}</Text>
      <Text style={styles.chatMessage}>{message}</Text>
    </View>
    <Text style={styles.chatTime}>{time}</Text>
    {unread && <Text style={styles.unreadIndicator}>•</Text>}
  </View>
);

const Chat = () => (
  <View style={styles.container}>
    <View style={styles.searchBar}>
      <FontAwesome name="search" size={20} color="white" />
      <TextInput
        placeholder="Tìm kiếm"
        placeholderTextColor="white"
        style={styles.searchInput}
      />
      <FontAwesome
        name="qrcode"
        size={20}
        color="white"
        style={styles.iconMargin}
      />
      <FontAwesome
        name="plus"
        size={20}
        color="white"
        style={styles.iconMargin}
      />
    </View>
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Ttv"
      message="Chư x"
      time="1 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Để đẹp chai vãi ò"
      message="Ok"
      time="48 phút"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Media Box"
      message="Báo Mới: Tiếp tục xô đổ đỉnh cũ, vàng..."
      time=""
      unread
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="SE1709_MMA301_FA24"
      message="Phạm Tiến Phúc: nhớ làm bài tập đầy đủ..."
      time="1 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="nhóm react native (G4)"
      message="[Sticker]"
      time="1 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Khả Vii"
      message="Hôm nay (23/10) là sinh nhật của Khả Vii..."
      time="3 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Thời Tiết"
      message="Chào ngày mới, thời tiết Cần Thơ hôm nay..."
      time="5 giờ"
      unread
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Cộng đồng ZCá Vua Bắn Cá Zag..."
      message="[Sự Kiện Trở Lại] Heo Đất May Mắn..."
      time="17 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Mẹ"
      message="Cuộc gọi thoại đi"
      time="18 giờ"
    />
    <ChatItem
      imgSrc="https://placehold.co/40x40"
      name="Quy"
      message="khi nào bạn về"
      time="21 giờ"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    backgroundColor: "linear-gradient(90deg, #4facfe, #00f2fe)", // React Native không hỗ trợ gradient trực tiếp
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "white",
    marginLeft: 10,
    flexGrow: 1,
  },
  chatItem: {
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
  chatInfo: {
    flexGrow: 1,
  },
  chatName: {
    fontWeight: "bold",
  },
  chatMessage: {
    fontSize: 12,
    color: "#888",
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  unreadIndicator: {
    color: "red",
    fontSize: 10,
    marginLeft: 5,
  },
});

export default Chat;
