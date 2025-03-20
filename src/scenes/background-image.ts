import * as pc from "playcanvas";
import { AssetKey, findAsset } from "../../assets/asset-manager";

export interface ImageProps {
    scale: { x: number; y: number };
    position: { x: number; y: number };
    assetKey: AssetKey;
}

export class BgImage {
    private app: pc.Application;
    bgImageProps: ImageProps;
    dimmer:number;
    _isActive: boolean = true;

    constructor(imageProps: ImageProps) {
        this.bgImageProps = imageProps;
        this.app = pc.Application.getApplication() as pc.Application;
        this.addBackgroundImage();
    }

    
    public get isActive(){
        return this._isActive;

    }

     public set isActive(isActive){
        this._isActive = isActive;
        

    }

    addBackgroundImage() {
        const screen = new pc.Entity("Screen");
        screen.addComponent("screen", {
            name:'screen',
            screenSpace: true,
            scaleMode: pc.SCALEMODE_BLEND,
            resolution: new pc.Vec2(0, 0),
        });
        this.app.root.addChild(screen);

        const textureAsset = findAsset(this.bgImageProps.assetKey);

        if (textureAsset) {
            textureAsset.ready(() => {
                const bgImage = new pc.Entity("BackgroundImage");
                bgImage.addComponent("element", {
                    name:"bgImage",
                    type: "image",
                    anchor: new pc.Vec4(0, 0, 0, 0),
                    pivot: new pc.Vec2(0.5, 0.5),
                    width: this.bgImageProps.scale.x,
                    height: this.bgImageProps.scale.y,
                    textureAsset: textureAsset,
                    color: new pc.Color(1,1,1),

                });
                bgImage.setLocalPosition(
                    this.bgImageProps.position.x,
                    this.bgImageProps.position.y,
                    0,
                );

                screen.addChild(bgImage);
                
            });
        }
    }

}
