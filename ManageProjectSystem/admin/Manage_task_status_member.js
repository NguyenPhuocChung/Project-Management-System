import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing"; // Import thư viện chia sẻ
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import URL from "../midleware/authMidleware"; // Adjust the import as necessary

import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchTaskByIdProject, updateProjectStatus } from "../api/taskService";
import Generate from "../CSS/Generate";
import styles from "../CSS/ManageTask";
import statusmember from "../CSS/StatusMember";

const Manage_task_status_member = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // Task list
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refresh state
  const [error, setError] = useState(null); // Error state
  const route = useRoute();
  const { data } = route.params;
  const [status, setStatus] = useState("Done"); // Trạng thái ban đầu

  const handleUpdateStatus = async (id) => {
    console.log("====================================");
    console.log(id, status);
    console.log("====================================");
    try {
      const updatedTask = await updateProjectStatus(id, status);
      if (updatedTask) {
        // Cập nhật giao diện hoặc thông báo thành công cho người dùng
        console.log("Updated task:", updatedTask);
        Alert.alert(
          "Task Updated",
          `The task "${updatedTask.title}" has been updated to status: "${updatedTask.status}".`
        );
      }
    } catch (error) {
      // Xử lý lỗi, có thể thông báo cho người dùng
      console.error("Failed to update task status:", error);
      Alert.alert(
        "Update Failed",
        "There was an error updating the task. Please try again."
      );
    }
  };
  // Formatting time and date
  const time = data.createdAt ? new Date(data.createdAt) : null;
  const timeCreateAt = time ? time.toLocaleDateString() : "";

  // Fetch tasks by project ID
  const task = async () => {
    const projectId = data._id;
    if (!projectId) {
      setError("Project ID is missing");
      return;
    }

    setLoading(true);
    setRefreshing(true); // Start refreshing state
    try {
      const taskResponse = await fetchTaskByIdProject(projectId); // Fetch project tasks
      setTasks(Array.isArray(taskResponse) ? taskResponse : []); // Ensure tasks is an array
      console.log("====================================");
      console.log(taskResponse);
      console.log("====================================");
    } catch (err) {
      setError("Failed to fetch tasks. Please try again."); // User-friendly error message
    } finally {
      setLoading(false); // Stop loading
      setRefreshing(false); // Stop refreshing
    }
  };

  useEffect(() => {
    task(); // Fetch tasks when component mounts
  }, []);

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

      Alert.alert("File opened!");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Download failed",
        "An error occurred while downloading the file."
      );
    }
  };
  // Render individual task
  const renderItem = ({ item }) => (
    <View style={[styles.d_flex, styles.margin_vertical]}>
      <Image
        style={[styles.draggable, styles.margin_right]}
        source={require("../img/draggable.png")}
      />
      <View style={[styles.box_task]}>
        <View>
          {/* Display multiple invitees */}
          {item.invite ? (
            <Text
              style={[
                styles.font_size_name,
                statusmember.underline,
                statusmember.marginBottom,
              ]}
            >
              {item.invite.fullName || "No Name"}
              {/* Truy cập trực tiếp fullName */}
            </Text>
          ) : (
            <Text style={[styles.font_size_name]}>No invitees</Text>
          )}

          <Text
            style={[
              styles.font_size_content,
              statusmember.text_box_status_member,
            ]}
            onPress={() =>
              navigation.navigate("Comment", {
                name: "Comment",
                tasksId: item._id,
                task: item,
              })
            }
          >
            {item.title || "No Title"} {/* Fallback for title */}
          </Text>
        </View>
        <View style={Generate.d_flex_align_center}>
          <View
            style={[
              styles.box_status,
              styles.d_flex,
              styles.paddingRL,
              item.status === "Ongoing"
                ? [styles.box_status_progress]
                : item.status === "Not started"
                ? styles.box_status_notstarted
                : [styles.box_status_done],
            ]}
          >
            <Text style={[styles.point, styles.point_progress]}></Text>
            <Text
              style={[
                styles.padding_right,
                item.status === "Ongoing"
                  ? [styles.color_progress]
                  : item.status === "Not started"
                  ? styles.color_notstarted
                  : styles.color_done,
                styles.font_size_content,
              ]}
            >
              {item.status || "No Status"} {/* Fallback for status */}
            </Text>
          </View>
          {/* <View style={[styles.d_flex, styles.paddingRL]}>
            <Image
              style={styles.delete_img}
              source={require("../img/list-check-3.png")}
            />
            <Text style={[styles.padding_right, styles.font_size_content]}>
              {item.invite?.length || 0} {/* Safely access invite length */}
          {/* </Text>
          </View>  */}
        </View>
      </View>
    </View>
  );

  const formatDate = (date) => new Date(date).toLocaleDateString(); // Format date
  const formatTime = (time) => new Date(time).toLocaleTimeString(); // Format time

  // Display loading spinner if data is loading
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={[styles.main]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  // Display error message if any error occurs
  if (error) {
    return (
      <SafeAreaView style={[styles.main]}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.main]}>
      <View style={[styles.form_create_task]}>
        <Text style={[styles.fontSize_title]}>{data.title || "No Title"}</Text>
        <Text style={[styles.font_size_content]}>
          {data.description || "No Description"}
        </Text>
        <View style={[styles.d_flex]}>
          <Text
            style={[
              statusmember.margin_right,
              styles.font_size_name,
              statusmember.underline,
              { fontStyle: "italic" },
            ]}
          >
            {data.createrBy ? data.createrBy.fullName : "Unknown Creator"}
          </Text>

          <Text style={[styles.font_size_name]}>
            opened this issue on {timeCreateAt}
          </Text>
        </View>
        <Text
          style={[
            styles.font_size_name,
            statusmember.underline,
            { fontStyle: "italic" },
          ]}
        >
          Join: {data.invite.fullName}
        </Text>
        <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
          <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
            <Text style={[styles.font_size_name, { color: "#67166E" }]}>
              {formatDate(data.startDate)}
            </Text>
            <Icon name="arrow-right" size={10} color="#000" />
            <Text style={[styles.font_size_name, { color: "#67166E" }]}>
              {formatDate(data.endDate)}
            </Text>
          </View>
          <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
            <Text style={[styles.font_size_name, { color: "#67166E" }]}>
              {formatTime(data.startTime)}
            </Text>
            <Icon name="arrow-right" size={10} color="#000" />
            <Text style={[styles.font_size_name, { color: "#67166E" }]}>
              {formatTime(data.endTime)}
            </Text>
          </View>
          <Text
            style={{
              color:
                data.labels === "medium"
                  ? "blue"
                  : data.labels === "easy"
                  ? "green"
                  : "black",
            }}
          >
            {data.labels || "No Label"}
          </Text>
        </View>
        {data.status === "Done" ? (
          <Text></Text>
        ) : (
          <TouchableOpacity onPress={() => handleUpdateStatus(data._id)}>
            <Text
              style={[
                styles.font_size_content,
                Generate.box_status_progress,
                Generate.box_status_progress,
                Generate.box,
              ]}
            >
              Verify
            </Text>
          </TouchableOpacity>
        )}
        {data.file && (
          <Button title="Open file" onPress={() => downloadFile(data.file)} />
        )}
        <Text style={[styles.horizol, styles.margin_vertical]}></Text>
        <Text style={[styles.fontSize_title]}>Status member do task</Text>
        {/* Render error message if exists */}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {tasks.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "red" }}>No tasks.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing} // Refresh state
                onRefresh={task} // Call task fetch on pull-to-refresh
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Manage_task_status_member;
