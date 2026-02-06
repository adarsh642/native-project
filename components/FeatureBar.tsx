import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const FeatureBar: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.featureItem}>
                <View style={styles.iconContainer}>
                    <IconSymbol name="checkmark.shield.fill" size={24} color="#3B82F6" />
                </View>
                <Text style={styles.featureText}>Verified{"\n"}Professionals</Text>
            </View>

            <View style={styles.featureItem}>
                <View style={styles.iconContainer}>
                    <IconSymbol name="hands.sparkles.fill" size={24} color="#3B82F6" />
                </View>
                <Text style={styles.featureText}>Sanitized{"\n"}Tools</Text>
            </View>

            <View style={styles.featureItem}>
                <View style={styles.iconContainer}>
                    <IconSymbol name="certificate.fill" size={24} color="#3B82F6" />
                </View>
                <Text style={styles.featureText}>Insurance{"\n"}Protection</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B82F6', // Blue from mockup
        flexDirection: 'row',
        paddingVertical: 16,
        marginHorizontal: 20,
        borderRadius: 12,
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },
});
