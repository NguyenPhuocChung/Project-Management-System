import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const lineWidth = useRef(new Animated.Value(0)).current; // Khởi tạo Animated.Value
  const [refreshing, setRefreshing] = useState(false); // State để theo dõi trạng thái refreshing

  // Dữ liệu cho FlatList
  const sections = [
    {
      title: "Notification",
      icon: "notifications",
      navigateTo: "Notification",
    },
    {
      title: "Task",
      icon: "briefcase",
      navigateTo: "TaskMember",
    },
  ];

  useEffect(() => {
    // Bắt đầu animation khi component được mount
    Animated.timing(lineWidth, {
      toValue: 50, // Đến 50%
      duration: 1000, // Thời gian animation (1 giây)
      useNativeDriver: false, // Sử dụng Native Driver
    }).start();
  }, [lineWidth]);

  // Hàm thực hiện khi kéo để làm mới
  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập việc làm mới dữ liệu trong 1 giây
    setTimeout(() => {
      setRefreshing(false); // Đặt lại trạng thái refreshing
    }, 1000);
  };

  const renderSection = ({ item }) => (
    <Section title={item.title}>
      <IconCard
        onPress={() =>
          navigation.navigate(item.navigateTo, { name: item.navigateTo })
        }
        icon={item.icon}
        title={item.title}
      />
    </Section>
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* Sử dụng FlatList để hiển thị danh sách các phần */}
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.title} // Sử dụng title làm key
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
          onRefresh={onRefresh} // Thêm hàm onRefresh
          refreshing={refreshing} // Truyền trạng thái refreshing
        />

        {/* Đường kẻ ngang với animation */}
        <Animated.View
          style={[
            styles.line,
            {
              width: lineWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "50%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.iconContainer}>{children}</View>
  </View>
);

const IconCard = ({ icon, title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconCard}>
    <Ionicons name={icon} size={48} color="green" />
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  line: {
    height: 1, // Chiều cao của đường kẻ
    backgroundColor: "gray", // Màu nền của đường kẻ
    marginVertical: 10, // Khoảng cách trên và dưới đường kẻ
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    marginTop: 50,
  },
  main: {
    flex: 1,
    alignItems: "center",
  },
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#3B82F6",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  iconCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
    width: "40%",
  },
  cardTitle: {
    color: "#333333",
    fontWeight: "600",
    marginTop: 8,
  },
});

export default Home;
