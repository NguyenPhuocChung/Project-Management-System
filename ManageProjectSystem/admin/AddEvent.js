import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { addEvent } from "../api/apiservice";
import AddEventStyles from "../CSS/AddEvent";
import GenerateStyles from "../CSS/Generate";

const AddEvent = ({ navigation }) => {
  const statusOnOF = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];

  const route = useRoute();
  const { startDate } = route.params;
  const initialStartDate = startDate ? new Date(startDate) : new Date();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [startDateObject, setStartDateObject] = useState(initialStartDate);
  const [endDateObject, setEndDateObject] = useState(initialStartDate);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [link, setLink] = useState("");
  const [status, setStatusValue] = useState(null);

  const loadData = async () => {
    try {
      const idUser = await AsyncStorage.getItem("userId");
      if (idUser) {
        setId(idUser);
      } else {
        Alert.alert("User ID is not available");
      }
    } catch (error) {
      Alert.alert("Error fetching user ID from AsyncStorage");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleAddEvent = async () => {
    if (
      !title ||
      !description ||
      !link ||
      !status ||
      !startDateObject ||
      !endDateObject
    ) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }
    const createrBy = id;
    const data = {
      title,
      description,
      startDate: startDateObject.toISOString(),
      endDate: endDateObject.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      link,
      status,
      createrBy,
    };
    try {
      const response = await addEvent(data);
      Alert.alert("Event added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error adding event");
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (event.type === "set" && selectedDate) {
      setStartDateObject(selectedDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (event.type === "set" && selectedDate) {
      if (selectedDate >= startDateObject) {
        setEndDateObject(selectedDate);
      } else {
        Alert.alert(
          "Validation Error",
          "End date must be after or equal to the start date"
        );
      }
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (event.type === "set" && selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const newEndTime = new Date(
        endDateObject.setHours(
          selectedTime.getHours(),
          selectedTime.getMinutes()
        )
      );
      if (newEndTime >= startDateObject) {
        setEndTime(newEndTime);
      } else {
        Alert.alert(
          "Validation Error",
          "End time must be after or equal to the start time on the same day"
        );
      }
    }
  };

  const duration = Math.abs(endTime - startTime);
  const durationInMinutes = Math.floor(duration / (1000 * 60));
  const durationInHours = Math.floor(durationInMinutes / 60);
  const remainingMinutes = durationInMinutes % 60;

  return (
    <View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={AddEventStyles.title}>Event</Text>

        <TextInput
          style={[AddEventStyles.inputTittle, GenerateStyles.marginVertical]}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={AddEventStyles.inputDescription}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <View style={[GenerateStyles.box, GenerateStyles.marginVertical]}>
          <View>
            <Text style={GenerateStyles.bold}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={GenerateStyles.dateInput}
                value={startDateObject.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDateObject}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
              />
            )}
          </View>

          <View>
            <Text style={GenerateStyles.bold}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={GenerateStyles.dateInput}
                value={endDateObject.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDateObject}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
              />
            )}
          </View>
        </View>

        <View style={[GenerateStyles.box, GenerateStyles.marginVertical]}>
          <View>
            <Text style={GenerateStyles.bold}>Start Time</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <TextInput
                style={GenerateStyles.dateInput}
                value={startTime.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={onChangeStartTime}
              />
            )}
          </View>

          <View>
            <Text style={GenerateStyles.bold}>End Time</Text>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <TextInput
                style={GenerateStyles.dateInput}
                value={endTime.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={onChangeEndTime}
              />
            )}
          </View>
        </View>

        <Text style={GenerateStyles.textCenter}>
          {`${durationInHours} giờ ${remainingMinutes} phút`}
        </Text>

        <TextInput
          style={[GenerateStyles.box_create, GenerateStyles.marginVertical]}
          placeholder="Link"
          value={link}
          onChangeText={setLink}
        />

        <Dropdown
          style={AddEventStyles.dropdown}
          placeholderStyle={AddEventStyles.placeholderStyle}
          selectedTextStyle={AddEventStyles.selectedTextStyle}
          inputSearchStyle={AddEventStyles.inputSearchStyle}
          iconStyle={AddEventStyles.iconStyle}
          data={statusOnOF}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={status}
          onChange={(item) => {
            if (item && item.value) {
              setStatusValue(item.value); // Đảm bảo cập nhật trạng thái đúng
            } else {
              console.error("Invalid item or item value is undefined");
            }
          }}
          renderRightIcon={() => (
            <Image source={require("../img/loader.png")} />
          )}
        />

        <TouchableOpacity
          onPress={handleAddEvent}
          style={AddEventStyles.addButton}
        >
          <Text style={AddEventStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Logic to close the modal
          }}
          style={AddEventStyles.closeButton}
        >
          <Text style={AddEventStyles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEvent;
