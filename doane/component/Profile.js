import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

export default function Profile({ navigation }) {
  const [profileData, setProfileData] = useState([]); // Khởi tạo state là một mảng rỗng

  useEffect(() => {
    // Gọi API khi component được render lần đầu
    axios
      .get("http://192.168.100.71:3000/api/profiles")
      .then((response) => {
        console.log("Success:", response.data);
        setProfileData(response.data); // Cập nhật state với dữ liệu nhận được
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Kiểm tra xem profileData đã có dữ liệu hay chưa
  if (profileData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profileData.map((profile, index) => (
        <View key={profile._id} style={styles.profileContainer}>
          <Image
            style={styles.circle}
            source={{
              uri: profile.avatar || "https://reactnative.dev/img/tiny_logo.png", // Sử dụng ảnh từ API
            }}
          />
          <Text style={styles.name}>{profile.name}</Text>

          <View style={styles.frame}>
            <Text style={styles.maintext}>{profile.name}</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.maintext}>{profile.email}</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.maintext}>{profile.sdt}</Text>
          </View>
          <View style={styles.frame}>
            <Text style={styles.maintext}>{profile.add}</Text>
          </View>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("Edit button pressed");
            navigation.navigate("EditProfile"
              ,{
                name:"EditProfile",
                data: profileData
              }
            );
          }}
          style={styles.actionButtonEdit}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Save button pressed");
            // Xử lý lưu ở đây
          }}
          style={styles.actionButtonSave}
        >
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f7fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    marginBottom: 20, // Khoảng cách giữa các profile
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    marginTop: -10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Roboto",
  },
  frame: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    justifyContent: "center",
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  actionButtonEdit: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#a0c4ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginHorizontal: 5,
  },
  actionButtonSave: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#b7e4c7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
