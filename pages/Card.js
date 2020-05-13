import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 5,
    borderTopWidth: 6,
    borderTopColor: "#20A1BB"
  }
});

export default Card;
