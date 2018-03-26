import React, {
    Component
}from 'react';

import {
    ART as Art,
    StyleSheet,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';

import * as FootShape from './FootShapePath'

var {
    width,
    height
} = Dimensions.get('window');

var {
    Surface,
    Shape,
    Path,
    Group,
    Transform
} = Art;

var AnimatedShape = Animated.createAnimatedComponent(Shape);
var AnimatedGroup = Animated.createAnimatedComponent(Group);

const FILL_COLORS = [
    'rgba(248,231,28,1)',
    'rgba(245,166,35,1)',
    'rgba(208,2,27,1)'
];

const startValueConstants = [3, 20, 30]

export default class SingleFootView extends Component<Props> {
    constructor(props) {
        super(props);
        this.isRight = props.isRight;
    }
    isAnimation = false

    point1:0
    point2:0
    point3:0

    state = {
        value1:new Animated.Value(0),
        value2:new Animated.Value(0),
        value3:new Animated.Value(0),

        fireworks: [
            FootShape.HEEL_OUT_LEFT, FootShape.EAR_OUT_LEFT, FootShape.BALL_OUT_LEFT, FootShape.F1_OUT_LEFT,
            FootShape.F2_OUT_LEFT, FootShape.F3_OUT_LEFT, FootShape.F4_OUT_LEFT, FootShape.F5_OUT_LEFT,
            FootShape.HEEL_MIDDLE_LEFT, FootShape.EAR_MIDDLE_LEFT, FootShape.BALL_MIDDLE_LEFT, FootShape.F1_MIDDLE_LEFT,
            FootShape.F2_MIDDLE_LEFT, FootShape.F3_MIDDLE_LEFT, FootShape.HEEL_IN_LEFT, FootShape.EAR_IN_LEFT,
            FootShape.BALL_IN_LEFT, FootShape.F1_IN_LEFT
        ],
    }

    test(value) {
        console.log(value)
    }

    setValue(point1, point2, point3){
        if (this.isAnimation) {
            // console.log("动画未结束")
            return
        }
        if (Math.abs(point1 - this.state.point1) < 5 && Math.abs(point2 - this.state.point2) < 5 && Math.abs(point3 - this.state.point3) < 5) {
            // console.log('变化太小，不执行动画')
            return
        }

        var _value1 = new Animated.Value(this.point1);
        var _value2 = new Animated.Value(this.point2);
        var _value3 = new Animated.Value(this.point3);
        this.point1 = point1
        this.point2 = point2
        this.point3 = point3
        this.state.value1 = _value1
        this.state.value2 = _value2
        this.state.value3 = _value3
        //
        //
        // this.state.value1.stopAnimation()
        // this.state.value2.stopAnimation()
        // this.state.value3.stopAnimation()
        this.isAnimation = true

        Animated.parallel([
            Animated.timing(_value1, {
                duration: 100,
                toValue: point1 //划重点：toValue 是number，不要用Animated.Value对象了
            }),
            Animated.timing(_value2, {
                duration: 100,
                toValue: point2
            }),
            Animated.timing(_value3, {
                duration: 100,
                toValue: point3
            })
        ]).start(()=> {
            // console.log("动画结束")
            this.isAnimation = false
        });

        this.setState(this.state);//划重点：这个必须设置，否则动画不会触发setState
    }

    _handleAddFirework = (e) => {
        //TODO 点击。如果要连接这里回调

        //暂时测试用
        // var _value = new Animated.Value(0);
        // this.state.value1 = _value
        //
        // Animated.timing(_value, {
        //     duration: 2000,
        //     toValue: 50
        // }).start(()=>{
        //
        // })
        // this.forceUpdate();
    }

    getFireworks = () => {
        return this.state.fireworks.map((firework, i) => {

            let type = firework.type
            let type1 = type % 10
            let type2 = parseInt(type / 10)

            var _x = null
            var _y = null
            var _scale = null


            // console.log(this.state.value2.__getValue())
            switch(type1) {
                case 1:
                {
                    _x = this.state.value1.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_x, firework.end_x],
                        extrapolate: 'clamp'
                    });
                    _y = this.state.value1.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_y, firework.end_y],
                        extrapolate: 'clamp'
                    });
                    _scale = this.state.value1.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    });
                }
                    break
                case 2:
                {
                    _x = this.state.value2.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_x, firework.end_x],
                        extrapolate: 'clamp'
                    });
                    _y = this.state.value2.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_y, firework.end_y],
                        extrapolate: 'clamp'
                    });
                    _scale = this.state.value2.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    });
                }
                    break
                case 3:
                {
                    _x = this.state.value3.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_x, firework.end_x],
                        extrapolate: 'clamp'
                    });
                    _y = this.state.value3.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_y, firework.end_y],
                        extrapolate: 'clamp'
                    });
                    _scale = this.state.value3.interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    });
                }
                    break
                case 4:
                {

                    _x = new Animated.Value((this.state.value1.__getValue()+this.state.value2.__getValue())/2).interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_x, firework.end_x],
                        extrapolate: 'clamp'
                    });
                    _y = new Animated.Value((this.state.value1.__getValue()+this.state.value2.__getValue())/2).interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [firework.start_y, firework.end_y],
                        extrapolate: 'clamp'
                    });
                    _scale = new Animated.Value((this.state.value1.__getValue()+this.state.value2.__getValue())/2).interpolate({
                        inputRange: [startValueConstants[type2], 50],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    });
                }
                    break
            }
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    render(){
        return (
            <View style={[styles.container,{transform: [{rotateY:this.props.isRight?'180deg':'0deg'}]}]}>
                <TouchableWithoutFeedback onPress={this._handleAddFirework} >
                    <View>
                        <Surface width={100} height={223}>
                            <AnimatedShape
                                d={FootShape.INSOLE_SHAPE_LEFT.path}
                                scale={1}
                                fill={FootShape.INSOLE_SHAPE_LEFT.fill}
                            />
                            {this.getFireworks()}
                            {/*{this.getMiddleFireworks()}*/}
                            {/*{this.getInFireworks()}*/}
                        </Surface>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    //一堆重复代码

    getPoint1OutBlock = () => {
        return [FootShape.BALL_OUT_LEFT, FootShape.F1_OUT_LEFT].map((firework, i) => {
            var _x = firework.value1.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value1.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value1.interpolate({
                inputRange: [3, 50],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"groupPoint1OutBlock_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint1MiddleBlock = () => {
        return [FootShape.BALL_MIDDLE_LEFT, FootShape.F1_MIDDLE_LEFT].map((firework, i) => {
            var _x = firework.value1.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value1.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value1.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint1InBlock = () => {
        return [FootShape.BALL_IN_LEFT, FootShape.F1_IN_LEFT].map((firework, i) => {
            var _x = firework.value1.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value1.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value1.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }
    getPoint2OutBlock = () => {
        return [FootShape.EAR_OUT_LEFT, FootShape.F4_OUT_LEFT, FootShape.F5_OUT_LEFT].map((firework, i) => {
            var _x = firework.value2.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value2.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value2.interpolate({
                inputRange: [3, 50],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"groupPoint1OutBlock_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint2MiddleBlock = () => {
        return [FootShape.EAR_MIDDLE_LEFT].map((firework, i) => {
            var _x = firework.value2.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value2.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value2.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint2InBlock = () => {
        return [FootShape.EAR_IN_LEFT].map((firework, i) => {
            var _x = firework.value2.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value2.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value2.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint3OutBlock = () => {
        return [FootShape.HEEL_OUT_LEFT].map((firework, i) => {
            var _x = firework.value3.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value3.interpolate({
                inputRange: [3, 50],
                outputRange: [firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value3.interpolate({
                inputRange: [3, 50],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"groupPoint1OutBlock_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint3MiddleBlock = () => {
        return [FootShape.HEEL_MIDDLE_LEFT].map((firework, i) => {
            var _x = firework.value3.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value3.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value3.interpolate({
                inputRange: [3, 20, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    getPoint3InBlock = () => {
        return [FootShape.HEEL_IN_LEFT].map((firework, i) => {
            var _x = firework.value3.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_x, firework.start_x, firework.end_x],
                extrapolate: 'clamp'
            });
            var _y = firework.value3.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [firework.start_y, firework.start_y, firework.end_y],
                extrapolate: 'clamp'
            });
            var _scale = firework.value3.interpolate({
                inputRange: [3, 30, 50],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp'
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={_scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});