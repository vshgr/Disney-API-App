import {ActivityIndicator, StyleSheet} from 'react-native';
import * as Font from 'expo-font'
import {useState} from "react";
import AppLoading from "expo-app-loading";
import Stack from "./Navigate";

const fonts = () => Font.loadAsync({
    'r-r': require('./assets/fonts/Raleway-Regular.ttf'),
    'r-b': require('./assets/fonts/Raleway-Bold.ttf')
})

export default function App() {
    const [font, setFont] = useState(false);

    if (font) {
        return (
            <Stack/>
        );
    } else {
        return (
            <AppLoading
                startAsync={fonts}
                onFinish={() => setFont(true)}
                onError = {console.warn}
            />
        );
    }
}

const styles = StyleSheet.create({});
