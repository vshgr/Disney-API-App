import {TextInput, Text, View, Image, ImageBackground, ScrollView, FlatList} from 'react-native';
import {gStyle} from "../styles/styles";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import BottomSheet from 'reanimated-bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import {storeCloudData, getCommentsData, storeComments, getCloudData} from "../firebase/DataAccess";
import {FontAwesome5} from '@expo/vector-icons';


export default function Character({route}) {
    const [comment, setComment] = useState("");
    const [commentData, setCommentData] = useState([]);

    const textData = (data) => {
        if (data.length === 0) {
            return '–';
        }
        return data.join(', ');
    }

    useEffect(() => {
        sheetRef.current.snapTo(2);
        commentSheet.current.snapTo(2);

        async function fetchData() {
            let newData = await getCommentsData();
            if (newData !== undefined) {
                await setCommentData(newData);
                newData.map(i => {
                    if (i.key.name === route.params.item.name) {
                        setComment(i.comment)
                    }
                })
            }
        }
        fetchData();
    }, [])

    const addComment = async (com) => {
        let flag = false
        await setComment(com)

        commentData.map(item => {
            if (item.key.name === route.params.item.name) {
                setCommentData((prevState) => {
                    prevState.find(i => i.key.name === item.key.name).comment = com
                    return [...prevState];
                });
                flag = true
            }
        })
        if (!flag) {
            await setCommentData((prevState) => {
                prevState.push({key: route.params.item, comment: com})
                return [...prevState];
            });
        }
        await storeCloudData(commentData, route.params.lists);
    }


    const addCharacterToList = (listName) => {
        route.params.lists.map(i => {
            if (i.key === listName) {
                if (i.characters.find(item => route.params.item === item)) {
                    alert('List contains this character')
                } else {
                    i.characters.push(route.params.item);
                    storeCloudData(commentData, route.params.lists);
                }
            }
        })
    }

    const renderContent = () => (
        <View style={{
            backgroundColor: '#F2F2F2',
            padding: 16,
            height: 450
        }}>
            <FlatList style={gStyle.listsContainer} data={route.params.lists} extraData={route.params.lists}
                      renderItem={({item}) =>
                          <View style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                          }}>
                              <Text style={gStyle.listsOfCharacters}>{item.key}</Text>
                              <Ionicons style={{marginLeft: 10, alignSelf: 'center'}}
                                        name="add-circle"
                                        size={44}
                                        color="black"
                                        onPress={() => {
                                            addCharacterToList(item.key)
                                        }}
                              />
                          </View>}/>

        </View>
    );

    const renderCommentSheet = () => (
        <View style={{
            backgroundColor: '#F2F2F2',
            padding: 16,
            height: 350
        }}>
            <TextInput style={gStyle.comment}
                       placeholder={'Add comment...'}
                       onChangeText={c => {
                           addComment(c).catch(error => alert(error.message))
                       }}
                       multiline={true}
                       value={comment}
            />
        </View>
    );

    const sheetRef = React.useRef(null);
    const commentSheet = React.useRef(null);

    return (
        <View style={gStyle.character}>
            <ImageBackground
                style={gStyle.backImg}
                source={require('../assets/pngwing.com.png')}
            >
                <LinearGradient colors={['rgba(255,255,255,0)', "white"]} start={{x: 1, y: 0}} end={{x: 1, y: 0.7}}>
                    <Image style={gStyle.openedImageStyle} source={{
                        uri: route.params.item.image
                    }}/>

                </LinearGradient>
                <Text style={gStyle.title}>{route.params.item.name}</Text>
                <ScrollView style={gStyle.scroll}>
                    <Text style={gStyle.descStyle}>Фильмы: {textData(route.params.item.films)}</Text>
                    <Text style={gStyle.descStyle}>Видео-игры: {textData(route.params.item.videoGames)}</Text>
                    <Text style={gStyle.descStyle}>ТВ шоу: {textData(route.params.item.tvShows)}</Text>
                    <Text style={gStyle.descStyle}>Короткие фильмы: {textData(route.params.item.shortFilms)}</Text>
                </ScrollView>

                <View style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    padding: 15,
                }}>
                    <AntDesign style={gStyle.addToListButton}
                               name="staro"
                               size={44} color="black"
                               onPress={() => sheetRef.current?.snapTo(0)}
                    />
                    <FontAwesome5 style={gStyle.commentButton}
                                  name="comments"
                                  size={34}
                                  color="black"
                                  onPress={() => commentSheet.current?.snapTo(0)}/>
                </View>

                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[450, 300, 0]}
                    borderRadius={20}
                    renderContent={renderContent}
                />
                <BottomSheet
                    ref={commentSheet}
                    snapPoints={[350, 300, 0]}
                    borderRadius={20}
                    renderContent={renderCommentSheet}
                />
            </ImageBackground>
        </View>
    );
}