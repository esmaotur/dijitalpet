import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileCard = ({ stats }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Profil</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Seviye {stats.level}</Text>
                <Text style={styles.label}>{stats.xp} XP</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>🔥 Seri: {stats.streak} gün</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#CDB4DB',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileCard;
