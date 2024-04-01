import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // Para formatear la fecha

const DateInput = ({ label, onChange, value, selectedDate, setSelectedDate }: any) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, newDate: any) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (newDate !== undefined) {
      setSelectedDate(newDate);
      onChange(newDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={toggleDatePicker}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
          <Icon name="calendar-outline" size={24} color="#666" />
        </View>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || value}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
});

export default DateInput;
