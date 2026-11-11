"""Draws the Deepak mascot as flat vector art and builds the two 3x3 atlases
(directions + reactions) that page-mascot expects. Head/body are identical in
both sheets; only the face features change."""
import math, sys, asyncio, pathlib

SKIN, SKIN_SH, SKIN_HI = "#B67F58", "#9C6844", "#C9946B"
HAIR, HAIR_HI = "#17110F", "#4B3B34"
NAVY, NAVY_LT, NAVY_DK = "#1F3274", "#2D4694", "#15235A"
INK = "#2A1B14"
GOLD = "#D9B24A"

DIRS = [(-1,-1),(0,-1),(1,-1),(-1,0),(0,0),(1,0),(-1,1),(0,1),(1,1)]

def heart(cx, cy, s, fill):
    return (f'<path transform="translate({cx} {cy}) scale({s})" fill="{fill}" '
            'd="M0 6 C-12 -3 -9 -12 -3 -12 C-1 -12 0 -10 0 -9 C0 -10 1 -12 3 -12 C9 -12 12 -3 0 6 Z"/>')

def star(cx, cy, r, fill):
    pts = []
    for i in range(8):
        a = math.pi/4*i - math.pi/2
        rad = r if i % 2 == 0 else r*0.32
        pts.append(f"{cx+rad*math.cos(a):.1f},{cy+rad*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'

def eye_open(cx, cy, px=0, py=0, big=1.0, sparkle=False):
    rx, ry = 10.5*big, 12*big
    s = (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx+1.1}" ry="{ry+1.1}" fill="#fff" opacity=".96"/>'
         f'<ellipse cx="{cx+px}" cy="{cy+py}" rx="{rx}" ry="{ry}" fill="#2B1A14"/>'
         f'<ellipse cx="{cx+px}" cy="{cy+py+2}" rx="{rx*0.62}" ry="{ry*0.6}" fill="#4A2E22" opacity=".7"/>'
         f'<circle cx="{cx+px-3.2}" cy="{cy+py-4}" r="3.6" fill="#fff"/>'
         f'<circle cx="{cx+px+3.4}" cy="{cy+py+4}" r="1.7" fill="#fff" opacity=".9"/>')
    if sparkle:
        s += star(cx+px-3, cy+py-3, 6, "#fff")
    return s + f'<path d="M{cx-rx} {cy-ry+3} Q{cx} {cy-ry-3} {cx+rx} {cy-ry+3}" fill="none" stroke="{INK}" stroke-width="3.2" stroke-linecap="round"/>'

def eye_closed(cx, cy, happy=False):
    if happy:  # ^ shape
        return f'<path d="M{cx-11} {cy+3} Q{cx} {cy-11} {cx+11} {cy+3}" fill="none" stroke="{INK}" stroke-width="3.6" stroke-linecap="round"/>'
    return f'<path d="M{cx-11} {cy} Q{cx} {cy+8} {cx+11} {cy}" fill="none" stroke="{INK}" stroke-width="3.6" stroke-linecap="round"/>'

def eye_half(cx, cy):
    return (f'<path d="M{cx-11} {cy-2} Q{cx} {cy+9} {cx+11} {cy-2} Z" fill="#2B1A14"/>'
            f'<path d="M{cx-12} {cy-3} L{cx+12} {cy-3}" stroke="{INK}" stroke-width="3.4" stroke-linecap="round"/>')

def eye_spiral(cx, cy):
    pts = []
    for i in range(0, 41):
        t = i/40*3.2*math.pi
        r = 1.2 + t*1.9
        pts.append(f"{cx+r*math.cos(t):.1f},{cy+r*math.sin(t):.1f}")
    return (f'<circle cx="{cx}" cy="{cy}" r="13" fill="#fff"/>'
            f'<polyline points="{" ".join(pts)}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')

def eye_heart(cx, cy):
    return heart(cx, cy+1, 1.15, "#E0405A")

def brows(dy=0, tilt=0, raise_=0):
    y = 94 + dy - raise_
    return (f'<path d="M89 {y+3+tilt} Q104 {y-5} 120 {y+1}" fill="none" stroke="{HAIR}" stroke-width="6.5" stroke-linecap="round"/>'
            f'<path d="M136 {y+1} Q152 {y-5} 167 {y+3+tilt}" fill="none" stroke="{HAIR}" stroke-width="6.5" stroke-linecap="round"/>')

