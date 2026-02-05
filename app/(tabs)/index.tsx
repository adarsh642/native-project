import { Banner } from '@/components/Banner';
import { CategoryItem } from '@/components/CategoryItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ServiceCard } from '@/components/ServiceCard';

// Mock Data
// Mock Data - Urban Company Style Services
const BANNER_SLIDES = [
  {
    id: '1',
    imageUri: 'https://images.herzindagi.info/image/2021/Jul/how-to-deep-clean-bathroom-like-a-professional-main.jpg',
    title: 'Home Deep Cleaning',
    subtitle: 'Flat 50% off | Professional staff',
    buttonText: 'Book Now',
  },
  {
    id: '2',
    imageUri: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&h=600&fit=crop',
    title: 'AC Service & Repair',
    subtitle: 'Get Summer Ready!',
    buttonText: 'Check Prices',
  },
  {
    id: '3',
    imageUri: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1000&h=600&fit=crop',
    title: 'Luxury Salon at Home',
    subtitle: 'Spa, Waxing & More',
    buttonText: 'View Services',
  },
];

const SERVICES = [
  { id: '1', title: 'All', icon: 'view-module' },
  { id: '2', title: 'AC Repair', icon: 'ac-unit' },
  { id: '3', title: 'Salon', icon: 'content-cut' },
  { id: '4', title: 'Plumber', icon: 'plumbing' },
  { id: '5', title: 'Electrician', icon: 'power' },
  { id: '6', title: 'Painting', icon: 'format-paint' },
  { id: '7', title: 'Massage', icon: 'spa' },
  { id: '8', title: 'Appliance', icon: 'kitchen' },
  { id: '9', title: 'More', icon: 'more-horiz' },
];

const SERVICES_PACKAGES = [
  {
    id: '1',
    title: 'Split AC Power Saver Service',
    rating: 4.8,
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  },
  {
    id: '2',
    title: 'Bathroom Deep Cleaning',
    rating: 4.7,
    price: 15.50,
    image: 'https://images.herzindagi.info/image/2021/Jul/how-to-deep-clean-bathroom-like-a-professional-main.jpg',
  },
  {
    id: '3',
    title: 'Sofa Deep Cleaning (3 Sofa Seats)',
    rating: 4.9,
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  },
  {
    id: '4',
    title: 'Men\'s Haircut & Grooming',
    rating: 4.8,
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
  },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('1');
  // const [itemCount, setItemCount] = useState(2);
  // const [totalPrice, setTotalPrice] = useState(13.80);

  const handleAddToCart = (price: number) => {
    console.log('Added to cart');
    // setItemCount(prev => prev + 1);
    // setTotalPrice(prev => prev + price);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.location}>New York, USA ▼</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <IconSymbol name="bell.fill" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for 'AC Repair'"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Banner Carousel */}
        <Banner
          slides={BANNER_SLIDES}
          onPress={(slide) => console.log('Banner Pressed', slide.title)}
        />

        {/* Category Scroll Row (Urban Style) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {SERVICES.map((cat) => (
              <View key={cat.id} style={styles.categoryItemWrapper}>
                <CategoryItem
                  title={cat.title}
                  icon={cat.icon as any}
                  isActive={activeCategory === cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Most Booked Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Booked Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsList}>
            {SERVICES_PACKAGES.map((pkg) => (
              <ServiceCard
                key={pkg.id}
                title={pkg.title}
                rating={pkg.rating}
                price={pkg.price}
                imageUri={pkg.image}
                onAdd={() => console.log('Add service', pkg.title)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Padding for Floating Bar */}
        <View style={{ height: 100 }} />

      </ScrollView>



    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30, // For simple status bar gap if SafeArea doesn't handle fully
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10, // Reduced margin to fit search bar
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileButton: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 15,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 20,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#888',
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  categoryItemWrapper: {
    alignItems: 'center',
    width: 80, // Fixed width for scroll consistency
    marginRight: 15,
  },
  productsList: {
    paddingHorizontal: 20,
  },
});
