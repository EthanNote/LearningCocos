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
        canvas: cc.Node,

        units:[]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(let v in cc.loader._resources._pathToUuid){
            cc.loader.loadRes(v, function(err, res){
                if(err){
                    console.log(err);
                }
                else
                    console.log("Loading "+typeof(res)+": "+v);
            });
        }
    },  

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
        //mapNode.setAnchorPoint(0,0);
    },

    loadMap:function(url){

        let res=cc.loader.getRes(url);
        shell._loadMapAsset(res);

        // cc.loader.loadRes(url, cc.TiledMapAsset, function(err, res){
        //     if(err){console.log(err); return; }
        //     shell._loadMapAsset(res);
        // });
    },

    _loadUnitPrefab: function(prefab){
        let node=cc.instantiate(prefab);
        this.canvas.addChild(node);
        this.units.push(node);
    },

    spawnUnit: function(url){

        let res=cc.loader.getRes(url);
        shell._loadUnitPrefab(res);

        // cc.loader.loadRes(url, function(err, res){
        //     if(err){console.log(err); return; }
        //     shell._loadUnitPrefab(res);
        // });
    },


    start () {
        window.shell=this;  
    },


    test: function(){
        // for(let v in cc.loader._resources._pathToUuid){
        //     cc.loader.loadRes(v);
        // }


        shell.loadMap('map/battlemap_1');
        shell.spawnUnit('unit_0');
        // // while(shell.units.lenth<1 || !shell.units[0]){
        // //     sleep(1000);
        // //     console.log('.');
        // // }
        //console.log(shell.units.length, shell.units[0]);
        //shell.map.node.setAnchorPoint(0,0);
        shell.units[0].setPosition(16,16);
        shell.units[0].addComponent('UnitMoveControl');
        shell.units[0].getComponent('UnitMoveControl').mapLayerName='building';
        shell.units[0].getComponent('UnitMoveControl').speed=10;
    }
    // update (dt) {},
});
