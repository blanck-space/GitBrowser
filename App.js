import React, { Component } from 'react';
import {
  NavigatorIOS,
} from 'react-native';
import styled from 'styled-components/native';

import Main from './App/Components/Main';


const StyledRouter = styled(NavigatorIOS)`
  display: flex;
  flex: 1;
`;

export default class githubNotetaker extends Component { //eslint-disable-line
  render() {
    return (
      <StyledRouter
        initialRoute={{
          component: Main,
          title: 'gitbrowser',
        }}
      />
    );
  }
}
