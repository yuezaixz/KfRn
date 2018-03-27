
let instance = null;

class PodoonInsoleKit {

    //TODO 状态要记录下来，时效性，时间太长则重置
    state = {
        step : 0,
        leftState : {
            lastIndex: -1,
            step: 0,

        },
        rightState : {
            lastIndex: -1,
            step: 0,

        }
    }

    static ShareInstance(){
        let singleton = new PodoonInsoleKit();
        return singleton;
    }

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    clearState () {
        //todo 清空基础状态
    }

    clearResult() {
        //TODO 只是清空结果
    }

    putDatas(datas, rightDatas) {
        let leftState = this.state.leftState
        let rightState = this.state.rightState
        this.handleInsoleData(leftState, datas)
        this.handleInsoleData(rightState, rightDatas)
    }

    handleInsoleData(currentState, datas) {
        currentState.lastIndex = datas[5]

        this.beforeParse(currentState, datas)
        this.parse(currentState, datas)
        this.afterParse(currentState, datas)
    }

    beforeParse(currentState, datas) {

    }

    parse(currentState, datas) {

    }

    afterParse(currentState, datas) {

    }

    //Datas api
    getStep() {
        return this.state.step
    }

}

export default PodoonInsoleKit;