import React, {PureComponent} from 'react';
import {View, StyleSheet, Dimensions, Animated, Platform, DeviceEventEmitter} from 'react-native';
import EmojiPanel from '../emoji';
import PlusPanel from '../plus';

const {width, height} = Dimensions.get('window');
// let eventHeader = null;

export default class PanelContainer extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       eventHeader: null,
  //       moveHeight:0
  //   }
  // }

  componentDidMount() {
      // eventHeader = DeviceEventEmitter.addListener("onInputLayoutChange",(h) => {
      //     console.log("onInputLayoutChange",h);
      //     this.setState({
      //         moveHeight: h,
      //     });
      // });
  }
  componentWillUnmount() {
      // eventHeader.remove();
  }

    render() {
    const {
      panelContainerHeight,
      visibleHeight,
      ImageComponent,
      iphoneXBottomPadding,
      panelHeight,
      emojiList,
      emojiHeight,
      panelContainerBackgroundColor,
      onEmojiSelected,
      aniPanelHeight,
      aniEmojiHeight,
      aniPlusHeight,
      panelShow,
      emojiShow,
        moveHeight
    } = this.props;
    return (
        <Animated.View
            style={{
              opacity: 1,
              position: 'absolute',
              height: panelContainerHeight,
              zIndex: 1,
              top:  height + this.props.moveHeight,
              width,
              backgroundColor: '#f5f5f5',
              transform: [{translateY: aniPanelHeight}],
            }}
        >
          {
            this.props.usePlus
                ? <PlusPanel
                    panelHeight={panelHeight}
                    panelContainerHeight={panelContainerHeight}
                    panelSource={this.props.panelSource}
                    renderPanelRow={this.props.renderPanelRow}
                    panelContainerStyle={this.props.panelContainerStyle}
                    aniPlusHeight={aniPlusHeight}
                    panelShow={panelShow}
                />
                : null
          }
          {
            this.props.useEmoji
                ? <EmojiPanel
                    ImageComponent={ImageComponent}
                    emojiHeight={emojiHeight}
                    emojiList={emojiList}
                    iphoneXBottomPadding={iphoneXBottomPadding}
                    panelContainerHeight={panelContainerHeight}
                    onPress={onEmojiSelected}
                    aniEmojiHeight={aniEmojiHeight}
                    emojiShow={emojiShow}
                />
                : null
          }
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
