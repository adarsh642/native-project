import { PaymentMethodCard } from '@/components/PaymentMethodCard';
import { PaymentOptionItem } from '@/components/PaymentOptionItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function PaymentScreen() {
    const router = useRouter();
    const { amount } = useLocalSearchParams();
    const { isDark } = useTheme();

    const textColor = isDark ? Colors.dark.text : '#1A1A1A';
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : '#666';
    const bgColor = isDark ? Colors.dark.background : '#fff';
    const headerBg = '#7B1FA2'; // Deep purple for header

    return (
        <View style={[styles.mainContainer, { backgroundColor: bgColor }]}>
            <SafeAreaView style={{ backgroundColor: headerBg }}>
                <View style={[styles.header, { backgroundColor: headerBg }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Methods</Text>
                    <View style={{ width: 24 }} />
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.cardSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.cardScroll}
                        snapToInterval={width * 0.75 + 16}
                        decelerationRate="fast"
                    >
                        <TouchableOpacity style={styles.addCardButton}>
                            <IconSymbol name="plus" size={32} color="#6A1B9A" />
                        </TouchableOpacity>

                        <PaymentMethodCard
                            brand="VISA"
                            name="RAKESH PRADHAN"
                            number="**** **** **** 2512"
                            expiry="02/31"
                            isPrimary
                        />

                        <PaymentMethodCard
                            brand="MASTERCARD"
                            name="RAKESH PRADHAN"
                            number="**** **** **** 8250"
                            expiry="05/28"
                        />
                    </ScrollView>
                </View>

                <View style={styles.optionsSection}>
                    <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>Other Payment Methods</Text>

                    <View style={[styles.optionsContainer, isDark && styles.optionsContainerDark]}>
                        <PaymentOptionItem
                            icon="credit-card"
                            title="Credit / Debit Card"
                            iconBg="#00BCD4"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="account-balance"
                            title="Net Banking"
                            iconBg="#FF7043"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="google"
                            title="Google Wallet"
                            iconBg="#4285F4"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="account-balance-wallet"
                            title="PhonePe"
                            iconBg="#673AB7"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="more-horiz"
                            title="Other Wallets"
                            iconBg="#4CAF50"
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.footer, isDark && styles.footerDark]}>
                <View>
                    <Text style={[styles.totalAmount, { color: textColor }]}>${amount || '0'}</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.payButton} onPress={() => console.log('Payment initiated')}>
                    <Text style={styles.payButtonText}>Pay Now ➔</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    cardSection: {
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: '#7B1FA2',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    cardScroll: {
        paddingHorizontal: 20,
    },
    addCardButton: {
        width: 60,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    optionsSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    optionsContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    optionsContainerDark: {
        backgroundColor: '#1E1E1E',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginLeft: 68,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 24,
        paddingBottom: 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    footerDark: {
        backgroundColor: '#1E1E1E',
    },
    totalAmount: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
    },
    viewDetailsText: {
        fontSize: 12,
        color: '#7B1FA2',
        fontFamily: 'Inter-Medium',
        marginTop: 2,
    },
    payButton: {
        backgroundColor: '#7B1FA2',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 20,
        elevation: 4,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    }
});
