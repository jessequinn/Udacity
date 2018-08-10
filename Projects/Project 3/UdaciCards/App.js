import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";

// navigation
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { black, purple, white } from "./utils/colors";

// views
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";

// UI
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "AddDeck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="add-box" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      labelStyle: {
        color: black
      },
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
}
