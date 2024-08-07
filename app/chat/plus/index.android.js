import React, {PureComponent} from 'react';
import {View, StyleSheet, Dimensions, Animated,StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

const getNavigationBarHeight = () => {
    const Window = Dimensions.get('window');
    const Screen = Dimensions.get('screen');
    const windowHeight = Window.height;
    const statusBarHeight = StatusBar.currentHeight || 0;
    console.log('statusBarHeight', statusBarHeight);
    return Math.round(Screen.height - windowHeight - statusBarHeight);
}

export default class PlusPanel extends PureComponent {
    render() {
        const {panelContainerHeight, aniPlusHeight, panelHeight, panelShow, panelContainerStyle} = this.props;
        return (
            <Animated.View
                style={{
                    opacity: 1,
                    position: 'absolute',
                    height: panelContainerHeight,
                    transform: [{translateY: aniPlusHeight}],
                    backgroundColor: '#f5f5f5',
                    width,
                    display: panelShow ? 'flex' : 'none',
                }}
                renderToHardwareTextureAndroid
            >
                <View style={[styles.container, panelContainerStyle]}>
                    {this.props.panelSource.map((item, index) =>
                        this.props.renderPanelRow(item, index))
                    }
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 0,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        marginTop: getNavigationBarHeight() === 0 ? 44 : 22,
        // paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
