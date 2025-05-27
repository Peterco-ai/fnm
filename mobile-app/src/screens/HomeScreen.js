import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to Lottery Helper</Title>
          <Paragraph>
            Your comprehensive lottery companion app. Generate numbers, track statistics, 
            and manage your lottery history - all while understanding the mathematics behind it.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Quick Actions</Title>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              style={styles.button}
              onPress={() => navigation.navigate('Generator')}
            >
              Generate Numbers
            </Button>
            <Button 
              mode="outlined" 
              style={styles.button}
              onPress={() => navigation.navigate('Stats')}
            >
              View Statistics
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Important Note</Title>
          <Paragraph style={styles.disclaimer}>
            Remember: Lottery numbers are completely random. This app is for entertainment 
            and educational purposes only. No app can predict lottery outcomes.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Features</Title>
          <Paragraph>• Random number generation with customizable ranges</Paragraph>
          <Paragraph>• Historical frequency analysis</Paragraph>
          <Paragraph>• Personal ticket tracking</Paragraph>
          <Paragraph>• Probability calculations and education</Paragraph>
        </Card.Content>
      </Card>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  disclaimer: {
    fontStyle: 'italic',
    color: '#666',
  },
});
