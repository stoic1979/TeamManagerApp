import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class CustomButton extends Component {
  render() {
    const { title, onPress} = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle}
      onPress={() => onPress()}
      >
       <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center'
  },
  
  buttonStyle: {
    padding: 8,
    margin:10,
    height:40,
    width: 120,
    backgroundColor: '#146C80',
    borderRadius: 10
  }
});

export default CustomButton;