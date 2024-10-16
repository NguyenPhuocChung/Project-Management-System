import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const Detail = ({ route, navigation }) => {
    // Lấy thông tin task từ tham số khi điều hướng
    const { task } = route.params;

    // Hàm để chọn màu sắc theo trạng thái task
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'on going':
                return '#FFD700'; // Màu vàng cho trạng thái "on going"
            case 'done':
                return '#4CAF50'; // Màu xanh cho trạng thái "done"
            case 'not start':
            default:
                return 'gray'; // Màu xám cho trạng thái "not start"
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.detailContainer}>
            <View style={styles.row}>
                <Ionicons name="clipboard-outline" size={24} color="gray" />
                <Text style={styles.title}>{task.taskName}</Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="document-text-outline" size={24} color="gray" />
                <Text style={styles.detail}>Description: {task.description}</Text>
            </View>

            {/* Hiển thị trạng thái với kích thước chữ lớn và màu sắc tùy theo trạng thái */}
            <View style={styles.row}>
                <Ionicons name="checkmark-circle-outline" size={24} color="gray" />
                <Text style={[styles.status, { color: getStatusColor(task.status) }]}>
                    Status: {task.status}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="person-outline" size={24} color="gray" />
                <Text style={styles.detail}>Assigned To: {task.assignedTo}</Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="briefcase-outline" size={24} color="gray" />
                <Text style={styles.detail}>Project ID: {task.projectId}</Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="calendar-outline" size={24} color="gray" />
                <Text style={styles.detail}>
                    Start Date: {new Date(task.startDate).toLocaleDateString()}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="calendar-outline" size={24} color="gray" />
                <Text style={styles.detail}>
                    End Date: {new Date(task.endDate).toLocaleDateString()}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="time-outline" size={24} color="gray" />
                <Text style={styles.detail}>
                    Start Time: {new Date(task.startTime).toLocaleTimeString()}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="time-outline" size={24} color="gray" />
                <Text style={styles.detail}>
                    End Time: {new Date(task.endTime).toLocaleTimeString()}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="person-circle-outline" size={24} color="gray" />
                <Text style={styles.detail}>Created By: {task.createrBy}</Text>
            </View>

            <Button
                title="Back to Tasks"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.button}
            />
        </ScrollView>
    );
};

// Các style cho màn hình Detail
const styles = StyleSheet.create({
    detailContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    detail: {
        fontSize: 16,
        marginLeft: 10,
    },
    status: {
        fontSize: 20, // Tăng kích thước chữ cho trạng thái
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#6200EE',
        marginTop: 20,
    },
});

export default Detail;
