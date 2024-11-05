import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CalenderingStyle from "../CSS/Calendering";
import GenerateStyles from "../CSS/Generate";
import styles from "../CSS/ManageTask";
import { fetchCalendarData } from "../api/calendarService";
import URL from "../midleware/authMidleware";

const Calendaring = ({ navigation }) => {
  const today = new Date();
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [refreshing, setRefreshing] = useState(false);
  const [calendarGetDate, setcalendarGetDate] = useState([]);
  const route = useRoute();
  const { calendar } = route.params;

  const onRefresh = async () => {
    setRefreshing(true);
    await getDataFromDate();
    setRefreshing(false);
  };

  const linkGoogleMeet = () => {
    const url = "https://meet.google.com/zks-kogz-afi";
    Linking.openURL(url);
  };

  const getDayOfWeek = (day) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[day];
  };

  const generateWeekDates = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        day: getDayOfWeek(date.getDay()),
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
      });
    }
    return dates;
  };

  const dates = generateWeekDates(currentWeekStart);

  const handleDateChange = (event, date) => {
    if (event.type === "set" && date) {
      setShowDatePicker(false);
      setCurrentWeekStart(date);
      const todayIndex = generateWeekDates(date).findIndex((d) => d.isToday);
      setSelectedDateIndex(todayIndex);
      setSelectedDate(date);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDatePress = (index) => {
    setSelectedDateIndex(index);
    const date = dates[index];
    const newDate = new Date(today.getFullYear(), today.getMonth(), date.date);
    setSelectedDate(newDate);
    getDataFromDate();
  };

  const handleTodayPress = () => {
    setCurrentWeekStart(today);
    const todayIndex = dates.findIndex((date) => date.isToday);
    setSelectedDateIndex(todayIndex);
    setSelectedDate(today);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  const getDataFromDate = async () => {
    try {
      const calendarData = await fetchCalendarData(selectedDate);
      setcalendarGetDate(calendarData);
    } catch (error) {
      console.log("Error fetching calendar data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDataFromDate(); // Refresh data when the screen is focused
    }, [selectedDate])
  );

  useEffect(() => {
    getDataFromDate();
  }, [selectedDate]);

  const loadMoreData = () => {
    console.log("Loading more data...");
  };

  const renderItem = ({ item }) => {
    const startTime = item.startTime ? new Date(item.startTime) : null;
    const endTime = item.endTime ? new Date(item.endTime) : null;

    const startTimeChanged = startTime ? startTime.toLocaleTimeString() : "N/A";
    const endTimeChanged = endTime ? endTime.toLocaleTimeString() : "N/A";

    return (
      <View style={[GenerateStyles.d_flex, GenerateStyles.marginVertical]}>
        <Text
          style={[
            GenerateStyles.backGroundblue,
            GenerateStyles.witdhTime,
            GenerateStyles.sizeDescription,
            GenerateStyles.bold,
          ]}
        >
          {startTimeChanged}
        </Text>

        <View
          style={[
            GenerateStyles.backGroundred,
            GenerateStyles.witdhMeeting,
            GenerateStyles.padding,
            CalenderingStyle.box,
            GenerateStyles.positions,
          ]}
        >
          <View style={[styles.d_flex, GenerateStyles.absolute]}>
            <Text
              style={[GenerateStyles.sizeSubtext, GenerateStyles.colorTime]}
            >
              {startTimeChanged}
            </Text>
            <Image source={require("../img/arrow-right.png")} />
            <Text
              style={[GenerateStyles.sizeSubtext, GenerateStyles.colorTime]}
            >
              {endTimeChanged}
            </Text>
          </View>

          <Text style={[GenerateStyles.sizeTitles, GenerateStyles.color]}>
            {item.title}
          </Text>

          <Text
            style={[
              GenerateStyles.italic,
              GenerateStyles.sizeDescription,
              GenerateStyles.color,
            ]}
            ellipsizeMode="tail"
            onPress={() =>
              navigation.navigate("DetailMeeting", {
                name: "DetailMeeting",
                meeting: item,
                startTime: startTimeChanged,
                endTime: endTimeChanged,
              })
            }
          >
            {item.description}
          </Text>

          <TouchableOpacity
            style={[
              CalenderingStyle.buttonMeeting,
              styles.d_flex,
              GenerateStyles.marginVertical,
            ]}
            onPress={linkGoogleMeet}
          >
            <Image
              style={[
                CalenderingStyle.img_googleMeet,
                GenerateStyles.marginRight,
              ]}
              source={require("../img/googlemeet.png")}
            />
            <Text
              style={[
                GenerateStyles.text_color_blue,
                CalenderingStyle.colorWhite,
              ]}
            >
              {item.link}
            </Text>
          </TouchableOpacity>

          <View style={[GenerateStyles.d_flex, GenerateStyles.justify_between]}>
            <View style={GenerateStyles.d_flex_align_center}>
              {item.createrBy?.avatar ? (
                <Image
                  source={{
                    uri: `http://${URL.BASE_URL}:5000/${item.createrBy.avatar}`,
                  }}
                  style={{ width: 25, height: 25, borderRadius: 50 }} // Add styles to match your design
                />
              ) : (
                <Image
                  source={require("../assets/images.png")}
                  style={{ width: 25, height: 25, borderRadius: 50 }} // Add styles to match your design
                />
              )}

              <Text
                style={[
                  GenerateStyles.sizeSubtext,
                  GenerateStyles.colorTime,
                  GenerateStyles.marginHorizonal,
                ]}
              >
                {item.createrBy.fullName || "Null"}
              </Text>
            </View>
            <View style={GenerateStyles.d_flex_align_center}>
              <Text
                style={
                  item.status === "online"
                    ? GenerateStyles.red
                    : GenerateStyles.green
                }
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={[
          CalenderingStyle.headerContainer,
          GenerateStyles.d_flex_align_center,
          GenerateStyles.justify_around,
        ]}
      >
        <View style={GenerateStyles.d_flex_align_center}>
          <Text style={CalenderingStyle.dateText}>
            {selectedDate.getDate()}
          </Text>
          <View style={GenerateStyles.marginHorizonal}>
            <Text style={CalenderingStyle.dayText}>
              {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}
            </Text>
            <Text style={CalenderingStyle.monthText}>
              {selectedDate.toLocaleString("default", { month: "long" })}{" "}
              {selectedDate.getFullYear()}
            </Text>
          </View>
        </View>

        <View style={CalenderingStyle.buttonContainer}>
          <TouchableOpacity style={CalenderingStyle.addButton}>
            <Pressable
              style={CalenderingStyle.addButton}
              onPress={() => {
                navigation.navigate("AddEvent", {
                  name: "AddEvent",
                  startDate: selectedDate,
                });
              }}
            >
              <Text
                style={[GenerateStyles.textCenter, GenerateStyles.textWhite]}
              >
                Add Event
              </Text>
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity
            style={CalenderingStyle.todayButton}
            onPress={handleTodayPress}
          >
            <Text style={CalenderingStyle.buttonTextToday}>Today</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={CalenderingStyle.selectDateButton}
      >
        <Text style={CalenderingStyle.buttonTextSelectDate}>Choose Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={[GenerateStyles.horizol_line_traight]}></Text>

      <View
        style={[
          GenerateStyles.d_flex_align_center,
          GenerateStyles.justify_between,
          GenerateStyles.marginHorizonal,
          GenerateStyles.marginVertical,
        ]}
      >
        <TouchableOpacity onPress={handlePreviousWeek}>
          <View>
            <Image source={require("../img/chevron-left.png")} />
          </View>
        </TouchableOpacity>

        {dates.map((date, index) => (
          <TouchableOpacity key={index} onPress={() => handleDatePress(index)}>
            <View
              style={{
                backgroundColor:
                  selectedDateIndex === index
                    ? "green"
                    : selectedDate.getDate() === date.date &&
                      selectedDate.getMonth() ===
                        new Date(currentWeekStart).getMonth() &&
                      selectedDate.getFullYear() ===
                        new Date(currentWeekStart).getFullYear()
                    ? "green"
                    : date.isToday
                    ? "blue"
                    : "black",
                padding: 10,
                margin: 5,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{date.day}</Text>
              <Text style={{ color: "white" }}>{date.date}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleNextWeek}>
          <View>
            <Image source={require("../img/chevron-right.png")} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[GenerateStyles.horizol_line_traight]}></Text>

      <View style={GenerateStyles.backGroundWhite}>
        <View style={[styles.d_flex, GenerateStyles.marginVertical]}>
          <Text
            style={[
              GenerateStyles.witdhTime,
              CalenderingStyle.colorTime,
              GenerateStyles.marginRight,
            ]}
          >
            Time
          </Text>
          <Text style={[GenerateStyles.witdhMeeting]}>Meeting</Text>
        </View>
      </View>

      <FlatList
        data={calendarGetDate}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={{ marginBottom: 410 }}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View>
            <Text style={[GenerateStyles.textCenter]}>
              <Icon name="calendar-times-o" size={100} color="#FF0000" />
            </Text>
            <Text
              style={[
                GenerateStyles.bold,
                GenerateStyles.textCenter,
                GenerateStyles.marginVertical,
              ]}
            >
              No meetings!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Calendaring;
