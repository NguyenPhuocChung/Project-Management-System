import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getAllAccounts } from "../api/accountService"; // Ensure this import exists
import { editTaskById, fetchTaskById } from "../api/apiservice"; // API service for fetching and updating task details
import GenerateStyles from "../CSS/Generate";

const EditTask = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const taskId = item._id;

  const [taskTitle, setTaskTitle] = useState("");
  const [invitePeople, setInvitePeople] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocusInvite, setIsFocusInvite] = useState(false);
  const [invite, setInvite] = useState(null);

  const renderInvite = () => (
    <Text
      style={[
        styles.label,
        GenerateStyles.bold,
        isFocusInvite && { color: "blue" },
      ]}
    >
      Invite
    </Text>
  );

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDetails = await fetchTaskById(taskId);
        setTaskTitle(taskDetails.title);
        setTaskDescription(taskDetails.description);
        setStartDate(new Date(taskDetails.startDate));
        setEndDate(new Date(taskDetails.endDate));
        setStatus(taskDetails.status);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const getAccount = async () => {
    try {
      const response = await getAllAccounts();
      console.log(response);

      if (Array.isArray(response)) {
        const data = response.map((account) => ({
          label:
            account.fullName + ` (${account.role})` || "Not update profile",
          value: account._id,
        }));
        setInvitePeople(data);
      } else {
        console.error("Unexpected response format:", response);
        setError("Failed to load accounts");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Error fetching accounts");
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const handleUpdateTask = async () => {
    try {
      const updatedTask = {
        title: taskTitle,
        description: taskDescription,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status,
      };
      await editTaskById(taskId, updatedTask);
      Alert.alert("Success", "Task updated successfully!");
      navigation.goBack();
    } catch (err) {
      setError(err.message);
      Alert.alert("Error", "Failed to update task.");
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholder="Enter task title"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={taskDescription}
              onChangeText={setTaskDescription}
              placeholder="Enter task description"
              multiline
            />

            <Button
              title="Select Start Date"
              onPress={() => setShowStartPicker(true)}
            />
            <Text>{startDate.toLocaleDateString()}</Text>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
              />
            )}

            <Button
              title="Select End Date"
              onPress={() => setShowEndPicker(true)}
            />
            <Text>{endDate.toLocaleDateString()}</Text>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
              />
            )}

            <View>
              {renderInvite()}
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusInvite && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={invitePeople}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusInvite ? "Invite" : "..."}
                searchPlaceholder="Search..."
                value={invite}
                onFocus={() => setIsFocusInvite(true)}
                onBlur={() => setIsFocusInvite(false)}
                onChange={(item) => {
                  setInvite(item.value);
                  setIsFocusInvite(false);
                }}
                renderLeftIcon={() => (
                  <Image
                    source={require("../img/invite.png")}
                    style={{ width: 12.67, height: 14 }}
                  />
                )}
              />
            </View>
            <Text style={styles.label}>Status</Text>
            <TextInput
              style={styles.input}
              value={status}
              onChangeText={setStatus}
              placeholder="Enter task status"
            />
            <Button title="Update Task" onPress={handleUpdateTask} />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  scrollView: {
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    color: "#999",
  },
  selectedTextStyle: {
    color: "#333",
  },
  inputSearchStyle: {
    color: "#000",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default EditTask;
