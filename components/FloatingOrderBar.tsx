import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingOrderBarProps {
    itemCount: number;
    totalPrice: number;
    onPress: () => void;
}

export const FloatingOrderBar: React.FC<FloatingOrderBarProps> = ({ itemCount, totalPrice, onPress }) => {
    if (itemCount === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.infoContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{itemCount}</Text>
                    </View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>View Cart</Text>
                    {/* You could add an icon here */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 150,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderRadius: 35,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#FF6B6B',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    totalLabel: {
        color: '#888',
        fontSize: 14,
        marginRight: 8,
    },
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
