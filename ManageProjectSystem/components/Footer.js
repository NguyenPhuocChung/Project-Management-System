import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import FooterStyles from "../CSS/Footer";
import { fetchCalendarData } from "../api/calendarService"; // Import hàm fetchCalendarData

const Footer = () => {
  const [role, setRole] = useState("");
  const [activeLink, setActiveLink] = useState("Leader"); // Lưu trạng thái của liên kết đang được chọn
  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const storedRole = await AsyncStorage.getItem("userRole");
      if (storedRole !== null) setRole(storedRole);
      console.log("Stored role:", storedRole); // Ghi lại vai trò đã lưu
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLinkPress = (linkName) => {
    setActiveLink(linkName); // Cập nhật liên kết đang được chọn

    if (linkName === "Calendaring") {
      pressChange();
    } else {
      navigation.navigate(linkName, { name: linkName });
    }
  };

  const pressChange = async () => {
    try {
      const currentDate = new Date(); // Lấy ngày hiện tại dạng YYYY-MM-DD
      const calendarData = await fetchCalendarData(currentDate); // Gọi API với ngày hiện tại
      navigation.navigate("Calendaring", {
        name: "Calendaring",
        calendar: calendarData,
      });
    } catch (error) {
      console.log("Error fetching calendar data", error);
    }
  };

  return (
    <View style={FooterStyles.footer}>
      {/* role leader */}
      {role === "leader" && (
        <TouchableOpacity
          style={FooterStyles.width}
          onPress={() => handleLinkPress("Leader")}
        >
          <Image
            style={{
              tintColor: activeLink === "Leader" ? "#21BD31" : "white",
            }} // Tô màu cho icon khi được chọn
            source={require("../img/home.png")}
          />
        </TouchableOpacity>
      )}
      {role === "member" && (
        <TouchableOpacity
          style={FooterStyles.width}
          onPress={() => handleLinkPress("Member")}
        >
          <Image
            style={{
              tintColor: activeLink === "Member" ? "#21BD31" : "white", // Sửa thành activeLink === "Member"
            }} // Tô màu cho icon khi được chọn
            source={require("../img/home.png")}
          />
        </TouchableOpacity>
      )}
      {/* end role leader */}

      {/* role là manage */}
      {role === "manager" && (
        <TouchableOpacity
          style={FooterStyles.width}
          onPress={() => handleLinkPress("Manager")}
        >
          <Image
            style={{
              tintColor: activeLink === "Manager" ? "#21BD31" : "white",
            }} // Tô màu cho icon khi được chọn
            source={require("../img/home.png")}
          />
        </TouchableOpacity>
      )}
      {/* end home manage */}
      {/* Nút Calendaring - Chỉ hiển thị nếu role là Leader */}
      {(role === "manager" || role === "leader") && (
        <TouchableOpacity
          style={FooterStyles.width}
          onPress={() => handleLinkPress("Calendaring")}
        >
          <Image
            source={require("../img/calendar.png")}
            style={{
              tintColor: activeLink === "Calendaring" ? "#21BD31" : "white", // Tô màu cho icon khi được chọn
            }}
          />
        </TouchableOpacity>
      )}
      {/* Nút Chat - Hiển thị cho cả Leader và Member */}

      {/* Nút Account - Hiển thị cho cả Leader và Member */}
      <TouchableOpacity
        onPress={() => handleLinkPress("Account")}
        style={FooterStyles.width}
      >
        <Image
          source={require("../img/user.png")}
          style={{ tintColor: activeLink === "Account" ? "#21BD31" : "white" }} // Tô màu cho icon khi được chọn
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
