import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator, Dimensions, Platform
} from 'react-native'
import {PressableOpacity} from 'react-native-pressable-opacity';
const { width } = Dimensions.get('window')

export default class VoiceMessage extends PureComponent {
  constructor (props) {
    super(props)
    this.playTime = null
    this.state = {
      loading: false,
      progress: 2
    }
  }

  UNSAFE_componentWillReceiveProps (next) {
    if (next.pressIndex === next.rowId) {
      this.setState({ loading: next.voiceLoading })
      if (next.voicePlaying) {
        this._play()
      } else {
        this.playTime && clearInterval(this.playTime)
        this.setState({ progress: 2 })
      }
    } else {
      this.setState({ loading: false, progress: 2 })
      this.playTime && clearInterval(this.playTime)
    }
  }

  _play () {
    this.playTime && clearInterval(this.playTime)
    let index = 0
    const { progress } = this.state
    if (progress === 2) index = 2
    this.playTime = setInterval(() => {
      if (index === 2) {
        index = -1
      }
      index += 1
      this.setState({ progress: index })
    }, 400)
  }

  _renderIcon = () => {
    const { isSelf, voiceLeftIcon, voiceRightIcon, ImageComponent } = this.props
    const { progress } = this.state
    if (isSelf) {
      if (voiceRightIcon) {
        return voiceRightIcon
      } else {
        return <ImageComponent
          source={
            progress === 0
              ? require('../source/image/voiceRightOne.png')
              : progress === 1
              ? require('../source/image/voiceRightTwo.png')
              : require('../source/image/voiceRight.png')
          }
          resizeMode={'cover'}
          style={{
            width: 26, height: 26
          }} />
      }
    } else {
      if (voiceLeftIcon) {
        return voiceLeftIcon
      } else {
        return <ImageComponent source={progress === 0 ? require('../source/image/voiceLeftOne.png') : progress === 1 ? require('../source/image/voiceLeftTwo.png') : require('../source/image/voiceLeft.png')} resizeMode={'cover'} style={{
          width: 26, height: 26
        }} />
      }
    }
  }

  componentWillUnmount () {
    this.playTime && clearInterval(this.playTime)
  }

  render () {
    const { message, messageErrorIcon, isSelf, isOpen, reSendMessage, leftMessageBackground, rightMessageBackground, voiceRightLoadingColor, voiceLeftLoadingColor, chatType, isReadStyle, showIsRead} = this.props
    const { loading } = this.state
    return (
      <View>
        <View style={[isSelf ? styles.right : styles.left]}>
          <View
            style={
              [
                styles.triangle,
                isSelf
                  ? styles.right_triangle
                  : styles.left_triangle,
                loading ? { borderColor: isSelf ? voiceRightLoadingColor : voiceLeftLoadingColor } : { borderColor: isSelf ? rightMessageBackground : leftMessageBackground }
              ]}
          />
          <View
            style={{ flexDirection: isSelf ? 'row-reverse' : 'row' }}
            collapsable={false}
            ref={(e) => (this[`item_${this.props.rowId}`] = e)}
          >
            <View>
              <PressableOpacity
                disabled={isOpen}
                style={
                  [styles.voiceArea,
                    loading
                      ? {
                        backgroundColor: isSelf
                          ? voiceRightLoadingColor
                          : voiceLeftLoadingColor
                      }
                      : {
                        backgroundColor: isSelf
                          ? rightMessageBackground
                          : leftMessageBackground
                      }
                  ]
                }
                onPress={() => {
                  this.props.savePressIndex(this.props.rowId)
                  this.props.onMessagePress('voice', parseInt(this.props.rowId), message.content.uri, message)
                }
                }
                onLongPress={() => {
                  this.props.onMessageLongPress(this[`item_${this.props.rowId}`], 'voice', parseInt(this.props.rowId), message.content.uri, message)
                }}
              >
                <View style={[{ width: 60 + (message.content.length > 1 ? message.content.length * 5 : 0) },{alignItems:'center'}, { maxWidth: width - 160 }, { flexDirection: isSelf ? 'row-reverse' : 'row' }
                ]}>
                  {!isSelf &&
                  <Text style={[{marginLeft: 8,marginRight: 2}]}>
                    {`${message.content.length}"`}
                  </Text>
                  }
                  {this._renderIcon()}
                  {isSelf &&
                  <Text style={[{marginRight: 4}]}>
                    {`${message.content.length}"`}
                  </Text>
                  }
                </View>
              </PressableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
            {!isSelf
              ? null
              : message.sendStatus === undefined
                ? null
                : message.sendStatus === 0
                  ? <ActivityIndicator />
                  : message.sendStatus < 0
                    ? <PressableOpacity
                      disabled={false}
                      onPress={() => {
                        if (message.sendStatus === -2) {
                          reSendMessage(message)
                        }
                      }}>
                      {messageErrorIcon}
                    </PressableOpacity>
                    : null
            }
          </View>
        </View>
        {chatType !== 'group' && isSelf && showIsRead && (
          <Text style={[{ textAlign: 'right', fontSize: 13, marginRight: 12 }, isReadStyle]}>
            {this.props.lastReadAt && this.props.lastReadAt - message.time > 0 ? '已读' : '未读'}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    zIndex: 999,
    borderWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  left_triangle: {
    borderLeftWidth: 0,
    borderRightWidth: Platform.OS === 'android' ? 6 : 10,
    marginLeft: 5
  },
  right_triangle: {
    borderRightWidth: 0,
    borderLeftWidth: Platform.OS === 'android' ? 6 : 10,
    borderColor: '#a0e75a',
    marginRight: 5
  },
  right: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  voiceArea: {
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: width - 160,
    justifyContent: 'center',
    minHeight: 30
  }
})
