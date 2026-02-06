import { SwipeToPay } from '@/components/SwipeToPay';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

const RECOMMENDED_ADDONS = [
    { id: 'r1', name: 'Threading', price: 49 },
    { id: 'r2', name: 'De-Tan Pack', price: 199 },
];

export default function CartScreen() {
    const { isDark } = useTheme();
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

    const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
    const textColor = isDark ? Colors.dark.text : Colors.light.text;
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
    const bgColor = isDark ? Colors.dark.background : Colors.light.background;
    const sectionBg = isDark ? Colors.dark.card : Colors.light.card;
    const borderColor = isDark ? Colors.dark.border : Colors.light.border;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <View style={[styles.header, { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#fff', borderBottomColor: borderColor, borderBottomWidth: 1 }]}>
                <TouchableOpacity style={styles.backButton}>
                    <IconSymbol name="arrow-left" size={24} color={iconColor} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: textColor }]}>Summary</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>


                <View style={[styles.section, { backgroundColor: sectionBg, borderColor: borderColor }]}>
                    {items.length === 0 ? (
                        <Text style={{ textAlign: 'center', padding: 20, color: secondaryTextColor }}>Your cart is empty</Text>
                    ) : (
                        items.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <View style={styles.itemRow}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View style={styles.itemDetails}>
                                        <Text style={[styles.itemName, { color: textColor }]} numberOfLines={2}>{item.name}</Text>
                                        <Text style={[styles.itemPrice, { color: textColor }]}>₹{item.price}</Text>
                                    </View>
                                    <View style={[styles.quantityControl, isDark && styles.quantityControlDark]}>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => item.quantity === 1 ? removeFromCart(item.id) : handleQuantityChange(item.id, -1)}
                                        >
                                            <Text style={styles.qtyBtnText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={[styles.qtyText, isDark && styles.textDark]}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => handleQuantityChange(item.id, 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.divider, isDark && styles.dividerDark]} />
                            </View>
                        ))
                    )}

                    <Text style={[styles.sectionSubtitle, isDark && styles.textDark]}>Frequently added together</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.addonsScroll}>
                        {RECOMMENDED_ADDONS.map(addon => (
                            <TouchableOpacity key={addon.id} style={[styles.addonCard, isDark && styles.addonCardDark]}>
                                <View style={styles.addonInfo}>
                                    <Text style={[styles.addonName, isDark && styles.textSecondaryDark]}>{addon.name}</Text>
                                    <Text style={[styles.addonPrice, isDark && styles.textDark]}>₹{addon.price}</Text>
                                </View>
                                <TouchableOpacity style={[styles.addButtonSmall, isDark && styles.addButtonSmallDark]}>
                                    <Text style={styles.addButtonTextSmall}>Add</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[styles.offerSection, { backgroundColor: sectionBg, borderColor: borderColor }]}>
                    <View style={styles.offerRow}>
                        <IconSymbol name="percent" size={20} color="#009963" />
                        <View style={styles.offerContent}>
                            <Text style={[styles.offerTitle, { color: textColor }]}>Coupons and offers</Text>
                            <Text style={styles.offerSubtitle}>1 offer available</Text>
                        </View>
                        <IconSymbol name="chevron-right" size={20} color={secondaryTextColor} />
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: sectionBg, borderColor: borderColor }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Add a tip to the professional</Text>
                    <Text style={[styles.tipSubtitle, { color: secondaryTextColor }]}>100% of the tip goes to the professional</Text>
                    <View style={styles.tipContainer}>
                        {renderTipButton(25)}
                        {renderTipButton(50)}
                        {renderTipButton(100)}
                        {renderTipButton(0, 'Custom')}
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: sectionBg, borderColor: borderColor }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Payment Summary</Text>

                    <View style={styles.billRow}>
                        <Text style={[styles.billLabel, { color: secondaryTextColor }]}>Item Total</Text>
                        <Text style={[styles.billValue, { color: textColor }]}>₹{itemTotal}</Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text style={[styles.billLabel, { color: secondaryTextColor }]}>Taxes & Fee</Text>
                        <Text style={[styles.billValue, { color: textColor }]}>₹{taxesAndFee}</Text>
                    </View>

                    {tip > 0 && (
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Tip</Text>
                            <Text style={styles.billValue}>₹{tip}</Text>
                        </View>
                    )}

                    <View style={[styles.totalRow, { borderTopColor: borderColor }]}>
                        <Text style={[styles.totalLabel, { color: textColor }]}>Grand Total</Text>
                        <Text style={[styles.totalValue, { color: textColor }]}>₹{finalTotal}</Text>
                    </View>
                </View>

                <View style={{ height: 220 }} />

            </ScrollView>

            <View style={[styles.footer, { backgroundColor: sectionBg, borderColor: borderColor }]}>
                <View style={styles.addressBar}>
                    <IconSymbol name="house.fill" size={16} color="#6E4CE5" />
                    <Text style={[styles.addressText, { color: secondaryTextColor }]} numberOfLines={1}>Home - 2167, Block E, Sector 21, Gur..</Text>
                    <IconSymbol name="chevron-right" size={16} color={secondaryTextColor} />
                </View>
                {items.length > 0 && (
                    <SwipeToPay
                        label="Slide to Pay"
                        totalAmount={finalTotal}
                        onSwipeComplete={() => router.push({
                            pathname: '/payment',
                            params: { amount: finalTotal }
                        })}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerDark: {
        backgroundColor: '#1E1E1E',
        borderBottomColor: '#333',
    },
    textDark: {
        color: '#FFF',
    },
    textSecondaryDark: {
        color: '#AAA',
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
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    sectionDark: {
        backgroundColor: '#1E1E1E',
        borderColor: '#333',
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
    quantityControlDark: {
        backgroundColor: '#222',
        borderColor: '#444',
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
    dividerDark: {
        backgroundColor: '#333',
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
    addonCardDark: {
        backgroundColor: '#222',
        borderColor: '#444',
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
    addButtonSmallDark: {
        backgroundColor: '#222',
        borderColor: '#6E4CE5',
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
    footerDark: {
        backgroundColor: '#1E1E1E',
        borderColor: '#333',
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
