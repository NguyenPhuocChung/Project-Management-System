import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Generate from "../CSS/Generate";
import { deleteAccount, getAllAccounts } from "../api/accountService"; // Import your API functions
import URL from "../midleware/authMidleware";

const MemberManagement = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [refreshing, setRefreshing] = useState(false); // Trạng thái refreshing

  // Hàm xóa thành viên
  const handleDeleteMember = async () => {
    try {
      await deleteAccount(memberToDelete);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== memberToDelete)
      );
      setFilteredMembers((prevFilteredMembers) =>
        prevFilteredMembers.filter((member) => member._id !== memberToDelete)
      );
      setConfirmationModalVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm tìm kiếm thành viên
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = members.filter((member) =>
        member.fullName
          ? member.fullName.toLowerCase().includes(query.toLowerCase())
          : false
      );
      setFilteredMembers(filteredData);
    } else {
      setFilteredMembers(members);
    }
  };

  // Hàm lấy danh sách thành viên
  const fetchMembers = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const data = await getAllAccounts();
      setMembers(data);
      setFilteredMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Đánh dấu rằng việc tải dữ liệu đã hoàn tất
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  //
  const formDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Find members"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <Icon
        name="add"
        size={30}
        color="blue"
        onPress={() => navigation.navigate("Register")}
      />
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.memberItem}>
            <Text>{index + 1}</Text>
            <Text>{item.fullName || "null"}</Text>
            <Text>{item.role}</Text>
            <View style={[Generate.d_flex_align_center, { gap: 10 }]}>
              <Icon
                name="delete"
                size={24}
                color="red"
                onPress={() => {
                  setMemberToDelete(item._id);
                  setConfirmationModalVisible(true);
                }}
              />
              <Icon
                name="info"
                size={24}
                color="green"
                onPress={() => {
                  setSelectedMember(item);
                  setModalVisible(true);
                }}
              />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Trạng thái refreshing
            onRefresh={fetchMembers} // Hàm gọi lại khi kéo refresh
          />
        }
      />

      {/* Modal xác nhận xóa */}
      <Modal
        visible={confirmationModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this member?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setConfirmationModalVisible(false)}
              />
              <Button
                title="Delete"
                onPress={handleDeleteMember}
                color="#FF6A6A"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal hiển thị thông tin thành viên */}
      {selectedMember && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {selectedMember?.avatar && (
              <Image
                source={{
                  uri: `http://${URL.BASE_URL}:5000/${selectedMember.avatar}`,
                }}
                style={styles.avatar}
              />
            )}
            <Text style={styles.infoText}>
              Full Name: {selectedMember.fullName || "null"}
            </Text>
            <Text style={styles.infoText}>
              Email: {selectedMember.email || "null"}
            </Text>
            <Text style={styles.infoText}>
              Role: {selectedMember.role || "null"}
            </Text>
            <Text style={styles.infoText}>
              Phone: {selectedMember.phone || "null"}
            </Text>
            <Text style={styles.infoText}>
              Address: {selectedMember.address || "null"}
            </Text>
            <Text style={styles.infoText}>
              Birth Date: {selectedMember.birthDate || "null"}
            </Text>
            <Text style={styles.infoText}>
              Department: {selectedMember.department || "null"}
            </Text>
            <Text style={styles.infoText}>
              Position: {selectedMember.position || "null"}
            </Text>
            <Text style={styles.infoText}>
              Salary: {selectedMember.salary || "null"}
            </Text>
            <Text style={styles.infoText}>
              Start Date: {formDate(selectedMember.startDate) || "null"}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  modalContent: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Chỉ cho Android
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Tạo hình tròn cho avatar
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#333",
    fontWeight: "500", // Chữ đậm hơn
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF", // Màu nền cho nút Close
    borderRadius: 5,
    padding: 10,
    width: "100%", // Chiếm toàn bộ chiều rộng
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default MemberManagement;
