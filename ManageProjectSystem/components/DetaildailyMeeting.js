import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { deleteCalendarData, updateCalendarData } from "../api/calendarService";

const DetailMeeting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { meeting } = route.params;

  const [updatedTitle, setUpdatedTitle] = useState(meeting.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    meeting.description
  );
  const [updatedLink, setUpdatedLink] = useState(meeting.link);
  const [updatedStatus, setUpdatedStatus] = useState(
    meeting.status || "Online"
  );
  const [startDate, setStartDate] = useState(
    new Date(meeting.startDate || new Date())
  );
  const [endDate, setEndDate] = useState(
    new Date(meeting.endDate || new Date())
  );
  const [startTime, setStartTime] = useState(
    new Date(meeting.startTime || new Date())
  );
  const [endTime, setEndTime] = useState(
    new Date(meeting.endTime || new Date())
  );

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) setStartTime(selectedTime);
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) setEndTime(selectedTime);
  };

  const handleUpdate = async () => {
    if (
      !updatedTitle.trim() ||
      !updatedDescription.trim() ||
      !updatedLink.trim() ||
      !updatedStatus
    ) {
      Alert.alert("Validation Error", "All fields must be filled out.");
      return;
    }

    const startDateTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const endDateTime = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );

    if (startDateTime >= endDateTime) {
      Alert.alert(
        "Date Error",
        "The start date and time must be before the end date and time."
      );
      return;
    }

    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
      link: updatedLink,
      status: updatedStatus,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    };

    try {
      const response = await updateCalendarData(meeting._id, updatedData);
      Alert.alert("Success", "Updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating calendaring:", error.message);
      Alert.alert("Error", "Failed to update calendaring.");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this meeting?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCalendarData(meeting._id);
              Alert.alert("Success", "Deleted successfully!");
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting calendaring:", error.message);
              Alert.alert("Error", "Failed to delete calendaring.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meeting Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Update Title"
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Update Description"
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Update Link"
        value={updatedLink}
        onChangeText={setUpdatedLink}
      />

      {/* Date and Time Pickers for Start */}
      <TouchableOpacity
        onPress={() => setShowStartDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          Start Date: {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      <TouchableOpacity
        onPress={() => setShowStartTimePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          Start Time:{" "}
          {startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={onChangeStartTime}
        />
      )}

      {/* Date and Time Pickers for End */}
      <TouchableOpacity
        onPress={() => setShowEndDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          End Date: {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      <TouchableOpacity
        onPress={() => setShowEndTimePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>
          End Time:{" "}
          {endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={onChangeEndTime}
        />
      )}

      {/* Buttons */}
      <TouchableOpacity onPress={handleUpdate} style={styles.buttonUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  textArea: { height: 100 },
  datePicker: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  dateText: { color: "#333" },
  buttonUpdate: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDelete: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DetailMeeting;
