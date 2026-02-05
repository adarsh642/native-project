import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
    title: string;
    description: string;
    price: number;
    imageUri: string;
    rating?: number;
    onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, price, imageUri, rating, onAdd }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    {rating && (
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>★ {rating}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.description} numberOfLines={2}>{description}</Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 16,
        padding: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    ratingContainer: {
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    rating: {
        fontSize: 12,
        color: '#FBC02D',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    addButton: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 14,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
