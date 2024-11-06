import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { fetchProjectByInvite } from "../api/inviteService";
import GenerateStyles from "../CSS/Generate";
import styles from "../CSS/ManageTask";

const ManageTask = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [inviteId, setInviteId] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

  const loadTask = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const userID = await AsyncStorage.getItem("userId");

      if (userID) {
        console.log("User ID:", userID);
        setInviteId(userID);

        const data = await fetchProjectByInvite(userID);
        console.log("Fetched Projects:", data);

        if (Array.isArray(data)) {
          setProjects(data); // If data is an array, set it
        } else {
          setProjects([]); // Handle edge case where data isn't an array
          console.log("Data is not an array:", data);
        }
      } else {
        console.log("No user ID found in AsyncStorage");
        setError("User ID is missing.");
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
      console.error("Error fetching data:", err.message || err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTask(); // Call to load projects
  }, [inviteId]); // Add inviteId to dependencies

  const renderItem = ({ item }) => (
    <View style={[styles.d_flex, styles.box_main_task]}>
      <TouchableOpacity>
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
          numberOfLines={2}
          onPress={() =>
            navigation.navigate("ListTask", {
              name: "ListTask",
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

          <View style={[styles.d_flex, styles.paddingRL]}>
            <Image
              style={styles.delete_img}
              source={require("../img/list-check-3.png")}
            />
            <Text style={[styles.padding_right, styles.font_size_content]}>
              {item.invite.length}
            </Text>
          </View>
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
          Management Task
        </Text>
      </View>

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
        placeholder="Find project"
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
            <RefreshControl refreshing={refreshing} onRefresh={loadTask} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ManageTask;
