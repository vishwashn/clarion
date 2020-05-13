import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import { Button } from "react-native-paper";
import Card from "./Card";
import { FontAwesome, Feather } from "@expo/vector-icons";
import font from "../constants/font";
import Colors from "../constants/Colors";

class AuthScreen extends Component {
  state = {
    err: null,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    hidePassword: true
  };
  authHandler = () => {
    let { email, password } = this.state;
    let emailError = "";
    let passwordError = "";
    this.state.err = null;
    if (!email && email.trim().length === 0) {
      emailError = "Email ID is required";
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        emailError = "Email ID is not valid";
    }
    if (!password && password.trim().length === 0) {
      passwordError = "Password is required";
    } else {
      if (!/(?=.*[A-Z])/.test(password))
        passwordError = "Password should contain one uppercase letter";
    }
    if (emailError === "" && passwordError === "") {
      if (
        !(
          email.toLowerCase() === "clarion@clarion.com" &&
          password === "Clarion123"
        )
      ) {
        passwordError = "Email ID or Password is incorrect";
      }
    }
    if (
      emailError === "" &&
      passwordError === "" &&
      email.toLowerCase() === "clarion@clarion.com" &&
      password === "Clarion123"
    )
      this.props.navigation.navigate("Home", { userName: email });
    else this.setState({ emailError, passwordError });
  };
  render() {
    const { emailError, passwordError } = this.state;
    return (
      <KeyboardAvoidingView behavior="paddding" style={styles.screen}>
        <View style={styles.gradient}>
          <Card style={styles.authContainer}>
            <View
              style={{
                backgroundColor: "transparent",
                alignItems: "center"
              }}
            ></View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Email ID</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  value={this.state.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder={"Email ID"}
                  placeholderTextColor="#202020"
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                />
                <FontAwesome
                  name={this.state.hidePassword ? "eye-slash" : "eye"}
                  size={18}
                  color="transparent"
                />
              </View>
              {emailError !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{emailError}</Text>
                </View>
              )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  value={this.state.password}
                  keyboardType="default"
                  placeholder={"Password"}
                  placeholderTextColor="#202020"
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={text => {
                    this.setState({ password: text });
                  }}
                />
                <FontAwesome
                  name={this.state.hidePassword ? "eye-slash" : "eye"}
                  size={18}
                  color={Colors.textColor}
                  onPress={() => {
                    this.setState({
                      hidePassword: !this.state.hidePassword
                    });
                  }}
                />
              </View>
              {passwordError !== "" && (
                <View style={styles.errorContainer} key={1}>
                  <Text style={styles.errorText}>{passwordError}</Text>
                </View>
              )}
            </View>
            <View style={{ backgroundColor: "transparent" }}>
              <Button
                mode="text"
                color={Colors.textColor}
                style={[styles.borderContainer, { backgroundColor: "#01DFA5" }]}
                onPress={this.authHandler}
              >
                Login{" "}
                <Feather name="log-in" size={18} color={Colors.textColor} />
              </Button>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: Colors.card_bg
  },
  buttonContainer: {
    marginTop: 10
  },
  label: {
    fontFamily: font.fontFamilyBold,
    color: Colors.textColor,
    marginVertical: 8
  },
  input: {
    flex: 1,
    fontFamily: font.fontFamily,
    color: Colors.inputColor,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: font.fontFamily,
    color: "red",
    fontSize: 13
  },
  borderContainer: {
    backgroundColor: Colors.buttonColor,
    margin: 10,
    borderRadius: 20,
    elevation: 5
  },
  formControl: {
    width: "100%"
  }
});

export default AuthScreen;
