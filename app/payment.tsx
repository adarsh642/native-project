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

    const textColor = isDark ? Colors.dark.text : '#000000';
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : '#4B5563';
    const bgColor = isDark ? Colors.dark.background : '#FFFFFF';
    const headerBg = '#000000'; // Deep Black for Monochrome theme

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
                            iconBg="#000000"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="account-balance"
                            title="Net Banking"
                            iconBg="#333333"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="google-pay"
                            title="Google Wallet"
                            iconBg="#444444"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="amazon"
                            title="Amazon Pay"
                            iconBg="#555555"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="account-balance-wallet"
                            title="PhonePe"
                            iconBg="#666666"
                        />
                        <View style={styles.divider} />
                        <PaymentOptionItem
                            icon="more-horiz"
                            title="Other Wallets"
                            iconBg="#777777"
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
        paddingTop: 40, // Increased padding
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#fff',
        letterSpacing: -0.5,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    cardSection: {
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: '#000000',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    cardScroll: {
        paddingHorizontal: 20,
    },
    addCardButton: {
        width: 64,
        height: 160,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent for premium look
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderStyle: 'dashed',
    },
    optionsSection: {
        padding: 24,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: 'Inter-Bold',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        opacity: 0.8,
    },
    optionsContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0', // Soft border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
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
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    footerDark: {
        backgroundColor: '#1E1E1E',
        borderColor: '#334155',
    },
    totalAmount: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        letterSpacing: -1,
    },
    viewDetailsText: {
        fontSize: 12,
        color: '#000000',
        fontFamily: 'Inter-SemiBold',
        marginTop: 2,
    },
    payButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    }
});
