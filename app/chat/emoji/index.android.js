import React, {PureComponent, useEffect, useState,memo,useRef} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions,
    Animated,
    TouchableOpacity,
    StatusBar,
    FlatList,Easing,Text,Image
} from 'react-native';
import ViewPagerAndroidContainer from '../android-container';
import ViewPagerAndroid from 'react-native-pager-view';
import Control from './control';
import PressableOpacity from '../../../../../src/components/PressableOpacity';
import {FlashList} from '@shopify/flash-list';
const {width, height} = Dimensions.get('window');
const BaseWidth = width/8;


const EmojiPanel = (props) => {
    const {allPanelHeight, isIphoneX, iphoneXBottomPadding,panelContainerHeight, aniEmojiHeight,emojiShow, ImageComponent} = props;
    const [pageIndex,setPageIndex] = useState(0);
    const totalHeight = allPanelHeight + (isIphoneX ? iphoneXBottomPadding : 0);
    const refPagerView = useRef(null);
    const [page, setPage] = useState(0);
    const aniPageChange = useRef(new Animated.Value(0)).current;
    const switchComponent = (e) => {
        const {position, offset} = e.nativeEvent;
        if (offset === 0) {
            // this.setState({pageIndex: position});
            setPageIndex(position);
        }
    }
    const renderItem = ({item,index}) => {
        return (
            <PressableOpacity key={index} style={{width: BaseWidth, height: BaseWidth + 4, justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => {
                                  props.onPress(item);
                              }}>
                <Image source={{uri: item.url}} resizeMode="cover" style={{width: BaseWidth - 8, height: BaseWidth - 8}}/>
                <Text style={{fontSize:8,color:'#aaa'}}>{item.name}</Text>
            </PressableOpacity>
        )
    }

    const onPageScroll = (e) => {
        Animated.timing(aniPageChange, {
            duration: 0,
            toValue: (e.nativeEvent.position + e.nativeEvent.offset)  * 20,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start()
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
            opacity: emojiShow ? 1 : 0,
        }]}
        >
            <ViewPagerAndroidContainer style={{height: panelContainerHeight, width}}>
                {/* 视图容器 */}
                <ViewPagerAndroid
                    onScroll={(e) => switchComponent(e)}
                    onPageScroll={(e) => switchComponent(e)}
                    horizontal
                    style={{height: (BaseWidth + 8) * 3,width:'100%', marginTop: 24}}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    lazy={true}
                    ref={refPagerView}
                    onPageScroll={onPageScroll}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                >
                    {props.emojiList.map((item, index) =>
                        <View style={{width,height:'100%'}}>
                            <FlashList estimatedItemSize={BaseWidth + 8} numColumns={8} showsVerticalScrollIndicator={false} keyExtractor={(_,i) => i} data={item} renderItem={renderItem} />
                        </View>
                    )}
                </ViewPagerAndroid>
                <View style={{flex:1}}>
                    <View style={{position:'relative',flexDirection: 'row',justifyContent: 'center',alignItems: 'flex-start',height: 40}}>
                        {props.emojiList.map((item,index) => {
                            return <View key={index} style={{width:10,height:10,marginTop:10,marginHorizontal:5,borderRadius:5,backgroundColor:'#ddd'}} ></View>
                        })}
                        <Animated.View  style={{position:'absolute',top:10,zIndex:2,left: (width - props.emojiList.length*20)/2 + 5 ,width:10,height:10,borderRadius:5,backgroundColor:'#999',transform:[{
                                translateX: aniPageChange
                            }]}} />
                    </View>
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
