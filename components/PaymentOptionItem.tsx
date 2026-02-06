import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface PaymentOptionItemProps {
    icon: any;
    title: string;
    iconBg: string;
    onPress?: () => void;
}

export const PaymentOptionItem: React.FC<PaymentOptionItemProps> = ({
    icon,
    title,
    iconBg,
    onPress
}) => {
    const { isDark } = useTheme();
    const textColor = isDark ? Colors.dark.text : '#1A1A1A';

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
                <IconSymbol name={icon} size={20} color="#fff" />
            </View>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <IconSymbol name="chevron.right" size={16} color={isDark ? Colors.dark.textSecondary : '#ccc'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: '#f1f5f9', // Updated to soft grey
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
        letterSpacing: -0.2,
    }
});
