import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Picker
} from "react-native";
import font from "../constants/font";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

class Home extends Component {
  state = {
    products: [],
    name: "",
    rate: "",
    quality: "",
    nameError: "",
    rateError: "",
    qualityError: "",
    id: 0,
    dialogVisible: false,
    userName: this.props.navigation.state.params.userName
  };
  init = {
    name: "",
    rate: "",
    quality: "",
    nameError: "",
    rateError: "",
    qualityError: "",
    dialogVisible: false
  };
  qualityData = [1, 2, 3];
  addProduct = () => {
    let {
      name,
      rate,
      quality,
      id,
      products,
      nameError,
      rateError,
      qualityError
    } = this.state;
    if (name === "") nameError = "Can not be blank";
    else nameError = "";
    if (rate === "") rateError = "Can not be blank";
    else rateError = "";
    if (quality === "") qualityError = "Select quality";
    else qualityError = "";
    if (name !== "" && rate !== "" && quality !== "")
      this.setState({
        products: [...products, { name, rate, quality, id: id++ }],
        id: id++,
        ...this.init
      });
    else this.setState({ nameError, rateError, qualityError });
  };
  cancel = () => {
    this.setState({ ...this.init });
  };
  renderRow = product => {
    return (
      <View key={product.id} style={styles.row}>
        <View style={styles.cell}>
          <Text>{product.name}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{product.rate}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{product.quality}</Text>
        </View>
        <View style={styles.cell}>
          <Text>
            <FontAwesome
              name="trash"
              size={22}
              color={Colors.textColor}
              onPress={() => this.delete(product.id)}
            />
          </Text>
        </View>
      </View>
    );
  };
  delete = id => {
    const { products } = this.state;
    this.setState({ products: products.filter(f => f.id !== id) });
  };
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  renderDialog = () => {
    const { name, rate, quality, nameError, rateError, qualityError } = this.state;
    return (
      <Dialog.Container
        style={styles.screen}
        visible={this.state.dialogVisible}
      >
        <Dialog.Title>Add Product Details</Dialog.Title>
        <View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Name</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.input}
                value={name}
                keyboardType="default"
                autoCapitalize="none"
                placeholder="Name"
                placeholderTextColor="#202020"
                onChangeText={name => {
                  this.setState({ name });
                }}
              />
            </View>
            {nameError !== "" && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{nameError}</Text>
              </View>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Rate</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.input}
                value={rate}
                keyboardType="number-pad"
                autoCapitalize="none"
                placeholder="Rate"
                placeholderTextColor="#202020"
                onChangeText={rate => {
                  this.setState({ rate });
                }}
              />
            </View>
            {rateError !== "" && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{rateError}</Text>
              </View>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Quality</Text>
            <Picker
              itemStyle={styles.itemStyle}
              mode="dropdown"
              style={styles.pickerStyle}
              selectedValue={quality}
              onValueChange={val => this.setState({ quality: val })}
            >
              <Picker.Item
                color="black"
                label="Select quality"
                value=""
                index={0}
              />
              {this.qualityData.map(q => (
                <Picker.Item
                  color="black"
                  key={q}
                  label={q.toString()}
                  value={q}
                  index={q}
                />
              ))}
            </Picker>
            {qualityError !== "" && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{qualityError}</Text>
              </View>
            )}
          </View>
        </View>
        <Dialog.Button label="Cancel" onPress={this.cancel} />
        <Dialog.Button label="Add" onPress={this.addProduct} />
      </Dialog.Container>
    );
  };
  render() {
    const { products, userName } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.gradient} enabled>
        {this.renderDialog()}
        <ScrollView>
          <View style={styles.homeContainer}>
            <Text style={styles.heading}>Welcome {userName}</Text>
            <Text style={styles.heading}>Dashboard</Text>
            <View>
              <Button
                mode="text"
                color={Colors.textColor}
                style={[styles.borderContainer, { backgroundColor: "#e7e7e7" }]}
                onPress={() => this.setState({ dialogVisible: true })}
              >
                Add New Product
              </Button>
            </View>
            <View key="table-heading" style={styles.row}>
              <View style={styles.cell}>
                <Text>Name</Text>
              </View>
              <View style={styles.cell}>
                <Text>Rate</Text>
              </View>
              <View style={styles.cell}>
                <Text>Quality</Text>
              </View>
              <View style={styles.cell}>
                <Text>Action</Text>
              </View>
            </View>
            {products.map(product => {
              return this.renderRow(product);
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  heading: {
    fontSize: 16,
    padding: 25,
    fontWeight: "bold"
  },
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 40
  },
  gradient: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  cell: {
    flex: 1,
    alignSelf: "stretch"
  },
  row: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
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
