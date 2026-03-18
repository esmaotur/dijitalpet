import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

const ActionButton = ({ title, onPress, color = '#A8D5BA' }) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (onPress) onPress();
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ActionButton;
