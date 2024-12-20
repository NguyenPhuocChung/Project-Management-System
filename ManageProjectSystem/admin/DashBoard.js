import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { getStatusSummary } from "../api/projectService";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
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
          completed: result.Done || 0,
          inProgress: result.ongoing || 0,
          notStarted: result.notStarted || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [data.completed, data.inProgress, data.notStarted],
      },
    ],
  };

  // Calculate total tasks and progress percentage
  const totalTasks = data.completed + data.inProgress + data.notStarted;
  const progressPercentage = totalTasks
    ? ((data.completed / totalTasks) * 100).toFixed(2)
    : 0;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        {totalTasks > 0 ? (
          <>
            {/* Summary Information */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Total Tasks: {totalTasks}</Text>
              <Text style={styles.summaryText}>
                Completed: {data.completed}
              </Text>
              <Text style={styles.summaryText}>
                In Progress: {data.inProgress}
              </Text>
              <Text style={styles.summaryText}>
                Not Started: {data.notStarted}
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Progress: {progressPercentage}%
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, { width: `${progressPercentage}%` }]}
                />
              </View>
            </View>

            {/* Bar Chart */}
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

            {/* Legend */}
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
          </>
        ) : (
          // Display a "No Data" message with an icon
          <View style={styles.noDataContainer}>
            <Icon name="inbox" size={100} color="#dcdcdc" />
            <Text style={styles.noDataText}>No data available</Text>
          </View>
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
  summaryContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  progressContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 8,
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
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noDataText: {
    fontSize: 18,
    color: "#b0b0b0",
    marginTop: 16,
  },
});

export default Dashboard;
