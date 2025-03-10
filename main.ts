import * as pc from "playcanvas";
import { IntroScene } from "./src/scenes/intro-scene";
import { AssetManager } from "./assets/asset-manager";
import { Texture } from "playcanvas";
import { FirstScene } from "./src/scenes/first-scene";

function startApp() {
    const canvas = document.getElementById("application") as HTMLCanvasElement;
    const app = new pc.Application(canvas);
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
const Assetmanager = new AssetManager;
const intro = new IntroScene(Assetmanager);
const firstScene = new FirstScene(Assetmanager); 
intro.createBackgroundImage();
intro.printIntroText(); 
setTimeout(() => {
    firstScene.printFirstSceneText()
}, 10000);