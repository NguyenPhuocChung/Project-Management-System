import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchTasks } from './api'; // Import hàm fetchTasks từ file api.js

const Todo = () => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    // Sử dụng useEffect để gọi API khi component được mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasksData = await fetchTasks();
                setTaskGroups(tasksData); // Giả sử API trả về cấu trúc dữ liệu tương tự
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        loadTasks();
    }, []); // Chỉ chạy một lần khi component được mount

    const toggleModal = (task) => {
        setSelectedTask(task);
        setModalVisible(!isModalVisible);
    };

    const toggleStatus = (statusOption) => {
        if (selectedTask) {
            const updatedGroups = taskGroups.map(group => {
                const updatedTasks = group.tasks.map(task => {
                    if (task.id === selectedTask.id) {
                        return { ...task, status: statusOption };
                    }
                    return task;
                });
                return { ...group, tasks: updatedTasks };
            });
            setTaskGroups(updatedGroups);
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={taskGroups}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.groupContainer}>
                        <Text style={styles.groupTitle}>{item.title}</Text>
                        <FlatList
                            data={item.tasks}
                            keyExtractor={(task) => task.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', { task: item })}>
                                    <Card containerStyle={styles.card}>
                                        <View style={styles.taskRow}>
                                            <Text style={styles.taskName}>{item.name}</Text>
                                            <TouchableOpacity onPress={() => toggleModal(item)}>
                                                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.taskInfo}>
                                            <Text style={styles.assignee}>{item.assignee}</Text>
                                            <Text style={styles.dueDate}>{item.dueDate}</Text>
                                            <Text style={[styles.priority, { backgroundColor: getPriorityColor(item.priority) }]}>
                                                {item.priority}
                                            </Text>
                                            <Text style={styles.status}>{item.status}</Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            />

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Status</Text>
                        <Button title="Done" onPress={() => toggleStatus('Done')} />
                        <Button title="In Progress" onPress={() => toggleStatus('In Progress')} />
                        <Button title="Not Started" onPress={() => toggleStatus('Not Started')} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'High':
            return '#ff6b6b';
        case 'Medium':
            return '#ffcc00';
        case 'Low':
            return '#6bcf6b';
        default:
            return '#ffffff';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    groupContainer: {
        marginBottom: 20,
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        borderRadius: 10,
        padding: 10,
    },
    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskName: {
        fontSize: 16,
        fontWeight: '600',
    },
    taskInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    assignee: {
        fontSize: 14,
        color: '#888',
    },
    dueDate: {
        fontSize: 14,
        color: '#888',
    },
    priority: {
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    status: {
        fontSize: 14,
        color: '#6bcf6b',
        fontWeight: 'bold',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Todo;
