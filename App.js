import React, { useState,useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Animated,Easing } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');

  const [fallingAnimation]=useState( new Animated.Value(0));






  useEffect(()=>{
    if(input !==''){
      Animated.sequence([
        Animated.sequence([
          Animated.timing(fallingAnimation,{
            toValue:1,
            duration:500,
            easing:Easing.linear,
            useNativeDriver:false,
          }),
          Animated.timing(fallingAnimation,{
            toValue:0,
            duration:0,
            useNativeDriver:false,
          }),
        ]).start(),
        /* Vibration.vibrate([0,200,100,200]) */
      ])
    }
  },[input,fallingAnimation]); 


  const fallingStyle={
    transform: [
      {
        translateY: fallingAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  }

  const handleButtonPress = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <Animated.View style={[styles.displayContainer,fallingStyle]}>
        <TextInput style={styles.display} value={input} editable={false} />
        </Animated.View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonGray} onPress={handleClear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={handleDelete}>
            <Text style={styles.buttonText}>DE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => handleButtonPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOrange} onPress={() => handleButtonPress('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {[7, 8, 9, '*'].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={() => handleButtonPress(value.toString())}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6, '-'].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={() => handleButtonPress(value.toString())}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[1, 2, 3, '+'].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={() => handleButtonPress(value.toString())}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('00')}>
            <Text style={styles.buttonText}>00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDoubleOrange} onPress={handleCalculate}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  calculator: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: -20,
  },
  display: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    fontSize: 48,
    textAlign: 'right',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGray: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrange: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDoubleOrange: {
    width: 180,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: 'black',
  },
  displayContainer:{
    marginBottom:10,
  }
});

export default Calculator;
