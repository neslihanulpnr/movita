import { Image, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const User = () => {
    const navigation = useNavigation();

    const profilBilgileri = [
        { label: 'Ad', deger: 'neslihan' },
        { label: 'Soyad', deger: 'ulupınar' },
        { label: 'Yaş', deger: '19' },
        { label: 'Kan Grubu', deger: '0-'}
    ];

    return (
        <View style={{alignItems: "center"}}>
            <View>
                <Image source={require("../assets/profile.jpeg")} style={{
                    width: 200,
                    height: 200,
                    borderWidth: 3,
                    borderColor: "black",
                    borderRadius: 70,
                    marginTop: 20,
                }} />
            </View>

            {profilBilgileri.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ fontSize: 23 }}>{item.label} :</Text>
                    <Text style={{ fontSize: 23, marginLeft: 10 }}>{item.deger}</Text>
                </View>
            ))}
        </View>
    );
}
