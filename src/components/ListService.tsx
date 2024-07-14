import React from 'react';
import { Image, StyleSheet, Text, View, ImageSourcePropType } from 'react-native';
import { COLORS } from '../theme';

interface Service {
    name: string;
    icon: ImageSourcePropType;
}

const listService: Service[] = [
    {
        name: 'Wallet',
        icon: require('../assets/ic_wallet.png'),
    },
    {
        name: 'Transfer',
        icon: require('../assets/ic_transfer.png'),
    },
    {
        name: 'Pay',
        icon: require('../assets/ic_pay.png'),
    },
    {
        name: 'Top Up',
        icon: require('../assets/ic_topup.png'),
    },
];

const renderServiceItem = (item: Service) => {
    return (
        <View key={item.name} style={styles.items}>
            <View style={styles.icon}>
                <Image source={item.icon} />
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );
};

const ListService: React.FC = () => {
    return (
        <View>
            <Text style={styles.title}>Services</Text>
            <View style={styles.list}>{listService.map(renderServiceItem)}</View>
        </View>
    );
};

export default ListService;

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.primaryMintHex
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
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
    items: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        marginTop: 10,
        color: COLORS.primaryWhiteHex
    },
});
