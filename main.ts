import * as pc from "playcanvas";
import { Lore } from "./src/scenes/lore";
import { findAsset, loadAssets } from "./assets/asset-manager";
import { BgImage } from "./src/scenes/background-image";
import { introLore } from "./assets/texts/texts";

function startApp() {
    const canvas = document.getElementById("application") as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    loadAssets(app);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.start();

    const camera = new pc.Entity();
    camera.addComponent("camera", {
        orthographic: true,
        clearColor: new pc.Color(0, 0, 0),
    });
    camera.setPosition(0, 0, 10);
    app.root.addChild(camera);
    const resize = () => app.resizeCanvas();
    window.addEventListener("resize", resize);
    app.on("destroy", () => {
        window.removeEventListener("resize", resize);
    });



    return app;
}
startApp();
/* const scene1 = new BgImage({
    scale: { x: 500, y: 180 },
    position: { x: 300, y: 220 },
    assetKey: "castle",
});
const lore = new Lore({text:introLore.wakeup} );

lore.printText()  */

const wakeUpLore = new Lore({text:introLore.deploy, textWidth:20, textColor: new pc.Color(0, 1, 0, 0.3), fontSize:16, position:{x:2, y:-0.1, z:0}, fadeOut:true, textDrawSpeed:40})
wakeUpLore.printText()
    



/*   const ruinsSound = findAsset("ruins");
    if(ruinsSound){
    const music = new pc.Entity
    music.addComponent("sound",{})
    music.sound?.addSlot('audio', {
        asset:ruinsSound,
        autoPlay: true,
        loop:false,
        volume: 0.8,
    });
    app.root.addChild(music);

    }
    else {
        console.warn("Ruins audio asset not found!");
    } */
