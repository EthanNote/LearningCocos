// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

window.GameMap=cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // tiledMap: cc.TiledMap
    },

    spawn: function(url, pos, rot){

        let process={

            url:url,
            pos:pos,
            rot:rot,

            onLoad: function(err, res){
                let node=cc.instantiate(res);
                node.position=this.pos;
                node.rotation=this.rot;
            }
        };

        cc.loader.loadRes(url, process.onLoad);

    },

    pickTileAt: function(worldSpacePos){
        let nodeSpacePos=this.node.convertToNodeSpace(worldSpacePos);
        let size=this.tiledMap.getMapSize();
        
        let x=this.tiledMap.nodeSpacePos.x

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.tiledMap=this.getComponent(cc.TiledMap);
        console.log('game map loaded: '+this.getComponent(cc.TiledMap).tmxAsset.name);
    },

    

    start () {

    },

    // update (dt) {},
});
