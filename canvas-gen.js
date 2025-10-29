//
export const generateCSSCanvas = async (root, w, h, batchSize = 120) => {
    root.inert = true;
    root.style.contain = 'size layout paint style';
    root.innerHTML = ``;
    root.replaceChildren();
    root.style.setProperty("--w", `${w}`);
    root.style.setProperty("--h", `${h}`);

    const n = w * h;
    const proto = document.createElement('div');
    proto.className = 'pixel';
    proto.inert = true;

    let i = 0;
    while (i < n) {
        const frag = document.createDocumentFragment();
        const end = Math.min(i + batchSize, n);
        for (; i < end; i++) {
            await Promise.resolve();
            const el = proto.cloneNode(false);
            const x = i%w, y = (i/w)|0;
            el.style.cssText = `--x:${x};--y:${y};--I:${i};transform:translate3d(calc(${x}*var(--pixel-size,1px)),calc(${y}*var(--pixel-size,1px)),0px)`;
            frag.appendChild(el);
        }

        // do next render only after previous
        await new Promise(r => requestAnimationFrame(r));
        root.appendChild(frag);
    }
};

//
requestAnimationFrame(()=>requestIdleCallback(()=>generateCSSCanvas(document.querySelector(".root"), 120, 120)));
