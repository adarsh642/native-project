import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

const BOOKINGS = [
    {
        id: '1',
        serviceName: 'AC Deep Cleaning',
        status: 'Completed',
        statusType: 'completed',
        date: '24 Oct 2023',
        time: '10:30 AM',
        rating: 4,
    },
    {
        id: '2',
        serviceName: 'Bathroom Deep Cleaning',
        status: 'Upcoming',
        statusType: 'upcoming',
        date: '15 Oct 2023',
        time: '02:00 PM',
        rating: 0,
    },
    {
        id: '3',
        serviceName: 'Kitchen Degreasing',
        status: 'Cancelled',
        statusType: 'cancelled',
        date: '10 Oct 2023',
        time: '11:00 AM',
        rating: 0,
    },
    {
        id: '4',
        serviceName: 'Sofa Deep Cleaning',
        status: 'Completed',
        statusType: 'completed',
        date: '02 Oct 2023',
        time: '09:00 AM',
        rating: 3,
    },
];

export default function BookingsScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusStyles = (type: string) => {
        switch (type) {
            case 'completed':
                return { bg: '#E6F4EA', dot: '#1E8E3E', text: '#1E8E3E' };
            case 'upcoming':
                return { bg: '#E8F0FE', dot: '#1A73E8', text: '#1A73E8' };
            case 'cancelled':
                return { bg: '#FCE8E6', dot: '#D93025', text: '#D93025' };
            default:
                return { bg: '#F1F3F4', dot: '#5F6368', text: '#5F6368' };
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            {/* Search and Filter Row */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#888" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search bookings..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <IconSymbol name="slider.horizontal.3" size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {BOOKINGS.map((booking) => (
                    <View key={booking.id} style={styles.card}>
                        {/* Top Row: Service Name & Status */}
                        <View style={styles.cardHeader}>
                            <Text style={styles.serviceName}>{booking.serviceName}</Text>
                            <View style={[
                                styles.statusContainer,
                                { backgroundColor: getStatusStyles(booking.statusType).bg }
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

                        {/* Middle Row: Date & Time */}
                        <View style={styles.detailsRow}>
                            <IconSymbol name="calendar.fill" size={16} color="#666" />
                            <Text style={styles.detailText}>{booking.date} at {booking.time}</Text>
                        </View>

                        {/* Bottom Row: Centered Large Stars & Review Link */}
                        <View style={styles.ratingRow}>
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IconSymbol
                                        key={star}
                                        name="star.fill"
                                        size={22}
                                        color={star <= booking.rating ? '#4CAF50' : '#E0E0E0'}
                                        style={{ marginRight: 4 }}
                                    />
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => console.log('Write review')}>
                                <Text style={styles.reviewLink}>Write a Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                {/* Anti-Overlap Padding */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingTop: 30,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F8F9FA',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#F8F9FA',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
    },
    filterButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F4EA',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1E8E3E',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E8E3E',
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
    },
    ratingRow: {
        marginTop: 15,
        alignItems: 'center',
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
