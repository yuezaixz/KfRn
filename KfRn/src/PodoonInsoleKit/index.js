
let instance = null;

class PodoonInsoleKit {

    //TODO 状态要记录下来，时效性，时间太长则重置
    state = {
        step : 0,
        left_state : {

        },
        right_state : {

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

    count = 0

    clearState () {
        //todo 清空基础状态
    }

    clearResult() {
        //TODO 只是清空结果
    }

    putDatas(datas, rightDatas) {
        this.count ++
    }

    //Datas api
    getStep() {
        return this.state.step
    }

}

export default PodoonInsoleKit;