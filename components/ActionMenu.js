import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

const ActionButton = ({ icon, label, color, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (onPress) onPress();
    };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={styles.actionWrap}>
                <Animated.View style={[styles.button, { backgroundColor: color, transform: [{ scale }] }]}>
                    <Text style={styles.icon}>{icon}</Text>
                </Animated.View>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const ActionMenu = ({ onFeed, onPlay, onSleep, onMiniGame }) => {
    return (
        <View style={styles.container}>
            <ActionButton icon="🍖" label="Besle" color="#FF9AA2" onPress={onFeed} />
            <ActionButton icon="🎾" label="Oyna" color="#FFDAC1" onPress={onPlay} />
            <ActionButton icon="💤" label="Uyut" color="#B5EAD7" onPress={onSleep} />
            <ActionButton icon="🎮" label="Oyun" color="#CDB4DB" onPress={onMiniGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingBottom: 30,
        backgroundColor: 'transparent',
    },
    actionWrap: {
        alignItems: 'center',
        width: 70,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 8,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    icon: {
        fontSize: 28,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default ActionMenu;
