import {FlatList, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import {gStyle} from "../styles/styles";
import React, {useEffect, useState} from "react";
import {Ionicons} from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import {getCloudData, getCommentsData, storeCloudData} from "../firebase/DataAccess";
import {AntDesign} from '@expo/vector-icons';


export default function Main({navigation}) {
    const SEARCH_URL = "https://api.disneyapi.dev/character?name=";
    const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters";
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listName, setListName] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let newData = await getCloudData();
            if (newData !== undefined) {
                await setData((prevState) => {
                    prevState = newData
                    return [...prevState]
                });
            }
        }

        fetchData().catch(error => alert(error.message));
    }, [])

    const createList = async (listName) => {
        let flag = false
        data.map(item => {
            if (item.key === listName) {
                alert("List with such name exists!")
                flag = true
            }
        })
        if (!flag) {
            setData((prevState) => {
                prevState.push({key: listName, characters: []})
                return [...prevState];
            });
            let newData = await getCommentsData();
            await storeCloudData(newData, data);
        }
    }

    const searchCharacter = (url) => {
        setLoading(true);
        if (url === SEARCH_URL) {
            url = ALL_CHARACTERS_URL;
        }
        fetch(url).then((response) => response.json())
            .then((json) => {
                setAttributes(json.data);
            })
            .finally(() => setLoading(false));
    };

    const getData = () => {
        setLoading(true);
        fetch(ALL_CHARACTERS_URL).then((response) => response.json())
            .then((json) => {
                setAttributes(json.data);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getData();
    }, [])

    const setAttributes = (data) => {
        data.forEach((character) => {
            const {
                films,
                shortFilms,
                tvShows,
                videoGames,
                parkAttractions,
                allies,
                enemies,
                _id,
                name,
                imageUrl,
                url
            } = character;
            setCharacters((list) => {
                return [
                    ...list,
                    {
                        image: imageUrl,
                        name: name,
                        films: films,
                        shortFilms: shortFilms,
                        tvShows: tvShows,
                        videoGames: videoGames,
                        key: _id,
                        url: url,
                        comment: ""
                    }
                ]
            })
        })
    };

    const deleteList = async (listName) => {
        setData((prevState) => {
            prevState.splice(prevState.findIndex(i => i.key === listName), 1)
            return [...prevState]
        })
        let newData = await getCommentsData();
        storeCloudData(newData, data)
    }

    const renderContent = () => (
        <View style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450
        }}>
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TextInput style={gStyle.loginInput}
                           placeholder={'Search...'}
                           onChangeText={event => setListName(event)}/>
                <Ionicons style={{marginLeft: 10, alignSelf: 'center'}}
                          name="add-circle"
                          size={54}
                          color="black"
                          onPress={() => {
                              createList(listName).catch(error => alert(error.message));
                          }}/>
            </View>
            <FlatList style={gStyle.listsContainer} data={data} extraData={data}
                      renderItem={({item}) =>
                          <TouchableOpacity style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                          }}
                                            onPress={() => {
                                                navigation.navigate('ListPage', {
                                                    list: item,
                                                    lists: data
                                                });
                                                sheetRef.current?.snapTo(2);
                                            }}>
                              <Text style={gStyle.listsOfCharacters}>{item.key}</Text>
                              <AntDesign name="delete"
                                         size={24}
                                         color="red"
                                         onPress={() => {
                                             deleteList(item.key).catch(error => alert(error.message))
                                         }}
                              />
                          </TouchableOpacity>}
            />

        </View>
    );

    const sheetRef = React.useRef(null);

    return (
        <View style={gStyle.main}>
            <TextInput style={gStyle.input}
                       placeholder={"Search..."}
                       onSubmitEditing={(event) => {
                           setCharacters([]);
                           searchCharacter(SEARCH_URL + event.nativeEvent.text);
                       }}/>
            {
                loading ? (<ActivityIndicator size="large" color='grey'/>) :
                    (<FlatList data={characters} renderItem={({item}) => (
                        <TouchableOpacity style={gStyle.tableItem}
                                          onPress={() => {
                                              navigation.navigate('Character', {
                                                  item: item,
                                                  lists: data,
                                              });
                                              sheetRef.current?.snapTo(2);
                                          }}>
                            <Image style={gStyle.image} source={item.image ?
                                {uri: item.image}
                                : require('../assets/noimage-1-760x460.png')
                            }/>
                        </TouchableOpacity>
                    )} keyExtractor={item => item.key} numColumns={3}/>)
            }
            <Ionicons style={gStyle.createListButton} name="add-circle" size={64} color="white" onPress={() => {
                sheetRef.current.snapTo(0)
            }}/>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={20}
                renderContent={renderContent}
            />
        </View>
    );
}

