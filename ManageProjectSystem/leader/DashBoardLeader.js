import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusSummary } from "../api/taskService";

const screenWidth = Dimensions.get("window").width;

const DashboardLeader = () => {
  const [data, setData] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStatusSummary();
        setData({
          completed: result.ongoing || 0,
          inProgress: result.progress || 0,
          notStarted: result.notStarted || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalTasks = data.completed + data.inProgress + data.notStarted;
  const completedPercentage =
    totalTasks > 0 ? ((data.completed / totalTasks) * 100).toFixed(2) : 0;

  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [data.completed, data.inProgress, data.notStarted],
        colors: [
          (opacity = 1) => `rgba(52, 152, 219, ${opacity})`, // Blue for Completed
          (opacity = 1) => `rgba(243, 156, 18, ${opacity})`, // Orange for In Progress
          (opacity = 1) => `rgba(231, 76, 60, ${opacity})`, // Red for Not Started
        ],
      },
    ],
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Thêm thanh tiến trình ngang */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Tiến độ hoàn thành: {completedPercentage}%
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progress, { width: `${completedPercentage}%` }]}
            />
          </View>
        </View>

        {/* Thêm thông tin tóm tắt */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Tổng số công việc: {totalTasks}
          </Text>
          <Text style={styles.summaryText}>
            Đã hoàn thành: {data.completed}
          </Text>
          <Text style={styles.summaryText}>
            Đang thực hiện: {data.inProgress}
          </Text>
          <Text style={styles.summaryText}>
            Chưa bắt đầu: {data.notStarted}
          </Text>
        </View>

        {/* Biểu đồ cột */}
        {totalTasks > 0 ? (
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
              fillShadowGradient: `rgba(52, 152, 219, 1)`,
              fillShadowGradientOpacity: 1,
            }}
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>Không có dữ liệu để hiển thị</Text>
        )}
      </View>
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
  progressContainer: {
    width: "90%",
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#34495e",
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  summaryContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  noDataText: {
    fontSize: 16,
    color: "#e74c3c",
    marginTop: 16,
  },
  chart: {
    borderRadius: 16,
  },
});

export default DashboardLeader;
