// Invite.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import CheckBox from "react-native-check-box";
import { Dropdown } from "react-native-element-dropdown";
import Generatetylse from "../CSS/Generate";
import InvitePeople from "../CSS/Invite";
import styles from "../CSS/ManageTask";
import { fetchInviteMembers } from "../api/inviteService"; // Import hàm fetchInviteMembers
import URL from "../midleware/authMidleware";
const Invite = () => {
  const [invite, setInvite] = useState([]); // Danh sách thành viên
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [userRole, setId] = useState(""); // Id của người dùng
  const route = useRoute();
  const { data } = route.params;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  const loadData = async () => {
    try {
      const userRole = await AsyncStorage.getItem("userRole");
      if (userRole) setId(userRole);
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchInviteMembers(userRole); // Gọi hàm từ api.js
      const formattedData = data.map((member) => ({
        label: member.fullName,
        value: member._id,
      }));
      setInvite(formattedData);
      console.log(formattedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(); // Gọi hàm để lấy dữ liệu khi component mount
  }, [userRole]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={[styles.paddingRL, styles.margin_vertical]}>
        <Text style={InvitePeople.font_size_tittle}>Who has access</Text>
        <View
          style={[
            styles.d_flex,
            styles.justify_between,
            styles.margin_vertical,
          ]}
        >
          <Text style={InvitePeople.font_size_tittle_two}>Manage access</Text>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={invite} // Truyền dữ liệu đã format vào Dropdown
                  maxHeight={300}
                  labelField="label" // Trường label để hiển thị
                  valueField="value" // Trường giá trị để nhận dạng
                  searchPlaceholder="Search..."
                  placeholder="Select member"
                />

                {/* Nút Close */}
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Nút mở modal */}
          <Pressable
            style={[InvitePeople.button, InvitePeople.button]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={Generatetylse.textWhite}>AddNew</Text>
          </Pressable>
        </View>
      </View>
      <View style={[InvitePeople.box]}>
        <View
          style={[styles.d_flex, InvitePeople.horizol, InvitePeople.paddingTB]}
        >
          <CheckBox
            style={{ flex: 1, padding: 10 }}
            onClick={() => setToggleCheckBox(!toggleCheckBox)}
            isChecked={toggleCheckBox}
            rightText={"Select all"}
          />
        </View>
        <View>
          <View style={[InvitePeople.searchContainer, styles.margin_vertical]}>
            <Image
              source={require("../img/search.png")} // Add your magnifying glass icon path here
              style={InvitePeople.searchIcon}
            />
            <TextInput
              style={[InvitePeople.searchInput, InvitePeople.font_size_content]}
              placeholder="Find a collaborator ..."
            />
          </View>
          {data === null ? (
            <View>
              <Text>Not member</Text>
            </View>
          ) : (
            <View
              style={[styles.d_flex, styles.margin_vertical, { width: "100%" }]}
            >
              <CheckBox
                style={{ padding: 10 }}
                onClick={() => setToggleCheckBox(!toggleCheckBox)}
                isChecked={toggleCheckBox}
              />

              <View style={[styles.d_flex, styles.justify_around, { flex: 1 }]}>
                <View style={[styles.d_flex, InvitePeople.margin_right]}>
                  {data?.invite[0]?.avatar && (
                    <Image
                      source={{
                        uri: `http://${URL.BASE_URL}:5000/${data.invite[0].avatar}`,
                      }}
                      style={styles.avatar}
                    />
                  )}
                  <Text
                    style={[InvitePeople.font_size_note, styles.margin_left]}
                  >
                    {data.invite[0]?.fullName}
                  </Text>
                </View>

                <Text style={[InvitePeople.font_size_note]}>
                  {data.invite[0]?.role}
                </Text>

                <Icon
                  name="trash"
                  size={20}
                  color="#900"
                  onPress={() => {
                    /* handle delete */
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Invite;
