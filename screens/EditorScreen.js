/*import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor() {
    const [text, setText] = useState("")
    const handleOnChange = (e,editor)=>{
        const data = editor.getData()
        setText(data)
    }
    return (
        <div className="EditorScreen">
            <div className="editor">
            <h2>Note</h2>
            <CKEditor
                editor = {ClassicEditor}
                data ={text}
                onChange = {handleOnChange}
            />
            </div>
            <div>
                <h2>ContentTest</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class EditorScreen extends Component {

    constructor(props) {
        super(props);
        this.getHTML = this.getHTML.bind(this);
        this.setFocusHandlers = this.setFocusHandlers.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <RichTextEditor
                    ref={(r)=>this.richtext = r}
                    style={styles.richText}
                    initialTitleHTML={'Title!!'}
                    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />
                <RichTextToolbar
                    getEditor={() => this.richtext}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer/>}
            </View>
        );
    }

    onEditorInitialized() {
        this.setFocusHandlers();
        this.getHTML();
    }

    async getHTML() {
        const titleHtml = await this.richtext.getTitleHtml();
        const contentHtml = await this.richtext.getContentHtml();
        //alert(titleHtml + ' ' + contentHtml)
    }

    setFocusHandlers() {
        this.richtext.setTitleFocusHandler(() => {
            //alert('title focus');
        });
        this.richtext.setContentFocusHandler(() => {
            //alert('content focus');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 40
    },
    richText: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});
