import { useNavigation, NavigationProp } from '@react-navigation/core';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { COLORS } from '../theme';

interface Layout {
    width: number;
    height: number;
}

interface Beneficiary {
    firstName: string;
    lastName: string;
    iban: string;
}

const WelcomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const [layouts, setLayout] = React.useState<Layout | null>(null);
    const beneficiaries = useSelector((state: { beneficiaries: { list: Beneficiary[] } }) => state.beneficiaries.list);

    const navigation = useNavigation<NavigationProp<any>>();

    const goToAddBeneficiary = () => {
        navigation.navigate('AddBeneficiary')
    }

    const goToHome = () => {
        navigation.navigate('Home', { beneficiaries: beneficiaries, navigation: navigation })
    }

    return (
        <ImageBackground
            source={require('../assets/bg_welcome.png')}
            style={[styles.container, { paddingTop: insets.top }]}
        >
            <View>
                <View style={styles.logoView}>
                    <View onLayout={({ nativeEvent }: LayoutChangeEvent) => setLayout(nativeEvent.layout)}>
                        {layouts && (
                            <Image
                                source={require('../assets/card_welcome_1.png')}
                                style={[
                                    styles.cardImg1,
                                    { width: layouts.width, height: layouts.height },
                                ]}
                                resizeMode="contain"
                            />
                        )}
                        <Image source={require('../assets/card_welcome_2.png')} />
                    </View>
                </View>
                <View style={styles.wrapText}>
                    <Text style={styles.textTitle}>
                        {'Serdao technical test'}
                    </Text>
                    <Text style={styles.textDesc}>
                        {` - Introduce a new page to create a beneficiary, including fields for their first name, last name, and IBAN. Additionally, incorporate an IBAN validator to ensure the IBAN's validity.\n- Enable the selection of a beneficiary from a list when making a transaction.\n- Preserve the state of the application so that upon reopening, the list of beneficiaries, transaction history, and balance are retained.`}
                    </Text>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={beneficiaries?.length > 0 ? goToHome : goToAddBeneficiary}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textTitle: {
        color: COLORS.primaryMintHex,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textDesc: {
        color: COLORS.primaryWhiteHex,
        textAlign: 'left',
        fontSize: 14,
        marginVertical: 30,
    },
    wrapText: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 100,
        marginTop: 40,
    },
    cardImg1: {
        position: 'absolute',
        zIndex: 2,
        bottom: 30,
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        backgroundColor: COLORS.primaryMintHex,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.primaryLightGreyHex,
        fontWeight: '700',
    },
});
