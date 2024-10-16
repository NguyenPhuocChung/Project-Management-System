import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // import useNavigation

const ProjectComments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Leader",
      date: "Jan 10",
      message: "Hello Chung",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]);

  const navigation = useNavigation(); // Sử dụng navigation để điều hướng

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: "Bạn",
        date: new Date().toLocaleDateString(),
        message: comment,
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentBox}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentHeader}>
          {item.name}{" "}
          <Text style={styles.commentDate}>Comment on {item.date}</Text>
        </Text>
        <Text style={styles.commentMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.projectTitle}>NguyenPhuocChung/Project</Text>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/7.jpg" }}
          style={styles.profileImage}
        />
      </View>

      <TouchableOpacity
        style={styles.storeRecordContainer}
        onPress={() => navigation.navigate("StoreRecords")} // Chuyển sang màn hình StoreRecords
      >
        <Text style={styles.storeRecordText}>Store records</Text>
        <Icon name="chevron-forward" size={20} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.projectName}>Project Name</Text>
      <Text style={styles.messLabel}>Mess</Text>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
        style={styles.commentList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Cập nhật phần thêm bình luận */}
      <View style={styles.addCommentSection}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/6.jpg" }}
          style={styles.addCommentAvatar}
        />
        <TextInput
          style={styles.input}
          placeholder="Create a task"
          value={comment}
          onChangeText={setComment}
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={2} // Điều chỉnh số dòng nếu cần
        />
      </View>

      <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
        <Text style={styles.commentButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  projectName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  messLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  storeRecordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  storeRecordText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
  commentList: {
    flexGrow: 1,
    marginBottom: 5,
  },
  commentBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentContent: {
    flex: 1,
    padding: 10,
  },
  commentHeader: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
  },
  commentMessage: {
    fontSize: 16,
    lineHeight: 20,
    color: "#555",
    marginTop: 4,
  },
  addCommentSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    marginBottom: 10,
  },
  addCommentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 8, // Giảm padding để khung nhỏ hơn
    backgroundColor: "#f9f9f9",
    marginRight: 8,
    maxHeight: 70, // Giảm chiều cao tối đa
  },
  commentButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10, // Giảm padding cho nút
    paddingHorizontal: 45,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProjectComments;
