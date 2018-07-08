// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

require('map.js')

cc.Class({
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

        map:{type: GameMap, default: null},
        canvas: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    _loadMapAsset: function(tmxAsset){
       
        let mapNode=new cc.Node();
        mapNode.addComponent(cc.TiledMap);
        mapNode.getComponent(cc.TiledMap).tmxAsset=tmxAsset;

        if(this.map){
            this.map.node.destroy();
        }

        mapNode.addComponent(GameMap);
        this.map=mapNode.getComponent(GameMap);

        //this.map=mapNode;
        this.canvas.addChild(mapNode);
    },

    loadMap:function(url){
        cc.loader.loadRes(url, cc.TiledMapAsset, function(err, res){
            if(err){console.log(err); return; }
            shell._loadMapAsset(res);
        });
    }, 

    start () {
        window.shell=this;  
    },

    // update (dt) {},
});
