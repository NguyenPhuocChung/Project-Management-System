import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Switch,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample notification data
let notifications = [
  {
    id: '1',
    group: 'Gr1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    adminMessage: 'Hello from Gr1',
    time: '4h ago',
    read: false,
  },
  {
    id: '2',
    group: 'Gr2',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    adminMessage: 'Meeting tomorrow',
    time: '4h ago',
    read: true,
  },
  {
    id: '3',
    group: 'Gr3',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    adminMessage: 'Gr3 Updates',
    time: '2h ago',
    read: false,
  },
  {
    id: '4',
    group: 'Gr4',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    adminMessage: '',
    time: '1h ago',
    read: true,
  },
];

const NotificationScreen = () => {
  const [showUnread, setShowUnread] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [notificationData, setNotificationData] = useState(notifications);

  // Toggle unread notifications
  const toggleShowUnread = () => {
    setShowUnread((prev) => !prev);
  };

  // Filter notifications based on read status and search query
  const filteredNotifications = notificationData.filter((notification) => {
    const matchesRead = showUnread ? !notification.read : true;
    const matchesSearch =
      notification.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notification.adminMessage &&
        notification.adminMessage.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRead && matchesSearch;
  });

  // Render individual notification
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationContainer, !item.read && styles.unreadNotification]}
      onPress={() =>
        navigation.navigate('Message', {
          group: item.group,
          adminMessage: item.adminMessage,
          avatar: item.avatar,
          updateNotification,
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.groupName}>{item.group}</Text>
        {item.adminMessage && (
          <Text style={styles.adminMessage}>Admin: {item.adminMessage}</Text>
        )}
      </View>
      <Text style={styles.time}>{item.time}</Text>
      {/* Delete Button */}
      <TouchableOpacity onPress={() => deleteGroup(item.group)} style={styles.deleteButton}>
        <Icon name="trash-can" size={20} color="#ff6b6b" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Update notification message
  const updateNotification = useCallback((group, newMessage) => {
    const updatedNotifications = notificationData.map((notification) => {
      if (notification.group === group) {
        return { ...notification, adminMessage: newMessage, read: false, time: 'Just now' };
      }
      return notification;
    });
    setNotificationData(updatedNotifications);
  }, [notificationData]);

  // Add a new group
  const addGroup = () => {
    if (newGroupName.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid group name.');
      return; 
    }
    
    if (notificationData.some(notification => notification.group === newGroupName)) {
      Alert.alert('Duplicate Group', 'Group name already exists.');
      return;
    }

    setLoading(true); // Start loading
    setTimeout(() => { // Simulate network delay
      const newNotification = {
        id: (notificationData.length + 1).toString(),
        group: newGroupName,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        adminMessage: '',
        time: 'Just now',
        read: false,
      };

      setNotificationData((prev) => [...prev, newNotification]);
      setNewGroupName('');
      setModalVisible(false);
      Alert.alert('Success', 'Group added successfully!');
      setLoading(false); // Stop loading
    }, 500);
  };

  // Delete a group
  const deleteGroup = (group) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${group}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setNotificationData((prev) => prev.filter(notification => notification.group !== group));
            Alert.alert('Success', 'Group deleted successfully!');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#555" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search or add a group..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {/* Clear Search Button */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Icon name="close" size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      {/* Toggle unread notifications */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Show Unread Only</Text>
        <Switch value={showUnread} onValueChange={toggleShowUnread} />
      </View>

      {/* Add Group Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Group</Text>
      </TouchableOpacity>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications found.</Text>}
      />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />}

      {/* Modal for adding new group */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Group</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter group name"
              value={newGroupName}
              onChangeText={setNewGroupName}
              autoCapitalize="words"
              onSubmitEditing={addGroup} // Trigger add on submit
              placeholderTextColor="#999"
            />
            <Button title="Add Group" onPress={addGroup} color="#007bff" />
            <Button title="Close" onPress={() => setModalVisible(false)} color="#ff6b6b" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 60,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  adminMessage: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    paddingLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default NotificationScreen;
