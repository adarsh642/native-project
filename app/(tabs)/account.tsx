import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS = [
    { id: '1', title: 'Profile', icon: 'person-outline' },
    { id: '2', title: 'My Bookings', icon: 'history' },
    { id: '3', title: 'Manage Addresses', icon: 'location-on' },
    { id: '4', title: 'Payment Methods', icon: 'credit-card' },
    { id: '5', title: 'Settings', icon: 'settings' },
    { id: '6', title: 'Help & Support', icon: 'help-outline' },
    { id: '7', title: 'About / Legal', icon: 'info-outline' },
    { id: '8', title: 'Refer & Earn', icon: 'card-giftcard' },
];

const SETTINGS_SECTIONS = [
    {
        id: '1',
        title: 'Account & Security',
        icon: 'security',
        items: [
            { id: '1-1', title: 'Change password', type: 'link' },
            { id: '1-2', title: 'Logout from all devices', type: 'link' },
            { id: '1-3', title: 'Delete account', type: 'link', isDanger: true },
        ],
    },
    {
        id: '2',
        title: 'Notifications',
        icon: 'notifications-none',
        items: [
            { id: 'bookingUpdates', title: 'Booking updates', type: 'toggle' },
            { id: 'serviceReminders', title: 'Service reminders', type: 'toggle' },
            { id: 'offersPromotions', title: 'Offers & promotions', type: 'toggle' },
            { id: 'whatsappNotifications', title: 'WhatsApp notifications', type: 'toggle' },
            { id: 'smsNotifications', title: 'SMS notifications', type: 'toggle' },
            { id: 'emailNotifications', title: 'Email notifications', type: 'toggle' },
        ],
    },
    {
        id: '3',
        title: 'App Preferences',
        icon: 'language',
        items: [
            { id: '3-1', title: 'App language', type: 'link' },
            { id: 'darkMode', title: 'Dark mode', type: 'toggle' },
        ],
    },
    {
        id: '4',
        title: 'Invoices & Documents',
        icon: 'description',
        items: [
            { id: '4-1', title: 'Download service invoices', type: 'link' },
        ],
    },
];

export default function AccountScreen() {
    const { theme, setTheme, isDark } = useTheme();
    const [view, setView] = useState<'menu' | 'settings'>('menu');
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        bookingUpdates: true,
        serviceReminders: true,
        offersPromotions: false,
        whatsappNotifications: true,
        smsNotifications: false,
        emailNotifications: true,
    });

    const handleMenuItemPress = (id: string) => {
        if (id === '5') {
            setView('settings');
        }
    };

    const handleToggle = (id: string) => {
        if (id === 'darkMode') {
            setTheme(isDark ? 'light' : 'dark');
        } else {
            setToggles(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };

    const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
    const textColor = isDark ? Colors.dark.text : Colors.light.text;
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
    const borderColor = isDark ? Colors.dark.border : Colors.light.border;
    const sectionBg = isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary;

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <View style={[styles.header, isDark && styles.headerDark]}>
                {view === 'settings' ? (
                    <TouchableOpacity onPress={() => setView('menu')} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color={iconColor} />
                        <Text style={[styles.headerTitle, isDark && styles.textDark]}>Settings</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={[styles.headerTitle, isDark && styles.textDark]}>Account</Text>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {view === 'menu' ? (
                    <>

                        <View style={[styles.profileSection, isDark && styles.profileSectionDark]}>
                            <View style={styles.profileHeaderContainer}>
                                <View style={[styles.profilePicContainer, isDark && styles.profilePicContainerDark]}>
                                    <MaterialIcons name="person" size={40} color={iconColor} />
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text style={[styles.userName, isDark && styles.textDark]}>Adarsh Singh</Text>
                                    <Text style={[styles.userPhone, isDark && styles.textSecondaryDark]}>+91 98765 43210</Text>
                                    <Text style={[styles.userEmail, isDark && styles.textSecondaryDark]}>adarsh@example.com</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.menuList}>
                            {MENU_ITEMS.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.menuItem, isDark && styles.menuItemDark]}
                                    onPress={() => handleMenuItemPress(item.id)}
                                >
                                    <View style={styles.menuItemLeft}>
                                        <MaterialIcons name={item.icon as any} size={24} color={iconColor} />
                                        <Text style={[styles.menuItemTitle, isDark && styles.textDark]}>{item.title}</Text>
                                    </View>
                                    <MaterialIcons name="chevron-right" size={24} color={isDark ? "#555" : "#CCC"} />
                                </TouchableOpacity>
                            ))}
                        </View>


                        <View style={styles.footer}>
                            <TouchableOpacity style={[styles.logoutButton, { borderColor: isDark ? '#FF6B6B' : '#FF6B6B' }]}>
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                            <Text style={[styles.versionText, { color: secondaryTextColor }]}>Version 1.0.0</Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.settingsContainer}>
                        {SETTINGS_SECTIONS.map((section) => (
                            <View key={section.id} style={styles.settingsSection}>
                                <View style={styles.sectionHeader}>
                                    <MaterialIcons name={section.icon as any} size={22} color={iconColor} />
                                    <Text style={[styles.sectionTitle, isDark && styles.textDark]}>{section.title}</Text>
                                </View>
                                <View style={[styles.sectionItems, isDark && styles.sectionItemsDark]}>
                                    {section.items.map((item: any) => (
                                        <View key={item.id} style={[styles.settingsItem, isDark && styles.settingsItemDark]}>
                                            <Text style={[
                                                styles.settingsItemText,
                                                isDark && styles.textDark,
                                                item.isDanger && { color: '#FF6B6B' }
                                            ]}>
                                                {item.title}
                                            </Text>
                                            {item.type === 'toggle' ? (
                                                <Switch
                                                    value={item.id === 'darkMode' ? isDark : toggles[item.id]}
                                                    onValueChange={() => handleToggle(item.id)}
                                                    trackColor={{ false: isDark ? '#333' : '#EEE', true: isDark ? '#555' : '#1A1A1A' }}
                                                    thumbColor={isDark ? '#FFF' : '#FFF'}
                                                />
                                            ) : (
                                                <TouchableOpacity>
                                                    <MaterialIcons name="chevron-right" size={20} color={isDark ? "#555" : "#CCC"} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerDark: {
        backgroundColor: '#121212',
        borderBottomColor: '#333',
    },
    textDark: {
        color: '#FFF',
    },
    textSecondaryDark: {
        color: '#AAA',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FAFB',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 16,
    },
    profileSectionDark: {
        backgroundColor: '#1E1E1E',
    },
    profileHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profilePicContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profilePicContainerDark: {
        backgroundColor: '#333',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    userPhone: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginTop: 4,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginTop: 2,
    },

    menuList: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuItemDark: {
        borderBottomColor: '#333',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1A1A1A',
        marginLeft: 15,
    },
    settingsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    settingsSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginLeft: 8,
    },
    sectionItems: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 15,
    },
    sectionItemsDark: {
        backgroundColor: '#1E1E1E',
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    settingsItemDark: {
        borderBottomColor: '#333',
    },
    settingsItemText: {
        fontSize: 15,
        fontFamily: 'Inter-Medium',
        color: '#333',
    },
    footer: {
        marginTop: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    logoutButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },
    logoutText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#FF6B6B',
    },
    versionText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#999',
        marginTop: 20,
    },
});
