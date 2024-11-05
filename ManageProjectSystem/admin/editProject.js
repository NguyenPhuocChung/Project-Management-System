import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  editProjectById,
  fetchProjectById,
  getAllAccounts,
} from "../api/apiservice";

const EditProject = ({ route, navigation }) => {
  const { item } = route.params; // Get projectId from props
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [invite, setInvite] = useState("");
  const [labels, setLabels] = useState("");
  const [status, setStatus] = useState("");
  const [invitePeople, setInvitePeople] = useState([]);
  const [isFocus_invite, setIsFocus_invite] = useState(false);
  const [isFocus_labels, setIsFocus_labels] = useState(false);
  const id = item._id;

  // Load project data from API
  const loadProject = async () => {
    try {
      const data = await fetchProjectById(id);
      setProject(data);
      setTitle(data.title);
      setDescription(data.description);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
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

  const handleUpdate = async () => {
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !invite ||
      !labels ||
      !status
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const updatedProject = {
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      invite,
      labels,
      status,
      createdBy: project?.createdBy,
    };

    try {
      await editProjectById(id, updatedProject);
      Alert.alert("Success", "Project updated successfully!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || startDate;
      setShowStartDatePicker(false);
      setStartDate(currentDate);
      if (event.nativeEvent.timestamp) setShowStartTimePicker(true);
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || startDate;
      setShowStartTimePicker(false);
      const newDate = new Date(startDate);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      setStartDate(newDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || endDate;
      if (currentDate >= startDate) {
        setShowEndDatePicker(false);
        setEndDate(currentDate);
        if (event.nativeEvent.timestamp) setShowEndTimePicker(true);
      } else {
        Alert.alert("Error", "End date must be after or equal to start date");
      }
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || endDate;
      setShowEndTimePicker(false);
      const newDate = new Date(endDate);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      setEndDate(newDate);
    }
  };

  const getAccount = async () => {
    try {
      const response = await getAllAccounts();
      if (Array.isArray(response)) {
        const data = response.map((account) => ({
          label: account.fullName || "Not updated profile",
          value: account._id,
        }));
        setInvitePeople(data);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  if (!project) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const Labels = [
    { label: "Hard", value: "hard" },
    { label: "Medium", value: "medium" },
    { label: "Easy", value: "easy" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView>
        <Text style={styles.headerText}>Edit Project</Text>
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
          style={[styles.input, styles.textArea]}
          multiline
        />
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.buttonText}>Select Start Date</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}
          {showStartTimePicker && (
            <DateTimePicker
              value={startDate}
              mode="time"
              display="default"
              onChange={onChangeStartTime}
            />
          )}
          <Text style={styles.dateText}>
            Start Date: {startDate.toLocaleDateString()}{" "}
            {startDate.toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.buttonText}>Select End Date</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
          {showEndTimePicker && (
            <DateTimePicker
              value={endDate}
              mode="time"
              display="default"
              onChange={onChangeEndTime}
            />
          )}
          <Text style={styles.dateText}>
            End Date: {endDate.toLocaleDateString()}{" "}
            {endDate.toLocaleTimeString()}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Invite</Text>
          <Dropdown
            style={[styles.dropdown, isFocus_invite && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={invitePeople}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus_invite ? "Invite" : "..."}
            searchPlaceholder="Search..."
            value={invite}
            onFocus={() => setIsFocus_invite(true)}
            onBlur={() => setIsFocus_invite(false)}
            onChange={(item) => {
              setInvite(item.value);
              setIsFocus_invite(false);
            }}
            renderLeftIcon={() => (
              <Image
                source={require("../img/invite.png")}
                style={{ marginRight: 10, width: 12.67, height: 14 }}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Labels</Text>
          <Dropdown
            style={[styles.dropdown, isFocus_labels && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Labels}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus_labels ? "Labels" : "..."}
            searchPlaceholder="Search..."
            value={labels}
            onFocus={() => setIsFocus_labels(true)}
            onBlur={() => setIsFocus_labels(false)}
            onChange={(item) => {
              setLabels(item.value);
              setIsFocus_labels(false);
            }}
            renderLeftIcon={() => (
              <Image
                source={require("../img/tag.png")}
                style={{ marginRight: 10, width: 12.67, height: 14 }}
              />
            )}
          />
        </View>
        <TouchableOpacity onPress={handleUpdate} style={styles.submitButton}>
          <Text style={styles.buttonText}>Update Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  placeholderStyle: {
    color: "#888",
  },
  selectedTextStyle: {
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 12,
    height: 12,
  },
});

export default EditProject;
