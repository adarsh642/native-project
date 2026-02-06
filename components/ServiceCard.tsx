import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ServiceCardProps {
    title: string;
    rating: number;
    price: number;
    imageUri: string;
    onAdd: () => void;
    onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, rating, price, imageUri, onAdd, onPress }) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.container, isDark && styles.containerDark]}
        >
            <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={[styles.ratingBadge, { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#fff' }]}>
                    <Text style={[styles.ratingText, { color: isDark ? Colors.dark.text : '#1A1A1A' }]}>★ {rating}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={[styles.title, isDark && styles.textDark]} numberOfLines={2}>{title}</Text>
                <Text style={[styles.price, isDark && styles.textSecondaryDark]}>Starts at ₹{price}</Text>

                <TouchableOpacity
                    style={[styles.addButton, isDark && styles.addButtonDark]}
                    onPress={(e) => {
                        e.stopPropagation();
                        onAdd();
                    }}
                >
                    <Text style={[styles.addButtonText, isDark && styles.addButtonTextDark]}>Add</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
    containerDark: {
        backgroundColor: '#1E1E1E',
        elevation: 0,
    },
    textDark: {
        color: '#FFF',
    },
    textSecondaryDark: {
        color: '#AAA',
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainerDark: {
        backgroundColor: '#333',
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
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginBottom: 4,
        height: 38,
    },
    price: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
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
    addButtonDark: {
        backgroundColor: '#222',
        borderColor: '#444',
    },
    addButtonText: {
        color: '#6F4E37',
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    addButtonTextDark: {
        color: '#D2B48C',
    },
});
