import React, { useState, useEffect, Component} from "react";
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Platform, Image, Button,
} from 'react-native';
import KeyboardSpacer from "react-native-keyboard-spacer";
import RNDraftView, {getEditorState} from "react-native-draftjs-editor";
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';

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
var category;

const EditorScreen = (props) => {
    const _draftRef = React.createRef();
    const [activeStyles, setActiveStyles] = useState([]);
    const [blockType, setActiveBlockType] = useState("unstyled");
    const [editorState, setEditorState] = useState("");
    category = props.route.params.category;
    id = props.route.params.id;
    if(id != undefined){
        getData(id);
        initTitle=id.split('-')[1];
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
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigateToImage(props)}
                    style={styles.ImageOpacityStyle}>
                    <Icon
                        reverse
                        name={'image'}
                        type='font-awesome'
                        size={25}
                        color={'#6268b8'}
                    >
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => saveData(props, title, category, _draftRef.current.getEditorState().toString())}
                    style={styles.TouchableOpacityStyle}>
                    <Icon
                        reverse
                        name={'download'}
                        type='font-awesome'
                        size={25}
                        color={'#6268b8'}
                    >
                    </Icon>
                </TouchableOpacity>
            </View>
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

function navigateToImage(props){
    props.navigation.navigate('Image', {
        id: id
    });
}


async function saveData(props, title, category, data){
    try{
        var resTitle = title.title;
        if(id!=undefined){
            await AsyncStorage.removeItem(id);
        }
        if(resTitle == undefined){
            resTitle = initTitle;
        }
        if(resTitle != initTitle){
            var keys = await AsyncStorage.getAllKeys();
            for(var i=0; i<keys.length; i++){
                let key = keys[i];
                let value;
                if(key == "Image-"+initTitle+"-"+category){
                    value = await AsyncStorage.getItem(key);
                    await AsyncStorage.setItem("Image-"+resTitle+"-"+category, value);
                    await AsyncStorage.removeItem(key);
                }
            }
        }
        var str = "Note-";
        str += resTitle;
        str += "-";
        str += category;
        await AsyncStorage.setItem(str, data.toString());
        props.navigation.navigate('Notes', {
            category: category
        });
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    ImageOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 55,
        height: 55,
    },logo: {
        width: 66,
        height: 58,
    },
});

export default EditorScreen
