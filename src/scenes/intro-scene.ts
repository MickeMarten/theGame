import * as pc from "playcanvas";
import { Texture } from "playcanvas";
import { AssetManager } from "../../assets/asset-manager";

export class IntroScene {
    private app: pc.Application;
    public assets: AssetManager;

    constructor(assetManager: AssetManager) {
        this.app = pc.Application.getApplication() as pc.Application;
        this.assets = assetManager;
    }

    public addLights() {
        let lightDimmer = 1;
        const dimmerTime = setInterval(() => {
            lightDimmer -= 0.01;
            light.light!.intensity = lightDimmer;
            if (lightDimmer >= 1) {
                clearInterval(dimmerTime);
                light.destroy();
            }
        }, 75);

        const light = new pc.Entity();
        light.addComponent("light", {
            type: "directional",
            intensity: lightDimmer,
        });
        light.setEulerAngles(45, 0, 0);
        this.app.root.addChild(light);
    }

    createBackgroundImage() {
        const bgImage = new Image();
        bgImage.src = "assets/cyberCastle.webp";
        bgImage.onload = () => {
            this.addLights();
            const bgTexture = new Texture(this.app.graphicsDevice);
            bgTexture.setSource(bgImage);
            bgTexture.upload();

            const material = new pc.StandardMaterial();
            material.diffuseMap = bgTexture;
            material.update();

            const backgroundImage = new pc.Entity();
            backgroundImage.addComponent("render", {
                type: "plane",
                material: material,
            });

            backgroundImage.setLocalScale(19, 10, 9);
            backgroundImage.setLocalPosition(0, 3.5, -10);
            this.app.root.addChild(backgroundImage);
            backgroundImage.rotate(90, 0, 0);
        };
    }

    printIntroText() {
        this.assets.loadAssets(() => {
            const screen = new pc.Entity();
            screen.addComponent("screen", {
                referenceResolution: new pc.Vec2(1280, 720),
                scaleBlend: 0.5,
                scaleMode: pc.SCALEMODE_BLEND,
                screenSpace: true,
            });
            this.app.root.addChild(screen);

            const loremIpsum =
                "Darkness took once you, and you have strayed out of thought and time. Now you feel life in you again.";
            const text = new pc.Entity();
            text.addComponent("element", {
                anchor: [0.5, 0.5, 0.5, 0.5],
                autoWidth: false,
                fontAsset: this.assets.assets.font.id,
                fontSize: 10,
                pivot: [0.5, 0.5],
                text: loremIpsum,
                type: pc.ELEMENTTYPE_TEXT,
                width: 500,
                wrapLines: true,
            });
            text.setLocalPosition(0, -80, 0);
            screen.addChild(text);

            text.element!.rangeStart = 0;
            text.element!.rangeEnd = 0;

            const id = setInterval(() => {
                text.element!.rangeEnd += 1;

                if (text.element!.rangeEnd >= loremIpsum.length) {
                    clearInterval(id);
                    setTimeout(() => {
                        text.destroy();
                    }, 2000);
                }
            }, 75);
        });
    }
}
