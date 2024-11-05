import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Thay đổi bộ icon tùy ý
import { fetchTaskByIdProject } from "../api/apiservice";
import {
  deleteTaskById,
  updateProjectStatus,
  updateTaskStatus,
} from "../api/taskService";

import Generate from "../CSS/Generate";
import styles from "../CSS/ManageTask";
import statusmember from "../CSS/StatusMember";

const ListTask = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // Danh sách tác vụ
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [refreshing, setRefreshing] = useState(false); // Trạng thái refreshing
  const [error, setError] = useState(null); // Lưu lỗi
  const route = useRoute();
  const { data } = route.params;
  const isFocused = useIsFocused(); // Check if the screen is focused
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  const [status, setStatus] = useState("Done"); // Trạng thái ban đầu
  const [statusProject, setStatusProject] = useState("Ongoing"); // Trạng thái ban đầu

  const time = data.createdAt ? new Date(data.createdAt) : null;
  const timeCreateAt = time ? time.toLocaleDateString() : "";
  const handleUpdateStatus = async (id) => {
    Alert.alert(
      "Update Task Status",
      "Are you sure you want to update the status to 'Done'?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const updatedTask = await updateTaskStatus(id, "Done"); // Update status to "Done"
              if (updatedTask) {
                Alert.alert("Success", "Task status updated successfully!");
                task(); // Refresh the task list
              }
            } catch (error) {
              console.error("Failed to update task status:", error);
              Alert.alert(
                "Error",
                "Failed to update task status. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  //

  const handleUpdateStatusProject = async (id) => {
    Alert.alert(
      "Update Project Status",
      "Are you sure you want to update the project status to 'Ongoing'?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const updatedProject = await updateProjectStatus(id, "Ongoing"); // Update status to "Ongoing"
              if (updatedProject) {
                Alert.alert(
                  "Success",
                  `The project "${updatedProject.title}" status has been updated to: "${updatedProject.status}".`
                );
                task(); // Refresh the task list
              }
            } catch (error) {
              console.error("Failed to update project status:", error);
              Alert.alert(
                "Error",
                "Failed to update project status. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const task = async () => {
    const projectId = data?._id; // Safely access the projectId
    if (!projectId) {
      console.error("No valid projectId found.");
      setError("Project ID is missing.");
      return;
    }

    setLoading(true);
    setRefreshing(true); // Start refreshing state
    try {
      const taskData = await fetchTaskByIdProject(projectId); // Fetch task data by project ID
      setTasks(Array.isArray(taskData) ? taskData : []); // Ensure taskData is an array
      console.log("Task data:", taskData); // Debug the fetched data
    } catch (err) {
      setError(err.message || "An error occurred while fetching tasks.");
      console.error("Error fetching tasks:", err.message || err); // Improved error logging
    } finally {
      setLoading(false); // Mark loading as complete
      setRefreshing(false); // End refreshing state
    }
  };

  useEffect(() => {
    if (isFocused) {
      task(); // Gọi lại API khi quay về màn hình này
    }
  }, [isFocused]);

  const chooseAction = (item) => {
    Alert.alert(
      "Choose Action",
      "Do you want to edit or delete this project?",
      [
        {
          text: "Edit",
          onPress: () => editProject(item),
        },

        {
          text: "Delete",
          onPress: () => deleteProject(item),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const editProject = async (item) => {
    navigation.navigate("EditTask", {
      name: "EditTask",
      item: item,
    });
  };

  const deleteProject = async (item) => {
    console.log(item._id);
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const result = await deleteTaskById(item._id); // Gọi API để xóa tác vụ
              console.log("Xóa thành công:", result);
              task(); // Refresh the project list after deletion
            } catch (err) {
              setError(err.message);
              console.error("Error deleting project:", err.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const startDateLocal = item.startDate
      ? new Date(item.startDate).toLocaleDateString()
      : "Unknown Start Date";
    const endDateLocal = item.endDate
      ? new Date(item.endDate).toLocaleDateString()
      : "Unknown End Date";

    return (
      <View style={[styles.d_flex, styles.margin_vertical]}>
        <TouchableOpacity onPress={() => chooseAction(item)}>
          <Image
            style={[statusmember.margin_right]}
            source={require("../img/draggable.png")}
          />
        </TouchableOpacity>
        <View style={[styles.box_task, { position: "relative" }]}>
          {/* Hiển thị startDate và endDate */}
          <View
            style={[
              Generate.d_flex_align_center,
              { position: "absolute", top: 20, right: 10 },
            ]}
          >
            <Text style={Generate.sizeSubtext}>{startDateLocal}</Text>
            <Icon name="arrow-forward" size={10} color="#000" />
            {/* Icon mũi tên */}
            <Text style={Generate.sizeSubtext}>{endDateLocal}</Text>
          </View>
          <View>
            <Text
              style={[
                styles.font_size_name,
                statusmember.underline,
                statusmember.marginBottom,
              ]}
            >
              {item && item.createrBy.fullName
                ? item.createrBy.fullName
                : "Null"}
            </Text>
            <Text
              style={[Generate.sizeTitles, statusmember.text_box_status_member]}
              onPress={() =>
                navigation.navigate("Comment", {
                  name: "Comment",
                  tasksId: item._id,
                })
              }
            >
              {item.title}
            </Text>
            <Text style={[Generate.sizeDescription, Generate.marginBottom]}>
              {item.description}
            </Text>
          </View>
          <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
            <View style={[styles.box_status, styles.d_flex, styles.paddingRL]}>
              <Image
                style={[styles.delete_img, styles.padding_right]}
                source={require("../img/user-add-line.png")}
              />
              <Text style={[styles.padding_right, styles.font_size_content]}>
                {item.invite.fullName}
              </Text>
            </View>
            <View
              style={[
                styles.box_status,
                styles.d_flex,
                styles.paddingRL,
                item.status === "Not started"
                  ? styles.box_status_notstarted
                  : item.status === "Ongoing"
                  ? styles.box_status_progress
                  : item.status === "Done"
                  ? [styles.box_status_done]
                  : null, // Nếu không thuộc các trạng thái trên, không áp dụng kiểu nào
              ]}
            >
              <Text style={[styles.point, styles.point_progress]}></Text>
              <Text
                style={[
                  styles.padding_right,
                  styles.font_size_content,
                  item.status === "Not started"
                    ? styles.color_notstarted
                    : item.status === "Ongoing"
                    ? styles.color_ongoing
                    : item.status === "Done"
                    ? [styles.color_done]
                    : null, // Nếu không thuộc các trạng thái trên, không áp dụng kiểu nào
                ]}
              >
                {item.status}
              </Text>
            </View>
            {item.status === "Done" ? (
              <Text></Text>
            ) : (
              <TouchableOpacity onPress={() => handleUpdateStatus(item._id)}>
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
          </View>
        </View>
      </View>
    );
  };
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.main]}>
      <View style={[styles.form_create_task]}>
        <Text style={[styles.fontSize_title, styles.margin_vertical]}>
          {data.title}
        </Text>
        <View style={[styles.d_flex]}>
          <Text
            style={[
              statusmember.margin_right,
              styles.font_size_name,
              statusmember.underline,
            ]}
          >
            {data.createrBy ? data.createrBy.fullName : "Unknown Creator"}
          </Text>
          <Text style={[styles.font_size_name, styles.margin_right]}>
            opened this issue on {timeCreateAt}
          </Text>
          {data.status === "Ongoing" || data.status === "Done" ? (
            <Text></Text>
          ) : (
            <TouchableOpacity
              onPress={() => handleUpdateStatusProject(data._id)}
            >
              <Text
                style={[
                  styles.font_size_content,
                  Generate.box_status_notstarted,
                  Generate.box_status_notstarted,
                  Generate.box,
                ]}
              >
                {data.status}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.horizol, styles.margin_vertical]}></Text>
        <Button
          onPress={() =>
            navigation.navigate("CreateTask", {
              name: "CreateTask",
              data: data,
            })
          }
          title="Create task"
          color="#2CAC31"
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          placeholder="Find task..."
          value={searchQuery}
          onChangeText={setSearchQuery} // Cập nhật trạng thái tìm kiếm
        />
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Trạng thái refreshing
              onRefresh={task} // Hàm gọi lại khi kéo refresh
            />
          }
          style={{ marginBottom: 340 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListTask;
