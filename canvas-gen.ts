// @ts-ignore
import scssCode from "./scss/rendering.scss?inline";

//
const NS = 'http://www.w3.org/2000/svg';

//
export const generateCSSCanvas = async (root: SVGSVGElement, w: number, h: number, batchSize = 180) => {
    if (!root) {
        throw new Error("root not found");
    }

    //
    const forImport = URL.createObjectURL(new Blob([scssCode], {type: 'text/css'}));
    const style = document.createElementNS(NS, 'style');
    style.innerHTML = `@import '${forImport}';`;
    root.appendChild(style);

    //
    root.style.setProperty("viewBox", `0 0 ${w} ${h}`);
    root.style.setProperty("contain", 'size layout paint style');
    root.style.setProperty("--w", `${w}`);
    root.style.setProperty("--h", `${h}`);
    root.style.setProperty("zoom", `2`);

    //
    root.setAttributeNS(NS, "preserveAspectRatio", "xMidYMid meet");
    root.setAttributeNS(NS, "shapeRendering", "optimizeSpeed");
    root.setAttributeNS(NS, "textRendering", "optimizeSpeed");
    root.setAttributeNS(NS, "imageRendering", "optimizeSpeed");
    root.setAttributeNS(NS, "overflow", "visible");
    root.setAttributeNS(NS, "enable-background", `new 0 0 ${w} ${h}`);
    root.setAttributeNS(NS, "background-color", "black");
    root.setAttributeNS(NS, "width", `${w}`);
    root.setAttributeNS(NS, "height", `${h}`);

    //
    const n = w * h;
    const proto = document.createElementNS(NS, 'use');
    proto.setAttribute('href', '#pixel');
    proto.setAttribute('class', 'pixel');

    //
    const whereAppend = root.querySelector("g.pixels");
    if (!whereAppend) {
        throw new Error("g.pixels not found");
    }

    //
    whereAppend.innerHTML = ``;

    //
    let i = 0;
    while (i < n) {
        const frag = document.createDocumentFragment();
        const end = Math.min(i + batchSize, n);
        for (; i < end; i++) {
            await Promise.resolve();
            const el = proto.cloneNode(true) as SVGUseElement;
            const x = i%w, y = (i/w)|0;
            el.setAttribute('x', `${x}`);
            el.setAttribute('y', `${y}`);
            frag.appendChild(el);
        }

        // do next render only after previous
        await new Promise(r => requestAnimationFrame(r));
        whereAppend?.appendChild(frag);
    }
};

//
requestAnimationFrame(()=>requestIdleCallback(()=>generateCSSCanvas(document.querySelector(".demo svg") as SVGSVGElement, 120, 120)));
