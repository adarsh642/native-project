import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock Data for Cart Items
const CART_ITEMS = [
    {
        id: '1',
        name: 'Split AC Power Saver Service',
        price: 499,
        originalPrice: 699,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        quantity: 1,
    },
    {
        id: '2',
        name: 'Bathroom Deep Cleaning',
        price: 399,
        originalPrice: 599,
        image: 'https://images.herzindagi.info/image/2021/Jul/how-to-deep-clean-bathroom-like-a-professional-main.jpg',
        quantity: 1,
    }
];

const RECOMMENDED_ADDONS = [
    { id: 'r1', name: 'Threading', price: 49 },
    { id: 'r2', name: 'De-Tan Pack', price: 199 },
];

export default function CartScreen() {
    const router = useRouter();
    const [tip, setTip] = useState(50);

    const itemTotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxesAndFee = 49;
    const finalTotal = itemTotal + tip + taxesAndFee;

    const renderTipButton = (amount: number, label?: string) => (
        <TouchableOpacity
            style={[
                styles.tipButton,
                tip === amount && styles.activeTipButton
            ]}
            onPress={() => setTip(amount)}
        >
            <Text style={[styles.tipText, tip === amount && styles.activeTipText]}>
                {label || `₹${amount}`}
            </Text>
            {amount === 50 && !label && (
                <View style={styles.popularTag}>
                    <Text style={styles.popularText}>Most Tip</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <IconSymbol name="arrow-left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Summary</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Cart Items */}
                <View style={styles.section}>
                    {CART_ITEMS.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <View style={styles.itemRow}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                                    <View style={styles.quantityControl}>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.divider} />
                        </View>
                    ))}

                    {/* Add-ons - Horizontal Scroll */}
                    <Text style={styles.sectionSubtitle}>Frequently added together</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.addonsScroll}>
                        {RECOMMENDED_ADDONS.map(addon => (
                            <TouchableOpacity key={addon.id} style={styles.addonCard}>
                                <View style={styles.addonInfo}>
                                    <Text style={styles.addonName}>{addon.name}</Text>
                                    <Text style={styles.addonPrice}>₹{addon.price}</Text>
                                </View>
                                <TouchableOpacity style={styles.addButtonSmall}>
                                    <Text style={styles.addButtonTextSmall}>Add</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Offers */}
                <View style={styles.offerSection}>
                    <View style={styles.offerRow}>
                        <IconSymbol name="percent" size={20} color="#009963" />
                        <View style={styles.offerContent}>
                            <Text style={styles.offerTitle}>Coupons and offers</Text>
                            <Text style={styles.offerSubtitle}>1 offer available</Text>
                        </View>
                        <IconSymbol name="chevron-right" size={20} color="#666" />
                    </View>
                </View>

                {/* Tip Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Add a tip to the professional</Text>
                    <Text style={styles.tipSubtitle}>100% of the tip goes to the professional</Text>
                    <View style={styles.tipContainer}>
                        {renderTipButton(25)}
                        {renderTipButton(50)}
                        {renderTipButton(100)}
                        {renderTipButton(0, 'Custom')}
                    </View>
                </View>

                {/* Payment Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Item Total</Text>
                        <Text style={styles.billValue}>₹{itemTotal}</Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Taxes & Fee</Text>
                        <Text style={styles.billValue}>₹{taxesAndFee}</Text>
                    </View>

                    {tip > 0 && (
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Tip</Text>
                            <Text style={styles.billValue}>₹{tip}</Text>
                        </View>
                    )}

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Grand Total</Text>
                        <Text style={styles.totalValue}>₹{finalTotal}</Text>
                    </View>
                </View>

                {/* Spacer for Floating Footer */}
                <View style={{ height: 220 }} />

            </ScrollView>

            {/* Bottom Footer */}
            <View style={styles.footer}>
                <View style={styles.addressBar}>
                    <IconSymbol name="house.fill" size={16} color="#6E4CE5" />
                    <Text style={styles.addressText} numberOfLines={1}>Home - 2167, Block E, Sector 21, Gur..</Text>
                    <IconSymbol name="chevron-right" size={16} color="#666" />
                </View>
                <TouchableOpacity style={styles.payButton} onPress={() => router.push('/payment')}>
                    <Text style={styles.payButtonTotal}>₹{finalTotal}</Text>
                    <Text style={styles.payButtonText}>Select a slot</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cartItem: {
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1A1A1A',
        flex: 1,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    qtyBtn: {
        paddingHorizontal: 8,
    },
    qtyBtnText: {
        fontSize: 18,
        color: '#6E4CE5',
        fontWeight: 'bold',
    },
    qtyText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        marginHorizontal: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginTop: 16,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#666',
        marginTop: 10,
        marginBottom: 10,
    },
    addonsScroll: {
        marginLeft: -16,
        marginRight: -16,
        paddingHorizontal: 16,
    },
    addonCard: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 12,
        marginRight: 12,
        width: 140,
    },
    addonInfo: {
        marginBottom: 8,
    },
    addonName: {
        fontSize: 13,
        color: '#333',
        marginBottom: 4,
    },
    addonPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    addButtonSmall: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6E4CE5',
        borderRadius: 6,
        paddingVertical: 4,
        alignItems: 'center',
    },
    addButtonTextSmall: {
        fontSize: 12,
        color: '#6E4CE5',
        fontWeight: 'bold',
    },
    offerSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
    },
    offerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    offerContent: {
        flex: 1,
        marginLeft: 12,
    },
    offerTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1A1A1A',
    },
    offerSubtitle: {
        fontSize: 12,
        color: '#009963',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    tipSubtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 16,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tipButton: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        minWidth: 70,
        position: 'relative',
    },
    activeTipButton: {
        backgroundColor: '#F3F0FF',
        borderColor: '#6E4CE5',
    },
    tipText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    activeTipText: {
        color: '#6E4CE5',
    },
    popularTag: {
        position: 'absolute',
        top: -10,
        backgroundColor: '#009963',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    popularText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    billLabel: {
        fontSize: 14,
        color: '#666',
    },
    billValue: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    totalValue: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    footer: {
        position: 'absolute',
        bottom: 100, // Raised significantly to clear floating TabBar
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    addressBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    addressText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        marginLeft: 8,
        marginRight: 8,
    },
    payButton: {
        backgroundColor: '#6E4CE5',
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    payButtonTotal: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
