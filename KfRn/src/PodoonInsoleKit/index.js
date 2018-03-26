
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

    putDatas(datas) {
        
    }

    //Datas api
    getStep() {
        return this.state.step
    }

}

export default PodoonInsoleKit;