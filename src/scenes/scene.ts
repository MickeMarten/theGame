import * as pc from "playcanvas";
import { AssetKey, findAsset } from "../../assets/asset-manager";

interface Image {
    scale: { x: number; y: number };
    position: { x: number; y: number };
    assetKey: AssetKey;
}

export class Scene {
    private app: pc.Application;
    bgImage: Image;

    constructor(image: Image) {
        this.bgImage = image;
        this.app = pc.Application.getApplication() as pc.Application;
        this.addBackgroundImage()
    }

    addBackgroundImage() {
        const screen = new pc.Entity("Screen");
        screen.addComponent("screen", {
            screenSpace: true,
            scaleMode: pc.SCALEMODE_BLEND,
            resolution: new pc.Vec2(0, 0),
        });
        this.app.root.addChild(screen);

        const textureAsset = findAsset(this.bgImage.assetKey);

        if (textureAsset) {
            textureAsset.ready(() => {
                const bgImage = new pc.Entity("BackgroundImage");
                bgImage.addComponent("element", {
                    type: "image",
                    anchor: new pc.Vec4(0, 0, 0, 0), 
                    pivot: new pc.Vec2(0.5, 0.5), 
                    width: this.bgImage.scale.x,
                    height: this.bgImage.scale.y,
                    textureAsset: textureAsset,
                });

                bgImage.setLocalPosition(
                    this.bgImage.position.x,
                    this.bgImage.position.y,
                    0,
                );

                screen.addChild(bgImage);
            });
        }
    }
}
