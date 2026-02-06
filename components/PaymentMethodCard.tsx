import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

interface PaymentMethodCardProps {
    brand: 'VISA' | 'MASTERCARD' | 'PAYTM' | 'AMAZON';
    name: string;
    number: string;
    expiry?: string;
    balance?: string;
    error?: string;
    isPrimary?: boolean;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
    brand,
    name,
    number,
    expiry,
    balance,
    error,
    isPrimary
}) => {
    const { isDark } = useTheme();

    // Brand colors
    const brandStyles = {
        VISA: { color: '#ffffff', brandText: 'VISA', logoColor: '#fff' },
        MASTERCARD: { color: '#ffffff', brandText: 'Mastercard', logoColor: '#fff' },
        PAYTM: { color: '#ffffff', brandText: 'paytm', logoColor: '#00baf2' },
        AMAZON: { color: '#ffffff', brandText: 'amazon pay', logoColor: '#FF9900' },
    };

    return (
        <View style={[styles.container, isPrimary && styles.primaryCard]}>
            <View style={styles.header}>
                <View style={styles.brandContainer}>
                    {brand === 'VISA' && <Text style={styles.visaText}>VISA</Text>}
                    {brand === 'MASTERCARD' && (
                        <View style={styles.mcContainer}>
                            <View style={[styles.mcCircle, { backgroundColor: '#EB001B' }]} />
                            <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -10 }]} />
                        </View>
                    )}
                    {brand === 'PAYTM' && <Text style={styles.paytmText}>paytm</Text>}
                    {brand === 'AMAZON' && <Text style={styles.amazonText}>amazon pay</Text>}
                </View>
                {expiry && <Text style={styles.expiryText}>{expiry}</Text>}
            </View>

            <View style={styles.body}>
                <Text style={styles.numberText}>{number}</Text>
            </View>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.nameLabel}>CARD HOLDER</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View style={styles.chip}>
                    <View style={styles.chipLine} />
                    <View style={styles.chipLine} />
                    <View style={styles.chipLine} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 160,
        backgroundColor: '#4A148C', // Deep purple
        borderRadius: 20,
        padding: 20,
        marginRight: 16,
        justifyContent: 'space-between',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    primaryCard: {
        backgroundColor: '#6A1B9A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandContainer: {
        height: 24,
        justifyContent: 'center',
    },
    visaText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        fontStyle: 'italic',
    },
    paytmText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    amazonText: {
        color: '#FF9900',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mcContainer: {
        flexDirection: 'row',
    },
    mcCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    expiryText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontFamily: 'Inter-Medium',
    },
    body: {
        marginVertical: 10,
    },
    numberText: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 4,
        fontFamily: 'Inter-Bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    nameLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontFamily: 'Inter-Medium',
        marginBottom: 2,
    },
    nameText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        textTransform: 'uppercase',
    },
    chip: {
        width: 35,
        height: 25,
        backgroundColor: '#FFD700',
        borderRadius: 4,
        padding: 4,
        justifyContent: 'space-around',
    },
    chipLine: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    }
});
