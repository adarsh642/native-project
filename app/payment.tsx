import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScreen() {
    const router = useRouter();
    const amount = 1990; // Mock amount

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="arrow.left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Select payment method</Text>
                    <Text style={styles.headerSubtitle}>Amount to pay: ₹{amount}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Previous Payment Methods */}
                <Text style={styles.sectionTitle}>Previous payment methods</Text>
                <View style={styles.cardsGrid}>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardBrand, { color: '#1a1f71' }]}>VISA</Text>
                            <IconSymbol name="chevron-right" size={16} color="#ccc" />
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardName}>HDFC</Text>
                            <Text style={styles.cardNumber}>•••• 1234</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardBrand, { color: '#1a1f71' }]}>VISA</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardExpiry}>Expired on 05/21</Text>
                            <Text style={styles.cardName}>ICICI</Text>
                            <Text style={styles.cardNumber}>•••• 5678</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardBrand, { color: '#00baf2' }]}>paytm</Text>
                            <IconSymbol name="chevron-right" size={16} color="#ccc" />
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardName}>Paytm</Text>
                            <Text style={styles.cardNumber}>₹1000</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardBrand, { color: '#FF9900' }]}>pay</Text>
                            <IconSymbol name="chevron-right" size={16} color="#ccc" />
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardError}>Insufficient balance</Text>
                            <Text style={styles.cardName}>Amazon Pay</Text>
                            <Text style={styles.cardNumber}>₹100</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* UPI Section */}
                <Text style={styles.sectionTitle}>UPI</Text>
                <View style={styles.upiList}>
                    <TouchableOpacity style={styles.upiItem}>
                        <View style={styles.upiIconContainer}>
                            {/* Placeholder for GPay Icon */}
                            <Text style={{ color: '#EA4335', fontWeight: 'bold' }}>G</Text>
                        </View>
                        <Text style={styles.upiName}>GPay</Text>
                        <IconSymbol name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiItem}>
                        <View style={styles.upiIconContainer}>
                            {/* Placeholder for Amazon Pay Icon */}
                            <Text style={{ color: '#FF9900', fontWeight: 'bold' }}>a</Text>
                        </View>
                        <Text style={styles.upiName}>Amazon Pay</Text>
                        <IconSymbol name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiItem}>
                        <View style={styles.upiIconContainer}>
                            {/* Placeholder for PhonePe Icon */}
                            <Text style={{ color: '#6739B7', fontWeight: 'bold' }}>Pe</Text>
                        </View>
                        <Text style={styles.upiName}>Phone Pe</Text>
                        <IconSymbol name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upiItem}>
                        <View style={styles.upiIconContainer}>
                            <IconSymbol name="smartphone" size={18} color="#666" />
                        </View>
                        <Text style={styles.upiName}>Pay via another UPI</Text>
                        <IconSymbol name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Inter-Regular',
        marginTop: 2,
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginBottom: 16,
        marginTop: 10,
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    card: {
        width: '48%',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        minHeight: 100,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardBrand: {
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'italic',
    },
    cardBody: {
    },
    cardName: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    cardNumber: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Inter-Medium',
    },
    cardExpiry: {
        fontSize: 10,
        color: '#D93025',
        marginBottom: 4,
        fontWeight: 'bold',
    },
    cardError: {
        fontSize: 10,
        color: '#D93025',
        marginBottom: 4,
        fontWeight: 'bold',
    },
    upiList: {
        marginTop: 8,
    },
    upiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    upiIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: '#fff',
    },
    upiName: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1A1A1A',
    },
});
