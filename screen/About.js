import { Text, View } from "react-native"

export const About = () => {
    return (
        <View style={{ 
            flex: 1, 
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
            }}>
            <Text style={{ 
                fontSize: 25, 
                fontWeight: "bold", 
                color: "blue" }}>About</Text>
        </View>
    );
};

export default About;