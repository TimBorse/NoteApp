
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";


const TextInANest = (props) => {
    const {title} = props.route.params;
    const {data} = props.route.params;

    return (
        <View>
            <Text style={styles.titleText} >
                ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
            </Text>
            <Text>{JSON.stringify(title)}</Text>
            <Text>{JSON.stringify(data)}</Text>
        </View>


    );
};

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default TextInANest;
