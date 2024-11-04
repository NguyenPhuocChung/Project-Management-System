import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { addEvent } from "../api/apiservice"; // Import your API functions

import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AddEventStyles from "../CSS/AddEvent";
import GenerateStyles from "../CSS/Generate";

const AddEvent = () => {
  // const data = [
  //   { label: "Item 1", value: "1" },
  //   { label: "Item 2", value: "2" },
  //   { label: "Item 3", value: "3" },
  //   { label: "Item 4", value: "4" },
  //   { label: "Item 5", value: "5" },
  //   { label: "Item 6", value: "6" },
  //   { label: "Item 7", value: "7" },
  //   { label: "Item 8", value: "8" },
  // ];

  // const Reminder = [
  //   { label: "1 minute", value: "1" },
  //   { label: "5 minutes", value: "5" },
  //   { label: "10 minutes", value: "10" },
  // ];

  const statusOnOF = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
  ];

  // Get data from the route
  const route = useRoute();
  const { startDate } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Date and Time States
  const [startDateObject, setStartDateObject] = useState(new Date(startDate));
  const [endDateObject, setEndDateObject] = useState(new Date(startDate));
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [link, setLink] = useState("");
  // const [participantsValue, setParticipantsValue] = useState(null);
  // const [reminderValue, setReminderValue] = useState(null);
  const [status, setStatusValue] = useState(null);

  const handleAddEvent = async () => {
    console.log("đã nhấn");
    const createrBy = "67120e2ba149e5e80befa0ca";
    const data = {
      title,
      description,
      startDate: startDateObject,
      endDate: endDateObject,
      startTime,
      endTime,
      link,
      status,
      createrBy,
    };
    console.log(data);
    try {
      const response = await addEvent(data);
      console.log(response);

      alert("Event added successfully");
    } catch {
      alert("Error adding event");
    }
  };
  // ////
  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    if (currentDate >= startDate && currentDate) {
      setShowEndDatePicker(false);
      console.log(endDate);
      console.log(startDate instanceof Date); // Kiểm tra xem startDate có phải là một đối tượng Date không
    } else {
      alert("End date must be after or equal to start date");
    }
  };
  const duration = Math.abs(endTime - startTime); // Chênh lệch thời gian tính bằng mili giây

  const durationInMinutes = Math.floor(duration / (1000 * 60)); // Chuyển đổi mili giây thành phút
  const durationInHours = Math.floor(durationInMinutes / 60); // Chuyển đổi phút thành giờ
  const remainingMinutes = durationInMinutes % 60; // Phần còn lại phút

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

        {/* Start Time Section */}
        <View style={[GenerateStyles.box, GenerateStyles.marginVertical]}>
          <View>
            <Text style={GenerateStyles.bold}>Start Date</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#CDCDE6",
                borderRadius: 5,
                paddingVertical: 5,
                borderWidth: 1,
                width: "auto",
              }}
            >
              <TextInput
                style={{
                  width: 90,
                  textAlign: "center",
                }}
                value={startDateObject.toLocaleDateString()}
                onFocus={() => setShowStartDatePicker(true)}
                editable={false}
              />
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDateObject}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    if (date) setStartDateObject(date);
                  }}
                />
              )}
              <Text
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: "#CDCDE6",
                }}
              ></Text>
              <View style={{ paddingLeft: 5 }}>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={String(startTime.getHours())}
                  onFocus={() => setShowStartTimePicker(true)}
                />
              </View>
              <View>
                <Text style={[{ paddingBottom: 3, textAlign: "center" }]}>
                  :
                </Text>
              </View>
              <View>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={String(startTime.getMinutes())}
                  onFocus={() => setShowStartTimePicker(true)}
                />
              </View>

              <View style={{ paddingRight: 5 }}>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={startTime.getHours() >= 12 ? "PM" : "AM"}
                  editable={false}
                />
              </View>

              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  onChange={(event, time) => {
                    setShowStartTimePicker(false);
                    if (time) setStartTime(time);
                  }}
                />
              )}
            </View>
          </View>

          {/* end time */}
          <View>
            <Text style={[GenerateStyles.bold]}>End Time</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#CDCDE6",
                borderRadius: 5,
                paddingVertical: 5,
                borderWidth: 1,
                width: "auto",
              }}
            >
              <View>
                <TextInput
                  style={{
                    width: 90,
                    textAlign: "center",
                  }}
                  value={startDateObject.toLocaleDateString()}
                  onFocus={() => setShowEndDatePicker(true)}
                />
                {showEndDatePicker && (
                  <DateTimePicker
                    testID="datePicker"
                    value={startDateObject}
                    mode="date"
                    display="default"
                  />
                )}
              </View>
              <Text
                style={{ width: 1, height: 20, backgroundColor: "#CDCDE6" }}
              ></Text>
              <View style={{ paddingLeft: 5 }}>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={String(endTime.getHours())}
                  onFocus={() => setShowEndTimePicker(true)}
                />
              </View>
              <View>
                <Text style={[{ paddingBottom: 3, textAlign: "center" }]}>
                  :
                </Text>
              </View>

              <View>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={String(endTime.getMinutes())}
                  onFocus={() => setShowEndTimePicker(true)}
                />
              </View>

              <View>
                <TextInput
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                  value={endTime.getHours() >= 12 ? "PM" : "AM"}
                  editable={false}
                />
              </View>
            </View>

            {showEndTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={endTime}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  setShowEndTimePicker(false);
                  if (time) setEndTime(time);
                }}
              />
            )}
          </View>
        </View>
        <Text
          style={GenerateStyles.textCenter}
        >{`${durationInHours} giờ ${remainingMinutes} phút`}</Text>
        <TextInput
          style={[GenerateStyles.box_create, GenerateStyles.marginVertical]}
          placeholder="link"
          onChangeText={setLink}
        ></TextInput>
        {/* Participants Dropdown */}
        {/* <Dropdown
          style={AddEventStyles.dropdown}
          placeholderStyle={AddEventStyles.placeholderStyle}
          selectedTextStyle={AddEventStyles.selectedTextStyle}
          inputSearchStyle={AddEventStyles.inputSearchStyle}
          iconStyle={AddEventStyles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Participants"
          value={participantsValue}
          onChange={(item) => setParticipantsValue(item.value)}
          renderRightIcon={() => (
            <Image source={require("../img/user-plus.png")} />
          )}
        /> */}

        {/* Reminder Dropdown */}
        {/* <Dropdown
          style={AddEventStyles.dropdown}
          placeholderStyle={AddEventStyles.placeholderStyle}
          selectedTextStyle={AddEventStyles.selectedTextStyle}
          inputSearchStyle={AddEventStyles.inputSearchStyle}
          iconStyle={AddEventStyles.iconStyle}
          data={Reminder}
          labelField="label"
          valueField="value"
          placeholder="Reminder"
          value={reminderValue}
          onChange={(item) => setReminderValue(item.value)}
          renderRightIcon={() => <Image source={require("../img/bell.png")} />}
        /> */}

        {/* Status Dropdown */}
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
          onChange={(item) => setStatusValue(item.value)}
          renderRightIcon={() => (
            <Image source={require("../img/loader.png")} />
          )}
        />

        {/* Add and Close Buttons */}
        <TouchableOpacity
          onPress={handleAddEvent}
          style={AddEventStyles.addButton}
        >
          <Text style={AddEventStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            /* Logic to close the modal */
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
