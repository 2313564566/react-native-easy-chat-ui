import React, {PureComponent} from 'react';
import {
    View, TouchableOpacity, ActivityIndicator, Platform, StyleSheet, Dimensions, Text, Pressable,
} from 'react-native';
import {PressableOpacity} from 'react-native-pressable-opacity';
import {changeEmojiText} from './utils';

const {width} = Dimensions.get('window');

export default class TextMessage extends PureComponent {
    render() {
        const {isSelf, message, messageErrorIcon, onMessagePress, views, isOpen, rightMessageBackground, leftMessageBackground, reSendMessage, chatType, isReadStyle, showIsRead, ImageComponent} = this.props;
        return (<View style={[isSelf ? styles.right : styles.left]}>
                <View style={{flexDirection:'row'}}>
                    {!isSelf && <View style={[styles.triangle, styles.left_triangle, {backgroundColor: leftMessageBackground}]} />}
                    <View style={[styles.container, {
                        backgroundColor: isSelf ? rightMessageBackground : leftMessageBackground,
                    }]}>
                        {views}
                    </View>
                    {isSelf && <View style={[styles.triangle, styles.right_triangle, {backgroundColor: rightMessageBackground}]} />}
                </View>
            </View>);
    }
}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 15, maxWidth: width - 160, minHeight: 20,
    },

    subEmojiStyle: {
        width: 25, height: 25,
    }, triangle: {
        width: 10, height: 10, marginTop: 16,
        transform: [
            { rotate: '45deg' }
        ],
    }, left_triangle: {
        marginLeft:5,
        marginRight: -5,
    }, right_triangle: {
        marginLeft: -5,
        marginRight: 5,
    }, right: {
        flexDirection: 'row-reverse',
    }, left: {
        flexDirection: 'row',
    },
});
