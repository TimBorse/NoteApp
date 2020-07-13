import React, { useState, useEffect, Component} from "react";
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Platform, Image,
} from 'react-native';
import KeyboardSpacer from "react-native-keyboard-spacer";
import RNDraftView, {getEditorState} from "react-native-draftjs-editor";
import AsyncStorage from '@react-native-community/async-storage';


const ControlButton = ({ text, action, isActive }) => {
    return (
        <TouchableOpacity
            style={[
                styles.controlButtonContainer,
                isActive ? { backgroundColor: "gold" } : {}
            ]}
            onPress={action}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

const EditorToolBar = ({
                           activeStyles,
                           blockType,
                           toggleStyle,
                           toggleBlockType
                       }) => {
    return (
        <View style={styles.toolbarContainer}>
            <ControlButton
                text={"B"}
                isActive={activeStyles.includes("BOLD")}
                action={() => toggleStyle("BOLD")}
            />
            <ControlButton
                text={"I"}
                isActive={activeStyles.includes("ITALIC")}
                action={() => toggleStyle("ITALIC")}
            />
            <ControlButton
                text={"H"}
                isActive={blockType === "header-one"}
                action={() => toggleBlockType("header-one")}
            />
            <ControlButton
                text={"ul"}
                isActive={blockType === "unordered-list-item"}
                action={() => toggleBlockType("unordered-list-item")}
            />
            <ControlButton
                text={"ol"}
                isActive={blockType === "ordered-list-item"}
                action={() => toggleBlockType("ordered-list-item")}
            />
            <ControlButton
                text={"--"}
                isActive={activeStyles.includes("STRIKETHROUGH")}
                action={() => toggleStyle("STRIKETHROUGH")}
            />
        </View>
    );
};

const styleMap = {
    STRIKETHROUGH: {
        textDecoration: "line-through"
    }
};

var defaultValue = "";
var id;
var initTitle = "";

const EditorScreen = (props) => {
    const _draftRef = React.createRef();
    const [activeStyles, setActiveStyles] = useState([]);
    const [blockType, setActiveBlockType] = useState("unstyled");
    const [editorState, setEditorState] = useState("");
    const category = props.route.params.categorie;
    id = props.route.params.id;
    if(id != undefined){
        getData(id);
        initTitle=id.split('-')[1];
    }else{
        console.log("KEINE ID");
    }
    const[title, setTitle] = useState(initTitle);


    const editorLoaded = () => {
        _draftRef.current && _draftRef.current.focus();
    };

    const toggleStyle = style => {
        _draftRef.current && _draftRef.current.setStyle(style);
    };

    const toggleBlockType = blockType => {
        _draftRef.current && _draftRef.current.setBlockType(blockType);
    };

    useEffect(() => {
        /**
         * Get the current editor state in HTML.
         * Usually keep it in the submit or next action to get output after user has typed.
         */
        setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : "");
    }, [_draftRef]);
    return (
        <SafeAreaView style={styles.containerStyle}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder={"Title"}
                onChangeText={(title) => setTitle({title})}
                defaultValue={title}
            />
            <RNDraftView
                defaultValue={defaultValue}
                onEditorReady={editorLoaded}
                style={{ flex: 1 }}
                placeholder={"Insert your text here..."}
                ref={_draftRef}
                onStyleChanged={setActiveStyles}
                onBlockTypeChanged={setActiveBlockType}
                styleMap={styleMap}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => saveData(props, title, category, _draftRef.current.getEditorState().toString())}
                style={styles.TouchableOpacityStyle}>
                <Image
                    //We are making FAB using TouchableOpacity with an image
                    //We are using online image here
                    // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png', }}

                    //You can use you project image Example below
                    source={require('../saveButton.png')}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>
            <EditorToolBar
                activeStyles={activeStyles}
                blockType={blockType}
                toggleStyle={toggleStyle}
                toggleBlockType={toggleBlockType}
            />
            {Platform.OS === "ios" ? <KeyboardSpacer /> : null}
        </SafeAreaView>
    );
};

async function saveData(props, title, category, data){
    try{
        var resTitle = title.title;
        if(id!=undefined){
            await AsyncStorage.removeItem(id);
        }
        if(resTitle == undefined){
            resTitle = initTitle;
        }
        var str = "Note-";
        str += resTitle;
        str += "-";
        str += category;
        await AsyncStorage.setItem(str, data.toString());
        props.navigation.goBack();
    }catch (err){
        console.log(err);
    }
}

async function getData(id){
    try{
        const data = await AsyncStorage.getItem(id);
        defaultValue = data;
    }catch (err){
        console.log(err);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: 36
    },
    toolbarContainer: {
        height: 56,
        flexDirection: "row",
        backgroundColor: "silver",
        alignItems: "center",
        justifyContent: "space-around"
    },
    controlButtonContainer: {
        padding: 8,
        borderRadius: 2
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        marginBottom: 80,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
    },
});

export default EditorScreen
