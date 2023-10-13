export function ColorNamesDistribution() {
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

/*
<style type="text/css" media="all">
#cw {
	width: 120%;
	max-width: 99vw;
	height: 95vh;
	margin: 0 -10%;
}
@media (prefers-color-scheme: dark) {
	#cw {filter: invert(1);}
}
#color-wheel {
	width: 100%;
	height: 100%;
	background: radial-gradient(70% 50% at 50% 100%, #312929 25%, #000);
}
#color-wheel.dragging {
	cursor: move;
}

.readout {
	font: 21px Helvetica, Arial, Inconsolata, Consolas, sans-serif, monospace;
	color: #000;
	fill: #000;
}
.readout.dark {
	color: #FFF;
	fill: #FFF;
}
.readout tspan:first-child {
	font-size: 111%;
	font-weight: bold;
}
</style>
*/