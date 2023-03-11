import {FlatList, View, TouchableOpacity, Image} from 'react-native';
import {gStyle} from "../styles/styles";
import React, {useEffect, useState} from "react";

export default function ListPage({navigation, route}) {

    useEffect(() => {
        navigation.setOptions({ title: route.params.list.key})
    }, [])

    return (
        <View style={gStyle.main}>
            <FlatList data={route.params.list.characters} renderItem={({item}) => (
                <TouchableOpacity style={gStyle.tableItem}
                                  onPress={() => {
                                      navigation.navigate('Character', {
                                          item: item,
                                          lists: route.params.lists
                                      });
                                  }}>
                    <Image style={gStyle.image} source={item.image ?
                        {uri: item.image}
                        : require('../assets/noimage-1-760x460.png')
                    }/>
                </TouchableOpacity>
            )} keyExtractor={item => item.key} numColumns={3}/>
        </View>
    );
}