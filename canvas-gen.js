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
            const el = proto.cloneNode(false);
            el.style.setProperty("--I", i);
            el.style.setProperty("transform", `translate3d(calc(${i%w} * var(--pixel-size, 1px)), calc(${(i/w)|0} * var(--pixel-size, 1px)), 0px)`);
            frag.appendChild(el);
            await Promise.resolve();
        }
        root.appendChild(frag);

        // Отдать кадр; если нужен максимум скорости — замените на 0 микропауз.
        await new Promise(r => requestAnimationFrame(r));
    }
};


//
requestAnimationFrame(()=>requestIdleCallback(()=>generateCSSCanvas(document.querySelector(".root"), 120, 120)));
