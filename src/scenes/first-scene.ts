import * as pc from "playcanvas";
import { findAsset } from "../../assets/asset-manager";
export class FirstScene {
    app: pc.Application;
    constructor() {
        this.app = pc.Application.getApplication() as pc.Application;
    }

    printFirstSceneText() {
        const test = '01000100 01100101 01110000 01101100 01101111 01111001 01101001 01101110 01100111'
        const screen = new pc.Entity();
        screen.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });
        this.app.root.addChild(screen);
            const text = new pc.Entity();
            text.addComponent("element", {
                anchor: [0.5, 0.5, 0.5, 0.5], 
                autoWidth: false,
                fontAsset: findAsset("font_courir"),
                fontSize: 20,
                pivot: [0.5, 0.5],
                text: test,
                type: pc.ELEMENTTYPE_TEXT,
                wrapLines: true,
                color: new pc.Color(0, 1, 0, 0.3),
            });
            text.setLocalPosition(2, -2, 0);
            screen.addChild(text);

            text.element!.rangeStart = 0;
            text.element!.rangeEnd = 0;

            const id = setInterval(() => {
                text.element!.rangeEnd += 1;

                if (text.element!.rangeEnd >= test.length) {
                    clearInterval(id);
                    setTimeout(() => {
                        text.destroy();
                    }, 2000);
                }
            }, 50);
    }
}
