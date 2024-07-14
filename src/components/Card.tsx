import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
} from 'react-native';
import { COLORS } from '../theme';

const width_screen = Dimensions.get('window').width;

const card_item = width_screen - 24 * 2;

const card_size = {
    width: 325,
    height: 196,
};
interface Props {
    iban: string;
    name: string;
}

interface IBANFormat {
    numberPart: string;
    coco: string;

}

const Card: React.FC<Props> = ({ iban, name }) => {
    const formatIBAN = (iban: string): IBANFormat => {
        // Extract the relevant part of the string, skipping the first six characters
        const country = iban.substring(0, 2);
        const code = iban.substring(2, 6);
        const numberPart = iban.substring(6);
        // Format the extracted part by inserting spaces after every four digits
        const formatted = numberPart.match(/.{1,4}/g)?.join(' ') ?? '';

        return {
            numberPart: formatted,
            coco: `${country}-${code}`
        };
    }

    return (
        <ImageBackground
            source={require('../assets/card_visa_bg.png')}
            style={styles.card}>
            <View>
                <Image source={require('../assets/card_icon.png')} />
            </View>
            <View style={styles.cardNumber}>
                <View>
                    <Text style={styles.cardHolderName}>IBAN</Text>
                    <Text style={styles.cardNumberText}>{iban}</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.cardHolderName}>Card holder</Text>
                    <Text style={styles.cardName}>{name}</Text>
                </View>
                <Image source={require('../assets/visa_text.png')} />
            </View>
        </ImageBackground>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        width: card_item,
        height: (card_item * card_size.height) / card_size.width,
        padding: 24,
    },
    cardNumber: {
        flex: 1,
        justifyContent: 'center',
    },
    cardNumberText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
    },
    cardHolderName: { color: COLORS.secondaryLightGreyHex },
    cardName: { color: 'white', fontSize: 14 },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
