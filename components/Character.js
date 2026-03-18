import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const Character = ({ mood, level, isSleeping, reaction, onPress }) => {
    const breath = useRef(new Animated.Value(1)).current;
    const blink = useRef(new Animated.Value(1)).current;
    const bounce = useRef(new Animated.Value(0)).current;

    // Floating Zzzs
    const zzz1 = useRef(new Animated.Value(0)).current;
    const zzz2 = useRef(new Animated.Value(0)).current;
    const tailWag = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Breathing loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(breath, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
                Animated.timing(breath, { toValue: 1, duration: 1500, useNativeDriver: true })
            ])
        ).start();

        // Tail wagging slowly
        Animated.loop(
            Animated.sequence([
                Animated.timing(tailWag, { toValue: 15, duration: 2000, useNativeDriver: true }),
                Animated.timing(tailWag, { toValue: -5, duration: 2000, useNativeDriver: true })
            ])
        ).start();
    }, []);

    useEffect(() => {
        if (isSleeping) return;
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(blink, { toValue: 0.1, duration: 120, useNativeDriver: true }),
                Animated.timing(blink, { toValue: 1, duration: 120, useNativeDriver: true })
            ]).start();
        }, 4000); // More natural blink speed
        return () => clearInterval(interval);
    }, [isSleeping]);

    useEffect(() => {
        if (isSleeping) {
            Animated.timing(blink, { toValue: 0.1, duration: 300, useNativeDriver: true }).start();
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(zzz1, { toValue: -30, duration: 1800, useNativeDriver: true }),
                        Animated.timing(zzz2, { toValue: -50, duration: 2200, useNativeDriver: true }),
                    ]),
                    Animated.parallel([
                        Animated.timing(zzz1, { toValue: 0, duration: 0, useNativeDriver: true }),
                        Animated.timing(zzz2, { toValue: 0, duration: 0, useNativeDriver: true }),
                    ])
                ])
            ).start();
        } else {
            Animated.timing(blink, { toValue: 1, duration: 200, useNativeDriver: true }).start();
            zzz1.setValue(0);
            zzz2.setValue(0);
        }
    }, [isSleeping]);

    useEffect(() => {
        if (reaction) {
            Animated.sequence([
                Animated.timing(bounce, { toValue: -35, duration: 200, useNativeDriver: true }),
                Animated.spring(bounce, { toValue: 0, friction: 3, tension: 60, useNativeDriver: true })
            ]).start();

            if (reaction === 'excited') {
                Animated.sequence([
                    Animated.timing(tailWag, { toValue: 40, duration: 150, useNativeDriver: true }),
                    Animated.timing(tailWag, { toValue: -20, duration: 150, useNativeDriver: true }),
                    Animated.timing(tailWag, { toValue: 0, duration: 150, useNativeDriver: true })
                ]).start();
            }
        }
    }, [reaction]);

    const handlePress = () => {
        if (onPress) onPress();
        Animated.sequence([
            Animated.timing(bounce, { toValue: 15, duration: 100, useNativeDriver: true }),
            Animated.spring(bounce, { toValue: 0, friction: 3, useNativeDriver: true })
        ]).start();
    };

    let mouth = 'w';
    if (mood === 'happy' || reaction === 'happy') mouth = '▽';
    if (mood === 'sad' || reaction === 'sad') mouth = '︵';
    if (isSleeping) mouth = 'o';
    if (reaction === 'excited') mouth = '∀';

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {level >= 7 && !isSleeping && (
                    <View style={styles.auraContainer}>
                        <Text style={styles.sparkle}>✨</Text>
                        <Text style={styles.sparkleLg}>⭐</Text>
                        <Text style={styles.sparkle}>✨</Text>
                    </View>
                )}

                {isSleeping && (
                    <View style={styles.zzzContainer}>
                        <Animated.Text style={[styles.zzz, { transform: [{ translateY: zzz1 }, { translateX: -15 }], opacity: zzz1.interpolate({ inputRange: [-30, 0], outputRange: [0, 1] }) }]}>z</Animated.Text>
                        <Animated.Text style={[styles.zzzLg, { transform: [{ translateY: zzz2 }, { translateX: 15 }], opacity: zzz2.interpolate({ inputRange: [-50, 0], outputRange: [0, 1] }) }]}>Z</Animated.Text>
                    </View>
                )}

                {/* Tail */}
                <Animated.View style={[styles.tail, { transform: [{ rotate: tailWag.interpolate({ inputRange: [-45, 45], outputRange: ['-45deg', '45deg'] }) }] }]} />

                <Animated.View style={[styles.bodyGroup, { transform: [{ scale: breath }, { translateY: bounce }] }]}>

                    <View style={styles.head}>
                        {/* Ears positioned absolutely on head */}
                        <View style={[styles.earFrame, styles.earLeft]}>
                            <View style={styles.innerEar} />
                        </View>
                        <View style={[styles.earFrame, styles.earRight]}>
                            <View style={styles.innerEar} />
                        </View>

                        <View style={styles.face}>
                            <View style={styles.eyesBox}>
                                <Animated.View style={[styles.eye, { transform: [{ scaleY: blink }] }]}>
                                    <View style={styles.shineLg} />
                                    <View style={styles.shineSm} />
                                </Animated.View>
                                <Animated.View style={[styles.eye, { transform: [{ scaleY: blink }] }]}>
                                    <View style={styles.shineLg} />
                                    <View style={styles.shineSm} />
                                </Animated.View>
                            </View>

                            <View style={styles.noseMouthBox}>
                                <View style={styles.nose} />
                                <Text style={styles.mouth}>{mouth}</Text>
                            </View>
                        </View>

                        {/* Whiskers */}
                        <View style={styles.whiskersL}>
                            <View style={[styles.whisker, { transform: [{ rotate: '-15deg' }] }]} />
                            <View style={styles.whisker} />
                            <View style={[styles.whisker, { transform: [{ rotate: '15deg' }] }]} />
                        </View>
                        <View style={styles.whiskersR}>
                            <View style={[styles.whisker, { transform: [{ rotate: '15deg' }] }]} />
                            <View style={styles.whisker} />
                            <View style={[styles.whisker, { transform: [{ rotate: '-15deg' }] }]} />
                        </View>
                    </View>

                    <View style={styles.pawsBox}>
                        <View style={styles.paw} />
                        <View style={styles.paw} />
                    </View>
                </Animated.View>

                <Animated.View style={[styles.shadow, { transform: [{ scale: breath.interpolate({ inputRange: [1, 1.02], outputRange: [1, 1.1] }) }] }]} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 380,
        width: 300,
    },
    bodyGroup: {
        alignItems: 'center',
        zIndex: 5,
    },
    auraContainer: {
        position: 'absolute',
        top: 30,
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    sparkle: { fontSize: 28 },
    sparkleLg: { fontSize: 36, marginTop: -20 },
    zzzContainer: {
        position: 'absolute',
        top: 40,
        right: 40,
        zIndex: 10,
    },
    zzz: { fontSize: 24, color: '#888', fontWeight: 'bold' },
    zzzLg: { fontSize: 34, color: '#888', fontWeight: 'bold' },

    tail: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        width: 30,
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#EAEAEA',
        zIndex: 1,
        transformOrigin: 'bottom',
    },
    head: {
        width: 240,
        height: 190,
        backgroundColor: '#FFFFFF',
        borderRadius: 120, // Complete oval
        borderWidth: 5,
        borderColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 8,
    },
    earFrame: {
        position: 'absolute',
        top: -30,
        width: 0, height: 0,
        borderLeftWidth: 35, borderRightWidth: 35, borderBottomWidth: 60,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFFFFF',
        zIndex: 4,
    },
    earLeft: {
        left: 10,
        transform: [{ rotate: '-25deg' }]
    },
    earRight: {
        right: 10,
        transform: [{ rotate: '25deg' }]
    },
    innerEar: {
        position: 'absolute',
        top: 20,
        left: -15, // centers inside the triangle
        width: 0, height: 0,
        borderLeftWidth: 15, borderRightWidth: 15, borderBottomWidth: 30,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFC8DD',
    },
    face: {
        alignItems: 'center',
        marginTop: 20,
        zIndex: 6,
    },
    eyesBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
        marginBottom: 5,
    },
    eye: {
        width: 35,
        height: 45,
        backgroundColor: '#A8D5BA', // Green eyes
        borderRadius: 17.5,
        position: 'relative',
        overflow: 'hidden',
    },
    shineLg: {
        position: 'absolute',
        top: 6, left: 6,
        width: 12, height: 16,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    shineSm: {
        position: 'absolute',
        bottom: 8, right: 8,
        width: 6, height: 6,
        backgroundColor: '#fff',
        borderRadius: 3,
    },
    noseMouthBox: {
        alignItems: 'center',
        marginTop: 5,
    },
    nose: {
        width: 0, height: 0,
        borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFC8DD',
        marginBottom: 2,
    },
    mouth: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 26,
    },
    whiskersL: {
        position: 'absolute',
        left: -20,
        top: 90,
        gap: 15,
    },
    whiskersR: {
        position: 'absolute',
        right: -20,
        top: 90,
        gap: 15,
    },
    whisker: {
        width: 40,
        height: 3,
        backgroundColor: '#DDD',
        borderRadius: 2,
    },
    pawsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130,
        marginTop: -20,
        zIndex: 6,
    },
    paw: {
        width: 50,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#EAEAEA',
    },
    shadow: {
        width: 200,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.06)',
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        zIndex: 1,
    },
});

export default Character;
