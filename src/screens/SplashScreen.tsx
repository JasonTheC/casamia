import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onLogin: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLogin }) => {
  const [showContent, setShowContent] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('logo'); // 'logo', 'logoWithS', 'welcome', 'buttons'
  
  // Animation values
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const sOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const logoFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animationSequence = () => {
      // Phase 1: Animate the "S" appearing immediately
      setAnimationPhase('logoWithS');
      Animated.timing(sOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Phase 2: Wait a moment, then fade everything out
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(logoFadeOut, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(sOpacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            })
          ]).start(() => {
            // Phase 3: Show welcome and buttons
            setAnimationPhase('buttons');
            setShowContent(true);
            
            // Fade in welcome text first
            Animated.timing(welcomeOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }).start(() => {
              // Then fade in buttons
              setTimeout(() => {
                Animated.timing(buttonsOpacity, {
                  toValue: 1,
                  duration: 600,
                  useNativeDriver: true,
                }).start();
              }, 300);
            });
          });
        }, 1500);
      });
    };

    animationSequence();
  }, []);

  const handleSignUp = () => {
    console.log('Sign Up pressed');
    // For now, just navigate to main app
    onLogin();
  };

  const handleSignIn = () => {
    console.log('Sign In pressed');
    // Navigate to main app
    onLogin();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E5BBA" />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Animation Phase */}
        {(animationPhase === 'logo' || animationPhase === 'logoWithS') && (
          <Animated.View style={[styles.logoContainer, { opacity: logoFadeOut }]}>
            <View style={styles.logoRow}>
              <Text style={styles.logoText}>CA</Text>
              <Animated.Text style={[styles.logoText, styles.sLetter, { opacity: sOpacity }]}>S</Animated.Text>
              <Text style={styles.logoText}>A MIA</Text>
            </View>
          </Animated.View>
        )}

        {/* Welcome and Buttons - Show after logo fades */}
        {showContent && animationPhase === 'buttons' && (
          <View style={styles.bottomContent}>
            <Animated.View style={[styles.welcomeContainer, { opacity: welcomeOpacity }]}>
              <Text style={styles.welcomeText}>Welcome to CASA MIA!</Text>
            </Animated.View>

            <Animated.View style={[styles.buttonsContainer, { opacity: buttonsOpacity }]}>
              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInButtonText}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E5BBA', // Blue background matching the images
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '100', // Ultra thin weight to match the elegant style
    color: '#FFFFFF',
    letterSpacing: 8,
    textAlign: 'center',
    fontFamily: 'System', // Use system font with thin weight
  },
  sLetter: {
    // The animated S letter - same styling as logoText
  },
  bottomContent: {
    position: 'absolute',
    bottom: height * 0.25, // Position in lower portion of screen
    width: width - 80,
    alignItems: 'center',
  },
  welcomeContainer: {
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'System',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#FF6B35', // Orange color from the image
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'System',
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1,
    fontFamily: 'System',
  },
});

export default SplashScreen;
