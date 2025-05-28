import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  FAB,
  Chip,
  IconButton 
} from 'react-native-paper';

export default function HistoryScreen() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      date: '2025-05-20',
      numbers: [7, 15, 23, 31, 42, 49],
      type: 'Mega Millions',
      cost: 2.00,
      result: 'lost',
    },
    {
      id: 2,
      date: '2025-05-15',
      numbers: [3, 12, 28, 35, 41, 47],
      type: 'Local 6/49',
      cost: 1.00,
      result: 'lost',
    },
    {
      id: 3,
      date: '2025-05-10',
      numbers: [9, 18, 25, 33, 44, 50],
      type: 'Powerball',
      cost: 2.00,
      result: 'pending',
    },
  ]);

  const [showFab, setShowFab] = useState(true);

  const totalSpent = tickets.reduce((sum, ticket) => sum + ticket.cost, 0);
  const totalWinnings = tickets
    .filter(ticket => ticket.result === 'won')
    .reduce((sum, ticket) => sum + (ticket.winnings || 0), 0);

  const addTicket = () => {
    Alert.alert(
      "Add Ticket", 
      "In a full version, this would open a form to add your lottery ticket details.",
      [{ text: "OK" }]
    );
  };

  const deleteTicket = (ticketId) => {
    Alert.alert(
      "Delete Ticket",
      "Are you sure you want to delete this ticket?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => setTickets(tickets.filter(t => t.id !== ticketId))
        }
      ]
    );
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'won': return '#4CAF50';
      case 'lost': return '#F44336';
      case 'pending': return '#FF9800';
      default: return '#666';
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case 'won': return 'WON';
      case 'lost': return 'LOST';
      case 'pending': return 'PENDING';
      default: return 'UNKNOWN';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Ticket Summary</Title>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Paragraph style={styles.summaryLabel}>Total Tickets</Paragraph>
                <Paragraph style={styles.summaryValue}>{tickets.length}</Paragraph>
              </View>
              <View style={styles.summaryItem}>
                <Paragraph style={styles.summaryLabel}>Total Spent</Paragraph>
                <Paragraph style={styles.summaryValue}>${totalSpent.toFixed(2)}</Paragraph>
              </View>
              <View style={styles.summaryItem}>
                <Paragraph style={styles.summaryLabel}>Total Won</Paragraph>
                <Paragraph style={styles.summaryValue}>${totalWinnings.toFixed(2)}</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {tickets.map((ticket) => (
          <Card key={ticket.id} style={styles.card}>
            <Card.Content>
              <View style={styles.ticketHeader}>
                <View style={styles.ticketInfo}>
                  <Title style={styles.ticketTitle}>{ticket.type}</Title>
                  <Paragraph style={styles.ticketDate}>{ticket.date}</Paragraph>
                </View>
                <View style={styles.ticketActions}>
                  <Chip 
                    style={[styles.resultChip, { backgroundColor: getResultColor(ticket.result) }]}
                    textStyle={styles.resultText}
                  >
                    {getResultText(ticket.result)}
                  </Chip>
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => deleteTicket(ticket.id)}
                  />
                </View>
              </View>
              
              <View style={styles.numbersContainer}>
                {ticket.numbers.map((number, index) => (
                  <Chip key={index} style={styles.numberChip}>
                    {number}
                  </Chip>
                ))}
              </View>
              
              <View style={styles.ticketFooter}>
                <Paragraph style={styles.costText}>Cost: ${ticket.cost.toFixed(2)}</Paragraph>
                {ticket.winnings && (
                  <Paragraph style={styles.winningsText}>
                    Winnings: ${ticket.winnings.toFixed(2)}
                  </Paragraph>
                )}
              </View>
            </Card.Content>
          </Card>
        ))}

        {tickets.length === 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>No Tickets Yet</Title>
              <Paragraph>
                Start tracking your lottery tickets by tapping the + button below.
              </Paragraph>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={addTicket}
        visible={showFab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  ticketDate: {
    fontSize: 12,
    color: '#666',
  },
  ticketActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultChip: {
    marginRight: 8,
  },
  resultText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  numberChip: {
    margin: 2,
    backgroundColor: '#E3F2FD',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costText: {
    fontSize: 12,
    color: '#666',
  },
  winningsText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});
