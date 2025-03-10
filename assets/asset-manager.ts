import * as pc from "playcanvas";

export class AssetManager {
    private app: pc.Application;
    public assets: any;

    constructor() {
        this.app = pc.Application.getApplication() as pc.Application;
        this.assets = {};
    }

    loadAssets(callback: () => void) {
        this.assets.font = new pc.Asset("font", "font", {
            url: "./assets/fonts/courier.json",
        });
        this.app.assets.load(this.assets.font);
        this.app.assets.add(this.assets.font);

        this.assets.font.ready(() => {
            if (callback) {
                callback();
            }
        });
    }
}
