import {StyleSheet} from 'react-native';

export const gStyle = StyleSheet.create({
    login: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center"
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: "column"
    },
    title: {
        fontSize: 20,
        fontFamily: 'r-b',
        color: 'black',
        textAlign: "center"
    },
    loginButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'black',
        width: '50%',
        margin: 10
    },
    registerButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: '50%',
        margin: 10
    },
    loginInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        padding: 15,
        width: '75%',
        height: undefined,
        lineHeight: 17,
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 2/3,
        flex: 1,
        borderWidth: 1,
        borderColor: 'white'
    },
    tableItem: {
        width: '33.3%',
    },
    descStyle: {
        fontSize: 14,
        fontFamily: 'r-b',
        color: 'black',
        padding: 20,
        textAlign: "left"
    },
    character: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    openedImageStyle: {
        width: '50%',
        height: undefined,
        aspectRatio: 2/3,
        marginBottom: 20,
        borderRadius: 20,
        alignSelf: "center",
        marginTop: '20%'
    },
    backImg: {
        flex: 1,
        width: '100%',
        height: '40%',
        resizeMode: "contain"
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        padding: 15,
        width: '95%',
        height: undefined,
        lineHeight: 17,
        alignSelf: "center",
        marginBottom: 20
    },
    scroll: {
        marginTop: 20
    },
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10
    },
    createListButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 30,
        bottom: 30
    },
    listsOfCharacters: {
        fontSize: 18,
        fontFamily: 'r-r',
        padding: 10,
    },
    listsContainer: {
        flexDirection: "column",
        flex: 1,
        alignContent: "flex-start"
    },
    addToListButton: {
        marginBottom: 20,
    },
    commentButton: {
        // position: "absolute",
        // alignItems: "center",
        // justifyContent: "center",
    },
    comment: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 15,
        width: '95%',
        height: '95%',
        alignSelf: 'center',
        lineHeight: 17,
    }
})