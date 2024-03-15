import React from 'react';
import { View, Text, Pressable } from 'react-native';

const BudgetCard = () => {
  const totalBudget = 4000;
  const spentBudget = 2000;
  const progress = spentBudget / totalBudget;

  return (
    <View>
      <View>
        <Text>Budget</Text>
        <Pressable>
          <Text>Details</Text>
        </Pressable>
      </View>
      <View>
        <Text>Budget: $4.000</Text>
        <Text>Disponible: $2000</Text>
        {/* <Progress.Circle style={{ height: 200 }} progress={progress} progressColor={'#000'} /> */}
      </View>
    </View>
  );
};

export default BudgetCard;
