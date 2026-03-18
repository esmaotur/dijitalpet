import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const MiniGameScreen = ({ navigation, route }) => {
    const { onGameEnd } = route.params || {};
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [apples, setApples] = useState([]);
    const [gameActive, setGameActive] = useState(true);

    // Timer
    useEffect(() => {
        if (!gameActive) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameActive]);

    // Falling objects spawner
    useEffect(() => {
        if (!gameActive) return;
        const interval = setInterval(() => {
            const newApple = {
                id: Math.random().toString(),
                x: Math.random() * (width - 60) + 10,
                y: -50,
            };
            setApples((prev) => [...prev, newApple]);
        }, 700);
        return () => clearInterval(interval);
    }, [gameActive]);

    // Object falling loop
    useEffect(() => {
        if (!gameActive) return;
        let frame;
        const updatePhysics = () => {
            setApples((prevApples) => {
                let missedCount = 0;
                const updated = [];
                prevApples.forEach((apple) => {
                    const newY = apple.y + 3;
                    if (newY > height - 50) {
                        missedCount++;
                    } else {
                        updated.push({ ...apple, y: newY });
                    }
                });

                if (missedCount > 0) {
                    setScore(s => Math.max(0, s - missedCount * 2));
                }
                return updated;
            });
            frame = requestAnimationFrame(updatePhysics);
        };
        frame = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(frame);
    }, [gameActive]);

    const catchApple = (id) => {
        if (!gameActive) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setApples(prev => prev.filter(a => a.id !== id));
        setScore(s => s + 5);
    };

    const finishGame = () => {
        if (onGameEnd) {
            onGameEnd(score);
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Skor: {score}</Text>
                <Text style={styles.title}>Süre: {timeLeft}s</Text>
            </View>

            <View style={styles.gameArea}>
                {apples.map((apple) => (
                    <TouchableOpacity
                        key={apple.id}
                        style={[styles.apple, { left: apple.x, top: apple.y }]}
                        onPress={() => catchApple(apple.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.appleText}>🍎</Text>
                    </TouchableOpacity>
                ))}

                {!gameActive && (
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.gameOverText}>Oyun Bitti!</Text>
                        <Text style={styles.finalScoreText}>Kazanılan DP: {score}</Text>
                        <TouchableOpacity style={styles.button} onPress={finishGame}>
                            <Text style={styles.buttonText}>Ödülü Al ve Dön</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    gameArea: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    apple: {
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appleText: {
        fontSize: 40,
    },
    gameOverContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    gameOverText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    finalScoreText: {
        fontSize: 20,
        color: '#A8D5BA',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#CDB4DB',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MiniGameScreen;
