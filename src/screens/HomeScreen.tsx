import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import ListService from '../components/ListService';
import RecentTransaction from '../components/RecentTransaction';
import { RootStackParamList } from '../resources/types';
import { COLORS } from '../theme';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: any;
}


interface Params {
  beneficiaries: Beneficiary;
}

interface Beneficiary {
  firstName: string;
  lastName: string;
  iban: string;
}

const HomeScreen: React.FC<Props> = (props) => {
  const { navigation, route: { params: { beneficiaries } } } = props
  console.log('props :>> ', beneficiaries?.[0]?.lastName);
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../assets/bg_welcome.png')}
      style={[{ flex: 1 }, { paddingTop: insets.top }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Hello</Text>
            <Text style={styles.userName}>{beneficiaries?.[0]?.lastName || ""}</Text>
          </View>
          <Image style={styles.notifyIcon} source={require('../assets/ic_notif.png')} />
        </View>
        <FlatList
          data={beneficiaries}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Card name={`${item.firstName} ${item.lastName}`} iban={item.iban} />
            </View>)
          }
        />
        <ListService />
        <RecentTransaction />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  notifyIcon: { width: 24, height: 24, tintColor: 'white' },
  welcome: {
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 24,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primaryMintHex,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    paddingTop: 48,
  },
  item: {
    padding: 10,
  },
});
