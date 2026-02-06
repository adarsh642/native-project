import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

const { width } = Dimensions.get('window');

interface CartNotificationProps {
    visible: boolean;
    message: string;
    onHide: () => void;
    onViewCart?: () => void;
}

export const CartNotification: React.FC<CartNotificationProps> = ({ visible, message, onHide, onViewCart }) => {
    const { isDark } = useTheme();
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(animatedValue, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 80,
                    friction: 8,
                }),
            ]).start();

            const timer = setTimeout(() => {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => onHide());
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible && (animatedValue as any)._value === 0) return null;

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 60],
    });

    const scale = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 1.05, 1],
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ translateY }, { scale }],
                },
            ]}
        >
            <BlurView
                intensity={Platform.OS === 'ios' ? 40 : 100}
                tint={isDark ? 'dark' : 'light'}
                style={styles.blurContainer}
            >
                <View style={styles.content}>
                    <View style={styles.mainInfo}>
                        <View style={[styles.iconBox, { backgroundColor: isDark ? '#FFFFFF' : '#000000' }]}>
                            <IconSymbol name="checkmark.circle.fill" size={16} color={isDark ? '#000000' : '#FFFFFF'} />
                        </View>
                        <Text style={[styles.text, { color: isDark ? '#FFFFFF' : '#000000' }]} numberOfLines={1}>
                            {message}
                        </Text>
                    </View>

                    {onViewCart && (
                        <TouchableOpacity
                            style={[styles.viewCartButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}
                            onPress={() => {
                                onViewCart();
                                onHide();
                            }}
                        >
                            <Text style={[styles.viewCartText, { color: isDark ? '#FFFFFF' : '#000000' }]}>View Cart</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </BlurView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 9999,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        alignItems: 'center',
    },
    blurContainer: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    iconBox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    text: {
        fontSize: 13,
        fontFamily: 'Inter-Bold',
        letterSpacing: -0.2,
        flex: 1,
    },
    viewCartButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    viewCartText: {
        fontSize: 11,
        fontFamily: 'Inter-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
