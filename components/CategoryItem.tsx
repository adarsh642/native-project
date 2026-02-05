import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryItemProps {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    isActive?: boolean;
    onPress: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ title, icon, isActive, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.imageContainer, isActive && styles.activeImageContainer]}>
                <MaterialIcons
                    name={icon}
                    size={28}
                    color={isActive ? '#4ECDC4' : '#666'}
                />
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
    title: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
        textAlign: 'center',
    },
    activeTitle: {
        color: '#4ECDC4',
        fontWeight: 'bold',
    },
});
