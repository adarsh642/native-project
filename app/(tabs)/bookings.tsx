import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const INITIAL_BOOKINGS = [
    {
        id: '1',
        serviceName: 'AC Deep Cleaning',
        status: 'Completed',
        statusType: 'completed',
        date: '24 Oct 2023',
        time: '10:30 AM',
        rating: 4,
        imageUri: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    },
    {
        id: '2',
        serviceName: 'Bathroom Cleaning',
        status: 'Upcoming',
        statusType: 'upcoming',
        date: '15 Oct 2023',
        time: '02:00 PM',
        rating: 0,
        imageUri: 'https://images.herzindagi.info/image/2021/Jul/how-to-deep-clean-bathroom-like-a-professional-main.jpg',
    },
    {
        id: '3',
        serviceName: 'Kitchen Degreasing',
        status: 'Cancelled',
        statusType: 'cancelled',
        date: '10 Oct 2023',
        time: '11:00 AM',
        rating: 0,
        imageUri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
    },
    {
        id: '4',
        serviceName: 'Sofa Deep Cleaning',
        status: 'Completed',
        statusType: 'completed',
        date: '02 Oct 2023',
        time: '09:00 AM',
        rating: 3,
        imageUri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    },
];

export default function BookingsScreen() {
    const { isDark } = useTheme();
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Upcoming', 'Completed', 'Cancelled'];

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || booking.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const handleRateBooking = (id: string, newRating: number) => {
        setBookings(prev => prev.map(b =>
            b.id === id ? { ...b, rating: newRating } : b
        ));
    };

    const getStatusStyles = (type: string) => {
        switch (type) {
            case 'completed':
                return {
                    bg: isDark ? '#1B2E20' : '#E6F4EA',
                    dot: isDark ? '#34A853' : '#1E8E3E',
                    text: isDark ? '#34A853' : '#1E8E3E'
                };
            case 'upcoming':
                return {
                    bg: isDark ? '#2E2816' : '#FEF7E0',
                    dot: isDark ? '#FBBC04' : '#F9AB00',
                    text: isDark ? '#FBBC04' : '#F9AB00'
                };
            case 'cancelled':
                return {
                    bg: isDark ? '#331B1B' : '#FCE8E6',
                    dot: isDark ? '#EA4335' : '#D93025',
                    text: isDark ? '#EA4335' : '#D93025'
                };
            default:
                return {
                    bg: isDark ? '#202124' : '#F1F3F4',
                    dot: isDark ? '#9AA0A6' : '#5F6368',
                    text: isDark ? '#9AA0A6' : '#5F6368'
                };
        }
    };

    const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
    const textColor = isDark ? Colors.dark.text : Colors.light.text;
    const secondaryTextColor = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
    const bgColor = isDark ? Colors.dark.background : Colors.light.background;
    const cardBg = isDark ? Colors.dark.card : Colors.light.card;
    const borderColor = isDark ? Colors.dark.border : Colors.light.border;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            <View style={[styles.header, { backgroundColor: bgColor, borderBottomColor: borderColor, borderBottomWidth: 1 }]}>
                <Text style={[styles.headerTitle, { color: textColor }]}>My Bookings</Text>
            </View>


            <View style={[styles.searchContainer, { backgroundColor: bgColor }]}>
                <View style={[styles.searchBar, { backgroundColor: cardBg, borderColor: borderColor, borderWidth: 1 }]}>
                    <IconSymbol name="magnifyingglass" size={20} color={secondaryTextColor} />
                    <TextInput
                        style={[styles.searchInput, { color: textColor }]}
                        placeholder="Search bookings..."
                        placeholderTextColor={secondaryTextColor}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterPill,
                                isDark && styles.filterPillDark,
                                activeFilter === filter && styles.activeFilterPill
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                isDark && styles.textSecondaryDark,
                                activeFilter === filter && styles.activeFilterText
                            ]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredBookings.map((booking) => (
                    <View key={booking.id} style={[styles.card, isDark && styles.cardDark]}>
                        <View style={styles.cardMainContent}>
                            <View style={[styles.imageWrapper, isDark && styles.imageWrapperDark]}>
                                <Image source={{ uri: booking.imageUri }} style={styles.serviceImage} />
                            </View>
                            <View style={styles.bookingInfo}>
                                <View style={styles.cardHeader}>
                                    <Text style={[styles.serviceName, isDark && styles.textDark]}>{booking.serviceName}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <IconSymbol name="calendar.fill" size={14} color={isDark ? "#AAA" : "#666"} />
                                    <Text style={[styles.detailText, isDark && styles.textSecondaryDark]}>{booking.date} at {booking.time}</Text>
                                </View>

                                <View style={[
                                    styles.statusContainer,
                                    { backgroundColor: getStatusStyles(booking.statusType).bg, alignSelf: 'flex-start' }
                                ]}>
                                    <View style={[
                                        styles.statusDot,
                                        { backgroundColor: getStatusStyles(booking.statusType).dot }
                                    ]} />
                                    <Text style={[
                                        styles.statusText,
                                        { color: getStatusStyles(booking.statusType).text }
                                    ]}>{booking.status}</Text>
                                </View>
                            </View>
                        </View>

                        < View style={[styles.ratingRow, isDark && styles.ratingRowDark]} >
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => handleRateBooking(booking.id, star)}
                                        activeOpacity={0.7}
                                    >
                                        <IconSymbol
                                            name="star.fill"
                                            size={22}
                                            color={star <= booking.rating ? (isDark ? '#FFF' : '#1A1A1A') : (isDark ? '#333' : '#E0E0E0')}
                                            style={{ marginRight: 4 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => console.log('Write review')}>
                                <Text style={styles.reviewLink}>Write a Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
                }
                <View style={{ height: 100 }} />
            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingTop: 30,
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F8F9FA',
    },
    headerDark: {
        backgroundColor: '#121212',
    },
    headerTitle: {
        fontSize: 24,
        color: '#1A1A1A',
        fontFamily: 'Inter-Bold',
    },
    textDark: {
        color: '#FFF',
    },
    textSecondaryDark: {
        color: '#AAA',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#F8F9FA',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchBarDark: {
        backgroundColor: '#1E1E1E',
        elevation: 0,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Inter-Regular',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#1E1E1E',
        elevation: 0,
    },
    cardMainContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageWrapper: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 15,
        backgroundColor: '#F0F0F0',
        overflow: 'hidden',
    },
    imageWrapperDark: {
        backgroundColor: '#333',
    },
    filterContainer: {
        marginBottom: 10,
    },
    filterScroll: {
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    filterPillDark: {
        backgroundColor: '#1E1E1E',
        borderColor: '#333',
    },
    activeFilterPill: {
        backgroundColor: '#1A1A1A',
        borderColor: '#1A1A1A',
    },
    filterText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Inter-Medium',
    },
    activeFilterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    serviceImage: {
        width: '100%',
        height: '100%',
    },
    bookingInfo: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    serviceName: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
        marginRight: 8,
        fontFamily: 'Inter-Bold',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F4',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1A1A1A',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#1A1A1A',
        fontFamily: 'Inter-SemiBold',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
        fontFamily: 'Inter-Regular',
    },
    ratingRow: {
        marginTop: 18,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'center',
    },
    ratingRowDark: {
        borderTopColor: '#333',
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    reviewLink: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: '500',
    },
});
