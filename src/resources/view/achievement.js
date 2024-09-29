import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Giả sử đây là dữ liệu về thành tích cá nhân của người dùng
const achievementsData = [
  { id: '1', title: 'Thành tích Làm xuất sắc', description: 'Đạt được KPI trong dự án', points: 100 },
  { id: '2', title: 'Người chăm chỉ', description: 'Hoàn thành chỉ tiêu đưa ra trong dự án đúng giờ', points: 80 },
  { id: '3', title: 'Tích cực tham gia', description: 'Tham gia nhiều dự án  đề ra trong tháng', points: 50 },
];

const AchievementPage = () => {
  
  // Hàm render cho từng thành tích
  const renderAchievement = ({ item }) => (
    <View style={styles.achievementContainer}>
      <Icon name="star" size={30} color="#ffd700" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{item.points} điểm</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Thành tích cá nhân</Text>
      </View>

      <FlatList
        data={achievementsData}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.backButton}>
        <Text style={styles.backButtonText}>Personal achievement</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  headerContainer: {
    backgroundColor: '#4a90e2',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  pointsContainer: {
    backgroundColor: '#fdd835',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pointsText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#ff7043',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    textAlign: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AchievementPage;
