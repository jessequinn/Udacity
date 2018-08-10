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

import { white, black, lightPurp, orange, blue } from "../utils/colors";

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h1>NAME OF DECK</Text>

        <Badge containerStyle={styles.badge}>
          <Text># Cards</Text>
        </Badge>

        <Button
          raised
          icon={{ name: "add-box", color: black }}
          title="Add Card"
          buttonStyle={styles.button}
          textStyle={{ textAlign: "center", color: black }}
        />

        <Button
          raised
          icon={{ name: "cached", color: white }}
          title="Start Quiz"
          buttonStyle={styles.buttonInverse}
          textStyle={{ textAlign: "center", color: white }}
        />

        <Text>What is the title of your new deck?</Text>
        <FormLabel>Deck Title</FormLabel>
        {/* <FormInput onChangeText={someFunction} /> */}
        <FormInput />
        <FormValidationMessage>
          {"This field is required"}
        </FormValidationMessage>
        <Text>Submit</Text>
        <FormLabel>What is your suggested question?</FormLabel>
        {/* <FormInput onChangeText={someFunction} /> */}
        <FormInput />
        <FormValidationMessage>
          {"This field is required"}
        </FormValidationMessage>
        <FormLabel>Answer to your question.</FormLabel>
        {/* <FormInput onChangeText={someFunction} /> */}
        <FormInput />
        <FormValidationMessage>
          {"This field is required"}
        </FormValidationMessage>
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
  button: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: black,
    backgroundColor: white
  },
  buttonInverse: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: black,
    backgroundColor: black
  },
  badge: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: lightPurp
  }
});

export default AddDeck;
