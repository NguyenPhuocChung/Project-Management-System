import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing"; // Import thư viện chia sẻ
import URL from "../midleware/authMidleware"; // Adjust the import as necessary

import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { addComment, fetchComment } from "../api/commentService";
import { fetchTaskByID } from "../api/taskService";
import Generate from "../CSS/Generate";
import stylesTask from "../CSS/ManageTask"; // Giữ styles từ file CSS/JS
const CommentSystem = () => {
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]); // Initialize as an empty array
  const [tasks, setTask] = useState([]);
  const taskData = data[0]; // hoặc bạn có thể thay đổi chỉ số để lấy phần tử khác
  const task = taskData ? taskData.tasksId : null;
  const route = useRoute();
  const { tasksId } = route.params;
  const [id, setId] = useState(null);
  const [fileName, setFileName] = useState("");

  const [load, setLoad] = useState("");
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Định dạng ngày
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString(); // Định dạng giờ
  };
  const getID = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id !== null) {
      setId(id);
    } else {
      console.log("No userId found in AsyncStorage");
    }
  };
  useEffect(() => {
    getID();
  }, []);
  // Hàm reset description
  const handleReset = () => {
    setDescription("");
  };
  // Hàm submit gọi API
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Chọn mọi loại file
        copyToCacheDirectory: false,
      });

      console.log(result); // Kiểm tra kết quả trả về

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Lấy file đầu tiên

        // Hiển thị tên và loại file đã chọn
        setFileName(selectedFile);
        Alert.alert(
          "Đã chọn file: " + selectedFile.name,
          "Loại file: " + selectedFile.mimeType
        );

        // Xử lý tải lên hoặc mở file ở đây, ví dụ: tải lên server hoặc lưu tạm
        console.log("URI file:", selectedFile.uri);
      } else {
        Alert.alert("Người dùng đã hủy chọn file");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Có lỗi xảy ra khi chọn file");
    }
  };
  //

  //

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description); // Luôn thêm description
    formData.append("userId", id); // Thêm userId
    formData.append("tasksId", tasksId); // Thêm tasksId

    // Nếu có file, thêm file vào FormData
    if (fileName) {
      formData.append("file", {
        uri: fileName.uri,
        name: fileName.name,
        type: fileName.mimeType,
      });
    }
    try {
      await addComment(formData); // Gọi API với formData
      Alert.alert("Nộp bài thành công!");
      setLoad(true);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setLoad(false);

      Alert.alert("Lỗi khi nộp bài!");
    }
  };
  const getTaskByID = async () => {
    try {
      const response = await fetchTaskByID(tasksId);
      // Fetch user data for each comment if needed
      setTask(response);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch comments: " + error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    getTaskByID();
  }, [load]);

  ///////// getComment
  const getComment = async () => {
    try {
      const response = await fetchComment(tasksId);
      // Fetch user data for each comment if needed

      setData(response);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch comments: " + error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    getComment();
  }, [load]);
  ////////////////////////////////////////////////////////////////////////
  const downloadFile = async (fileName) => {
    if (!fileName) {
      Alert.alert("Error", "Please enter a file name");
      return;
    }
    // Yêu cầu quyền truy cập bộ nhớ
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to enable permission to download files."
      );
      return;
    }

    const fileUri = `http://${URL.BASE_URL}:5000/file/${fileName}`; // URL file trên server
    const localFileUri = `${FileSystem.documentDirectory}${fileName}`; // Đường dẫn tạm thời

    try {
      // Tải xuống tệp
      const { uri } = await FileSystem.downloadAsync(fileUri, localFileUri);
      console.log("Downloaded file URI:", uri);

      // Mở tệp sau khi tải xuống
      await Sharing.shareAsync(uri, {
        UTI: "public.document", // Định dạng tệp chung
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Định dạng tệp .docx
      });

      Alert.alert("Download completed!", `File downloaded and opened.`);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Download failed",
        "An error occurred while downloading the file."
      );
    }
  };
  // Fix renderItem function
  const renderItem = ({ item }) => {
    const startDateLocal = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "Unknown Start Date";
    return (
      <View style={styles.comment_item}>
        <Text style={styles.comment_user}>{item.userId.fullName}</Text>
        {/* Render the fullName instead of the entire object */}
        <Text onPress={handleFileUpload} style={styles.comment_content}>
          {item.description}
        </Text>
        {item.file && (
          <Button title="Open file" onPress={() => downloadFile(item.file)} />
        )}
        <Text>{startDateLocal}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      {/* Show comments */}
      <View style={styles.container}>
        {tasks && (
          <View style={styles.taskContainer}>
            <Text style={styles.title}>{tasks.title}</Text>
            <Text style={styles.description}>
              Description: {tasks.description}
            </Text>
            <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
              <Text style={[styles.detail, { color: "#67166E" }]}>
                {formatDate(tasks.startDate)}
              </Text>
              <Icon name="arrow-right" size={10} color="#000" />
              <Text style={[styles.detail, { color: "#67166E" }]}>
                {formatDate(tasks.endDate)}
              </Text>

              <Text style={[styles.detail, { color: "#67166E" }]}>
                {formatTime(tasks.startTime)}
              </Text>
              <Icon name="arrow-right" size={10} color="#000" />
              <Text style={[styles.detail, { color: "#67166E" }]}>
                {formatTime(tasks.endTime)}
              </Text>
            </View>
            <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
              <Text style={styles.detail}>Status: {tasks.status}</Text>
              <Text style={styles.detail}>
                Created By:
                {tasks.createrBy ? tasks.createrBy.fullName : "Unknown"}
              </Text>
            </View>
            {tasks.file && (
              <Button
                title="Open file"
                onPress={() => downloadFile(tasks.file)}
              />
            )}
          </View>
        )}
        <Text style={{ textAlign: "center", color: "red" }}>
          Showing {data.length} results
        </Text>
      </View>
      <FlatList
        data={data}
        style={{ marginBottom: 330 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View>
            <Text style={[Generate.textCenter]}>
              <Icon name="comment-o" size={100} color="#FF0000" />
            </Text>
            <Text
              style={[
                Generate.bold,
                Generate.textCenter,
                Generate.marginVertical,
              ]}
            >
              No comments found!
            </Text>
          </View>
        }
      />
      {/* Input description */}
      <View
        style={[
          {
            width: "100%",
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 100,
            marginHorizontal: 10,
          }}
        >
          <View
            style={[
              stylesTask.control_content_task,
              { backgroundColor: "#F5F5F5" },
            ]}
          >
            <TouchableOpacity onPress={handleFileUpload}>
              <Image
                style={stylesTask.import_img}
                source={require("../img/folder-plus.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={[
                stylesTask.text_create_task,
                stylesTask.font_size_content,
              ]}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={description} // Bind description state
              onChangeText={setDescription} // Update state
            />
            <Text> {fileName.name}</Text>
          </View>
          <View
            style={[
              stylesTask.d_flex,
              stylesTask.justify_between,
              Generate.marginVertical,
              { marginHorizontal: 20 },
            ]}
          >
            <TouchableOpacity
              style={[Generate.box_status_cancle, Generate.box]}
              onPress={handleReset} // Reset on press
            >
              <Text style={Generate.color_cancle}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Generate.box_status_done, Generate.box]}
              onPress={handleSubmit} // Submit on press
            >
              <Text style={Generate.color_done}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
////////////////////////////////
const styles = StyleSheet.create({
  comment_item: {
    backgroundColor: "#f9f9f9", // Màu nền cho bình luận
    borderRadius: 5, // Bo tròn các góc
    padding: 15, // Khoảng cách bên trong
    marginVertical: 5, // Khoảng cách giữa các bình luận
    marginHorizontal: 10,
    shadowColor: "#000", // Màu bóng
    shadowOffset: {
      // Độ dày và hướng bóng
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 1.41, // Bán kính bóng
    elevation: 2, // Độ cao của bóng trên Android
  },
  comment_user: {
    fontSize: 16, // Kích thước chữ cho tên người dùng
    fontWeight: "bold", // Đậm
    color: "#333", // Màu chữ
  },
  comment_content: {
    fontSize: 14, // Kích thước chữ cho nội dung bình luận
    color: "#555", // Màu chữ
    marginVertical: 5, // Khoảng cách giữa tên và nội dung
  },
  comment_date: {
    fontSize: 12, // Kích thước chữ cho ngày
    color: "#999", // Màu chữ nhạt hơn cho ngày
    textAlign: "right", // Căn phải
  },

  taskContainer: {
    padding: 10,
    marginVertical: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1, // For Android shadow
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 1,
  },
  description: {
    fontSize: 16,
    color: "black",
    marginBottom: 1,
  },
  detail: {
    fontSize: 12,
    color: "black",
    marginBottom: 1,
  },
});

export default CommentSystem;
