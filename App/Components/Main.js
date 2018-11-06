import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import { api } from '../Utils/api';
import Dashboard from './Dashboard';

const Button = styled(TouchableOpacity)`
  ${{
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  }}
  background-color: ${({ pressed }) => (pressed ? '#fff' : '#121')};
`;

const ButtonText = styled(Text)`
  ${{
    fontSize: 18,
    alignSelf: 'center',
  }}
  color: ${({ pressed }) => (!pressed ? '#fff' : '#121')};
`;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#121',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false,
      pressed: false,
    };
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  handleSubmit() {
    // update spinning indicator
    this.setState({
      isLoading: true,
    });
    const { username } = this.state;
    // fetch data from github
    api.getBio(username)
      .then((res) => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false,
          });
        } else {
          // reroute to the next route, passing github info
          this.props.navigator.push({
            component: Dashboard,
            title: res.name || 'Select an Option',
            passProps: { userInfo: res },
          });
          // reset state
          this.setState({
            error: false,
            isLoading: false,
            username: '',
          });
        }
      });
  }

  render() {
    const {
      error, username, isLoading, pressed,
    } = this.state;
    const showError = (
      error
        ? (
          <Text style={styles.errorText}>
            {' '}
            {error}
            {' '}
          </Text>
        )
        : <View />
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a Github User </Text>
        <TextInput
          style={styles.searchInput}
          value={username}
          onChange={this.handleChange.bind(this)}
        />
        <Button
          activeOpacity={0.8}
          pressed={pressed}
          onPressIn={() => this.setState({ pressed: true })}
          onPressOut={() => this.setState({ pressed: false })}
          underlayColor="white"
          onPress={this.handleSubmit.bind(this)}
        >
          <ButtonText pressed={pressed}> SEARCH </ButtonText>
        </Button>
        <ActivityIndicator
          animating={isLoading}
          color="#111"
          size="large"
        />
        {showError}
      </View>
    );
  }
}
