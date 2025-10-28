/*
export const generateCSSCanvas = async (root, w, h)=>{
    root.style.setProperty("--w", `${w}`);
    root.style.setProperty("--h", `${h}`);
    root.inert = true;
    root.innerHTML = ``;
    let I = 0;
    for (let y = 0; y < h; y++) {
        const row = document.createDocumentFragment();
        //row.classList.add("row");
        //row.style.setProperty("--y", `${y}`);
        //row.style.setProperty("--w", `${w}`);
        //row.dataset.y = `${y}`;
        //row.inert = true;
        for (let x = 0; x < w; x++) {
            const pixel = document.createElement("div"); //http://192.168.0.204:5173/
            pixel.style.setProperty("--I", `${I++}`); // sibling-count() TOO SLOW!
            //pixel.classList.add("column");
            //pixel.classList.add("pixel");
            //pixel.dataset.y = `${y}`;
            //pixel.dataset.x = `${x}`;
            //pixel.style.setProperty("--x", `${x}`);
            //pixel.style.setProperty("--y", `${y}`);
            pixel.inert = true;
            row.appendChild(pixel);
            //root.appendChild(pixel);
            //await Promise.resolve();
        }
        root.appendChild(row);

        // avoid overpaint and overload when building DOM
        await new Promise((r)=>requestAnimationFrame(r));
    }
}*/

//
export const generateCSSCanvas = async (root, w, h, batchSize = 120) => {
    root.inert = true;
    root.style.contain = 'size layout paint style';
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

    root.inert = false;
};


//
requestAnimationFrame(()=>requestIdleCallback(()=>generateCSSCanvas(document.querySelector(".root"), 120, 120)));
