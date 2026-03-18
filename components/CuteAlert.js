import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CuteAlert = ({ visible, title, message, buttons, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.btnRow}>
                        {buttons?.map((b, i) => (
                            <TouchableOpacity key={i} style={[styles.btn, { backgroundColor: b.color || '#CDB4DB' }]} onPress={() => { if (b.onPress) b.onPress(); if (onClose) onClose(); }}>
                                <Text style={styles.btnText}>{b.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 25,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#CDB4DB',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 10,
        width: '100%',
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
        marginVertical: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CuteAlert;
