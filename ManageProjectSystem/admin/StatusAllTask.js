import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { fetchTask } from "../api/taskService";
import Generate from "../CSS/Generate";
import styles from "../CSS/ManageTask";
import statusmember from "../CSS/StatusMember";

const StatusAllTask = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // Danh sách tác vụ
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [refreshing, setRefreshing] = useState(false); // Trạng thái refreshing
  const [error, setError] = useState(null); // Lưu lỗi
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

  const task = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const taskData = await fetchTask();
      setTasks(taskData);
      console.log("task", taskData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    task();
  }, []);

  const renderItem = ({ item }) => {
    const startDateLocal = item.startDate
      ? new Date(item.startDate).toLocaleDateString()
      : "Unknown Start Date";
    const endDateLocal = item.endDate
      ? new Date(item.endDate).toLocaleDateString()
      : "Unknown End Date";

    return (
      <View style={[styles.d_flex, styles.margin_vertical]}>
        <TouchableOpacity>
          <Image
            style={[statusmember.margin_right]}
            source={require("../img/draggable.png")}
          />
        </TouchableOpacity>
        <View style={[styles.box_task, { position: "relative" }]}>
          <View
            style={[
              Generate.d_flex_align_center,
              { position: "absolute", top: 20, right: 10 },
            ]}
          >
            <Text style={Generate.sizeSubtext}>{startDateLocal}</Text>
            <Icon name="arrow-forward" size={10} color="#000" />
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
              {item?.invite?.fullName ?? "null"}
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
          <View>
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
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const filteredTasks = (tasks || []).filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.invite &&
        task.invite.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={[styles.main]}>
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
        onChangeText={setSearchQuery}
      />
      {filteredTasks.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Icon name="assignment" size={50} color="#ccc" />
          <Text style={{ fontSize: 18, color: "#aaa", marginTop: 10 }}>
            No tasks available
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={task} />
          }
          style={{ marginBottom: 150 }}
        />
      )}
    </SafeAreaView>
  );
};

export default StatusAllTask;
