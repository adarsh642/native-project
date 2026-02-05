import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ServiceCardProps {
    title: string;
    rating: number;
    price: number;
    imageUri: string;
    onAdd: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, rating, price, imageUri, onAdd }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ {rating}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.price}>Starts at ${price}</Text>

                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginRight: 16,
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        elevation: 1,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 4,
        height: 38, // Fixed height for 2 lines
    },
    price: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 6,
    },
    addButtonText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
    },
});
