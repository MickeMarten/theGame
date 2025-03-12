import * as pc from "playcanvas";
import { IntroScene } from "./src/scenes/intro-scene";
import { findAsset, loadAssets } from "./assets/asset-manager";
import { FirstScene } from "./src/scenes/first-scene";

function startApp() {
    const canvas = document.getElementById("application") as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.start();
    loadAssets(app);
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
    
    const ruinsSound = findAsset("ruins");
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
    }
    


    return app;
}
startApp();
const intro = new IntroScene();
const firstScene = new FirstScene();

setTimeout(() => {
    firstScene.printFirstSceneText();
}, 10000);
setTimeout(() => {
intro.printIntroText();
intro.createBackgroundImage();
}, 75);
