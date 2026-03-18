import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Alert, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import TopStats from '../components/TopStats';
import ActionMenu from '../components/ActionMenu';
import FloatingParticles from '../components/FloatingParticles';
import CuteAlert from '../components/CuteAlert';
import { loadPetData, savePetData } from '../utils/storage';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const SpeechBubble = ({ text, visible }) => {
    if (!visible || !text) return null;
    return (
        <View style={styles.speechContainer}>
            <View style={styles.speechBubble}>
                <Text style={styles.speechText}>{text}</Text>
            </View>
            <View style={styles.speechTail} />
        </View>
    );
};

const HomeScreen = () => {
    const [petData, setPetData] = useState(null);
    const [reaction, setReaction] = useState(null);
    const [isSleeping, setIsSleeping] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '', buttons: [] });

    // Speech states
    const [speech, setSpeech] = useState('');
    const [speechVisible, setSpeechVisible] = useState(false);

    const particlesRef = useRef(null);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const imageBounce = useRef(new Animated.Value(0)).current;
    const zzz1 = useRef(new Animated.Value(0)).current;
    const zzz2 = useRef(new Animated.Value(0)).current;

    const showAlert = (title, message, buttons = [{ text: 'Tamam', onPress: () => closeAlert() }]) => {
        setAlertConfig({ visible: true, title, message, buttons });
    };
    const closeAlert = () => setAlertConfig(prev => ({ ...prev, visible: false }));

    const say = (text, ms = 3500) => {
        setSpeech(text);
        setSpeechVisible(true);
        setTimeout(() => setSpeechVisible(false), ms);
    };

    useEffect(() => {
        if (isFocused) loadData();
    }, [isFocused]);

    useEffect(() => {
        if (isSleeping) {
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(zzz1, { toValue: -40, duration: 2000, useNativeDriver: true }),
                        Animated.timing(zzz2, { toValue: -60, duration: 2500, useNativeDriver: true }),
                    ]),
                    Animated.parallel([
                        Animated.timing(zzz1, { toValue: 0, duration: 0, useNativeDriver: true }),
                        Animated.timing(zzz2, { toValue: 0, duration: 0, useNativeDriver: true }),
                    ])
                ])
            ).start();
        } else {
            zzz1.setValue(0);
            zzz2.setValue(0);
        }
    }, [isSleeping]);

    const bounceImage = () => {
        Animated.sequence([
            Animated.timing(imageBounce, { toValue: -20, duration: 150, useNativeDriver: true }),
            Animated.spring(imageBounce, { toValue: 0, friction: 3, tension: 40, useNativeDriver: true })
        ]).start();
    };

    const triggerReaction = (type, ms = 2500) => {
        setReaction(type);
        bounceImage();
        Haptics.notificationAsync(
            type === 'sad' ? Haptics.NotificationFeedbackType.Error : Haptics.NotificationFeedbackType.Success
        );
        setTimeout(() => setReaction(null), ms);
    };

    const loadData = async () => {
        let data = await loadPetData();
        if (!data.name) data.name = 'Mimi';
        if (data.energy === undefined) data.energy = 100;
        if (data.coins === undefined) data.coins = 0;

        const lastLoginDate = new Date(data.lastLogin);
        const today = new Date();

        if (lastLoginDate.getDate() !== today.getDate() || lastLoginDate.getMonth() !== today.getMonth() || lastLoginDate.getFullYear() !== today.getFullYear()) {
            const diffTime = Math.abs(today - lastLoginDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                data.streak += 1;
                if (data.streak === 3) showAlert('🔥 3 Günlük Seri!', '+50 DP Kazandın!');
                if (data.streak === 7) showAlert('🏅 7 Günlük Seri!', 'Özel Rozet Kazandın!');
                if (data.streak === 14) showAlert('💎 14 Günlük Seri!', 'Nadir Ödül Kazandın!');
                if (data.streak === 3) data.xp += 50;
            } else {
                data.streak = 1;
                showAlert('Seri Bozuldu', 'Petini uzun zamandır ziyaret etmedin. Serin sıfırlandı.');
                triggerReaction('sad');
            }

            data.hunger = Math.max(0, data.hunger - 20);
            data.happiness = Math.max(0, data.happiness - 20);
            data.energy = Math.max(0, data.energy - 10);
        }

        data.lastLogin = today.toISOString();
        setPetData(data);
        savePetData(data);
        say(`Hoş geldin! Seni çok özledim. 😻`);
    };

    useEffect(() => {
        if (!petData) return;
        const interval = setInterval(() => {
            setPetData(prev => {
                if (!prev) return prev;
                const next = { ...prev };

                if (isSleeping) {
                    next.energy = Math.min(100, next.energy + 25);
                    next.hunger = Math.max(0, next.hunger - 2);
                } else {
                    next.hunger = Math.max(0, next.hunger - 1);
                    next.happiness = Math.max(0, next.happiness - 1);
                }

                savePetData(next);
                return next;
            });

            if (!isSleeping) {
                const rand = Math.random();
                if (rand < 0.05) {
                    showAlert('🎁 Sürpriz!', `${petData.name} hediye buldu! (+10 Mutluluk)`);
                    updateState({ happiness: Math.min(100, petData.happiness + 10) }, false);
                    triggerReaction('excited');
                } else if (rand < 0.2) {
                    const idles = ["Hadi biraz oyun oynayalım! 🧶", "Acıktım sanki... 🍗", "Seni çok seviyorum! 💖", "Bugün çok enerjik hissediyorum! ✨"];
                    say(idles[Math.floor(Math.random() * idles.length)]);
                }
            }
        }, 20000);
        return () => clearInterval(interval);
    }, [petData, isSleeping]);

    const updateState = (updates, isFromAction = true) => {
        setPetData(prev => {
            if (!prev) return prev;
            const next = { ...prev, ...updates };

            if (next.xp >= next.level * 100) {
                next.xp -= next.level * 100;
                next.level += 1;
                if (isFromAction) {
                    showAlert('🎉 TEBRİKLER!', `${next.name} seviye atladı! Artık ${next.level}. Seviye!`);
                    triggerReaction('excited', 4000);
                    say(`Yaşasın! ${next.level}. Seviyeye geçtim! 🎉`, 5000);
                }
            }

            savePetData(next);
            return next;
        });
    };

    const handleFeed = () => {
        if (isSleeping) return showAlert('Şşş!', `${petData.name} uyuyor.`);
        if (petData.hunger >= 100) return showAlert('Tok!', `${petData.name} hiç aç değil.`);

        updateState({
            hunger: Math.min(100, petData.hunger + 15),
            xp: petData.xp + 5
        });
        triggerReaction('happy');
        say("Mmmm... Çok lezzetli! Teşekkürler! 🥣");
        if (particlesRef.current) particlesRef.current.spawn('food', 3, null, height / 2 - 150);
    };

    const handlePlay = () => {
        if (isSleeping) return showAlert('Şşş!', `${petData.name} uyuyor.`);
        if (petData.energy <= 10) return showAlert('Çok Yorgun', `${petData.name} oynamak için fazla yorgun. Uyutmalısın.`);

        updateState({
            happiness: Math.min(100, petData.happiness + 15),
            energy: Math.max(0, petData.energy - 10),
            hunger: Math.max(0, petData.hunger - 5),
            xp: petData.xp + 10
        });
        triggerReaction('excited');
        say("Oley! Oyun zamanı! 🧶");
        if (particlesRef.current) particlesRef.current.spawn('heart', 4);
    };

    const handleToggleSleep = () => {
        setIsSleeping(!isSleeping);
        if (!isSleeping) {
            triggerReaction('happy', 1000);
            say("İyi geceler... Tatlı rüyalar! Zzz 🌙");
            updateState({ xp: petData.xp + 10 }); // Gain XP for putting to sleep
        } else {
            triggerReaction('excited', 2000);
            say("Günaydın! Harika uyumuşum! ☀️");
            updateState({ xp: petData.xp + 15 }); // Gain XP for waking up
        }
    };

    const handleTap = () => {
        triggerReaction('happy', 1000);
        const phrases = ["Seni çok seviyorum! 💖", "Miyav! Daha çok sev!", "Çok tatlısın! 🐾", "Hep benimle kal..."];
        say(phrases[Math.floor(Math.random() * phrases.length)]);
    };

    const handleGameMenu = () => {
        if (isSleeping) return showAlert('Şşş!', `${petData.name} uyuyor.`);
        if (petData.energy <= 10) return showAlert('Çok Yorgun', `${petData.name} oyun oynamak için enerjisi yok.`);

        say("Hangi oyunu oynayalım? 🎮");
        showAlert('Oyun Arcade', 'Lütfen mini oyunu seçin:', [
            { text: '🍎 Elma Yakala', color: '#FF9AA2', onPress: () => openMiniGame('MiniGame') },
            { text: '🧠 Hafıza Gücü', color: '#B5EAD7', onPress: () => openMiniGame('MemoryGame') },
            { text: '🔴 Lazer Yakala', color: '#FFB7B2', onPress: () => openMiniGame('LaserGame') },
            { text: 'İptal', color: '#CCC', onPress: () => closeAlert() }
        ]);
    };

    const openMiniGame = (gameRoute) => {
        closeAlert();
        updateState({ energy: Math.max(0, petData.energy - 10) });

        navigation.navigate(gameRoute, {
            onGameEnd: (score) => {
                if (score > 0) {
                    showAlert('Oyun Bitti!', `Süper! Toplam ${score} DP kazandın!`);
                    say(`Oyun çok zevkliydi! Skoruma bak: ${score} 🎉`);
                    updateState({
                        xp: petData.xp + score,
                        happiness: Math.min(100, petData.happiness + 20),
                        coins: petData.coins + Math.floor(score / 2)
                    }, true);
                    triggerReaction('excited');
                } else {
                    updateState({ happiness: Math.max(0, petData.happiness - 5) }, true);
                    triggerReaction('sad');
                    say("Hiç puan alamadık... Bir dahakine! 😢");
                }
            }
        });
    };

    if (!petData) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <Text>Karakter Dünyası Yükleniyor...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, isSleeping && styles.sleepingRoom]}>
            {/* Custom Alert Overlay */}
            <CuteAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                buttons={alertConfig.buttons}
                onClose={closeAlert}
            />

            <View style={styles.topHud}>
                <TopStats
                    hunger={petData.hunger}
                    happiness={petData.happiness}
                    energy={petData.energy}
                    level={petData.level}
                    coins={petData.coins}
                />
            </View>

            <View style={styles.worldArea}>
                <View style={styles.rug} />

                {isSleeping && (
                    <View style={styles.zzzContainer}>
                        <Animated.Text style={[styles.zzz, { transform: [{ translateY: zzz1 }, { translateX: -20 }], opacity: zzz1.interpolate({ inputRange: [-40, 0], outputRange: [0, 1] }) }]}>z</Animated.Text>
                        <Animated.Text style={[styles.zzzLg, { transform: [{ translateY: zzz2 }, { translateX: 20 }], opacity: zzz2.interpolate({ inputRange: [-60, 0], outputRange: [0, 1] }) }]}>Z</Animated.Text>
                    </View>
                )}

                <SpeechBubble text={speech} visible={speechVisible} />

                <TouchableWithoutFeedback onPress={handleTap}>
                    <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: imageBounce }] }]}>
                        <Image source={require('../assets/cat.jpg')} style={styles.catImage} resizeMode="cover" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.bottomDock}>
                <ActionMenu
                    onFeed={handleFeed}
                    onPlay={handlePlay}
                    onSleep={handleToggleSleep}
                    onMiniGame={handleGameMenu}
                />
            </View>

            <FloatingParticles ref={particlesRef} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF3E0',
    },
    sleepingRoom: {
        backgroundColor: '#2b2b40',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topHud: {
        zIndex: 10,
    },
    worldArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    // Speech Bubble Styles
    speechContainer: {
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        zIndex: 50,
        alignItems: 'center',
    },
    speechBubble: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#FFC8DD',
        shadowColor: '#FFC8DD',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 4,
        maxWidth: 200,
    },
    speechText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    speechTail: {
        width: 0, height: 0,
        borderLeftWidth: 10, borderRightWidth: 10, borderTopWidth: 15,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'white',
        marginTop: -2,
        zIndex: 21,
    },
    rug: {
        position: 'absolute',
        bottom: 20,
        width: 250,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 125,
        transform: [{ scaleY: 0.5 }],
    },
    zzzContainer: {
        position: 'absolute',
        top: 50,
        right: 50,
        zIndex: 10,
    },
    zzz: { fontSize: 24, color: '#888', fontWeight: 'bold' },
    zzzLg: { fontSize: 34, color: '#888', fontWeight: 'bold' },
    imageWrapper: {
        width: 250,
        height: 250,
        borderRadius: 125,
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 8,
        zIndex: 5,
    },
    catImage: {
        width: '100%',
        height: '100%',
    },
    bottomDock: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
});

export default HomeScreen;
