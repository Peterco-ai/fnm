import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  ProgressBar,
  Divider 
} from 'react-native-paper';

export default function StatsScreen() {
  const [selectedLottery, setSelectedLottery] = useState('mega');

  // Mock data for demonstration
  const lotteryTypes = {
    mega: {
      name: 'Mega Millions',
      totalNumbers: 70,
      picks: 5,
      megaBall: 25,
      odds: '1 in 302,575,350',
    },
    powerball: {
      name: 'Powerball',
      totalNumbers: 69,
      picks: 5,
      powerball: 26,
      odds: '1 in 292,201,338',
    },
    local: {
      name: 'Local 6/49',
      totalNumbers: 49,
      picks: 6,
      odds: '1 in 13,983,816',
    },
  };

  const mockStats = {
    hotNumbers: [7, 23, 32, 16, 45, 42],
    coldNumbers: [13, 34, 26, 8, 19, 50],
    frequencies: {
      7: 89, 23: 87, 32: 85, 16: 84, 45: 83, 42: 82,
      13: 34, 34: 36, 26: 38, 8: 39, 19: 41, 50: 43,
    },
  };

  const currentLottery = lotteryTypes[selectedLottery];

  const calculateProbability = (picks, total, bonus = null) => {
    let combinations = 1;
    for (let i = 0; i < picks; i++) {
      combinations *= (total - i) / (i + 1);
    }
    if (bonus) {
      combinations *= bonus;
    }
    return Math.round(combinations);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Lottery Statistics</Title>
          <Paragraph style={styles.subtitle}>
            Frequency analysis and probability calculations
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Select Lottery Type</Title>
          <View style={styles.buttonRow}>
            {Object.keys(lotteryTypes).map((key) => (
              <Button
                key={key}
                mode={selectedLottery === key ? "contained" : "outlined"}
                onPress={() => setSelectedLottery(key)}
                style={styles.lotteryButton}
              >
                {lotteryTypes[key].name.split(' ')[0]}
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>{currentLottery.name} - Game Info</Title>
          <Paragraph>Numbers to pick: {currentLottery.picks}</Paragraph>
          <Paragraph>Total numbers: {currentLottery.totalNumbers}</Paragraph>
          {currentLottery.megaBall && (
            <Paragraph>Mega Ball range: 1-{currentLottery.megaBall}</Paragraph>
          )}
          {currentLottery.powerball && (
            <Paragraph>Powerball range: 1-{currentLottery.powerball}</Paragraph>
          )}
          <Paragraph style={styles.odds}>Jackpot Odds: {currentLottery.odds}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Most Frequent Numbers ("Hot")</Title>
          <Paragraph style={styles.disclaimer}>
            Based on historical data - remember, each draw is independent!
          </Paragraph>
          <View style={styles.numbersGrid}>
            {mockStats.hotNumbers.map((number) => (
              <View key={number} style={styles.statNumber}>
                <Paragraph style={styles.numberText}>{number}</Paragraph>
                <Paragraph style={styles.frequencyText}>
                  {mockStats.frequencies[number]} times
                </Paragraph>
                <ProgressBar 
                  progress={mockStats.frequencies[number] / 100} 
                  color="#4CAF50"
                  style={styles.progressBar}
                />
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Least Frequent Numbers ("Cold")</Title>
          <Paragraph style={styles.disclaimer}>
            These numbers are "due" according to some theories, but mathematically each number has equal chances.
          </Paragraph>
          <View style={styles.numbersGrid}>
            {mockStats.coldNumbers.map((number) => (
              <View key={number} style={styles.statNumber}>
                <Paragraph style={styles.numberText}>{number}</Paragraph>
                <Paragraph style={styles.frequencyText}>
                  {mockStats.frequencies[number]} times
                </Paragraph>
                <ProgressBar 
                  progress={mockStats.frequencies[number] / 100} 
                  color="#FF9800"
                  style={styles.progressBar}
                />
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Probability Education</Title>
          <Paragraph>Each number combination has exactly the same probability of winning.</Paragraph>
          <Paragraph>Past results do not influence future draws.</Paragraph>
          <Paragraph>The lottery is designed to be completely random.</Paragraph>
          <Divider style={styles.divider} />
          <Paragraph style={styles.mathNote}>
            Mathematical fact: Your odds remain {currentLottery.odds} for every single ticket, 
            regardless of the numbers you choose or previous results.
          </Paragraph>
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
  subtitle: {
    color: '#666',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  lotteryButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  odds: {
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 8,
  },
  disclaimer: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 12,
    marginBottom: 16,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statNumber: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frequencyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    marginTop: 4,
  },
  divider: {
    marginVertical: 12,
  },
  mathNote: {
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
});
