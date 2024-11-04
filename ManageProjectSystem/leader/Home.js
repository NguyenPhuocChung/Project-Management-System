import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const lineWidth = useRef(new Animated.Value(0)).current;

  // Dữ liệu cho danh sách
  const sections = [
    {
      title: "Notification",
      icon: "notifications-outline",
      onPress: () => navigation.navigate("Notification"),
    },
    {
      title: "Manager Task",
      icon: "briefcase-outline",
      onPress: () => navigation.navigate("ManageTask"),
    },
    {
      title: "Dashboard",
      icon: "grid-outline",
      onPress: () => navigation.navigate("DashBoardLeader"),
    },
    {
      title: "Show All Task",
      icon: "list-outline",
      onPress: () => navigation.navigate("StatusAllTask"),
    },
  ];

  useEffect(() => {
    Animated.timing(lineWidth, {
      toValue: 50,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        Alert.alert("Notification", "Are you sure you want to exit the app?", [
          {
            text: "No",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, lineWidth]);

  // Sử dụng useFocusEffect để reload dữ liệu khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      console.log("Home screen is focused");
      return () => {
        // Clean up nếu cần
      };
    }, [])
  );

  // Hàm render cho từng mục trong danh sách
  const renderItem = ({ item }) => (
    <Section title={item.title}>
      <IconCard icon={item.icon} title={item.title} onPress={item.onPress} />
    </Section>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
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
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 20,
    paddingBottom: 90,
  },
  listContainer: {
    paddingBottom: 20,
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
