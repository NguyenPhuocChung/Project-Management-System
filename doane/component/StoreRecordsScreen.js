import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const files = [
  {
    id: 1,
    type: "folder",
    name: "Folder Name",
    upBy: "Minh",
    date: "11/09/2024",
  },
  {
    id: 2,
    type: "file",
    name: "File Name",
    upBy: "Minh",
    date: "11/09/2024",
    status: false, // Initially not selected
  },
  {
    id: 3,
    type: "file",
    name: "Another File",
    upBy: "Chung",
    date: "12/09/2024",
    status: false, // Initially not selected
  },
];

const StoreRecordsScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files
  const navigation = useNavigation(); // Use navigation to navigate between screens

  const toggleSelectFile = (fileId) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileId)) {
        return prevSelected.filter((id) => id !== fileId); // Deselect
      } else {
        return [...prevSelected, fileId]; // Select
      }
    });
  };

  const renderFileItem = ({ item }) => (
    <View style={styles.fileItem}>
      <Icon
        name={item.type === "folder" ? "folder-outline" : "document-outline"}
        size={24}
        color={item.type === "folder" ? "#007bff" : "#333"}
        style={styles.fileIcon}
      />
      <Text style={styles.fileName}>{item.name}</Text>
      <Text style={styles.fileUpBy}>{item.upBy}</Text>
      <Text style={styles.fileDate}>{item.date}</Text>
      <TouchableOpacity onPress={() => toggleSelectFile(item.id)}>
        <Icon
          name={selectedFiles.includes(item.id) ? "checkbox-outline" : "square-outline"}
          size={24}
          color={selectedFiles.includes(item.id) ? "#28a745" : "#999"}
        />
      </TouchableOpacity>
    </View>
  );

  const downloadSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      Alert.alert("No files selected", "Please select files to download.");
      return;
    }
    selectedFiles.forEach((id) => {
      const file = files.find((f) => f.id === id);
      console.log(`Downloading ${file.name}...`);
      // Implement download logic here
    });
    Alert.alert("Download", "Selected files are being downloaded.");
  };

  const acceptSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      Alert.alert("No files selected", "Please select files to accept.");
      return;
    }
    selectedFiles.forEach((id) => {
      const file = files.find((f) => f.id === id);
      console.log(`Accepting ${file.name}...`);
      // Implement accept logic here
    });

    // Navigate back to ProjectComments screen
    navigation.navigate("ProjectComments");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Files</Text>

      <FlatList
        data={files}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.downloadButton} onPress={downloadSelectedFiles}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={acceptSelectedFiles}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileIcon: {
    marginRight: 12,
  },
  fileName: {
    flex: 2,
    fontSize: 16,
    color: "#333",
  },
  fileUpBy: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  fileDate: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 8,
  },
  downloadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  acceptButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default StoreRecordsScreen;
