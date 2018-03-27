import PodoonInsoleKit from '../src/PodoonInsoleKit'
import * as Example from "../testCase/example"

describe('sum', function() {
    it ('PodoonInsoleKit ShareInstance', ()=>{
        PodoonInsoleKit.ShareInstance()
    })

    it('PodoonInsoleKit parse', function() {
        for(var n = 0; n < Example.data.length / 5; n++ ) {
            PodoonInsoleKit.ShareInstance().putDatas(Example.data.slice(n*5,(n+1)*5), Example.right_data.slice(n*5,(n+1)*5))
        }
        expect(PodoonInsoleKit.ShareInstance().count).toBe(200);
        expect(PodoonInsoleKit.ShareInstance().getStep()).toBe(0);
    });
});