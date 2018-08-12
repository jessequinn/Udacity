import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";

// UI
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Badge,
  Text
} from "react-native-elements";

import { white, black, lightPurp, orange, blue, purple } from "../utils/colors";

class DeckView extends Component {
  render() {
    const { navigation } = this.props;
    const _deckTitle = navigation.getParam("_deckTitle", "Error with title");
    const _deckCardCount = navigation.getParam(
      "_deckCardCount",
      "Error with card count"
    );

    return (
      <View style={styles.container}>
        <Text h1>{_deckTitle}</Text>

        <Badge containerStyle={styles.badge}>
          <Text>
            {_deckCardCount >= 2 || _deckCardCount === 0 ? `${_deckCardCount} cards` : `${_deckCardCount} card`}
          </Text>
        </Badge>

        <Button
          raised
          icon={{ name: "add-box", color: black }}
          title="Add Card"
          buttonStyle={[styles.btn, styles.btnWhite]}
          textStyle={{ textAlign: "center", color: black }}
        />

        <Button
          raised
          icon={{ name: "cached", color: white }}
          title="Start Quiz"
          buttonStyle={[styles.btn, styles.btnBlack]}
          textStyle={{ textAlign: "center", color: white }}
        />
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
    backgroundColor: purple
  },
  badge: {
    borderRadius: 10,
    marginBottom: 150,
    backgroundColor: purple
  }
});

export default DeckView;