def mouth(kind):
    c = "#6A2F26"
    if kind == "smile":
        return f'<path d="M116 158 Q128 167 140 158" fill="none" stroke="{c}" stroke-width="3" stroke-linecap="round"/>'
    if kind == "flat":
        return f'<path d="M118 160 L138 160" fill="none" stroke="{c}" stroke-width="3" stroke-linecap="round"/>'
    if kind == "open":
        return (f'<path d="M113 155 Q128 180 143 155 Z" fill="#5B1E1E"/>'
                f'<path d="M115 155 L141 155 L139 160 Q128 163 117 160 Z" fill="#fff"/>'
                f'<path d="M121 169 Q128 164 135 169 Q128 175 121 169Z" fill="#D9626B"/>')
    if kind == "o":
        return f'<ellipse cx="128" cy="162" rx="6" ry="7.5" fill="#5B1E1E"/>'
    if kind == "smirk":
        return f'<path d="M117 160 Q130 165 142 154" fill="none" stroke="{c}" stroke-width="3" stroke-linecap="round"/>'
    if kind == "wobble":
        return f'<path d="M116 161 Q122 155 128 161 Q134 167 140 161" fill="none" stroke="{c}" stroke-width="3" stroke-linecap="round"/>'
    if kind == "zz":
        return f'<ellipse cx="128" cy="161" rx="4.5" ry="3.4" fill="#5B1E1E"/>'

def face(kind, px=0, py=0):
    """returns (brows, eyes, mouth, extras-in-feature-space, extras-in-cell-space)"""
    L, R, EY = 101, 155, 118
    if kind == "dir":
        return brows(), eye_open(L,EY,px,py)+eye_open(R,EY,px,py), mouth("smile"), "", ""
    if kind == "blink":
        return brows(), eye_closed(L,EY)+eye_closed(R,EY), mouth("smile"), "", ""
    if kind == "heart":
        return brows(-2), eye_heart(L,EY)+eye_heart(R,EY), mouth("open"), "", heart(206,52,1.1,"#F0607A")+heart(222,80,0.7,"#F58CA0")
    if kind == "sparkle":
        return brows(-2), eye_open(L,EY,0,0,1.08,True)+eye_open(R,EY,0,0,1.08,True), mouth("open"), "", star(210,50,13,"#FFC83D")+star(228,82,8,"#FFD97A")+star(38,64,9,"#FFC83D")
    if kind == "surprised":
        return brows(-1,0,9), eye_open(L,EY,0,0,1.25)+eye_open(R,EY,0,0,1.25), mouth("o"), "", f'<path d="M214 40 L214 62 M214 70 L214 74" stroke="{NAVY_LT}" stroke-width="6" stroke-linecap="round"/>'
    if kind == "wink":
        return brows(0,0,0), eye_closed(L,EY,True)+eye_open(R,EY,1,0), mouth("smirk"), "", star(206,60,9,"#FFC83D")
    if kind == "bashful":
        blush = '<ellipse cx="86" cy="138" rx="15" ry="9" fill="#E5667A" opacity=".5"/><ellipse cx="170" cy="138" rx="15" ry="9" fill="#E5667A" opacity=".5"/>'
        return brows(2,-3), eye_open(L,EY,-4,5)+eye_open(R,EY,-4,5), mouth("wobble"), blush, '<path d="M214 52 Q222 66 214 74 Q206 66 214 52Z" fill="#8EC9F5"/>'
    if kind == "sleepy":
        zz = f'<text x="198" y="62" font-family="Arial Black,Arial" font-weight="900" font-size="26" fill="{NAVY_LT}">z</text><text x="218" y="40" font-family="Arial Black,Arial" font-weight="900" font-size="17" fill="{NAVY_LT}" opacity=".7">z</text>'
        return brows(3,2), eye_half(L,EY)+eye_half(R,EY), mouth("zz"), "", zz
    if kind == "dizzy":
        return brows(-1,-2,3), eye_spiral(L,EY)+eye_spiral(R,EY), mouth("wobble"), "", ""
    if kind == "delighted":
        return brows(-3,0,3), eye_closed(L,EY,True)+eye_closed(R,EY,True), mouth("open"), '<ellipse cx="86" cy="138" rx="14" ry="8" fill="#E5667A" opacity=".35"/><ellipse cx="170" cy="138" rx="14" ry="8" fill="#E5667A" opacity=".35"/>', star(208,54,11,"#FFC83D")

