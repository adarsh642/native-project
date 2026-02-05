import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconSymbol } from './ui/icon-symbol';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    // Filter out unwanted routes
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
                                size={20} // Slightly more compact icons
                                name={iconName}
                                color={isFocused ? '#fff' : '#888'}
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
        bottom: 25, // Slightly lower
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderRadius: 40, // Increased for full circular ends
        paddingVertical: 12, // Increased from 6 
        paddingHorizontal: 15,
        width: Dimensions.get('window').width * 0.85, // WIDER bar (85%)
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
