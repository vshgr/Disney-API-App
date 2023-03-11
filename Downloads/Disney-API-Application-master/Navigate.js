import React, {useState} from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import Character from "./components/Character";

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import ListPage from "./components/ListPage";

const Stack = createStackNavigator();

export default function Navigate() {


    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                title: "Авторизация",
                headerStyle: {
                    backgroundColor: 'white',
                    height: 120,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleStyle: {fontFamily: 'r-b', color: 'black'}
            }}/>
            <Stack.Screen name="Main" component={Main} options={{
                title: "Главная страница",
                headerStyle: {
                    backgroundColor: 'white',
                    height: 120,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleStyle: {fontFamily: 'r-b', color: 'black'},
                headerLeft: null,
                // headerRight: () => (
                //     <Ionicons style={{paddingRight: 10}}
                //               name="exit"
                //               size={34}
                //               color="black"
                //               onPress={() => {
                //                   auth
                //                       .signOut()
                //                       .then(() => console.log('User signed out!'));
                //                   setLoggedIn(false)
                //               }}/>
                // )
            }}/>
            <Stack.Screen name="Character" component={Character} options={{
                title: "Персонаж",
                headerStyle: {
                    backgroundColor: 'white',
                    height: 120,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleStyle: {fontFamily: 'r-b', color: 'black'}
            }}/>
            <Stack.Screen name="ListPage" component={ListPage} options={{
                headerStyle: {
                    backgroundColor: 'white',
                    height: 120,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleStyle: {fontFamily: 'r-b', color: 'black'}
            }}/>
        </Stack.Navigator>
    </NavigationContainer>;
}