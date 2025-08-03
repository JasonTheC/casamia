import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GestureRecordScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingMode, setRecordingMode] = useState<'camera' | 'upload' | null>(null);
  const [showTargetBox, setShowTargetBox] = useState(true);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'front') || devices[0]; // Use front camera for gesture recognition

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();

    if (cameraPermission !== 'granted') {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to record gestures.');
        return;
      }
    }

    if (microphonePermission !== 'granted') {
      const newMicrophonePermission = await Camera.requestMicrophonePermission();
      if (newMicrophonePermission !== 'granted') {
        Alert.alert('Permission Required', 'Microphone permission is required to record gestures.');
        return;
      }
    }

    setHasPermission(true);
  };

  const startRecording = async () => {
    if (!camera.current) return;
    
    try {
      setIsRecording(true);
      setShowTargetBox(false);
      
      await camera.current.startRecording({
        onRecordingFinished: (video) => {
          console.log('Recording finished:', video);
          setIsRecording(false);
          setShowTargetBox(true);
          // Here you would process the video for gesture recognition
          processGestureVideo(video.path);
        },
        onRecordingError: (error) => {
          console.error('Recording error:', error);
          setIsRecording(false);
          setShowTargetBox(true);
          Alert.alert('Recording Error', 'Failed to record video. Please try again.');
        },
      });

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (camera.current && isRecording) {
          camera.current.stopRecording();
        }
      }, 5000);
    } catch (error) {
      console.error('Start recording error:', error);
      setIsRecording(false);
      setShowTargetBox(true);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!camera.current) return;
    
    try {
      await camera.current.stopRecording();
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const uploadVideo = () => {
    const options = {
      mediaType: 'video' as const,
      videoQuality: 'medium' as const,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const video = response.assets[0];
        if (video.uri) {
          processGestureVideo(video.uri);
        }
      }
    });
  };

  const processGestureVideo = (videoPath: string) => {
    // This is where you would integrate with a gesture recognition service
    // For now, we'll simulate the process
    Alert.alert(
      'Processing Gesture',
      'Analyzing your hand gesture...',
      [
        {
          text: 'OK',
          onPress: () => {
            // Simulate gesture detection result
            setTimeout(() => {
              Alert.alert(
                'Gesture Detected!',
                'We detected an Italian hand gesture! Great job!',
                [
                  { text: 'Try Again', onPress: () => setRecordingMode(null) },
                  { text: 'Back to Library', onPress: () => navigation.goBack() },
                ]
              );
            }, 2000);
          },
        },
      ]
    );
  };

  const renderModeSelection = () => (
    <View style={styles.modeSelection}>
      <Text style={styles.instructionText}>Choose how to record your gesture:</Text>
      <TouchableOpacity
        style={styles.modeButton}
        onPress={() => setRecordingMode('camera')}
      >
        <Text style={styles.modeButtonText}>📹 Use Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modeButton}
        onPress={() => {
          setRecordingMode('upload');
          uploadVideo();
        }}
      >
        <Text style={styles.modeButtonText}>📁 Upload Video</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCamera = () => {
    if (!device || !hasPermission) {
      return (
        <View style={styles.cameraContainer}>
          <Text style={styles.permissionText}>
            {!hasPermission ? 'Camera permission required' : 'No camera available'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          video={true}
          audio={true}
        />
        
        {/* Target Box Overlay */}
        {showTargetBox && (
          <View style={styles.overlay}>
            <View style={styles.targetBox}>
              <View style={styles.crosshair}>
                <View style={styles.crosshairHorizontal} />
                <View style={styles.crosshairVertical} />
              </View>
            </View>
            <Text style={styles.overlayText}>Point camera at hands</Text>
          </View>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Recording...</Text>
          </View>
        )}

        {/* Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.backToModeButton}
            onPress={() => setRecordingMode(null)}
          >
            <Text style={styles.controlButtonText}>Change Mode</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={styles.recordButtonText}>
              {isRecording ? 'Stop' : 'Record'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E5BBA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>CASA MIA</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {recordingMode === null && renderModeSelection()}
        {recordingMode === 'camera' && renderCamera()}
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
  },
  modeSelection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionText: {
    fontSize: 18,
    color: '#2E5BBA',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  modeButton: {
    backgroundColor: '#2E5BBA',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  modeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  permissionText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#666',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetBox: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  crosshair: {
    position: 'relative',
    width: 30,
    height: 30,
  },
  crosshairHorizontal: {
    position: 'absolute',
    top: 14,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  crosshairVertical: {
    position: 'absolute',
    left: 14,
    top: 5,
    bottom: 5,
    width: 2,
    backgroundColor: '#FFFFFF',
  },
  overlayText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backToModeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  recordButton: {
    backgroundColor: '#FF4444',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  recordButtonActive: {
    backgroundColor: '#CC0000',
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GestureRecordScreen;
