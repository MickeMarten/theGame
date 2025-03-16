import * as pc from "playcanvas";
import { IntroScene } from "./src/scenes/intro-scene";
import { findAsset, loadAssets } from "./assets/asset-manager";
import { FirstScene } from "./src/scenes/first-scene";
import { Scene } from "./src/scenes/scene";

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

    const light = new pc.Entity();
    light.addComponent("light", {
        type: "directional",
        intensity: 1,
    });
    light.setEulerAngles(45, 0, 0);
    app.root.addChild(light);

    return app;
}
startApp();
const scene1 = new Scene({
    scale: { x: 500, y: 180 },
    position: { x: 300, y: 220 },
    assetKey: "castle",
});


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
