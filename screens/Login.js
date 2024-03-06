import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useFormik } from 'formik';

export const Login = () => {
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            showPassword: false, 
        },
        onSubmit: async (values, { setFieldError }) => {
            try {
                const response = await fetch('http://161.97.107.99:8019/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'sample_token1234',
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    })
                });

                const data = await response.json();
                console.log('Giriş API yanıtı:', data);

                if (data.error_code === 1011) {
                    setFieldError('password', 'Şifre veya kullanıcı adı yanlış!');
                } else {
                    const userId = data.user_id;
                    navigation.navigate("menu", { data: data });
                }
            } catch (error) {
                console.error('Giriş işlemi sırasında bir hata oluştu:', error);
            }
        },
    });

    const toggleShowPassword = () => {
        formik.setFieldValue('showPassword', !formik.values.showPassword);
    };
    

    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginBottom: 80,
        }}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 40,
            }}>
                <Image
                    source={require("../assets/movitaLogo.jpeg")}
                    style={{
                        width: 250,
                        height: 200
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 5,
                width: 330,
                height: 150,  // Toplam yükseklik, her iki TextInput'in toplam yüksekliği
                marginBottom: 20,
                backgroundColor: "#ededed"  // Arka plan rengi
            }}>
                <TextInput
                    placeholder='Kullanıcı Adı'
                    placeholderTextColor={"grey"}
                    style={{ width: 300, height: 40, marginLeft: 10, borderBottomWidth: 0.5, marginTop: 15, borderBottomColor: "grey" }}
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    value={formik.values.username}
                />
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
                <TextInput
                    placeholder='Şifre'
                    placeholderTextColor={"grey"}
                    secureTextEntry={!formik.values.showPassword}
                    style={{ width: 300, height: 40, marginLeft: 10, borderBottomWidth: 0.5, marginTop: 20, borderBottomColor: "grey" }}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={{ left: 13, position: 'absolute', bottom: 18, left: 290}}>
                <Entypo name={formik.values.showPassword ? "eye-with-line" : "eye"} size={24} color="grey"/>
                 </TouchableOpacity>
                <View style={{top: 20, right: 50}}>
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#00ADEE',
                        padding: 10,
                        borderRadius: 8,
                        width: 250,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: -25
                    }}
                    onPress={formik.handleSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: "bold" }}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};
