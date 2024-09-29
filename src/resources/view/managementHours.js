import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WorkingHScreen = () => {
  const [selectedGroup, setSelectedGroup] = useState('group1');

  const groupMembers = {
    group1: [
      { menber: '1', Day: '9:00', Week: '42 h', Month: '168 h', price: '35$' },
      { menber: '2', Day: '8:00', Week: '37 h', Month: '148 h', price: '25$' },
      { menber: '3', Day: '9:00', Week: '39 h', Month: '156 h', price: '35$' },
    ],
    group2: [
      { menber: '1', Day: '8:30', Week: '36 h', Month: '144 h', price: '28$' },
      { menber: '2', Day: '7:30', Week: '34 h', Month: '136 h', price: '18$' },
      { menber: '3', Day: '8:30', Week: '38 h', Month: '152 h', price: '28$' },
      { menber: '4', Day: '8:30', Week: '38 h', Month: '152 h', price: '28$' },
      { menber: '5', Day: '8:30', Week: '38 h', Month: '152 h', price: '28$' },
    ],
  };

  const selectedGroupH = groupMembers[selectedGroup];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Management Hour Working</Text>
      <Text style={styles.viewH}>View working h</Text>
      <Image source={require('../../public/image/DongHo.jpg')} style={styles.clockImage} />

      <View style={styles.groupContainer}>
        <Picker
          selectedValue={selectedGroup}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGroup(itemValue)}
        >
          <Picker.Item label="Group 1" value="group1" />
          <Picker.Item label="Group 2" value="group2" />
        </Picker>
      </View>

      <ScrollView style={styles.hContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Member</Text>
            <Text style={styles.headerText}>Day</Text>
            <Text style={styles.headerText}>week</Text>
            <Text style={styles.headerText}>Month</Text>
            <Text style={styles.headerText}>Price</Text>
          </View>
          {selectedGroupH.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.menber}</Text>
              <Text style={styles.cell}>{item.Day}</Text>
              <Text style={styles.cell}>{item.Week}</Text>
              <Text style={styles.cell}>{item.Month}</Text>
              <Text style={styles.cell}>{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  viewH: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388e3c',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  clockImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  groupContainer: {
    backgroundColor: '#00796b',
    padding: 5,
    borderRadius: 5,
    width: '100%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 35,
    width: '100%',
    color: '#fff',
    textAlign: 'center',
  },
  hContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#00796b',
    padding: 10,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#00796b',
    fontSize: 12,
  },
});

export default WorkingHScreen;
