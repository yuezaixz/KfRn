
let instance = null;

class PodoonInsoleKit {

    state = {
        step : 0
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

    putDatas(datas, rightDatas) {
        this.count ++
    }

    //Datas api
    getStep() {
        return this.state.step
    }

}

export default PodoonInsoleKit;