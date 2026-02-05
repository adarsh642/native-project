import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Banner } from '@/components/Banner';
import { CategoryItem } from '@/components/CategoryItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TextInput } from 'react-native';

// import { ProductCard } from '@/components/ProductCard';
import { ServiceCard } from '@/components/ServiceCard';
// 

// Mock Data
// Mock Data - Urban Company Style Services
const BANNER_SLIDES = [
  {
    id: '1',
    imageUri: 'https://images.unsplash.com/photo-1581578731117-104f2a41272c?w=800&h=400&fit=crop',
    title: 'Home Deep Cleaning',
    subtitle: 'Flat 50% off | Professional staff',
    buttonText: 'Book Now',
  },
  {
    id: '2',
    imageUri: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop',
    title: 'AC Service & Repair',
    subtitle: 'Get Summer Ready!',
    buttonText: 'Check Prices',
  },
  {
    id: '3',
    imageUri: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=400&fit=crop',
    title: 'Luxury Salon at Home',
    subtitle: 'Spa, Waxing & More',
    buttonText: 'View Services',
  },
];

const SERVICES = [
  { id: 'all', title: 'All', image: 'https://cdn-icons-png.flaticon.com/512/5707/5707258.png' },
  { id: '1', title: 'Cleaning', image: 'https://cdn-icons-png.flaticon.com/512/995/995016.png' },
  { id: '2', title: 'AC Repair', image: 'https://cdn-icons-png.flaticon.com/512/900/900618.png' },
  { id: '3', title: 'Salon', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' },
  { id: '4', title: 'Plumber', image: 'https://cdn-icons-png.flaticon.com/512/1064/1064875.png' },
  { id: '5', title: 'Electrician', image: 'https://cdn-icons-png.flaticon.com/512/2917/2917711.png' },
  { id: '6', title: 'Painting', image: 'https://cdn-icons-png.flaticon.com/512/2917/2917629.png' },
  { id: '7', title: 'Massage', image: 'https://cdn-icons-png.flaticon.com/512/1814/1814238.png' },
  { id: '8', title: 'Appliance', image: 'https://cdn-icons-png.flaticon.com/512/3652/3652392.png' },
  { id: '9', title: 'More', image: 'https://cdn-icons-png.flaticon.com/512/5707/5707258.png' },
];

const SERVICES_PACKAGES = [
  {
    id: '1',
    title: 'Split AC Power Saver Service',
    rating: 4.8,
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Bathroom Deep Cleaning',
    rating: 4.7,
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Sofa Deep Cleaning (3 Sofa Seats)',
    rating: 4.9,
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Men\'s Haircut & Grooming',
    rating: 4.8,
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop',
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
                  imageUri={cat.image}
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
