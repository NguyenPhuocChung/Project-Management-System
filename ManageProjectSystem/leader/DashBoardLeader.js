import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("window").width;

const DashboardLeader = () => {
  const [data, setData] = useState({
    completed: 10,
    inProgress: 2,
    notStarted: 5,
  });

  // Sắp xếp danh sách thành viên theo hiệu quả công việc (nhiệm vụ hoàn thành)

  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [data.completed, data.inProgress, data.notStarted],
      },
    ],
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#f8f9fa",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
            style: {
              borderRadius: 16,
              marginVertical: 8,
              paddingRight: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#e67e22",
            },
          }}
          style={styles.chart}
        />
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#3498db" }]}
            />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#f39c12" }]}
            />
            <Text style={styles.legendText}>In Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#e74c3c" }]}
            />
            <Text style={styles.legendText}>Not Started</Text>
          </View>
        </View>
      </View>
      {/* Phần Tổng hợp dữ liệu hiệu suất */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#34495e",
  },
  chart: {
    borderRadius: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#34495e",
  },
  performanceTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 230,
    marginBottom: 12,
    color: "#34495e",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  memberRank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  memberName: {
    fontSize: 16,
    color: "#2c3e50",
  },
  memberTasks: {
    fontSize: 14,
    color: "#7f8c8d",
  },
});

export default DashboardLeader;
