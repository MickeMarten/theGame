import * as pc from "playcanvas";
import { findAsset } from "../../assets/asset-manager";

export interface TextProps {
    text: string;
    position?: { x: number; y: number; z: number };
    textColor?: pc.Color;
    fadeOut?: boolean;
    fontSize?: number;
    isActive?: boolean;
    textWidth?: number;
    textDrawSpeed?: number;
}

export class Lore {
    textProps: TextProps;
    app: pc.Application;
    _isActive:boolean;
    constructor(textProps: TextProps) {
        this.textProps = textProps;
        this.app = pc.Application.getApplication() as pc.Application;
    }

    public get isActive(){
        return this._isActive;

    }

     public set isActive(isActive){
        this._isActive = isActive;
        

    }
    printText(): void {
        const screen = new pc.Entity();
        screen.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });
        this.app.root.addChild(screen);

        const text = new pc.Entity();
        const textFont = findAsset("font_courir");
        textFont?.ready(() => {
            text.addComponent("element", {
                anchor: [0.5, 0.5, 0.5, 0.5],
                autoWidth: false,
                fontAsset: textFont,
                fontSize: this.textProps.fontSize || 10,
                pivot: [0.5, 0.5],
                text: this.textProps.text,
                type: pc.ELEMENTTYPE_TEXT,
                width: this.textProps.textWidth || 500,
                wrapLines: true,
                color: this.textProps.textColor || new pc.Color(1, 1, 1),
            });
            text.setLocalPosition(
                this.textProps.position?.x || 0,
                this.textProps.position?.y || -80,
                this.textProps.position?.z || 0,
            );
            screen.addChild(text);

            /*  this.app.on("update", (dt) => {
    if (time > 10) { // 2 sekunders fade in
        time += dt;
        text.element!.opacity = Math.min(time / 2, 1);
    }
});  */

            text.element!.rangeStart = 0;
            text.element!.rangeEnd = 0;

            const id = setInterval(() => {
                text.element!.rangeEnd += 1;
                if (this.textProps.fadeOut) {
                    if (text.element!.rangeEnd >= this.textProps.text.length) {
                        clearInterval(id);
                        if(!this._isActive ){
                text.destroy();
            }
                        
                    }
                }
            }, this.textProps.textDrawSpeed || 75);
            
        });
    
    }
}
