import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const StatBar = ({ icon, value, color }) => {
    const animatedWidth = useRef(new Animated.Value(value)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: value,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [value]);

    return (
        <View style={styles.barContainer}>
            <View style={styles.iconBox}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={styles.track}>
                <Animated.View style={[styles.fill, { backgroundColor: color, width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
            </View>
        </View>
    );
};

const TopStats = ({ hunger, happiness, energy, level, coins }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.pill}>
                    <Text style={styles.pillText}>⭐ Svy {level}</Text>
                </View>
                <View style={styles.pill}>
                    <Text style={styles.pillText}>🪙 {coins}</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <StatBar icon="🍖" value={hunger} color="#FF9AA2" />
                <StatBar icon="🎾" value={happiness} color="#FFDAC1" />
                <StatBar icon="⚡" value={energy} color="#E2F0CB" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    pill: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    pillText: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
    },
    statsRow: {
        flexDirection: 'column',
        gap: 8,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
    },
    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        fontSize: 16,
    },
    track: {
        flex: 1,
        height: 14,
        backgroundColor: '#EAEAEA',
        borderRadius: 7,
        overflow: 'hidden',
        marginRight: 10,
    },
    fill: {
        height: '100%',
        borderRadius: 7,
    },
});

export default TopStats;
