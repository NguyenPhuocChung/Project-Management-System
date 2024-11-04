import DateTimePicker from "@react-native-community/datetimepicker"; // Import datetimepicker
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../CSS/ManageTask"; // Chỉnh sửa đường dẫn nếu cần
import { editProjectById, fetchProjectById } from "../api/projectService"; // API để cập nhật và lấy thông tin dự án

const EditProject = ({ route, navigation }) => {
  const { item } = route.params; // Nhận projectId từ props
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // Thay đổi để lưu trữ ngày
  const [endDate, setEndDate] = useState(new Date()); // Thay đổi để lưu trữ ngày
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Trạng thái cho picker ngày bắt đầu
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // Trạng thái cho picker ngày kết thúc
  const [invite, setInvite] = useState("");
  const [labels, setLabels] = useState("");
  const [status, setStatus] = useState("");
  const id = item._id;

  // Hàm để tải thông tin dự án từ API
  const loadProject = async () => {
    try {
      const data = await fetchProjectById(id);
      setProject(data);
      setTitle(data.title);
      setDescription(data.description);
      setStartDate(new Date(data.startDate)); // Chuyển đổi dữ liệu thành đối tượng Date
      setEndDate(new Date(data.endDate)); // Chuyển đổi dữ liệu thành đối tượng Date
      setInvite(data.invite);
      setLabels(data.labels);
      setStatus(data.status);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  // Hàm để cập nhật dự án
  const handleUpdate = async () => {
    const updatedProject = {
      title,
      description,
      startDate: startDate.toISOString(), // Chuyển đổi thành chuỗi
      endDate: endDate.toISOString(), // Chuyển đổi thành chuỗi
      invite,
      labels,
      status,
      createdBy: project?.createdBy, // Nếu có thông tin này trong đối tượng dự án
    };

    try {
      await editProjectById(id, updatedProject);
      Alert.alert("Success", "Project updated successfully!");
      navigation.goBack(); // Quay lại trang trước
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  if (!project) {
    return <Text>Loading...</Text>; // Hiển thị khi vẫn đang tải dự án
  }

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <StatusBar />
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Project</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <View>
        <Button
          onPress={() => setShowStartDatePicker(true)}
          title="Select Start Date"
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}
        <Text>Start Date: {startDate.toLocaleDateString()}</Text>
      </View>
      <View>
        <Button
          onPress={() => setShowEndDatePicker(true)}
          title="Select End Date"
        />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}
        <Text>End Date: {endDate.toLocaleDateString()}</Text>
      </View>
      <TextInput
        placeholder="Invite"
        value={invite}
        onChangeText={setInvite}
        style={styles.input}
      />
      <TextInput
        placeholder="Labels"
        value={labels}
        onChangeText={setLabels}
        style={styles.input}
      />
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <Button title="Update Project" onPress={handleUpdate} />
    </SafeAreaView>
  );
};

export default EditProject;
