import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialNotifications = [
  { id: '1', title: 'Lịch của bạn', description: 'Bạn có một cuộc họp lúc 9:00', type: 'event', meet: 'true' },
  { id: '2', title: 'Lịch của bạn', description: 'Hội thảo trực tuyến vào ngày 20/10, đừng bỏ lỡ!', type: 'event', meet: 'true' },
  { id: '3', title: 'Bạn có một dự án mới', description: 'Phiên bản mới của ứng dụng đã sẵn sàng.', type: 'notifications', meet: 'false' },
  { id: '4', title: 'Bạn có một dự án mới', description: 'Phiên bản mới của ứng dụng đã sẵn sàng.', type: 'notifications', meet: 'false' },
  { id: '5', title: 'Lịch của bạn', description: 'Hội thảo trực tuyến vào ngày 20/10, đừng bỏ lỡ!', type: 'event', meet: 'true' },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all'); 

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return 'event';
      case 'notifications':
        return 'notifications';
      default:
        return 'notifications'; 
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notification}>
      <Icon name={getNotificationIcon(item.type)} size={30} color="#f7c59f" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {filter === 'event' && item.meet === 'true' && (
          <TouchableOpacity style={styles.meetButton}>
            <Text style={styles.meetButtonText}>Meet</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const filteredNotifications = notifications.filter((notification) => 
    filter === 'all' || (filter === 'event' && notification.type === 'event') || 
    (filter === 'notifications' && notification.type === 'notifications')
  );

  // Xóa tất cả thông báo không phải là lịch họp
  const handleClearNotifications = () => {
    setNotifications(notifications.filter(notification => notification.type === 'event'));
  };

  return (
    <View style={styles.container}>
      {/* Phần tiêu đề và danh sách thông báo */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Thông báo</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.halfButton, styles.notificationButton]} 
          onPress={() => setFilter('notifications')} 
        >
          <Text style={styles.buttonText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.halfButton, styles.eventButton]} 
          onPress={() => setFilter('event')} 
        >
          <Text style={styles.buttonText}>Lịch họp</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications} 
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />

      {/* Hiển thị nút xóa chỉ khi không đang xem lịch họp */}
      {filter !== 'event' && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearNotifications} // Xóa tất cả thông báo không phải lịch họp
        >
          <Text style={styles.clearButtonText}>Xóa tất cả thông báo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7fc',  
  },
  headerContainer: {
    backgroundColor: '#4a90e2',  
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,  
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',  
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',  
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,  
    shadowRadius: 10,
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
  clearButton: {
    marginTop: 20,
    backgroundColor: '#ff7043',  
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,  
    marginBottom: 20,
  },
  halfButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  notificationButton: {
    backgroundColor: '#42a5f5',  
  },
  eventButton: {
    backgroundColor: '#66bb6a',  
  },
  buttonText: {
    color: '#ffffff',  
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetButton: {
    marginTop: 10,
    backgroundColor: '#ffca28',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  meetButtonText: {
    color: '#000',  
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NotificationPage;