def cell(kind, d=(0,0), uid="a"):
    dx, dy = d
    px, py = dx*3.4, dy*2.8
    brow, eyes, mth, fx, cellfx = face(kind, px, py)
    H = f"translate({dx*5:.1f} {dy*3.5:.1f}) rotate({dx*2.5:.1f} 128 190)"
    F = f"translate({dx*11:.1f} {dy*7:.1f})"
    faceP = "M60 112 C58 160 92 188 128 188 C164 188 198 160 196 112 C196 70 168 48 128 48 C88 48 60 70 60 112 Z"
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
<defs><clipPath id="fc{uid}"><path d="{faceP}"/></clipPath></defs>
<!-- body -->
<path d="M18 256 C18 212 62 194 100 190 L156 190 C194 194 238 212 238 256 Z" fill="{NAVY}"/>
<path d="M100 190 L156 190 C170 192 184 196 196 201 C180 214 150 222 128 222 C106 222 76 214 60 201 C72 196 86 192 100 190Z" fill="{NAVY_DK}" opacity=".35"/>
<path d="M104 184 L152 184 L150 204 Q128 214 106 204 Z" fill="{SKIN_SH}"/>
<path d="M96 192 L128 226 L108 232 L78 204 Z" fill="{NAVY_LT}"/><path d="M160 192 L128 226 L148 232 L178 204 Z" fill="{NAVY_LT}"/>
<path d="M96 192 L128 226 M160 192 L128 226 M128 226 L128 256" fill="none" stroke="{NAVY_DK}" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="128" cy="242" r="2.6" fill="#8FA3E0"/>
<path d="M107 200 Q128 222 149 200" fill="none" stroke="{GOLD}" stroke-width="2.2" stroke-linecap="round"/>
<g transform="{H}">
 <ellipse cx="59" cy="124" rx="9.5" ry="14" fill="{SKIN}"/><ellipse cx="59" cy="125" rx="4.5" ry="8" fill="{SKIN_SH}"/>
 <ellipse cx="197" cy="124" rx="9.5" ry="14" fill="{SKIN}"/><ellipse cx="197" cy="125" rx="4.5" ry="8" fill="{SKIN_SH}"/>
 <path d="{faceP}" fill="{SKIN}"/>
 <path d="M70 150 C80 176 104 186 128 186" fill="none" stroke="{SKIN_HI}" stroke-width="0" />
 <g clip-path="url(#fc{uid})"><g transform="{F}">
  <path fill-rule="evenodd" fill="#2B211D" opacity=".86" d="M30 128 C60 148 90 150 106 150 L150 150 C166 150 196 148 226 128 L226 220 L30 220 Z M106 161 a22 8.5 0 1 0 44 0 a22 8.5 0 1 0 -44 0 Z"/>
  <path d="M97 150 C106 139 122 142 128 147 C134 142 150 139 159 150 C150 157 136 153 128 151 C120 153 106 157 97 150 Z" fill="#120C0A"/>
  {mth}{fx}
 </g></g>
 <g transform="{F}">
  <path d="M122 128 Q128 138 134 128" fill="none" stroke="{SKIN_SH}" stroke-width="3" stroke-linecap="round"/>
  {brow}{eyes}
 </g>
 <path d="M54 114 C40 78 56 38 100 28 C124 12 172 12 194 40 C214 58 210 94 202 116 C198 96 190 86 176 82 C158 74 130 72 106 80 C88 86 72 92 66 104 C60 110 56 114 54 114 Z" fill="{HAIR}"/>
 <path d="M112 28 C120 6 158 2 172 26 C154 18 132 20 112 28 Z" fill="{HAIR}"/>
 <path d="M84 56 C102 40 134 36 158 44" fill="none" stroke="{HAIR_HI}" stroke-width="4" stroke-linecap="round" opacity=".8"/>
 <path d="M74 80 C84 70 96 64 110 62" fill="none" stroke="{HAIR_HI}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
</g>
{cellfx}
</svg>'''

def sheet(kinds_and_dirs):
    cells = "".join(f'<div class="c">{cell(k, d, str(i))}</div>' for i,(k,d) in enumerate(kinds_and_dirs))
    return f'<html><body style="margin:0;background:transparent"><style>.g{{display:grid;grid-template-columns:repeat(3,256px);width:768px}}.c,.c svg{{width:256px;height:256px;display:block}}</style><div class="g">{cells}</div></body></html>'

REACT = ["blink","heart","sparkle","surprised","wink","bashful","sleepy","dizzy","delighted"]

async def main(out):
    from playwright.async_api import async_playwright
    out = pathlib.Path(out); out.mkdir(parents=True, exist_ok=True)
    sheets = {"directions": sheet([("dir", d) for d in DIRS]),
              "reactions": sheet([(k, (0,0)) for k in REACT])}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":768,"height":768}, device_scale_factor=2)
        for name, html in sheets.items():
            await pg.set_content(html)
            await pg.screenshot(path=str(out/f"{name}.png"), omit_background=True, clip={"x":0,"y":0,"width":768,"height":768})
        await b.close()
    from PIL import Image
    for name in sheets:
        im = Image.open(out/f"{name}.png").convert("RGBA")
        im.save(out/f"deepak-{name}.webp", quality=92, method=6)
        print(name, im.size, im.getchannel("A").getextrema())

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1]))
