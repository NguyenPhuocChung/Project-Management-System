import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  paddingRL: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  margin_vertical: {
    marginVertical: 10,
  },
  d_flex: {
    display: "flex",
  },
  justify_between: {
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền phía sau modal
  },
  modalContent: {
    width: "100%",
    height: "auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // alignItems: "center", // Căn giữa các phần tử bên trong
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  box_main_task: {
    width: "auto",
    height: "auto",
  },
  background_color: {
    backgroundColor: "#F5F5F5",
  },
  main: {
    marginHorizontal: 10,
  },
  padding_right: {
    paddingLeft: 3,
  },
  paddingRL: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  margin_right: {
    marginRight: 20,
  },
  margin_bottom: {
    marginBottom: 32,
  },
  font_size_content: {
    fontSize: 14,
  },
  font_size_name: {
    fontSize: 12,
  },
  fontSize_title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  color: {
    color: "#39434F",
  },
  d_flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  justify_between: {
    justifyContent: "space-between",
  },
  justify_around: {
    justifyContent: "space-around",
  },
  margin_left: {
    marginLeft: 10,
  },
  margin_vertical: {
    marginVertical: 10,
  },
  margin_Horizontal: {
    marginHorizontal: 10,
  },
  horizol: {
    width: "auto",
    height: 0,
    borderTopWidth: 0.5,
    borderColor: "#CDCDE6",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  text_management: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  text_input: {
    width: "auto",
    height: 46,
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  management_img: {
    with: 21,
    height: 17,
  },
  import_img: {
    width: 24,
    height: 20,
  },
  form_create_task: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 90,
  },
  text_create_task: {
    color: "black",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#CDCDE6",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 100,
    paddingHorizontal: 8,
    textAlignVertical: "top",
    padding: 10,
  },
  //
  control_content_task: {
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  bold_word: {
    fontWeight: "bold",
  },
  underline: {
    textDecorationLine: "underline",
  },
  italic: {
    fontStyle: "italic",
  },

  box_control_content_task: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderRadius: 4,
    paddingRight: 10,
    paddingLeft: 10,
  },

  sort_img: {
    width: 4,
    height: 18,
  },
  box_task: {
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderRadius: 8,
    maxWidth: "100%", // Giới hạn chiều rộng tối đa
    height: "auto",
    flex: 1, // Chiếm không gian còn lại
    padding: 16,
  },
  box_status: {
    borderWidth: 1,
    borderColor: "#CDCDE6",
    borderRadius: 20,
    padding: 10,
    width: "auto",
  },

  box_status_progress: {
    backgroundColor: "#DBEDDB",
    borderWidth: 0,
  },
  box_status_cancle: {
    backgroundColor: "#FFE4E4",
  },
  box_status_done: {
    backgroundColor: "#378237",
  },
  box_status_notstarted: {
    backgroundColor: "#EEF1F6",
  },
  point: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "black",
  },
  point_progress: {
    backgroundColor: "#48AE6D",
  },
  point_cancel: {
    backgroundColor: "#F53C3C",
  },
  point_done: {
    backgroundColor: "#C6E7D2",
  },
  point_notstarted: {
    backgroundColor: "#39434F",
  },
  numberBackground: {
    backgroundColor: "#F4F9FF",
    borderColor: "#3C70F5",
  },
  color_progress: {
    color: "#48AE6D",
  },
  color_cancle: {
    color: "#F53C3C",
  },
  color_done: {
    color: "#FFFFFF",
  },
  color_notstarted: {
    color: "#39434F",
  },
  text_task: {
    fontSize: 14,
    width: "auto",
    height: "auto",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#39434F",
    borderWidth: 1,
  },
  //
  dropdown: {
    height: 40,
    borderColor: "#CDCDE6",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 14,
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 14,
    textAlign: "center",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
  flex_1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
});
export default styles;
