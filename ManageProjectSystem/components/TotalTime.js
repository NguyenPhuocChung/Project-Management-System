import React, { Component } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { PieChart } from "react-native-chart-kit"; // Nhập biểu đồ tròn
import { Row, Rows, Table } from "react-native-table-component";
import GeneraterStyles from "../CSS/Generate";
import TotalTimeStyles from "../CSS/TotalTime";

export default class TotalTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["ID", "FullName", "Office", "TotalTime"],
      tableData: [
        ["1", "Chung", "Minh", "40"],
        ["2", "Quốc Minh", "Hà Nội", "30"],
        // Thêm dữ liệu khác
      ],
    };
  }

  // // In ra bảng tổng thời gian
  // downloadExcel = () => {
  //   // Dữ liệu mẫu
  //   const data = [
  //     ["ID", "FullName", "Office", "TotalTime"],
  //     ["1", "Chung", "Minh", "40"],
  //     ["2", "Quốc Minh", "Hà Nội", "30"],
  //     // Thêm dữ liệu khác
  //   ];

  //   // Tạo workbook
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.aoa_to_sheet(data);
  //   XLSX.utils.book_append_sheet(wb, ws, "Payroll");

  //   // Tạo file Excel
  //   const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  //   const filePath = `${RNFS.DocumentDirectoryPath}/payroll.xlsx`;

  //   // Chuyển đổi binary string thành buffer
  //   const buf = new Uint8Array(wbout.length);
  //   for (let i = 0; i < wbout.length; i++) {
  //     buf[i] = wbout.charCodeAt(i) & 0xff;
  //   }

  //   // Lưu file vào thiết bị
  //   RNFS.writeFile(filePath, buf, "ascii")
  //     .then(() => {
  //       console.log("File saved to: " + filePath);
  //       alert("File đã được tải xuống!");
  //     })
  //     .catch((error) => {
  //       console.error("Error saving file: ", error);
  //       alert("Có lỗi xảy ra khi tải xuống file!");
  //     });
  // };

  // In ra bảng tổng thời gian
  render() {
    const state = this.state;

    // Dữ liệu cho biểu đồ tròn
    const data = [
      {
        name: "TotalTime",
        population: 50,
        color: "#FF6384",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Chương trình B",
        population: 30,
        color: "#36A2EB",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Chương trình C",
        population: 20,
        color: "#FFCE56",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
      <View style={TotalTimeStyles.container}>
        <View>
          <Text>Thêm biểu đồ ở đây</Text>
          <PieChart
            data={data}
            width={300} // Chiều rộng biểu đồ
            height={220} // Chiều cao biểu đồ
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population" // Thuộc tính để tính tỷ lệ
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        <View
          style={[
            GeneraterStyles.d_flex_align_center,
            GeneraterStyles.justify_between,
            GeneraterStyles.marginVertical,
          ]}
        >
          <Text style={[GeneraterStyles.sizeTitles]}>Employee payroll</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={this.downloadExcel}
          >
            <View style={[TotalTimeStyles.button, GeneraterStyles.rounded]}>
              <Text style={[GeneraterStyles.textWhite]}>Download excel</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Table>
          <Row
            data={state.tableHead}
            style={[TotalTimeStyles.head, TotalTimeStyles.rowBorder]} // Thêm border cho hàng đầu
            textStyle={TotalTimeStyles.text}
          />
          <Rows
            data={state.tableData}
            style={TotalTimeStyles.rowBorder} // Thêm border cho các hàng còn lại
            textStyle={TotalTimeStyles.text}
          />
        </Table>
      </View>
    );
  }
}
