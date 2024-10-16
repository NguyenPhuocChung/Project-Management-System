import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const EditProfile = () => {
  const use = useRoute();
  const { data } = use.params;
  console.log("chung", data);
  const [profileData, setProfileData] = useState(data); // Khởi tạo state là một mảng rỗng
  console.log("chungaaaaaaa", profileData);

  const navigation = useNavigation();
  const [formData, setFormData] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editedSkill, setEditedSkill] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Hàm thêm kỹ năng
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  // Bắt đầu chỉnh sửa kỹ năng
  const startEditing = (index) => {
    setEditingSkill(index);
    setEditedSkill(skills[index]);
  };

  // Cập nhật kỹ năng
  const updateSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = editedSkill;
    setSkills(updatedSkills);
    setEditingSkill(null);
    setEditedSkill("");
  };

  // Xóa kỹ năng
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Hàm xử lý thay đổi input
  const handleInputChange = (name, value) => {
    if (name === "phone") {
      const phoneRegex = /^0\d{0,9}$/; // Regex để kiểm tra định dạng số điện thoại
      if (value !== "" && !phoneRegex.test(value)) {
        console.log("Invalid phone number");
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý thay đổi ngày
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, birthDate: selectedDate });
    }
  };

  // Định dạng ngày
  // const formatDate = (date) => {
  //   if (!date) return "-- / -- / ----";
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  // Hàm xử lý khi lưu thông tin
  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex kiểm tra định dạng email
    if (!emailRegex.test(formData.email)) {
      console.log("Invalid email format");
      return;
    }

    console.log({ ...formData, skills });

      axios
        .put("http://192.168.100.71:3000/api/profiles/")

        .then((response) => {
          console.log("Success:", response.data);

        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profileData.map((profile, index) => (
        <View key={index}>
          {/* Thêm View để bọc các phần tử con */}
          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7}>
            <Text style={styles.uploadButtonText}>Upload Avatar</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Nguyen Phuoc Chung"
            value={profile.name}
            onChangeText={setN}
            style={styles.input}
          />
          <TextInput
            placeholder="Chungne@gmail.com"
            value={profile.email}
            onChangeText={(text) => handleInputChange("email", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="0987654321"
            value={profile.sdt}
            onChangeText={(text) => handleInputChange("phone", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Ca Mau"
            value={profile.add}
            onChangeText={(text) => handleInputChange("address", text)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
            activeOpacity={0.7}
          >
            <Text style={styles.dateButtonText}>{profile.birth}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={profile.birthDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Picker selectedValue={profile.position} style={styles.picker}>
            <Picker.Item
              label={
                profile.position === "member"
                  ? "Member"
                  : profile.position === "leader"
                  ? "Leader"
                  : "Manage"
              }
              value=""
            />

            <Picker.Item label="Member" value="Member" />
            <Picker.Item label="Leader" value="Leader" />
            <Picker.Item label="Manage" value="Manage" />
          </Picker>
          <TextInput
            placeholder="0962030297"
            value={profile.cccd}
            onChangeText={(text) => handleInputChange("nationalId", text)}
            style={styles.input}
          />
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsHeaderText}>Skills</Text>
            <View style={styles.skillList}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillCard}>
                  <Text style={styles.skillText}>{skill}</Text>
                  <View style={styles.skillActions}>
                    {editingSkill === index ? (
                      <>
                        <TextInput
                          value={editedSkill}
                          onChangeText={(text) => setEditedSkill(text)}
                          style={styles.editInput}
                        />
                        <TouchableOpacity
                          onPress={() => updateSkill(index)}
                          style={[styles.actionButton, styles.editButton]}
                        >
                          <Text style={styles.actionButtonText}>Save</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => startEditing(index)}
                          style={[styles.actionButton, styles.editButton]}
                        >
                          <Text style={styles.actionButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteSkill(index)}
                          style={[styles.actionButton, styles.deleteButton]}
                        >
                          <Text style={styles.actionButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.addSkillContainer}>
              <TextInput
                placeholder="Add a skill"
                value={newSkill}
                onChangeText={setNewSkill}
                style={styles.addSkillInput}
              />
              <TouchableOpacity
                onPress={addSkill}
                style={[styles.actionButton, styles.addButton]}
              >
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              handleSubmit;
              console.log("Save button pressed");
              navigation.navigate("Profile", {
                name: "Profile",
                data: profileData,
              });
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dateButton: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  skillList: {
    marginBottom: 15,
  },
  skillCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 16,
  },
  skillActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#28a745",
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  addSkillContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addSkillInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  actionButtonText: {
    color: "#fff",
  },
});

export default EditProfile;
