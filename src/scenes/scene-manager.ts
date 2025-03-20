import { introLore } from "../../assets/texts/texts";
import * as pc from "playcanvas";
import { BgImage } from "./background-image";
import { Lore } from "./lore";
import { ImageProps } from "./background-image";
import { TextProps } from "./lore";

export class SceneManager {
    private app: pc.Application;
    imageIsActive: boolean;
    textIsActive: boolean;
    constructor() {
        this.app = pc.Application.getApplication() as pc.Application;
    }

  showScene(textConfig: TextProps, imageConfig: ImageProps): void {
        const text = new Lore(textConfig);
        const image = new BgImage(imageConfig);

        this.imageIsActive = image.isActive;
        this.textIsActive = text.isActive;

        text.printText();
        image.addBackgroundImage();
    }

 removeScene(name: string): void {

}
}
