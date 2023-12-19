import { View, Text, Button, TextInput} from "react-native";

export const Login = () => {

    return(
        <View>

         <View>
           <Text style={{
            fontSize: 20,
            }}>Kullanıcı Adı</Text>
            <View style={{margin: 7}}></View>
            <TextInput 
            placeholder='name'
            placeholderTextColor={"orange"}
            style={{ width: 200, height: 50, padding: 15, borderWidth: 1, borderRadius: 5 }} 
            onChangeText={setNAME}
            />
         </View>

         <View style={{margin: 30}}></View>

         <View>
            <Text style={{
            fontSize: 20,
            }}>Şifre</Text>
             <View style={{margin: 7}}></View>
            <TextInput 
            placeholder='Şifre'
            placeholderTextColor={"orange"}
            style={{ width: 200, height: 50, padding: 15, borderWidth: 1, borderRadius: 5 }}
            onChangeText={setPASS}
            />
         </View>
         <View style={{margin: 10}}></View>
         <Button title="Giriş Yap" onPress={(Login) => console.log("giriş yap butonuna bastınız")}/>
        </View>
    )
}