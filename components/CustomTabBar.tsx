import { useTheme } from '@/context/ThemeContext';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { isDark } = useTheme();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsVisible(false));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsVisible(true));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (!isVisible) return null;

    return (
        <View style={styles.container}>
            <View style={[styles.content, { backgroundColor: isDark ? '#222' : '#1A1A1A' }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    if (!['index', 'bookings', 'cart', 'account'].includes(route.name)) {
                        return null;
                    }

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName: any = 'house.fill';
                    if (route.name === 'index') iconName = 'house.fill';
                    else if (route.name === 'bookings') iconName = 'calendar.fill';
                    else if (route.name === 'cart') iconName = 'cart.fill';
                    else if (route.name === 'account') iconName = 'person.fill';

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={(options as any).tabBarTestID}
                            onPress={onPress}
                            style={styles.tabButton}
                        >
                            <IconSymbol
                                size={20}
                                name={iconName}
                                color={isFocused ? '#FFF' : '#888'}
                            />
                            {isFocused && <View style={styles.dot} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        borderRadius: 40,
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: Dimensions.get('window').width * 0.85,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#fff',
        marginTop: 2,
    },
});
