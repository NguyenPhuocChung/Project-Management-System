import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import GenerateStyles from "../CSS/Generate";
import styles from "../CSS/ManageTask";
import { deleteProjectById, fetchProjects } from "../api/projectService"; // Corrected import

const ManageProject = ({ navigation }) => {
  const [projects, setProjects] = useState([]); // State to store the list of projects
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh status
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  // Function to load the list of projects
  const loadProjects = async () => {
    setLoading(true);
    setRefreshing(true); // Start refreshing state
    try {
      const data = await fetchProjects(); // Fetch data from API
      console.log("Fetched Projects:", data); // Log fetched data
      setProjects(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (err) {
      setError(err.message); // Store error if any
    } finally {
      setLoading(false); // Mark loading complete
      setRefreshing(false); // End refreshing state
    }
  };

  useEffect(() => {
    loadProjects(); // Call the function to load data on component mount
  }, []);

  // Function to delete a project
  const deleteProject = async (item) => {
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
              await deleteProjectById(item._id); // Call your API to delete the project
              loadProjects(); // Refresh the project list after deletion
            } catch (err) {
              setError(err.message); // Save error if any
              console.error("Error deleting project:", err.message); // Log error message
            }
          },
        },
      ]
    );
  };

  // Function to edit a project
  const editProject = async (item) => {
    // Navigate to your edit project screen
    navigation.navigate("EditProject", {
      name: "EditProject",
      item: item,
    });
  };

  // Function to choose between editing or deleting a project
  const chooseAction = (id) => {
    Alert.alert(
      "Choose Action",
      "Do you want to edit or delete this project?",
      [
        {
          text: "Edit",

          onPress: () => editProject(id),
        },
        {
          text: "Delete",
          onPress: () => deleteProject(id),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.d_flex, styles.box_main_task]}>
      <TouchableOpacity onPress={() => chooseAction(item)}>
        <Image
          style={[styles.draggable, styles.margin_right]}
          source={require("../img/draggable.png")}
        />
      </TouchableOpacity>
      <View style={[styles.box_task, styles.margin_vertical]}>
        <Text style={[styles.fontSize_title]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={[styles.text_task, styles.margin_bottom]}
          numberOfLines={2} // Limit number of lines displayed
          onPress={() =>
            navigation.navigate("StatusMember", {
              name: "StatusMember",
              data: item,
            })
          }
        >
          {item.description}
        </Text>
        <View style={[styles.d_flex, styles.justify_between]}>
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

          {/* <View style={[styles.d_flex, styles.paddingRL]}>
            <Image
              style={styles.delete_img}
              source={require("../img/list-check-3.png")}
            />
            {/* <Text style={[styles.padding_right, styles.font_size_content]}>
              {item.invite.length || 0}
            </Text> */}
          {/* </View>  */}
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.main]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.main]}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }
  ////////////////////////////////
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar />
      <View style={[styles.container]}>
        <Image
          style={styles.management_img}
          source={require("../img/server.png")}
        />
        <Text
          style={[styles.text_management, styles.fontSize_title, styles.color]}
        >
          Management Project
        </Text>
      </View>
      <Button
        onPress={() =>
          navigation.navigate("CreateProject", { name: "CreateProject" })
        }
        title="Create Project"
        color="#2CAC31"
      />
      <View style={[styles.d_flex, styles.justify_between]}>
        <Text
          style={[
            styles.text_note,
            styles.fontSize_title,
            styles.color,
            styles.margin_vertical,
          ]}
        >
          Project
        </Text>
        <Image style={styles.sort_img} source={require("../img/Vector.png")} />
      </View>
      <Text
        style={[
          GenerateStyles.horizol_line_traight,
          GenerateStyles.marginVertical,
        ]}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        placeholder="Find project..."
        value={searchQuery}
        onChangeText={setSearchQuery} // Cập nhật trạng thái tìm kiếm
      />
      {projects.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Icons name="assignment" size={50} color="#ccc" />
          <Text style={{ fontSize: 18, color: "#aaa", marginTop: 10 }}>
            No project available
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProjects}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          style={{ marginBottom: 310 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Refreshing state
              onRefresh={loadProjects} // Function to call on pull-to-refresh
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ManageProject;
