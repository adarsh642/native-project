import { CartNotification } from '@/components/CartNotification';
import { SwipeToPay } from '@/components/SwipeToPay';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const HOW_IT_WORKS = [
    { id: 1, title: 'Choose Appointment', desc: 'Select a date and time that fits your schedule.', icon: 'calendar.fill' },
    { id: 2, title: 'Expert Arrives', desc: 'Our certified professional arrives at your doorstep.', icon: 'hands.sparkles.fill' },
    { id: 3, title: 'Relax & Enjoy', desc: 'Quality service delivered with safety protocols.', icon: 'checkmark.shield.fill' },
];

export default function ServiceDetailsScreen() {
    const router = useRouter();
    const { id, title, price, image, rating, subtitle } = useLocalSearchParams();
    const { isDark } = useTheme();
    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
    const secondaryTextColor = isDark ? '#A1A1AA' : '#6B7280';
    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const cardBg = isDark ? '#18181B' : '#F9FAFB';
    const borderColor = isDark ? '#27272A' : '#E5E7EB';

    const handleAddToCart = () => {
        addToCart({
            id: id as string,
            name: title as string,
            price: Number(price),
            image: image as string,
        });
        setNotificationMsg(`${title} added to cart!`);
        setShowNotification(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <CartNotification
                visible={showNotification}
                message={notificationMsg}
                onHide={() => setShowNotification(false)}
                onViewCart={() => router.push('/(tabs)/cart')}
            />
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Immersive Hero Section */}
                <View style={styles.heroSection}>
                    <Image source={{ uri: image as string }} style={styles.heroImage} />
                    <View style={styles.heroOverlay} />

                    {/* Floating Header Actions */}
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => router.back()}
                        >
                            <BlurView intensity={Platform.OS === 'ios' ? 20 : 100} tint="dark" style={styles.blurContainer}>
                                <IconSymbol name="arrow.left" size={24} color="#FFF" />
                            </BlurView>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <BlurView intensity={Platform.OS === 'ios' ? 20 : 100} tint="dark" style={styles.blurContainer}>
                                <IconSymbol name="paperplane.fill" size={20} color="#FFF" />
                            </BlurView>
                        </TouchableOpacity>
                    </View>

                    {/* Floating Info Card (Glassmorphism) */}
                    <View style={styles.floatingInfo}>
                        <BlurView intensity={Platform.OS === 'ios' ? 40 : 100} tint={isDark ? "dark" : "light"} style={styles.infoBlur}>
                            <View style={styles.infoContent}>
                                <View style={styles.ratingBadge}>
                                    <IconSymbol name="star.fill" size={14} color="#000" />
                                    <Text style={styles.ratingText}>{rating}</Text>
                                </View>
                                <Text style={[styles.mainTitle, { color: textColor }]}>{title}</Text>
                                <Text style={[styles.mainSubtitle, { color: secondaryTextColor }]}>{subtitle}</Text>
                            </View>
                        </BlurView>
                    </View>
                </View>

                {/* Primary Content Container */}
                <View style={styles.mainContent}>

                    {/* Price Breakdown Card */}
                    <View style={[styles.priceCard, { backgroundColor: cardBg, borderColor: borderColor }]}>
                        <View>
                            <Text style={[styles.priceLabel, { color: secondaryTextColor }]}>Current Pricing</Text>
                            <Text style={[styles.priceValue, { color: textColor }]}>₹{price}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.priceAddButton, { backgroundColor: isDark ? '#FFFFFF' : '#000000' }]}
                            onPress={handleAddToCart}
                        >
                            <Text style={[styles.priceAddButtonText, { color: isDark ? '#000000' : '#FFFFFF' }]}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    {/* About Section */}
                    <View style={styles.contentSection}>
                        <Text style={[styles.sectionHeading, { color: textColor }]}>Service Overview</Text>
                        <Text style={[styles.descriptionText, { color: secondaryTextColor }]}>
                            Experience the pinnacle of {title.toString().toLowerCase()} with our master-certified professionals.
                            We utilize hospital-grade equipment and strictly follow premium safety standards to ensure
                            an unmatched service quality directly at your doorstep.
                        </Text>
                    </View>

                    {/* How It Works - Visual Step Guide */}
                    <View style={styles.contentSection}>
                        <Text style={[styles.sectionHeading, { color: textColor }]}>How it works</Text>
                        {HOW_IT_WORKS.map((step, index) => (
                            <View key={step.id} style={styles.stepItem}>
                                <View style={styles.stepVisual}>
                                    <View style={[styles.stepLine, index === HOW_IT_WORKS.length - 1 && { opacity: 0 }, { backgroundColor: borderColor }]} />
                                    <View style={[styles.stepIconBox, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}>
                                        <IconSymbol name={step.icon as any} size={20} color={textColor} />
                                    </View>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={[styles.stepTitle, { color: textColor }]}>{step.title}</Text>
                                    <Text style={[styles.stepDesc, { color: secondaryTextColor }]}>{step.desc}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Guarantee & Safety */}
                    <View style={[styles.guaranteeBox, { backgroundColor: isDark ? '#000' : '#FAFAFA', borderColor: borderColor }]}>
                        <IconSymbol name="checkmark.shield.fill" size={24} color={textColor} />
                        <View style={styles.guaranteeTextContent}>
                            <Text style={[styles.guaranteeTitle, { color: textColor }]}>UC Safety Guarantee</Text>
                            <Text style={[styles.guaranteeDesc, { color: secondaryTextColor }]}>
                                100% safe & hygienic services with insured professionals and satisfaction guarantee.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 180 }} />
            </ScrollView>

            {/* Ultimate Sticky Footer - Slide to Pay */}
            <View style={[styles.footer, { backgroundColor: bgColor, borderTopColor: borderColor }]}>
                <SwipeToPay
                    label="Slide to Pay"
                    totalAmount={Number(price)}
                    onSwipeComplete={() => {
                        router.push({
                            pathname: '/payment',
                            params: { amount: price }
                        });
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroSection: {
        height: 460,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    headerActions: {
        position: 'absolute',
        top: 56,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingInfo: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    infoBlur: {
        padding: 24,
    },
    infoContent: {
        alignItems: 'flex-start',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
    },
    ratingText: {
        fontSize: 13,
        fontFamily: 'Inter-Bold',
        color: '#000',
        marginLeft: 4,
    },
    mainTitle: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    mainSubtitle: {
        fontSize: 15,
        fontFamily: 'Inter-Medium',
        opacity: 0.8,
    },
    mainContent: {
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    priceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 32,
    },
    priceLabel: {
        fontSize: 13,
        fontFamily: 'Inter-Medium',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    priceValue: {
        fontSize: 26,
        fontFamily: 'Inter-Bold',
    },
    priceAddButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    priceAddButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-Bold',
    },
    contentSection: {
        marginBottom: 36,
    },
    sectionHeading: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 25,
        fontFamily: 'Inter-Regular',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stepVisual: {
        alignItems: 'center',
        marginRight: 16,
        width: 40,
    },
    stepLine: {
        position: 'absolute',
        top: 40,
        bottom: -20,
        width: 1.5,
    },
    stepIconBox: {
        width: 40,
        height: 40,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContent: {
        flex: 1,
        paddingTop: 8,
    },
    stepTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginBottom: 4,
    },
    stepDesc: {
        fontSize: 13,
        lineHeight: 20,
        fontFamily: 'Inter-Regular',
    },
    guaranteeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    guaranteeTextContent: {
        flex: 1,
        marginLeft: 16,
    },
    guaranteeTitle: {
        fontSize: 15,
        fontFamily: 'Inter-Bold',
        marginBottom: 2,
    },
    guaranteeDesc: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        lineHeight: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        borderTopWidth: 1,
        zIndex: 100,
        justifyContent: 'center',
    },
});
