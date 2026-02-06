import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RecommendedCardProps {
    title: string;
    subtitle: string;
    price: number;
    imageUri: string;
    onAdd: () => void;
}

export const RecommendedCard: React.FC<RecommendedCardProps> = ({
    title,
    subtitle,
    price,
    imageUri,
    onAdd
}) => {
    const { isDark } = useTheme();
    const textColor = isDark ? Colors.dark.text : '#1A1A1A';
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : '#666';
    const cardBg = isDark ? Colors.dark.card : '#fff';
    const borderColor = isDark ? Colors.dark.border : '#EEE';

    return (
        <View style={[styles.container, { backgroundColor: cardBg, borderColor: borderColor }]}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.content}>
                <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={[styles.subtitle, { color: secondaryTextColor }]} numberOfLines={2}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Text style={[styles.price, { color: textColor }]}>${price}</Text>
                    <TouchableOpacity
                        style={[styles.addButton, { borderColor: borderColor }]}
                        onPress={onAdd}
                    >
                        <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 220,
        borderRadius: 16,
        marginRight: 16,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: '#F0F0F0',
    },
    content: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        marginBottom: 12,
        lineHeight: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    price: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
    addButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        minWidth: 70,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        color: '#6F4E37', // Brownish color from mockup
    },
});
