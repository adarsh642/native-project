import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCart } from '@/context/CartContext';

const RECOMMENDED_ADDONS = [
    { id: 'r1', name: 'Threading', price: 49 },
    { id: 'r2', name: 'De-Tan Pack', price: 199 },
];

export default function CartScreen() {
    const router = useRouter();
    const { items, updateQuantity, removeFromCart } = useCart();
    const [tip, setTip] = useState(50);

    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxesAndFee = 49;
    const finalTotal = itemTotal + tip + taxesAndFee;

    const handleQuantityChange = (id: string, delta: number) => {
        updateQuantity(id, delta);
    };

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
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <IconSymbol name="arrow-left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Summary</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>


                <View style={styles.section}>
                    {items.length === 0 ? (
                        <Text style={{ textAlign: 'center', padding: 20, color: '#666' }}>Your cart is empty</Text>
                    ) : (
                        items.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <View style={styles.itemRow}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>₹{item.price}</Text>
                                    </View>
                                    <View style={styles.quantityControl}>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => item.quantity === 1 ? removeFromCart(item.id) : handleQuantityChange(item.id, -1)}
                                        >
                                            <Text style={styles.qtyBtnText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => handleQuantityChange(item.id, 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                            </View>
                        ))
                    )}

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

                <View style={{ height: 220 }} />

            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.addressBar}>
                    <IconSymbol name="house.fill" size={16} color="#6E4CE5" />
                    <Text style={styles.addressText} numberOfLines={1}>Home - 2167, Block E, Sector 21, Gur..</Text>
                    <IconSymbol name="chevron-right" size={16} color="#666" />
                </View>
                <TouchableOpacity
                    style={[styles.payButton, items.length === 0 && { backgroundColor: '#ccc' }]}
                    disabled={items.length === 0}
                    onPress={() => router.push({ pathname: '/payment', params: { amount: finalTotal } })}
                >
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
        backgroundColor: '#F9F9F9',
        // Removed manual padding adjustment since immersive mode handles it differently
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        // Removed heavy shadows for a cleaner, flatter "modern" look
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    cartItem: {
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        marginRight: 16,
        backgroundColor: '#F5F5F5',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1A1A1A',
        marginBottom: 6,
        lineHeight: 22,
    },
    itemPrice: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: '#fff',
        marginLeft: 12,
        flexShrink: 0,
    },
    qtyBtn: {
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    qtyBtnText: {
        fontSize: 18,
        color: '#6E4CE5',
        fontWeight: '600',
    },
    qtyText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        marginHorizontal: 8,
        minWidth: 14,
        textAlign: 'center',
        color: '#1A1A1A',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginTop: 16,
    },
    sectionSubtitle: {
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
        color: '#1A1A1A',
        marginTop: 8,
        marginBottom: 12,
    },
    addonsScroll: {
        marginLeft: -16,
        marginRight: -16,
        paddingHorizontal: 16,
    },
    addonCard: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 16,
        padding: 12,
        marginRight: 12,
        width: 140,
        backgroundColor: '#fff',
    },
    addonInfo: {
        marginBottom: 10,
    },
    addonName: {
        fontSize: 13,
        color: '#444',
        marginBottom: 6,
        fontFamily: 'Inter-Medium',
    },
    addonPrice: {
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
    },
    addButtonSmall: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6E4CE5',
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: 'center',
    },
    addButtonTextSmall: {
        fontSize: 12,
        color: '#6E4CE5',
        fontFamily: 'Inter-Bold',
    },
    offerSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F0F0F0',
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
        fontFamily: 'Inter-SemiBold',
        color: '#1A1A1A',
    },
    offerSubtitle: {
        fontSize: 13,
        color: '#009963',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    tipSubtitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    tipButton: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        width: '22%',
        backgroundColor: '#fff',
    },
    activeTipButton: {
        backgroundColor: '#F4F1FF',
        borderColor: '#6E4CE5',
        borderWidth: 1.5,
    },
    tipText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#1A1A1A',
    },
    activeTipText: {
        color: '#6E4CE5',
    },
    popularTag: {
        position: 'absolute',
        top: -12,
        backgroundColor: '#009963',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100,
        zIndex: 1,
    },
    popularText: {
        fontSize: 9,
        color: '#fff',
        fontFamily: 'Inter-Bold',
        textTransform: 'uppercase',
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    billLabel: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Inter-Regular',
    },
    billValue: {
        fontSize: 14,
        color: '#1A1A1A',
        fontFamily: 'Inter-SemiBold',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
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
        bottom: 90,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    addressBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    addressText: {
        fontSize: 13,
        color: '#444',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Inter-Medium',
    },
    payButton: {
        backgroundColor: '#6E4CE5',
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Inter-Bold',
    },
    payButtonTotal: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Inter-Bold',
    },
});
