import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 95;

const CATEGORIES_DATA = [
    {
        id: '1',
        name: 'Recommended',
        icon: 'star.fill',
        featured: {
            title: 'Professional Salon',
            subtitle: 'Starting from ₹499',
            image: 'https://images.unsplash.com/photo-1560066984-138bebc4c58a?w=400&q=80',
        },
        sections: [
            {
                title: 'Most Booked',
                items: [
                    { id: '1-1', name: 'AC Repair', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&sat=-100' },
                    { id: '1-2', name: 'Bathroom Clean', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&sat=-100' },
                    { id: '1-3', name: 'Instant Massage', img: 'https://images.unsplash.com/photo-1544161515-4ae6ce6ea858?w=200&sat=-100' },
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Salon',
        icon: 'content-cut',
        featured: {
            title: 'Luxury Spa',
            subtitle: 'Unwind at home',
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
        },
        sections: [
            {
                title: 'For Women',
                items: [
                    { id: '2-0', name: 'Professional Salon', img: 'https://images.unsplash.com/photo-1560066984-138bebc4c58a?w=400&q=80' },
                    { id: '2-1', name: 'Facial & Cleanup', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200' },
                    { id: '2-2', name: 'Waxing', img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=200' },
                    { id: '2-3', name: 'Pedicure', img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200' },
                ]
            },
            {
                title: 'For Men',
                items: [
                    { id: '2-4', name: 'Haircut', img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200' },
                    { id: '2-5', name: 'Shaving', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200' },
                ]
            }
        ]
    },
    {
        id: '3',
        name: 'Cleaning',
        icon: 'house.fill',
        featured: {
            title: 'Deep Home Clean',
            subtitle: 'Let it shine',
            image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
        },
        sections: [
            {
                title: 'Full House',
                items: [
                    { id: '3-1', name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15224bbaf40?w=200' },
                    { id: '3-2', name: 'Bathroom', img: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=200' },
                    { id: '3-3', name: 'Sofa & Carpet', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200' },
                ]
            }
        ]
    },
    {
        id: '4',
        name: 'Repair',
        icon: 'handyman',
        featured: {
            title: 'AC & Appliances',
            subtitle: 'Expert Technicians',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7903?w=400',
        },
        sections: [
            {
                title: 'Air Conditioner',
                items: [
                    { id: '4-1', name: 'Service', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200' },
                    { id: '4-2', name: 'Repair', img: 'https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?w=200' },
                    { id: '4-3', name: 'Installation', img: 'https://images.unsplash.com/photo-1504384308090-c89eececbfbc?w=200' },
                ]
            }
        ]
    },
];

export default function CategoriesScreen() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState('1');
    const { isDark } = useTheme();

    const selectedCategory = CATEGORIES_DATA.find(c => c.id === selectedId) || CATEGORIES_DATA[0];

    // High contrast monochromatic colors
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const secondaryTextColor = isDark ? '#CCCCCC' : '#444444';
    const bgColor = isDark ? '#000000' : '#FFFFFF';
    const sidebarBg = isDark ? '#111111' : '#F2F2F2';
    const activeSidebarBg = isDark ? '#000000' : '#FFFFFF';
    const headerBg = isDark ? '#000000' : '#FFFFFF';
    const borderColor = isDark ? '#333333' : '#DDDDDD';

    return (
        <SafeAreaView style={[styles.mainContainer, { backgroundColor: bgColor }]}>
            {/* Header: Refined & Professional */}
            <View style={[styles.header, { backgroundColor: headerBg, borderBottomColor: borderColor }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="arrow.left" size={24} color={textColor} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: textColor }]}>Categories</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.layout}>
                {/* Left Sidebar: High Contrast Icons */}
                <View style={[styles.sidebar, { backgroundColor: sidebarBg, borderRightColor: borderColor }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {CATEGORIES_DATA.map((cat) => {
                            const isActive = selectedId === cat.id;
                            return (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        styles.sidebarItem,
                                        isActive && { backgroundColor: activeSidebarBg }
                                    ]}
                                    onPress={() => setSelectedId(cat.id)}
                                >
                                    <View style={[
                                        styles.sidebarIconBox,
                                        { backgroundColor: isActive ? '#000000' : (isDark ? '#222222' : '#E0E0E0') }
                                    ]}>
                                        <IconSymbol
                                            name={cat.icon as any}
                                            size={24}
                                            color={isActive ? '#FFFFFF' : (isDark ? '#AAAAAA' : '#666666')}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.sidebarText,
                                        { color: isActive ? textColor : secondaryTextColor },
                                        isActive && { fontFamily: 'Inter-Bold' }
                                    ]}>
                                        {cat.name}
                                    </Text>
                                    {isActive && <View style={[styles.activeIndicator, { backgroundColor: textColor }]} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Right Content */}
                <View style={[styles.content, { backgroundColor: bgColor }]}>
                    <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>

                        {/* Featured Category Card - Grayscale focus */}
                        <TouchableOpacity style={styles.featuredCard}>
                            <Image
                                source={{ uri: selectedCategory.featured.image }}
                                style={[styles.featuredImage, { grayscale: 1 } as any]} // Simulating grayscale filtering
                            />
                            <View style={styles.featuredOverlay}>
                                <Text style={styles.featuredTitle}>{selectedCategory.featured.title}</Text>
                                <View style={styles.featuredBadge}>
                                    <Text style={styles.featuredSubtitle}>{selectedCategory.featured.subtitle}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Sections & Grids with improved visibility */}
                        {selectedCategory.sections.map((section, sIdx) => (
                            <View key={sIdx} style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Text style={[styles.sectionTitle, { color: textColor }]}>{section.title}</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.viewAllText, { color: secondaryTextColor }]}>See all</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.grid}>
                                    {section.items.map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.gridItem}>
                                            <View style={[styles.imageContainer, { borderColor: borderColor, borderWidth: 1 }]}>
                                                <Image
                                                    source={{ uri: item.img }}
                                                    style={[styles.itemImage, { grayscale: 1 } as any]}
                                                />
                                                <View style={styles.imageOverlay} />
                                            </View>
                                            <Text style={[styles.itemText, { color: textColor }]} numberOfLines={2}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 45, // Shifted downward for better spacing
        paddingBottom: 14,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        letterSpacing: -0.5,
    },
    searchIcon: {
        padding: 4,
    },
    layout: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        borderRightWidth: 1,
    },
    sidebarItem: {
        paddingVertical: 18,
        alignItems: 'center',
        position: 'relative',
    },
    sidebarIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sidebarText: {
        fontSize: 10,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        paddingHorizontal: 6,
    },
    activeIndicator: {
        position: 'absolute',
        right: 0,
        top: 18,
        bottom: 18,
        width: 4,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    content: {
        flex: 1,
    },
    contentScroll: {
        padding: 16,
    },
    featuredCard: {
        height: 150,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: 'rgba(0,0,0,0.6)', // Ensuring text visibility
        justifyContent: 'flex-end',
    },
    featuredTitle: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 4,
    },
    featuredBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    featuredSubtitle: {
        color: '#FFF',
        fontSize: 11,
        fontFamily: 'Inter-SemiBold',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: 'Inter-Bold',
    },
    viewAllText: {
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    gridItem: {
        width: '33.33%',
        paddingHorizontal: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#000',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    itemText: {
        fontSize: 11,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        paddingHorizontal: 2,
    },
});
