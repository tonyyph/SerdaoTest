// src/screens/AddBeneficiaryScreen.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet } from 'react-native';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import useValidIBAN from '../hooks/useValidIBan';
import { RootStackParamList } from '../resources/types';
import { COLORS } from '../theme';


type AddBeneficiaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddBeneficiary'>;

interface Props {
  navigation: AddBeneficiaryScreenNavigationProp;
}

interface Beneficiary {
  firstName: string;
  lastName: string;
  iban: string;
}


const AddBeneficiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const isValidIBAN = useValidIBAN(iban);

  const dispatch = useDispatch();

  const handleAddBeneficiary = () => {
    if (!isValidIBAN) {
      Alert.alert('Invalid IBAN', 'Please enter a valid IBAN');
      return;
    }

    dispatch({
      type: 'ADD_BENEFICIARY',
      payload: { firstName, lastName, iban },
    });

    const beneficiaries = { firstName, lastName, iban };

    navigation.navigate('Home', { beneficiaries: [{ ...beneficiaries }], navigation: navigation })
  };

  return (
    <ImageBackground
      source={require('../assets/bg_welcome.png')}
      style={[{ flex: 1 }]}
    >
      <Appbar.Header dark={false} style={{ height: 24, backgroundColor: 'transparent', alignItems: 'center' }}>
        <Appbar.BackAction size={18} color={COLORS.primaryMintHex} onPress={() => navigation.goBack()} />
        <Appbar.Content titleStyle={{ fontSize: 20 }} color={COLORS.primaryMintHex} title="Beneficiary" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            mode="flat"
            textColor={COLORS.primaryMintHex}
            underlineColor={COLORS.primaryWhiteHex}
            activeUnderlineColor={COLORS.primaryMintHex}
            activeOutlineColor={COLORS.primaryMintHex}
            style={styles.input}
            contentStyle={styles.contentStyleFlat}
            underlineStyle={styles.contentInput}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            mode="flat"
            textColor={COLORS.primaryMintHex}
            underlineStyle={styles.contentInput}
            underlineColor={COLORS.primaryWhiteHex}
            contentStyle={styles.contentStyleFlat}
            activeUnderlineColor={COLORS.primaryMintHex}
            style={styles.input}
          />
          <TextInput
            label="IBAN"
            value={iban}
            onChangeText={setIban}
            mode="flat"
            textColor={COLORS.primaryMintHex}
            underlineColor={COLORS.primaryWhiteHex}
            activeUnderlineColor={COLORS.primaryMintHex}
            contentStyle={styles.contentStyleFlat}
            style={styles.input}
            underlineStyle={styles.contentInput}
          />
          <Button mode="contained-tonal" onPress={handleAddBeneficiary} style={styles.button}>
            {'Add Beneficiary'}
          </Button>
        </Card.Content>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contentStyleFlat: {
    // backgroundColor: COLORS.primaryBlackHex, borderTopRightRadius: 24, borderColor: COLORS.primaryLightGreyHex, borderWidth: 1,
  },
  contentInput: {
    borderColor: COLORS.primaryBlackRGBA,
    borderRadius: 24,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginVertical: 24,
    marginHorizontal: 24,
    padding: 10,
    borderRadius: 24,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
    borderRadius: 24,
  },
  button: {
    marginTop: 10,
  },
});

export default AddBeneficiaryScreen;
