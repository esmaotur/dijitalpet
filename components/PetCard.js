import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const PetCard = ({ mood, level, reaction }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const bounce = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (reaction) {
            Animated.sequence([
                Animated.timing(bounce, { toValue: -20, duration: 200, useNativeDriver: true }),
                Animated.spring(bounce, { toValue: 0, friction: 3, tension: 40, useNativeDriver: true })
            ]).start();
        }
    }, [reaction]);

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    // Evolution logic
    let catFace = '(=^･ω･^=)'; // Level 1-3
    if (level >= 4 && level <= 6) catFace = '(=^ ◡ ^=)'; // Level 4-6
    if (level >= 7) catFace = '(=✧ ◡ ✧=)'; // Level 7+

    // Mood / Reaction overrides
    if (reaction === 'happy' || mood === 'happy') catFace = '(=^ ▽ ^=)';
    if (reaction === 'sad' || mood === 'sad') catFace = '(=；ェ；=)';
    if (reaction === 'excited' || mood === 'energetic') catFace = '(=✧ ω ✧=)';
    if (mood === 'sleepy') catFace = '(=- ω -=) zZ';

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                {level >= 7 && (
                    <View style={styles.auraContainer}>
                        <Text style={styles.sparkle}>✨</Text>
                        <Text style={styles.sparkle}>⭐</Text>
                        <Text style={styles.sparkle}>✨</Text>
                    </View>
                )}
                <Animated.View style={[styles.petBody, { transform: [{ translateY: bounce }] }]}>
                    <View style={styles.earsContainer}>
                        <View style={styles.earLeft} />
                        <View style={styles.earRight} />
                    </View>
                    <View style={styles.eyesContainer}>
                        <View style={styles.greenEye} />
                        <View style={styles.greenEye} />
                    </View>
                    <Text style={styles.face}>{catFace}</Text>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: '#CDB4DB',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 15,
        elevation: 8,
        alignItems: 'center',
        marginBottom: 10,
        width: 200,
    },
    auraContainer: {
        position: 'absolute',
        top: -15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: 10,
    },
    sparkle: {
        fontSize: 20,
    },
    petBody: {
        width: 140,
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 4,
    },
    earsContainer: {
        position: 'absolute',
        top: -15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    earLeft: {
        width: 0, height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15, borderRightWidth: 15, borderBottomWidth: 25,
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFFFFF',
        transform: [{ rotate: '-15deg' }]
    },
    earRight: {
        width: 0, height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15, borderRightWidth: 15, borderBottomWidth: 25,
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFFFFF',
        transform: [{ rotate: '15deg' }]
    },
    eyesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
        position: 'absolute',
        top: 35,
        zIndex: 2,
    },
    greenEye: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#A8D5BA',
    },
    face: {
        fontSize: 18,
        color: '#555',
        fontWeight: 'bold',
        marginTop: 15,
    },
});

export default PetCard;
