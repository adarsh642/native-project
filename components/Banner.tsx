import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 20;
const CARD_WIDTH = width - (CARD_MARGIN * 2);

export interface BannerSlide {
  id: string;
  imageUri: string;
  title: string;
  subtitle?: string;
  buttonText: string;
}

interface BannerProps {
  slides: BannerSlide[];
  onPress: (slide: BannerSlide) => void;
}

export const Banner: React.FC<BannerProps> = ({ slides, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={width} // Snap to screen width
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slideContainer}>
            <View style={styles.card}>
              <Image source={{ uri: slide.imageUri }} style={styles.image} resizeMode="cover" />
              <View style={styles.overlay}>
                <View style={styles.content}>
                  <Text style={styles.title}>{slide.title}</Text>
                  {slide.subtitle && <Text style={styles.subtitle}>{slide.subtitle}</Text>}
                  <TouchableOpacity style={styles.button} onPress={() => onPress(slide)}>
                    <Text style={styles.buttonText}>{slide.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#1A1A1A' : '#ccc', width: index === activeIndex ? 20 : 8 }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  scrollContent: {
    // No padding here to ensure paging works correctly on full width logic
  },
  slideContainer: {
    width: width, // Full width of screen
    alignItems: 'center', // Center the card within the width
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    maxWidth: '75%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 12,
    fontFamily: 'System',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'System',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
