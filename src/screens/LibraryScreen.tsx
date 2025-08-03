import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LibraryScreen = () => {
  const navigation = useNavigation();
  
  const gestureItems = [
    { id: 1, completed: false },
    { id: 2, completed: true },
    { id: 3, completed: false },
    { id: 4, completed: false },
    { id: 5, completed: true },
    { id: 6, completed: false },
  ];

  const renderGestureItem = (item: any, index: number) => (
    <TouchableOpacity key={item.id} style={styles.gestureItem}>
      <View style={styles.gestureImage}>
        {/* Placeholder for gesture illustration */}
        <View style={styles.imagePlaceholder} />
      </View>
      {item.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E5BBA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>CASA MIA</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Library Content */}
      <View style={styles.content}>
        <View style={styles.libraryHeader}>
          <Text style={styles.libraryTitle}>BIBLIOTECA DI CASA MIA</Text>
          <Text style={styles.librarySubtitle}>Library</Text>
        </View>

        <ScrollView style={styles.gestureGrid} showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {gestureItems.map((item, index) => renderGestureItem(item, index))}
          </View>
        </ScrollView>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
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
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    backgroundColor: '#B8C5E3',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  libraryHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  libraryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E5BBA',
    letterSpacing: 1,
  },
  librarySubtitle: {
    fontSize: 14,
    color: '#2E5BBA',
    fontStyle: 'italic',
  },
  gestureGrid: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gestureItem: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gestureImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '80%',
    height: '80%',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  completedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LibraryScreen;
