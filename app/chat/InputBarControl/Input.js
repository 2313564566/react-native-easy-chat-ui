import React, { PureComponent } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable
} from 'react-native'

class Input extends PureComponent {
  render () {
    const { enabled,setTextInputRef, onFocus, placeholder, onContentSizeChange,onSubmit, textChange, messageContent, inputHeightFix, inputChangeSize, inputStyle } = this.props
    return (
      <Pressable
        onPress={() => {
          onFocus()
        }}
      >
        <TextInput
          ref={e => (setTextInputRef(e))}
          multiline={false}
          blurOnSubmit={false}
          editable={enabled}
          placeholder={placeholder}
          placeholderTextColor='#5f5d70'
          underlineColorAndroid='transparent'
          onChangeText={textChange}
          onSubmitEditing={onSubmit}
          returnKeyLabel='send'
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          value={messageContent}
          style={[styles.commentBar__input, { padding: Platform.OS === 'ios'?8:0,height: 35 }, inputStyle]}
        />
      </Pressable>
    )
  }
}

export default Input

const styles = StyleSheet.create({
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 0
  }
})
