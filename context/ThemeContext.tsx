import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const deviceColorScheme = useDeviceColorScheme();
    const [theme, setThemeState] = useState<ThemeMode>('system');

    useEffect(() => {
        // Load saved theme from storage
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme) {
                    setThemeState(savedTheme as ThemeMode);
                }
            } catch (e) {
                console.error('Failed to load theme from storage', e);
            }
        };
        loadTheme();
    }, []);

    const setTheme = async (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (e) {
            console.error('Failed to save theme to storage', e);
        }
    };

    const isDark = theme === 'system' ? deviceColorScheme === 'dark' : theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
