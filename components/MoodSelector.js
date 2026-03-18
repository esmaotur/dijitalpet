import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const moods = [
    { id: 'happy', emoji: '😊' },
    { id: 'sad', emoji: '😢' },
    { id: 'sleepy', emoji: '😴' },
    { id: 'energetic', emoji: '⚡' },
];

const MoodSelector = ({ currentMood, onSelect }) => {
    return (
        <View style={styles.container}>
            {moods.map((mood) => (
                <TouchableOpacity
                    key={mood.id}
                    style={[styles.moodBtn, currentMood === mood.id && styles.selected]}
                    onPress={() => onSelect(mood.id)}
                >
                    <Text style={styles.emoji}>{mood.emoji}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    moodBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selected: {
        borderColor: '#CDB4DB',
        backgroundColor: '#EFD9F2',
    },
    emoji: {
        fontSize: 22,
    },
});

export default MoodSelector;
