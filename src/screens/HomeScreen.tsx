import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E5BBA" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>CASA MIA</Text>
        </View>
      </View>

      {/* Welcome Section */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Welcome Josh!</Text>
        
        {/* Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            You discovered <Text style={styles.boldText}>0 gesti</Text>
          </Text>
          <Text style={styles.cardText}>
            out of <Text style={styles.boldText}>250</Text>. Time to start!
          </Text>
          <View style={styles.progressCircle}>
            <View style={styles.progressInner} />
          </View>
        </View>

        {/* Gesture of the Day Card */}
        <View style={styles.gestureCard}>
          <Text style={styles.gestureTitle}>Gesto of the day!</Text>
          <View style={styles.gestureContent}>
            <Text style={styles.gestureQuote}>"</Text>
            <Text style={styles.gestureItalian}>CHI</Text>
            <Text style={styles.gestureItalian}>SE NE!</Text>
            <Text style={styles.gestureQuote}>"</Text>
          </View>
          <Text style={styles.gestureTranslation}>"Who cares!"</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2E5BBA',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#2E5BBA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2E5BBA',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFE5D9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    color: '#FF6B35',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: '700',
  },
  progressCircle: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB5A7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
  },
  gestureCard: {
    backgroundColor: '#FFE5D9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  gestureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 15,
  },
  gestureContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  gestureQuote: {
    fontSize: 24,
    color: '#2E5BBA',
    fontWeight: '300',
  },
  gestureItalian: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2E5BBA',
    letterSpacing: 2,
  },
  gestureTranslation: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
