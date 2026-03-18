import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const EMOJIS = ['🍎', '🍉', '🍇', '🍓', '🥕', '🌽', '🥑', '🍔'];

const MemoryGameScreen = ({ navigation, route }) => {
    const { onGameEnd } = route.params || {};
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const shuffled = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((e, i) => ({ id: i, emoji: e }));
        setCards(shuffled);
    }, []);

    const handleCardPress = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setMatched(m => [...m, first, second]);
                setScore(s => s + 15);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 800);
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            setTimeout(() => {
                const total = score + Math.max(0, 50 - moves * 2);
                if (onGameEnd) onGameEnd(total);
                navigation.goBack();
            }, 1000);
        }
    }, [matched]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Puan: {score}</Text>
                <Text style={styles.title}>Hamle: {moves}</Text>
            </View>

            <View style={styles.grid}>
                {cards.map((card, idx) => {
                    const isFlipped = flipped.includes(idx) || matched.includes(idx);
                    return (
                        <TouchableOpacity
                            key={card.id}
                            style={[styles.card, isFlipped && styles.cardFlipped]}
                            onPress={() => handleCardPress(idx)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.emoji}>{isFlipped ? card.emoji : '❓'}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF3E0',
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
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        gap: 15,
        padding: 20,
    },
    card: {
        width: '20%',
        aspectRatio: 1,
        backgroundColor: '#CDB4DB',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 4,
    },
    cardFlipped: {
        backgroundColor: '#FFF',
    },
    emoji: {
        fontSize: 32,
    },
});

export default MemoryGameScreen;
