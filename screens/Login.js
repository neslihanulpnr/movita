import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';

export const Login = () => {
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
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
            <View style={{ marginTop: 20 }}>
                <View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require("../assets/movitaLogo.jpeg")}
                            style={{
                                width: 250,
                                height: 200
                            }} />
                    </View>
                    <View>
                        <View style={{ margin: 7 }}></View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 300,
                            height: 55,
                            padding: 15,
                            borderWidth: 0.1,
                            borderRadius: 1
                        }}>
                            <Ionicons name="person-circle-outline" size={27} color="grey" />
                            <TextInput
                                placeholder='Kullanıcı Adı'
                                placeholderTextColor={"gray"}
                                style={{ flex: 1, marginLeft: 10 }}
                                onChangeText={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                                value={formik.values.username}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 300,
                            height: 55,
                            padding: 15,
                            borderWidth: 0.1,
                            borderRadius: 1
                        }}>
                            <TouchableOpacity onPress={toggleShowPassword} style={{ left: 13, position: 'absolute', }}>
                                <AntDesign name={formik.values.showPassword ? 'unlock' : 'lock'} size={27} color="grey" />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Şifre'
                                placeholderTextColor={"grey"}
                                secureTextEntry={!formik.values.showPassword}
                                style={{ flex: 1, marginLeft: 35 }}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                            />
                        </View>
                        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
                    </View>
                    <View style={{ margin: 10 }}></View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#00ADEE',
                            padding: 10,
                            borderRadius: 5,
                            width: 150,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={formik.handleSubmit}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
