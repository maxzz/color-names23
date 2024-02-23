//TODO: It is not seamless noise, it is just random noise. It should be seamless noise.
export function createNoisyImage(width: number, height: number, opacity: number, density: number, noisyColor: { r: number, g: number, b: number }) {

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');
    if (!ctx) {
        return canvas;
    }

    for (let i = 0; i < width * height * density / 100; i += 1) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        let op = Math.random() * opacity / 100;
        ctx.fillStyle = `rgba(${noisyColor.r}, ${noisyColor.g}, ${noisyColor.b}, ${op})`;
        ctx.fillRect(x, y, 1, 1);
    }
    return canvas;
}
