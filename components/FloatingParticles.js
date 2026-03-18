import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Particle = ({ type, startX, startY, onComplete }) => {
    const translateY = useRef(new Animated.Value(startY)).current;
    const translateX = useRef(new Animated.Value(startX)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        let anim;
        // Slight random drift
        const drift = startX + (Math.random() * 60 - 30);

        if (type === 'heart') {
            anim = Animated.parallel([
                Animated.timing(translateY, { toValue: startY - 150, duration: 1200, useNativeDriver: true }),
                Animated.timing(translateX, { toValue: drift, duration: 1200, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 1200, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true })
            ]);
        } else if (type === 'food') {
            anim = Animated.parallel([
                Animated.timing(translateY, { toValue: startY + 180, duration: 900, useNativeDriver: true }),
                Animated.timing(translateX, { toValue: drift, duration: 900, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1.2, friction: 4, useNativeDriver: true })
            ]);
        }

        if (anim) {
            anim.start(() => onComplete());
        }
    }, []);

    return (
        <Animated.View style={[styles.particle, { transform: [{ translateY }, { translateX }, { scale }], opacity }]}>
            <Text style={styles.text}>{type === 'heart' ? '💖' : '🍎'}</Text>
        </Animated.View>
    );
};

const FloatingParticles = forwardRef((props, ref) => {
    const [particles, setParticles] = useState([]);

    useImperativeHandle(ref, () => ({
        spawn: (type, count = 1, fixedX, fixedY) => {
            const newParticles = Array.from({ length: count }).map(() => ({
                id: Math.random().toString(),
                type,
                x: fixedX || (width / 2 - 20 + (Math.random() * 60 - 30)),
                y: fixedY || (height / 2 + (Math.random() * 60 - 30))
            }));
            setParticles(prev => [...prev, ...newParticles]);
        }
    }));

    const removeParticle = (id) => {
        setParticles(prev => prev.filter(p => p.id !== id));
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {particles.map(p => (
                <Particle key={p.id} type={p.type} startX={p.x} startY={p.y} onComplete={() => removeParticle(p.id)} />
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    particle: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
    },
    text: {
        fontSize: 40,
    }
});

export default FloatingParticles;
