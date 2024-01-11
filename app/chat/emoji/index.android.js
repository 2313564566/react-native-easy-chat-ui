import React, {useEffect, useState,useRef} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,Easing,Text,StatusBar
} from 'react-native';
import ViewPagerAndroidContainer from '../android-container';
import ViewPagerAndroid from 'react-native-pager-view';
import {PressableOpacity} from 'react-native-pressable-opacity/src/PressableOpacity';
import {FlashList} from '@shopify/flash-list';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
const BaseWidth = width/8;


const EmojiPanel = (props) => {
    const inset  = useSafeAreaInsets();
    const {panelContainerHeight, aniEmojiHeight,emojiShow, ImageComponent} = props;
    const [pageIndex,setPageIndex] = useState(0);
    const aniPageChange = useRef(new Animated.Value(0)).current;
    const renderItem = ({item,index}) => {
        return (
            <PressableOpacity unstable_pressDelay={1000}
                              style={{width: BaseWidth, height: BaseWidth + 15, justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => {
                                  props.onPress(item);
                              }}>
                <ImageComponent source={{uri: item.url}} resizeMode="contain" style={{width: BaseWidth - 10, height: BaseWidth - 10}}/>
                <Text style={{fontSize:8,color:'#aaa',marginTop:3}}>{item.name}</Text>
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
        <Animated.View pointerEvents={emojiShow ? "auto":"none"} style={[styles.container, {
            position: 'absolute',
            height: panelContainerHeight,
            transform: [{translateY: aniEmojiHeight}],
            opacity: emojiShow ? 1 : 0,
        }]}
        >
            <ViewPagerAndroidContainer style={{height: panelContainerHeight, width}}>
                {/* 视图容器 */}
                <ViewPagerAndroid
                    horizontal
                    style={{height: (BaseWidth + 15) * 3,marginTop: StatusBar.currentHeight,width:'100%'}}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    lazy={true}
                    onPageScroll={onPageScroll}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                >
                    {props.emojiList.map((item, index) =>
                        <View key={index} style={{width,height:'100%'}}>
                            <FlashList estimatedItemSize={BaseWidth + 15} numColumns={8} showsVerticalScrollIndicator={false} keyExtractor={(_,i) => i} data={item} renderItem={renderItem} />
                        </View>
                    )}
                </ViewPagerAndroid>
                <View style={{flex:1}}>
                    <View style={{position:'relative',flexDirection: 'row',justifyContent: 'center',alignItems: 'flex-start',height: 40}}>
                        {props.emojiList.map((item,index) => {
                            return <View key={index} style={{width:10,height:10,marginTop:10,marginHorizontal:5,borderRadius:5,backgroundColor:'#ddd'}} />
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
        // backgroundColor: '#f5f5f5',
        borderTopWidth: 0,
        borderColor: '#ccc',
        overflow: 'hidden'
    }
})

export default EmojiPanel;
