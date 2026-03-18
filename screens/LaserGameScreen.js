import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LaserGameScreen = ({ navigation, route }) => {
    const { onGameEnd } = route.params || {};
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(25);
    const [laserPos, setLaserPos] = useState({ x: width / 2, y: height / 2 });

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onGameEnd) onGameEnd(score * 4); // each catch gives 4 DP
            navigation.goBack();
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const mover = setInterval(() => {
            setLaserPos({
                x: Math.random() * (width - 60) + 10,
                y: Math.random() * (height - 300) + 100,
            });
        }, 800);
        return () => clearInterval(mover);
    }, [timeLeft]);

    const handleCatch = () => {
        setScore(s => s + 1);
        setLaserPos({
            x: Math.random() * (width - 60) + 10,
            y: Math.random() * (height - 300) + 100,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Skor: {score}</Text>
                <Text style={styles.title}>Süre: {timeLeft}s</Text>
            </View>

            <Text style={styles.subtitle}>Kırmızı lazeri yakala!</Text>

            <TouchableOpacity
                style={[styles.laser, { left: laserPos.x, top: laserPos.y }]}
                onPress={handleCatch}
                activeOpacity={0.2}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2b2b40' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#1E1B4B' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
    subtitle: { textAlign: 'center', color: '#FFF', opacity: 0.6, marginTop: 10 },
    laser: {
        position: 'absolute',
        width: 35, height: 35,
        borderRadius: 17.5,
        backgroundColor: '#FF3B30',
        shadowColor: '#FF3B30', shadowOpacity: 1, shadowRadius: 15, elevation: 15,
    }
});

export default LaserGameScreen;
