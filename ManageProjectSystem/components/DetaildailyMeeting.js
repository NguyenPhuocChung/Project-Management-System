import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import DetailDailyMeetingStyles from "../CSS/DetaildailyMeeting";
import GenerateStyles from "../CSS/Generate";
import { deleteCalendarData, updateCalendarData } from "../api/calendarService";

const DetailDailyMeeting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { meeting, startTime, endTime } = route.params;

  const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());

  const [startDate, setStartDate] = useState(
    isValidDate(startTime) ? new Date(startTime) : new Date()
  );
  const [endDate, setEndDate] = useState(
    isValidDate(endTime) ? new Date(endTime) : new Date()
  );

  const [updatedTitle, setUpdatedTitle] = useState(meeting.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    meeting.description
  );
  const [updatedLink, setUpdatedLink] = useState(meeting.link);
  const [updatedStatus, setUpdatedStatus] = useState(meeting.status);

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleLinkPress = () => {
    Linking.openURL(updatedLink);
  };

  const deleteCalendaring = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this meeting?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await deleteCalendarData(id);
              console.log("Calendaring deleted successfully", response.data);
              Alert.alert("Success", "Deleted successfully!");
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting calendaring:", error.message);
              Alert.alert("Error", "Failed to delete calendaring.");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const updateCalendaring = async (id) => {
    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
      link: updatedLink,
      status: updatedStatus,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };
    try {
      const response = await updateCalendarData(id, updatedData);
      console.log("Calendaring updated successfully", response.data);
      Alert.alert("Success", "Updated successfully!");
    } catch (error) {
      console.error("Error updating calendaring:", error.message);
      Alert.alert("Error", "Failed to update calendaring.");
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartDate(selectedTime);
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndDate(selectedTime);
    }
  };

  // Kiểm tra vai trò của người tạo
  const isCreator = meeting.createrBy.role === "creator_role"; // Thay 'creator_role' bằng giá trị đúng

  return (
    <ScrollView style={[DetailDailyMeetingStyles.container, { gap: 10 }]}>
      <TextInput
        style={[
          DetailDailyMeetingStyles.input,
          GenerateStyles.marginVertical,
          DetailDailyMeetingStyles.font_size_title,
        ]}
        placeholder="Update Title"
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
      />
      <TextInput
        style={[
          DetailDailyMeetingStyles.input,
          GenerateStyles.marginVertical,
          DetailDailyMeetingStyles.font_size_description,
        ]}
        placeholder="Update Description"
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        multiline
      />

      {/* Start Time Picker */}
      <View style={[GenerateStyles.box_time]}>
        <Text style={[GenerateStyles.bold]}>Start Time</Text>
        <TouchableOpacity
          onPress={() => setShowStartTimePicker(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#CDCDE6",
            borderRadius: 5,
            paddingVertical: 5,
            width: 200,
          }}
        >
          <Text style={{ marginLeft: 10 }}>
            {startDate.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            testID="startTimePicker"
            value={startDate}
            mode="time"
            display="default"
            onChange={onChangeStartTime}
          />
        )}
      </View>

      {/* End Time Picker */}
      <View style={[GenerateStyles.box_time]}>
        <Text style={[GenerateStyles.bold]}>End Time</Text>
        <TouchableOpacity
          onPress={() => setShowEndTimePicker(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#CDCDE6",
            borderRadius: 5,
            paddingVertical: 5,
            width: 200,
          }}
        >
          <Text style={{ marginLeft: 10 }}>{endDate.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            testID="endTimePicker"
            value={endDate}
            mode="time"
            display="default"
            onChange={onChangeEndTime}
          />
        )}
      </View>

      {/* Các trường thông tin khác */}
      <View style={GenerateStyles.d_flex_align_center}>
        <View
          style={[
            GenerateStyles.d_flex_align_center,
            DetailDailyMeetingStyles.width,
          ]}
        >
          <Feather name="link" size={24} style={GenerateStyles.marginRight} />
          <Text>Link</Text>
        </View>
        <TextInput
          style={[
            DetailDailyMeetingStyles.input,
            GenerateStyles.marginVertical,
          ]}
          placeholder="Update Link"
          value={updatedLink}
          onChangeText={setUpdatedLink}
        />
      </View>

      {/* Button Update & Delete */}
      {isCreator && ( // Chỉ hiển thị nút nếu người dùng là người tạo
        <View
          style={[
            GenerateStyles.d_flex_align_center,
            GenerateStyles.marginVertical,
            GenerateStyles.justify_between,
            { gap: 10 },
          ]}
        >
          <TouchableOpacity
            onPress={() => updateCalendaring(meeting._id)}
            style={[GenerateStyles.box_status_done, GenerateStyles.box]}
          >
            <Text style={[GenerateStyles.color_done]}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteCalendaring(meeting._id)}
            style={[
              GenerateStyles.box_status_cancle,
              GenerateStyles.box,
              GenerateStyles.marginRight,
            ]}
          >
            <Text style={[GenerateStyles.color_cancle]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailDailyMeeting;
