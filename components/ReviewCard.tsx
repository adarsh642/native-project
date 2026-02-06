import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ReviewCardProps {
    name: string;
    review: string;
    rating: number;
    avatarUri: string;
    comment?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
    name,
    review,
    rating,
    avatarUri,
    comment
}) => {
    const { isDark } = useTheme();
    const textColor = isDark ? Colors.dark.text : '#1A1A1A';
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : '#666';
    const cardBg = isDark ? Colors.dark.card : '#fff';
    const borderColor = isDark ? Colors.dark.border : '#EEE';

    return (
        <View style={[styles.container, { backgroundColor: cardBg, borderColor: borderColor }]}>
            <View style={styles.header}>
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
                <View style={styles.nameContainer}>
                    <Text style={[styles.name, { color: textColor }]}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        {[...Array(5)].map((_, i) => (
                            <Text key={i} style={[styles.star, { color: i < rating ? '#FFB800' : '#DDD' }]}>★</Text>
                        ))}
                        <Text style={[styles.ratingValue, { color: secondaryTextColor }]}>{rating}</Text>
                    </View>
                </View>
            </View>
            <Text style={[styles.review, { color: textColor }]} numberOfLines={2}>
                {review}
            </Text>
            {comment && (
                <View style={styles.commentContainer}>
                    <Text style={styles.starSmall}>★ {rating}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 240,
        borderRadius: 16,
        padding: 16,
        marginRight: 16,
        borderWidth: 1,
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    nameContainer: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 12,
    },
    ratingValue: {
        fontSize: 11,
        marginLeft: 4,
        fontFamily: 'Inter-Medium',
    },
    review: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        lineHeight: 18,
    },
    commentContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    starSmall: {
        fontSize: 12,
        color: '#FFB800',
        fontFamily: 'Inter-Bold',
    }
});
