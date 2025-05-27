import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Button, 
  TextInput, 
  Chip, 
  Paragraph,
  HelperText 
} from 'react-native-paper';

export default function GeneratorScreen() {
  const [minNumber, setMinNumber] = useState('1');
  const [maxNumber, setMaxNumber] = useState('49');
  const [countNumbers, setCountNumbers] = useState('6');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [generationHistory, setGenerationHistory] = useState([]);

  const generateNumbers = () => {
    const min = parseInt(minNumber);
    const max = parseInt(maxNumber);
    const count = parseInt(countNumbers);

    if (min >= max || count > (max - min + 1)) {
      return;
    }

    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }

    numbers.sort((a, b) => a - b);
    setGeneratedNumbers(numbers);
    
    const newEntry = {
      numbers: [...numbers],
      timestamp: new Date().toLocaleString(),
      range: `${min}-${max}`,
    };
    setGenerationHistory(prev => [newEntry, ...prev.slice(0, 9)]);
  };

  const isValidInput = () => {
    const min = parseInt(minNumber);
    const max = parseInt(maxNumber);
    const count = parseInt(countNumbers);
    
    return min < max && count <= (max - min + 1) && count > 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Number Generator</Title>
          <Paragraph style={styles.subtitle}>
            Generate random numbers for your lottery tickets
          </Paragraph>
          
          <View style={styles.inputRow}>
            <TextInput
              label="Min Number"
              value={minNumber}
              onChangeText={setMinNumber}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Max Number"
              value={maxNumber}
              onChangeText={setMaxNumber}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          
          <TextInput
            label="Count of Numbers"
            value={countNumbers}
            onChangeText={setCountNumbers}
            keyboardType="numeric"
            style={styles.fullInput}
          />
          
          <HelperText type={isValidInput() ? "info" : "error"}>
            {isValidInput() 
              ? `Generating ${countNumbers} unique numbers between ${minNumber} and ${maxNumber}`
              : "Please check your input values"
            }
          </HelperText>
          
          <Button 
            mode="contained" 
            onPress={generateNumbers}
            disabled={!isValidInput()}
            style={styles.generateButton}
          >
            Generate Numbers
          </Button>
        </Card.Content>
      </Card>

      {generatedNumbers.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Your Numbers</Title>
            <View style={styles.numbersContainer}>
              {generatedNumbers.map((number, index) => (
                <Chip key={index} style={styles.numberChip}>
                  {number}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {generationHistory.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Recent Generations</Title>
            {generationHistory.map((entry, index) => (
              <View key={index} style={styles.historyEntry}>
                <Paragraph style={styles.historyTime}>{entry.timestamp}</Paragraph>
                <View style={styles.numbersContainer}>
                  {entry.numbers.map((number, numIndex) => (
                    <Chip key={numIndex} style={styles.smallChip}>
                      {number}
                    </Chip>
                  ))}
                </View>
                <Paragraph style={styles.historyRange}>Range: {entry.range}</Paragraph>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
  fullInput: {
    marginTop: 8,
  },
  generateButton: {
    marginTop: 16,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  numberChip: {
    margin: 4,
    backgroundColor: '#6200EE',
  },
  smallChip: {
    margin: 2,
    backgroundColor: '#E0E0E0',
  },
  historyEntry: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyTime: {
    fontSize: 12,
    color: '#666',
  },
  historyRange: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
