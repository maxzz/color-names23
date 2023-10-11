export default function ColorNamesWheel() {
    return (
        <svg viewBox="0 0 1000 1200" version="1.1" id="color-wheel">
            <defs>
                <linearGradient id="graydient">
                    <stop offset="1%" stopColor="#000" />
                    <stop offset="99%" stopColor="#FFF" />
                </linearGradient>
            </defs>

            <circle cx={0} cy={0} r={0} fill="none" id="wheel-well" />

            <text x={500} y={500} id="colorText" className="readout">
                <tspan id="colorName" textAnchor="middle" x={500} dy={-3} />
                <tspan id="colorHSL" textAnchor="middle" x={500} dy={25} />
            </text>

            <text x={500} y={1125} id="grayText" className="readout">
                <tspan id="grayName" textAnchor="middle" x={500} dy={2} />
                <tspan id="grayHSL" textAnchor="middle" x={500} dy={23} />
            </text>

        </svg>
    );
}
