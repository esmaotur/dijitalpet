import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AchievementBadge = ({ title, completed }) => {
    return (
        <View style={[styles.badge, completed ? styles.completed : styles.locked]}>
            <Text style={[styles.text, completed ? styles.completedText : styles.lockedText]}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completed: {
        backgroundColor: '#FFC8DD',
        borderWidth: 1,
        borderColor: '#FFAFCC',
    },
    locked: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
    completedText: {
        color: '#D46A94',
    },
    lockedText: {
        color: '#AAA',
    },
});

export default AchievementBadge;
