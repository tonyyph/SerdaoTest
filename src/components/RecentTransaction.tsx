import React from 'react';
import { Image, StyleSheet, Text, View, ImageSourcePropType } from 'react-native';
import { COLORS } from '../theme';

interface Transaction {
    type: string;
    icon: ImageSourcePropType;
    date: string;
    payment: string;
}

const listTransactions: Transaction[] = [
    {
        type: 'Spotify',
        icon: require('../assets/ic_spotify.png'),
        date: 'Jun 12, 12:30',
        payment: '+ $12',
    },
    {
        type: 'Paypal',
        icon: require('../assets/ic_paypal.png'),
        date: 'Jun 12, 12:30',
        payment: '+ $12',
    },
    {
        type: 'Dribble',
        icon: require('../assets/ic_dribble.png'),
        date: 'Jun 12, 12:30',
        payment: '+ $14',
    },
];

const renderTransactionItem = (item: Transaction) => (
    <View key={item.type} style={styles.items}>
        <View style={styles.icon}>
            <Image source={item.icon} />
        </View>
        <View style={styles.itemBody}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.date}>{item.date}</Text>
        </View>
        <View>
            <Text style={styles.payment}>{item.payment}</Text>
        </View>
    </View>
);

const RecentTransaction: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            <View>
                {listTransactions.map(renderTransactionItem)}
            </View>
        </View>
    );
};

export default RecentTransaction;

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.primaryMintHex
    },
    container: {
        marginTop: 12,
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
    },
    icon: {
        padding: 10,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { height: 10, width: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBody: {
        flex: 1,
        paddingLeft: 14,
    },
    type: {
        fontWeight: '500',
        fontSize: 16,
        color: COLORS.primaryMintHex
    },
    date: {
        marginTop: 5,
        color: COLORS.primaryWhiteHex
    },
    payment: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'green'
    },
});
