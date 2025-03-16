import { app, Application, Asset, AssetListLoader } from "playcanvas";

const staticAssets = {

    font_courir: new Asset('font_courir', 'font', {url:"./assets/fonts/courier.json"} ),
    ruins: new Asset('ruins', 'audio', {url:"./assets/music/Ruins.mp3"}),
    castle: new Asset('castle', 'texture', {url:"./assets/artwork/cyberCastle.webp"})


}

export type AssetKey = keyof(typeof staticAssets);

export function findAsset(key:AssetKey):Asset | undefined {
const res = app?.assets.find(key);
if(!res) console.warn(`Could not find asset "${key}".`)
    return res ?? undefined;

}


export async function loadAssets(app:Application): Promise<boolean>{
let success = true;
const assetLoader = new AssetListLoader(Object.values(staticAssets), app.assets);

return new Promise<boolean>((resolve, reject) =>{
    assetLoader.load((err, failed) =>{
        if(err){
            console.log(err);
            console.log('failed', failed)
            success = false;
        }
        resolve(success);
    })
})


}

/* import * as pc from "playcanvas";

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
        this.assets.music = new pc.Asset("music", "font",{
            url: "./assets/music/Ruins.mp3"
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
 */