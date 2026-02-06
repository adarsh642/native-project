import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
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
    const { isDark } = useTheme();
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.imageContainer, isDark && styles.imageContainerDark, isActive && styles.activeImageContainer, isActive && isDark && styles.activeImageContainerDark]}>
                <MaterialIcons
                    name={icon}
                    size={28}
                    color={isActive ? (isDark ? Colors.dark.text : Colors.light.text) : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)}
                />
            </View>
            <Text style={[styles.title, isDark && styles.textSecondaryDark, isActive && styles.activeTitle, isActive && isDark && styles.textDark]}>{title}</Text>
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
    imageContainerDark: {
        backgroundColor: '#1E1E1E',
    },
    activeImageContainer: {
        backgroundColor: '#fff',
        borderColor: '#1A1A1A',
        borderWidth: 2,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    activeImageContainerDark: {
        backgroundColor: '#333',
        borderColor: '#FFF',
    },
    title: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
    },
    textDark: {
        color: '#FFF',
    },
    textSecondaryDark: {
        color: '#AAA',
    },
    activeTitle: {
        color: '#1A1A1A',
        fontFamily: 'Inter-Bold',
    },
});
