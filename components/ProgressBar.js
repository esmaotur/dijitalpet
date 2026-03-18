import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ label, progress, color }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{Math.round(progress)}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    label: {
        width: 60,
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
    },
    barBackground: {
        flex: 1,
        height: 12,
        backgroundColor: '#EAEAEA',
        borderRadius: 6,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
    value: {
        width: 35,
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
});

export default ProgressBar;
