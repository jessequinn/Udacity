import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";
import { white, black, lightPurp, orange, blue } from "../utils/colors";
import { Constants } from "expo";

// UI
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

class Decks extends Component {
  render() {
    const list = [
      {
        title: "Appointments",
        icon: "av-timer"
      },
      {
        title: "Trips",
        icon: "flight-takeoff"
      }
    ];

    return (
      <View>
        <List>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle="# cards"
              hideChevron
            />
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: white
  },
  btn: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: black
  },
  btnWhite: {
    backgroundColor: white
  },
  btnBlack: {
    backgroundColor: black
  },
  badge: {
    borderRadius: 10,
    marginBottom: 150,
    backgroundColor: lightPurp
  }
});

export default Decks;
