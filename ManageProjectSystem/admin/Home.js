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
  const lineWidth = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Animated.timing(lineWidth, {
      toValue: 50,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [lineWidth]);

  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập việc tải dữ liệu mới
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const sections = [
    {
      title: "Notification",
      data: [
        {
          icon: "notifications",
          title: "Notification",
          navigateTo: "Notification",
        },
      ],
    },
    {
      title: "Manager",
      data: [
        {
          icon: "briefcase",
          title: "Manager Project",
          navigateTo: "Project",
        },
        {
          icon: "person",
          title: "Manager Member",
          navigateTo: "ManageMember",
        },
      ],
    },
    {
      title: "Status all task",
      data: [
        {
          icon: "list",
          title: "Manager Task",
          navigateTo: "StatusAllTask",
        },
      ],
    },
    {
      title: "Dash Board",
      data: [
        {
          icon: "analytics",
          title: "Dash Board",
          navigateTo: "DashBoard",
        },
      ],
    },
  ];

  const renderSection = ({ item }) => (
    <Section title={item.title}>
      {item.data.map((card, index) => (
        <IconCard
          key={index}
          icon={card.icon}
          title={card.title}
          onPress={() => {
            if (card.navigateTo) {
              navigation.navigate(card.navigateTo);
            }
          }}
        />
      ))}
    </Section>
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
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
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconCard}
    accessibilityLabel={title}
  >
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
