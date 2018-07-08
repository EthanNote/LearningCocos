window.GameUnitMoveControl=cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        direction: 0,
        mapLayerName: ""
        //getGID: null
    },

    getHitDetectionPos: function(r=1){
        return [
            this.node.position.add(new cc.Vec2(-r, -r)),
            this.node.position.add(new cc.Vec2(-r, r)),
            this.node.position.add(new cc.Vec2(r, -r)),
            this.node.position.add(new cc.Vec2(r, r)),
        ];
    },

    getGID: function(pos){
        if(!shell.map){
            return 0;
        }

        let layer=shell.map.tiledMap.getLayer(this.mapLayerName);
        if(!layer){
            return 0;
        }

        let screenPos=this.node.parent.convertToWorldSpaceAR(pos);
        let mapPos=shell.map.node.convertToNodeSpace(screenPos);
        let tsize=mapPos.x/shell.map.tiledMap.getTileSize();

        let tilePos=cc.Vec2(mapPos.x/tsize.x, mapPos.y/tsize.y);

        console.log(pos, screenPos, mapPos, tilePos);

        return layer.getTileGIDAt(tilePos);

        //return 0;
    },

    getVelocity: function(pos){
        let vx=this.speed*Math.sin(this.direction*Math.PI/180);
        let vy=this.speed*Math.cos(this.direction*Math.PI/180);
        return new cc.Vec2(vx, vy);
    },

    update: function(dt){

        let v=this.getVelocity();
        let dx=v.x*dt;
        let dy=v.y*dt;
        // let dx=this.speed*Math.sin(this.direction*Math.PI/180);
        // let dy=this.speed*Math.cos(this.direction*Math.PI/180);


        let detectionPos=this.getHitDetectionPos();
        let moveVectors=[
            new cc.Vec2(dx, dy),
            new cc.Vec2(dx, 0),
            new cc.Vec2(0, dy)
        ];

        for(let t=0;t<3;t++){
            let result=true;
            for(let i=0;i<4;i++){         
                let testPos=detectionPos[i].add(moveVectors[t]);
                if(this.getGID(testPos)){
                    result=false;
                    break;
                }
            }
            if(result){
                this.node.position=this.node.position.add(moveVectors[t]);
                //console.log(moveVectors[t]);
                break;
            }

        }
        
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
