// Renders the social media preview card (1200x630) with headless Chrome.
// Usage: node scripts/social-cards/generate.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const STATIC = join(ROOT, 'static');
const OUT_PATH = join(STATIC, 'assets/social-card.png');
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1200;
const H = 630;

const AMBER = '#E8A800';
const NAVY = '#080D18';

const logo = readFileSync(join(STATIC, 'assets/rail-logo-new-white.svg'), 'utf8')
	.replace(/fill="white"/g, 'fill="currentColor"');

function hexGrid({ r, stroke, dot, glow, glowFill, glowStroke, glowDot }) {
	const colW = r * Math.sqrt(3);
	const rowH = r * 1.5;
	const glowSet = new Set(glow.map(([c, row]) => `${c}-${row}`));
	let out = '';
	for (let row = 0; row < Math.ceil(H / rowH) + 2; row++) {
		for (let c = 0; c < Math.ceil(W / colW) + 2; c++) {
			const x = c * colW + (row % 2 ? colW / 2 : 0);
			const y = row * rowH;
			const pts = Array.from({ length: 6 }, (_, i) => {
				const t = Math.PI / 6 + (Math.PI / 3) * i;
				return `${(x + r * Math.cos(t)).toFixed(1)},${(y + r * Math.sin(t)).toFixed(1)}`;
			}).join(' ');
			const lit = glowSet.has(`${c}-${row}`);
			out += `<polygon points="${pts}" fill="${lit ? glowFill : 'none'}" stroke="${lit ? glowStroke : stroke}" stroke-width="${lit ? 1.2 : 0.8}"/>`;
			out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${lit ? 2.6 : 1.3}" fill="${lit ? glowDot : dot}"/>`;
		}
	}
	return `<svg class="bg" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
}

// [column, row] cells of glowing "random walk" trails, like the live hero background.
// Odd rows are offset half a column to the right; keep trails clear of the logo and text.
const TRAILS = [
	[[0, 0], [1, 0], [1, 1], [2, 1]],
	[[0, 2], [0, 3], [1, 3], [1, 4]],
	[[6, 0], [7, 0], [8, 0]],
	[[14, 0], [13, 1], [14, 1], [14, 2], [13, 3], [14, 4], [15, 4]],
	[[1, 8], [2, 8], [2, 9], [3, 9]],
	[[11, 9], [12, 9], [12, 8]],
];

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Inter:wght@400&display=block" rel="stylesheet">
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
	body { position: relative; font-family: 'Inter', sans-serif; background: ${NAVY}; color: #E6ECF5; }
	.bg { position: absolute; inset: 0; }
	.glow { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, rgba(232,168,0,0.18), rgba(232,168,0,0) 60%); }
	.wrap { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
	.logo { width: 660px; color: #fff; filter: drop-shadow(0 0 32px rgba(232,168,0,0.38)); }
	.logo svg { width: 100%; height: auto; display: block; }
	h1 { margin-top: 40px; font-family: 'Orbitron', sans-serif; font-weight: 600; font-size: 44px; line-height: 1.28; letter-spacing: 0.01em; }
	h1 span { color: ${AMBER}; text-shadow: 0 0 18px rgba(232,168,0,0.45); }
	.tag { margin-top: 18px; font-size: 30px; color: #8FA6C8; }
	.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: linear-gradient(90deg, transparent, ${AMBER}, transparent); }
</style></head><body>
	${hexGrid({ r: 46, stroke: 'rgba(232,168,0,0.08)', dot: 'rgba(232,168,0,0.14)', glow: TRAILS.flat(), glowFill: 'rgba(232,168,0,0.10)', glowStroke: 'rgba(232,168,0,0.45)', glowDot: 'rgba(232,168,0,0.8)' })}
	<div class="glow"></div>
	<div class="wrap">
		<div class="logo">${logo}</div>
		<h1>Robot Autonomy and Interactive Learning<br>at <span>Georgia Tech</span></h1>
		<div class="tag">Advancing AI and Robotics for a Human-Centered World.</div>
	</div>
	<div class="bar"></div>
</body></html>`;

const tmp = mkdtempSync(join(tmpdir(), 'rail-social-card-'));
const htmlPath = join(tmp, 'card.html');
writeFileSync(htmlPath, html);
try {
	execFileSync(CHROME, [
		'--headless=new',
		'--disable-gpu',
		'--hide-scrollbars',
		'--virtual-time-budget=5000',
		`--window-size=${W},${H}`,
		`--screenshot=${OUT_PATH}`,
		pathToFileURL(htmlPath).href,
	], { stdio: 'ignore' });
} finally {
	rmSync(tmp, { recursive: true, force: true });
}
console.log(`wrote ${OUT_PATH.replace(ROOT + '/', '')}`);
