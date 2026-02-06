import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_RANGE = SCREEN_WIDTH - 64 - 60; // Container width (minus margins) - Button width

interface SwipeToPayProps {
    onSwipeComplete: () => void;
    totalAmount: number;
}

export const SwipeToPay: React.FC<SwipeToPayProps> = ({ onSwipeComplete, totalAmount }) => {
    const { isDark } = useTheme();
    const translateX = useSharedValue(0);

    useFocusEffect(
        React.useCallback(() => {
            // Reset the swipe button position strictly without spring if preferred, but usually a small spring is better.
            // However, "remove animation" might mean just the extra effects.
            translateX.value = 0;
        }, [translateX])
    );

    const gesture = Gesture.Pan()
        .onChange((event) => {
            const nextTranslateX = event.translationX;
            if (nextTranslateX >= 0 && nextTranslateX <= SWIPE_RANGE) {
                translateX.value = nextTranslateX;
            }
        })
        .onEnd((event) => {
            if (translateX.value > SWIPE_RANGE * 0.8) {
                translateX.value = withSpring(SWIPE_RANGE, { damping: 20 });
                runOnJS(Haptics.notificationAsync)(Haptics.NotificationFeedbackType.Success);
                runOnJS(onSwipeComplete)();
            } else {
                translateX.value = 0;
            }
        });

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: interpolate(
                    translateX.value,
                    [0, SWIPE_RANGE],
                    [0, SWIPE_RANGE],
                    Extrapolate.CLAMP
                )
            }],
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                translateX.value,
                [0, SWIPE_RANGE * 0.5],
                [1, 0],
                Extrapolate.CLAMP
            ),
        };
    });

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.track}>
                <Animated.Text style={[styles.swipeText, animatedTextStyle, isDark && styles.textDark]}>
                    Slide to pay ₹{totalAmount}
                </Animated.Text>
            </View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.swipeButton, animatedButtonStyle]}>
                    <MaterialIcons name="chevron-right" size={32} color="#FFF" />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: 30,
        padding: 4,
        position: 'relative',
        justifyContent: 'center',
        overflow: 'hidden', // Ensure clipping
    },
    containerDark: {
        backgroundColor: '#333',
    },
    track: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeText: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#666',
    },
    textDark: {
        color: '#AAA',
    },
    swipeButton: {
        width: 52,
        height: 52,
        backgroundColor: '#6E4CE5',
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
