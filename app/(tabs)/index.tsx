import { Banner } from '@/components/Banner';
import { CartNotification } from '@/components/CartNotification';
import { CategoryItem } from '@/components/CategoryItem';
import { ServiceCard } from '@/components/ServiceCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FeatureBar } from '@/components/FeatureBar';
import { RecommendedCard } from '@/components/RecommendedCard';
import { ReviewCard } from '@/components/ReviewCard';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';


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
    title: 'Kitchen Deep Cleaning',
    subtitle: 'Deep clean for your kitchen including appliances.',
    rating: 4.8,
    price: 45,
    image: 'https://images.unsplash.com/photo-1527368746281-798b65e1ac6e?w=600',
  },
  {
    id: '2',
    title: 'Pest Control Service',
    subtitle: 'Effective treatment for common pests.',
    rating: 4.7,
    price: 50,
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=600',
  },
  {
    id: '3',
    title: 'Sofa Deep Cleaning',
    subtitle: 'Remove stains and dust from your living space.',
    rating: 4.9,
    price: 25,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  },
];

const REVIEWS = [
  {
    id: '1',
    name: 'Sarah J.',
    review: 'Great service! The professionals were very polite and thorough.',
    rating: 5,
    avatarUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  {
    id: '2',
    name: 'Junian D.',
    review: 'Finished on time and left everything spotless!',
    rating: 4,
    avatarUri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
  },
  {
    id: '3',
    name: 'Ravin K.',
    review: 'Very professional. Highly recommended for deep cleaning.',
    rating: 5,
    avatarUri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('1');
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const handleCategoryPress = (id: string, title: string) => {
    if (title === 'All' || title === 'More') {
      router.push('/categories');
    } else {
      setActiveCategory(id);
    }
  };

  const handleAddToCart = (pkg: any) => {
    addToCart({
      id: pkg.id,
      name: pkg.title,
      price: pkg.price,
      image: pkg.image,
    });
    setNotificationMsg(`${pkg.title} added to cart!`);
    setShowNotification(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const secondaryTextColor = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
  const bgColor = isDark ? Colors.dark.background : Colors.light.background;
  const searchBg = isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <CartNotification
        visible={showNotification}
        message={notificationMsg}
        onHide={() => setShowNotification(false)}
        onViewCart={() => router.push('/(tabs)/cart')}
      />
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={bgColor} />

      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, isDark && styles.textSecondaryDark]}>Good Morning,</Text>
          <Text style={[styles.location, isDark && styles.textDark]}>New York, USA ▼</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <IconSymbol name="bell.fill" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: searchBg }]}>
          <IconSymbol name="magnifyingglass" size={20} color={secondaryTextColor} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search for 'AC Repair'"
            placeholderTextColor={secondaryTextColor}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <Banner
          slides={BANNER_SLIDES}
          onPress={(slide) => console.log('Banner Pressed', slide.title)}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Category</Text>
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
                  onPress={() => handleCategoryPress(cat.id, cat.title)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Most Booked Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsList}>
            {SERVICES_PACKAGES.map((pkg) => (
              <ServiceCard
                key={pkg.id}
                title={pkg.title}
                rating={pkg.rating}
                price={pkg.price}
                imageUri={pkg.image}
                onAdd={() => handleAddToCart(pkg)}
                onPress={() => router.push({
                  pathname: '/service-details',
                  params: {
                    id: pkg.id,
                    title: pkg.title,
                    price: pkg.price.toString(),
                    image: pkg.image,
                    rating: pkg.rating.toString(),
                    subtitle: pkg.subtitle || ''
                  }
                })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsList}>
            {SERVICES_PACKAGES.map((pkg) => (
              <RecommendedCard
                key={pkg.id}
                title={pkg.title}
                subtitle={pkg.subtitle!}
                price={pkg.price}
                imageUri={pkg.image}
                onAdd={() => handleAddToCart(pkg)}
              />
            ))}
          </ScrollView>
        </View>

        <FeatureBar />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Customer Reviews</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsList}>
            {REVIEWS.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                review={review.review}
                rating={review.rating}
                avatarUri={review.avatarUri}
                comment={review.review}
              />
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.giftContainer}>
              <IconSymbol name="gift.fill" size={32} color="#fff" />
            </View>
            <Text style={styles.promoText}>Invite a friend and get $10 off your next booking!</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />

      </ScrollView>



    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  textDark: {
    color: '#FFF',
  },
  textSecondaryDark: {
    color: '#AAA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
  },
  searchBarDark: {
    backgroundColor: '#1E1E1E',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  greeting: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Inter-Regular',
  },
  location: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
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
    color: '#1A1A1A',
    marginLeft: 20,
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Inter-Medium',
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
    width: 80,
    marginRight: 15,
  },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  promoBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#9C27B0', // More vibrant purple matching mockup better
    marginTop: 8,
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  promoContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  giftContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  promoText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  }
});
