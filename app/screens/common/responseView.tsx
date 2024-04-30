import React, { } from "react";
import { StyleSheet, View, Text } from 'react-native';

interface ViewContainerProps {
  responseCount: number;
}

const ViewContainer: React.FC<ViewContainerProps> = ({ responseCount }) => {

  const backgroundColor = responseCount === 0 ? '#FFD153' : '#92FF53';
  return (
    <View style={[style.contentView, { backgroundColor }]}>
      <Text style={style.contentText}>View more - {responseCount} Responses</Text>
    </View>
  );
};
const style = StyleSheet.create({
  toggleButton: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  contentView: {
    borderRadius: 10,
    width: 220,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'

  },
  contentText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
  },
});

export default ViewContainer;
