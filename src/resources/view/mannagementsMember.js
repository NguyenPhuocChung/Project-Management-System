import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const MemberList = () => {
  const [status, setStatus] = useState("all");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [editMemberModalVisible, setEditMemberModalVisible] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Thành Viên 1",
      nameProject: "dự án phong chong tham nhung do dang cong ty",
      role: "member",
      status: "online",
    },
    {
      id: 2,
      name: "Thành Viên 2",
      nameProject: "dự án phong chong tham nhung do dang cong ty",
      role: "member",
      status: "offline",
    },
    {
      id: 3,
      name: "Thành Viên 3",
      nameProject: "dự án phong chong tham nhung do dang cong ty",
      role: "member",
      status: "online",
    },
    {
      id: 4,
      name: "Thành Viên 3",
      nameProject: "dự án phong chong tham nhung do dang cong ty",
      role: "member",
      status: "online",
    },
    {
      id: 5,
      name: "Thành Viên 3",
      nameProject: "dự án phong chong tham nhung do dang cong ty",
      role: "member",
      status: "online",
    },
  ]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberProject, setNewMemberProject] = useState("");

  // Add new member
  const handleAddMember = () => {
    const newMember = {
      id: members.length + 1,
      name: newMemberName,
      role: newMemberRole,
      nameProject: newMemberProject,
      status: "offline",
    };
    setMembers([...members, newMember]);
    setAddMemberModalVisible(false);
    resetNewMemberFields();
  };

  // Handle Edit Member
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setNewMemberName(member.name);
    setNewMemberRole(member.role);
    setNewMemberProject(member.nameProject);
    setEditMemberModalVisible(true);
  };

  // Update member details
  const handleUpdateMember = () => {
    setMembers((prevMembers) =>
      prevMembers.map((m) =>
        m.id === selectedMember.id
          ? { ...m, name: newMemberName, role: newMemberRole, nameProject: newMemberProject }
          : m
      )
    );
    setEditMemberModalVisible(false);
    resetNewMemberFields();
  };

  // Delete member
  const handleDeleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const resetNewMemberFields = () => {
    setNewMemberName("");
    setNewMemberRole("");
    setNewMemberProject("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddMemberModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setStatusModalVisible(true)}
        >
          <Text style={styles.filterText}>Status filter: {status}</Text>
        </TouchableOpacity>
      </View>

      {/* Status Picker Modal */}
      <Modal visible={statusModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Status</Text>
            <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Online" value="online" />
              <Picker.Item label="Offline" value="offline" />
            </Picker>
            <Button title="Done" onPress={() => setStatusModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Add Member Modal */}
      <Modal visible={addMemberModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a new member</Text>
            <TextInput
              style={styles.input}
              placeholder="Member's name"
              value={newMemberName}
              onChangeText={setNewMemberName}
            />
            <TextInput
              style={styles.input}
              placeholder="Role (optional)"
              value={newMemberRole}
              onChangeText={setNewMemberRole}
            />
            <TextInput
              style={styles.input}
              placeholder="Project name"
              value={newMemberProject}
              onChangeText={setNewMemberProject}
            />
            <Button title="Add Member" onPress={handleAddMember} />
            <Button title="Cancel" onPress={() => setAddMemberModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Edit Member Modal */}
      <Modal visible={editMemberModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Member</Text>
            <TextInput
              style={styles.input}
              placeholder="Member's name"
              value={newMemberName}
              onChangeText={setNewMemberName}
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={newMemberRole}
              onChangeText={setNewMemberRole}
            />
            <TextInput
              style={styles.input}
              placeholder="Project name"
              value={newMemberProject}
              onChangeText={setNewMemberProject}
            />
            <Button title="Update Member" onPress={handleUpdateMember} />
            <Button title="Cancel" onPress={() => setEditMemberModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {members
          .filter((member) => status === "all" || member.status === status)
          .map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>Role: {member.role}</Text>
              <Text style={styles.memberProject}>Project: {member.nameProject}</Text>
              <Text
                style={[
                  styles.memberStatus,
                  member.status === "online" ? styles.online : styles.offline,
                ]}
              >
                Status: {member.status}
              </Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditMember(member)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => handleDeleteMember(member.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#17a2b8",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  memberCard: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  memberRole: {
    fontSize: 14,
    color: "#666",
  },
  memberProject: {
    fontSize: 14,
    color: "#666",
  },
  memberStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  online: {
    color: "green",
  },
  offline: {
    color: "#666",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#17a2b8",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default MemberList;
