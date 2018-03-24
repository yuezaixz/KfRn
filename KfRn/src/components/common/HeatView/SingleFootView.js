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

const INSOLE_SHAPE_LEFT = {
    path:"M2.53925895,42.9234778 C0.80756449,48.1489051 5.50787801,53.3743324 4.51833832,55.6138013 C3.52879863,57.8532702 -4.14013396,74.5248717 3.03402879,95.1777512 C17.6297392,127.774465 16.3928146,189.733103 19.8562035,200.930447 C23.3195924,212.127792 31.4832949,224.071626 45.3368505,222.329816 C59.1904061,220.588007 72.549192,206.902364 72.0544221,187.991294 C71.5596523,169.080224 59.9325609,125.037336 74.0335015,110.356373 C104.956617,78.2573198 88.8765968,46.9047557 88.8765968,46.9047557 C88.8765968,46.9047557 90.6082913,43.9187973 92.3399857,42.425818 C98.2772239,37.6980504 98.5246088,33.7167725 98.7719937,22.5194282 C99.0193786,10.5755942 101.245843,10.8244241 99.0193786,5.59899678 C97.5350691,2.11537856 89.6187516,-1.1194098 81.7024341,0.373569443 C73.7861166,1.86654868 72.7965769,4.85250716 69.5805729,10.0779345 C69.5805729,10.0779345 66.3645689,5.10133703 60.4273308,5.10133703 C53.7479379,5.10133703 51.2740886,8.58495526 49.7897791,12.8150631 C49.7897791,12.8150631 45.5842354,9.33144488 37.9153028,12.3174034 C28.7620607,16.0498515 30.4937552,23.0170879 30.4937552,23.0170879 C30.4937552,23.0170879 26.0661634,19.7593702 19.6088186,23.0170879 C13.4241955,26.2518763 13.4241955,32.721453 13.9189654,34.9609218 C13.9189654,34.9609218 5.50787801,33.4679426 2.53925895,42.9234778 Z",
    x:0,
    y:0,
    scale:new Animated.Value(0),
    fill:'rgba(43,36,52,1)'
}

const HEEL_OUT_LEFT = {
    path:"M35.1592237,43.9315557 C45.170655,53.942901 50.1763706,62.7028282 47.6735128,76.468428 C45.170655,90.2340278 18.8906478,111.508137 7.62778755,80.2226825 C3.87350081,63.9542463 7.01406606,48.9372283 1.37064298,21.4060287 C-1.18587729,8.93415316 -1.13221485,1.383338 10.1306454,0.131919832 C27.6506502,-2.3709165 22.6449345,31.417374 35.1592237,43.9315557 Z",
    start_x:43,
    start_y:169,
    end_x:19,
    end_y:121,
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)'
}

const EAR_OUT_LEFT = {
    path:"M51.9507129,27.7418757 C53.4735032,41.4487687 39.4196534,46.5409066 39.4196534,60.3268625 C39.4196534,72.8595498 36.9134415,89.1520432 25.6354879,89.1520432 C6.83889866,89.1520432 20.6230641,71.6062811 4.33268675,47.7941753 C-0.679737057,41.5278317 -8.19837277,10.1961135 26.8885939,1.42323245 C43.1789713,-2.33657373 49.444501,5.18303863 51.9507129,27.7418757 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:27,
    start_y:79,
    end_x:5,
    end_y:50,
}

const BALL_OUT_LEFT = {
    path:"M49.2183017,11.2964825 C54.2307891,13.806812 63.0026421,23.8481298 52.9776672,42.6756007 C46.712058,52.7169185 39.1390833,48.7112578 31.6745957,50.206589 C25.4089864,51.4617538 20.396499,55.227248 11.624646,46.4410949 C0.346549357,35.1446123 -10.9315473,0 24.1558646,0 C34.1808394,0 36.6870831,5.0206589 49.2183017,11.2964825 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:66,
    start_y:69,
    end_x:35,
    end_y:43,
}

const F2_OUT_LEFT = {
    path:"M5.06893447,19.8228809 C-0.187738314,18.3203039 -0.438056065,9.30484184 0.31289719,5.04754033 C1.8148037,-2.46534469 17.0841866,-1.21319719 16.583551,6.29968783 C15.8325978,13.8125729 12.578467,21.5758874 5.06893447,19.8228809 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:61,
    start_y:19,
    end_x:53,
    end_y:9,
}

const F3_OUT_LEFT = {
    path:"M10.524948,16.0163068 C7.02049947,16.5171658 1.76382669,14.2633003 0.512237929,7.50170383 C0.0116024257,0.990536808 15.0306675,-3.2667647 16.2822563,3.24440231 C17.0332095,7.25127432 15.0306675,15.2650183 10.524948,16.0163068 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:41,
    start_y:22,
    end_x:34,
    end_y:14,
}

