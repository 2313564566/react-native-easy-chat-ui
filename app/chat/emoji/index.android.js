import React, {PureComponent, useEffect, useState,memo} from 'react';
import {View, ScrollView, StyleSheet, Platform, Dimensions ,Animated, TouchableOpacity,StatusBar} from 'react-native';
import ViewPagerAndroidContainer from '../android-container';
import ViewPagerAndroid from 'react-native-pager-view';
import Control from './control';
import PressableOpacity from '../../../../../src/components/PressableOpacity';
const {width, height} = Dimensions.get('window');


const EmojiPanel = (props) => {
    const {allPanelHeight, isIphoneX, iphoneXBottomPadding,panelContainerHeight, aniEmojiHeight,emojiShow, ImageComponent} = props;
    const [pageIndex,setPageIndex] = useState(0);
    const totalHeight = allPanelHeight + (isIphoneX ? iphoneXBottomPadding : 0);
    const switchComponent = (e) => {
        const {position, offset} = e.nativeEvent;
        if (offset === 0) {
            // this.setState({pageIndex: position});
            setPageIndex(position);
        }
    }

    useEffect(() => {
        console.log("emoji init...");
        setPageIndex(0);
    },[]);

    return (
        <Animated.View style={[styles.container, {
            position: 'absolute',
            height: panelContainerHeight,
            backgroundColor: '#f5f5f5',
            transform: [{translateY: aniEmojiHeight}],
            opacity: 1,
            display: emojiShow ? 'flex':'none'
        }]}
        >
            <ViewPagerAndroidContainer style={{height: panelContainerHeight, width}}>
                {/* 视图容器 */}
                <ViewPagerAndroid
                    onScroll={(e) => switchComponent(e)}
                    onPageScroll={(e) => switchComponent(e)}
                    horizontal
                    style={{flex: 1,marginTop: StatusBar.currentHeight + 10}}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    lazy={true}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                >
                    {
                        props.emojiList.map((item, index) => {
                                return <View key={index} style={{
                                    width,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    paddingHorizontal: 15,
                                }}>
                                    {
                                        item.map((list, i) =>
                                            <PressableOpacity
                                                key={i}
                                                style={{
                                                    width: (width - 30) / 8,
                                                    height: 45,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginBottom:8
                                                }}
                                                onPress={() => {
                                                    props.onPress(list);
                                                }}
                                            >
                                                <ImageComponent
                                                    source={{uri: list.url}}
                                                    resizeMode="cover" style={{width: 40, height: 40}}
                                                />
                                            </PressableOpacity>,
                                        )
                                    }
                                </View>;
                            },
                        )
                    }
                </ViewPagerAndroid>
                <View style={{height: 40}}>
                    <Control style={{bottom: 10}} index={pageIndex} total={props.emojiList.length}/>
                </View>
            </ViewPagerAndroidContainer>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: 0,
        borderColor: '#ccc',
        overflow: 'hidden'
    }
})

export default memo(EmojiPanel);
