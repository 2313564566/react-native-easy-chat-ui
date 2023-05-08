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
        return (<PressableOpacity activeOpacity={0.8} onPress={() => {
            if (message.type === 'master') this.props.onMessagePress('master', parseInt(this.props.rowId), message.content, message);
        }}
                style={[isSelf ? styles.right : styles.left]}
                collapsable={false}
            >
                <View style={{flexDirection:'row'}}>
                    {!isSelf && <View style={[styles.triangle, styles.left_triangle, {borderColor: leftMessageBackground}]} />}
                    <View style={[styles.container, {
                        backgroundColor: isSelf ? rightMessageBackground : leftMessageBackground,
                    }]}>
                        {views}
                    </View>
                    {isSelf && <View style={[styles.triangle, styles.right_triangle, {borderColor: rightMessageBackground}]} />}
                    {chatType !== 'group' && isSelf && showIsRead && (
                        <Text style={[{textAlign: 'right', fontSize: 13}, isReadStyle]}>
                            {this.props.lastReadAt && this.props.lastReadAt - message.time > 0 ? '已读' : '未读'}
                        </Text>)}
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 10}}>
                    {!isSelf ? null : message.sendStatus === undefined ? null : message.sendStatus === 0 ?
                        <ActivityIndicator/> : message.sendStatus < 0 ? <PressableOpacity
                            disabled={false}
                            onPress={() => {
                                if (message.sendStatus === -2) {
                                    reSendMessage(message);
                                }
                            }}>
                        </PressableOpacity> : null}
                </View>
            </PressableOpacity>);
    }
}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 15, maxWidth: width - 160, minHeight: 20,
    },

    subEmojiStyle: {
        width: 25, height: 25,
    }, triangle: {
        width: 0, height: 0, zIndex: 999, borderWidth: 6, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderColor: '#fff', marginTop: 16,
    }, left_triangle: {
        borderLeftWidth: 0, borderRightWidth: Platform.OS === 'android' ? 6 : 10, marginLeft: 5,
    }, right_triangle: {
        borderRightWidth: 0, borderLeftWidth: Platform.OS === 'android' ? 6 : 10, borderColor: '#a0e75a', marginRight: 5,
    }, right: {
        flexDirection: 'row-reverse',
    }, left: {
        flexDirection: 'row',
    },
});