const F4_OUT_LEFT = {
    path:"M10.6968916,13.5273014 C7.94339635,14.7794489 3.18735907,14.0281604 0.684181551,8.76914085 C-1.06804271,3.51012133 10.1962561,-3.25147518 12.6994336,1.75711483 C14.2013401,5.01269834 14.2013401,12.0247244 10.6968916,13.5273014 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:24,
    start_y:32,
    end_x:18,
    end_y:25,
}

const F5_OUT_LEFT = {
    path:"M11.0417942,11.8795815 C9.03925214,13.632588 4.53353261,14.3838765 0.778766339,10.627434 C-2.47536443,6.62056195 5.28448587,-2.89575907 9.03925214,0.860683435 C11.2921119,3.11454894 13.7952894,9.62571596 11.0417942,11.8795815 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:12,
    start_y:44,
    end_x:6,
    end_y:38,
}

const F1_OUT_LEFT = {
    path:"M25.5325857,24.5583855 C25.5325857,29.5609405 18.5537058,38.0652841 12.0733172,38.0652841 C5.59292871,38.0652841 -4.37689978,26.5594075 2.10348874,8.55020928 C6.18959333,-4.29358238 28.0250428,-1.45490082 27.5265514,9.05046479 C26.5295686,15.5537864 25.5325857,19.5558304 25.5325857,24.5583855 Z",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:85,
    start_y:23,
    end_x:72,
    end_y:4,
}


const HEEL_MIDDLE_LEFT = {
    path:"",
    start_x:43,
    start_y:169,
    end_x:19,
    end_y:121,
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)'
}

const EAR_MIDDLE_LEFT = {
    path:"",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:27,
    start_y:79,
    end_x:5,
    end_y:50,
}

const BALL_MIDDLE_LEFT = {
    path:"",
    scale:new Animated.Value(0),
    fill:'rgba(248,231,28,1)',
    start_x:66,
    start_y:69,
    end_x:35,
    end_y:43,
}

export default class SingleFootView extends Component<Props> {

    constructor(props) {
        super(props);
        this.isRight = props.isRight;
    }

    state = {
        fireworks: [HEEL_OUT_LEFT, EAR_OUT_LEFT, BALL_OUT_LEFT, F1_OUT_LEFT, F2_OUT_LEFT, F3_OUT_LEFT, F4_OUT_LEFT, F5_OUT_LEFT]
    }

    getFireworks = () => {
        return this.state.fireworks.map((firework, i) => {
            var _x = firework.scale.interpolate({
                inputRange: [0, 1],
                outputRange: [firework.start_x, firework.end_x]
            });
            var _y = firework.scale.interpolate({
                inputRange: [0, 1],
                outputRange: [firework.start_y, firework.end_y]
            });
            return (
                <AnimatedGroup
                    x={_x}
                    y={_y}
                    key={"group_"+i}
                >
                    <AnimatedShape
                        d={firework.path}
                        scale={firework.scale}
                        fill={firework.fill}
                    />
                </AnimatedGroup>
            );
        })
    }

    _handleAddFirework = (e) => {
        var _scale = new Animated.Value(0);

        INSOLE_SHAPE_LEFT.scale = HEEL_OUT_LEFT.scale = EAR_OUT_LEFT.scale = BALL_OUT_LEFT.scale = F1_OUT_LEFT.scale
            = F2_OUT_LEFT.scale = F3_OUT_LEFT.scale = F4_OUT_LEFT.scale = F5_OUT_LEFT.scale = _scale

        Animated.timing(_scale, {
            duration: 2000,
            toValue: 1
        }).start(()=>{
            var _scale = new Animated.Value(0);

            INSOLE_SHAPE_LEFT.scale = HEEL_OUT_LEFT.scale = EAR_OUT_LEFT.scale = BALL_OUT_LEFT.scale = F1_OUT_LEFT.scale
                = F2_OUT_LEFT.scale = F3_OUT_LEFT.scale = F4_OUT_LEFT.scale = F5_OUT_LEFT.scale = _scale

            this.forceUpdate();
        })
        this.forceUpdate();
    }

    render(){
        return (
            <View style={[styles.container,{transform: [{rotateY:this.props.isRight?'180deg':'0deg'}]}]}>
                <TouchableWithoutFeedback onPress={this._handleAddFirework} >
                    <View>
                        <Surface width={100} height={223}>
                            <AnimatedShape
                                d={INSOLE_SHAPE_LEFT.path}
                                scale={1}
                                fill={INSOLE_SHAPE_LEFT.fill}
                            />
                            {this.getFireworks()}
                        </Surface>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width:125,
        height:223,
    }
});