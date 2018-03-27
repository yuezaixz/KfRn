import PodoonInsoleKit from '../src/PodoonInsoleKit'
import * as Example from "../testCase/example"

describe('sum', function() {
    it ('PodoonInsoleKit ShareInstance', ()=>{
        PodoonInsoleKit.ShareInstance()
    })

    it('PodoonInsoleKit parse', function() {
        for(var n = 0; n < Example.data.length / 5; n++ ) {
            PodoonInsoleKit.ShareInstance().putDatas([...Example.data.slice(n*5,(n+1)*5), n], [...Example.right_data.slice(n*5,(n+1)*5), n])
        }
        expect(PodoonInsoleKit.ShareInstance().state.leftState.lastIndex).toBe(199);
        expect(PodoonInsoleKit.ShareInstance().state.rightState.lastIndex).toBe(199);
        expect(PodoonInsoleKit.ShareInstance().getStep()).toBe(0);
    });
});