import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

interface CategoryItemProps {
    title: string;
    imageUri: string;
    isActive?: boolean;
    onPress: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ title, imageUri, isActive, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.imageContainer, isActive && styles.activeImageContainer]}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
            <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 20,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeImageContainer: {
        backgroundColor: '#fff',
        borderColor: '#4ECDC4',
        borderWidth: 2,
        elevation: 4,
        shadowColor: '#4ECDC4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
    activeTitle: {
        color: '#4ECDC4',
        fontWeight: 'bold',
    },
});
