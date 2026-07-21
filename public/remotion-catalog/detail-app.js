(() => {
  const catalog = window.REMOTION_CATALOG || [];
  const params = new URLSearchParams(location.search);
  const requested = Number(params.get('category')) || 1;
  let category = catalog.find((c) => c.id === requested) || catalog[0];
  let speed = 1;
  let paused = false;
  const cardAnimations = new Map();
  const customUpdaters = [];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function formatNo(value) { return String(value).padStart(2, '0'); }
  function seeded(index, salt = 0) {
    const x = Math.sin((index + 1) * 9283.17 + salt * 77.13) * 43758.5453;
    return x - Math.floor(x);
  }

  function implementationTags(categoryId, demo) {
    const base = {
      1:['transform','interpolate()','spring()'], 2:['scale','dimensions','spring()'], 3:['transform','perspective','transformOrigin'],
      4:['opacity','Sequence','interpolate()'], 5:['interpolateColors()','filter','gradient'], 6:['border','boxShadow','layout'],
      7:['clipPath','mask','SVG'], 8:['filter','effects','compositing'], 9:['@remotion/paths','strokeDashoffset','SVG'],
      10:['text','Sequence','measureText()'], 11:['React state','Sequence','spring()'], 12:['SVG','data mapping','interpolate()'],
      13:['TransitionSeries','presentation','timing'], 14:['perspective','parallax','camera'], 15:['@remotion/three','R3F','ThreeCanvas'],
      16:['particles','noise','random()'], 17:['WebGL','shader','pixel'], 18:['Video','Img','Sequence'],
      19:['@remotion/media-utils','audioData','visualizeAudio()'], 20:['spring()','math','simulation'], 21:['Easing','Sequence','delay'],
    }[categoryId] || ['useCurrentFrame()','interpolate()'];
    if (demo.includes('svg') || demo.includes('path')) return [...new Set([...base,'SVG path'])].slice(0,4);
    if (demo.includes('three')) return ['@remotion/three','useCurrentFrame()','R3F'];
    if (demo.includes('audio')) return ['audioData','FFT','frame mapping'];
    return base;
  }

  function remotionHint(categoryId, demo) {
    const map = {
      1:'transform: translate(...)',2:'scale / width / height',3:'rotate + perspective',4:'opacity + Sequence',5:'interpolateColors()',
      6:'border / shadow / layout',7:'clipPath / mask',8:'filter / effect pass',9:'strokeDashoffset / path',10:'문자 단위 Sequence',
      11:'UI 상태를 frame에 매핑',12:'데이터 값을 frame에 매핑',13:'TransitionSeries',14:'카메라·레이어 transform',
      15:'ThreeCanvas frame update',16:'seededRandom + particles',17:'uniform time = frame/fps',18:'Video / Img / Sequence',
      19:'visualizeAudio()',20:'spring / physics formula',21:'Easing + timing composition'
    };
    return map[categoryId] || demo;
  }

  function particleMarkup(count = 30, mode = 'particle') {
    return Array.from({length:count}, (_, i) => {
      const x = Math.round(seeded(i,1) * 96);
      const y = Math.round(seeded(i,2) * 92);
      const s = (3 + seeded(i,3) * 8).toFixed(1);
      const h = Math.round(155 + seeded(i,4) * 190);
      return `<i class="particle" style="--x:${x}%;--y:${y}%;--s:${s}px;--h:${h};--i:${i}" data-i="${i}" data-mode="${mode}"></i>`;
    }).join('');
  }

  function letterMarkup(text) {
    return [...text].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  }

  const MOTION_PATHS = {
    'translate-axis': [[-90,0],[90,0],[0,-55],[0,55],[-90,0]],
    'orbit': [[0,-56],[28,-48],[50,-28],[58,0],[50,28],[28,48],[0,56],[-28,48],[-50,28],[-58,0],[-50,-28],[-28,-48],[0,-56]],
    'ellipse-orbit': [[0,-40],[43,-35],[74,-20],[86,0],[74,20],[43,35],[0,40],[-43,35],[-74,20],[-86,0],[-74,-20],[-43,-35],[0,-40]],
    'wave': [[-96,0],[-65,-28],[-30,25],[0,-22],[34,27],[68,-24],[96,0]],
    'bezier': [[-96,45],[-68,-45],[15,-58],[92,30],[35,55],[-96,45]],
    'svg-path': [[-96,42],[-68,-50],[15,-55],[92,25],[42,48],[-96,42]],
    'shake': [[0,0],[-13,2],[15,-3],[-10,3],[8,-1],[-4,1],[0,0]],
    'float': [[0,13,1,-4],[6,-14,1.05,3],[-4,9,1,-2]],
    'fall': [[0,-70,.8,0],[0,-35,.9,4],[0,58,1.05,0],[0,42,.96,0],[0,58,1,0]],
    'bounce': [[-75,-35],[-35,48],[0,-26],[35,48],[60,-12],[85,48]],
    'inertia': [[-100,0],[-20,0],[45,0],[78,0],[91,0],[96,0]],
    'overshoot': [[-80,0],[72,0],[100,0],[84,0],[90,0]],
    'random-walk': [[-80,32],[-40,-38],[5,20],[52,-48],[84,18],[22,42],[-80,32]],
    'zigzag': [[-96,45],[-65,-45],[-30,45],[5,-45],[40,45],[75,-45],[96,20]],
    'spiral': [[0,0],[15,-12],[22,18],[-18,31],[-48,-8],[-8,-62],[70,-22],[45,66],[-82,50]],
    'pingpong': [[-90,0],[90,0],[-90,0]],
    'motion-trail': [[-96,45],[-68,-45],[15,-58],[92,30],[35,55],[-96,45]],
    'pointer-path': [[-85,-45],[-20,-25],[-20,-25,.72],[55,20],[55,20,.72],[-10,48]],
    'map-route': [[-95,42],[-65,-30],[-18,-48],[20,-12],[68,-42],[95,32]],
  };

  const MOTION_GUIDELESS = new Set(['shake','camera-shake','float']);

  function motionGuide(demo) {
    if (demo === 'translate-axis') return '<div class="axis-x"></div><div class="axis-y"></div>';
    if (MOTION_GUIDELESS.has(demo)) return '';
    const points = MOTION_PATHS[demo] || MOTION_PATHS.bezier;
    const pointList = points.map(([x,y]) => `${115+x},${75+y}`).join(' ');
    return `<svg class="route-svg" viewBox="0 0 230 150" aria-hidden="true"><polyline points="${pointList}"/></svg>`;
  }
  const VECTOR_ROUTE = [[-90,35],[-55,-42],[15,-52],[84,18],[30,40],[-90,35]];

  function vectorScene(demo) {
    const gradientId = `vector-gradient-${demo}`;
    const defs = `<defs><linearGradient id="${gradientId}" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#23d5ab"/></linearGradient></defs>`;
    const routePoints = VECTOR_ROUTE.map(([x,y]) => `${110+x},${75+y}`).join(' ');
    let shape = `<path class="anim-target main-path" d="M20 110 C55 33 125 23 194 93 C170 125 77 140 20 110"/>`;
    let guide = '';
    if (demo === 'check-draw') shape = '<path class="anim-target main-path" d="M48 78 L91 116 L173 35"/>';
    else if (demo === 'svg-ring') shape = '<circle class="anim-target main-path" cx="110" cy="75" r="48"/>';
    else if (demo === 'handwriting') shape = '<path class="anim-target main-path" d="M20 94 C42 38 57 121 79 73 S112 30 121 84 S152 117 198 53"/>';
    else if (demo === 'svg-map-route') shape = '<polyline class="anim-target main-path" points="18,118 49,45 92,28 130,66 178,38 204,107"/>';
    else if (demo.includes('morph') || demo === 'shape-parameters') shape = '<path class="anim-target main-path vector-shape" d="M110 18 L190 68 L160 132 L66 132 L30 68 Z"/>';
    else if (demo === 'object-on-path' || demo === 'path-light') {
      shape = `<polyline class="anim-target main-path" points="${routePoints}"/>`;
      guide = `<polyline class="thin" points="${routePoints}"/>`;
    }
    return `<svg class="svg-demo anim-root" viewBox="0 0 220 150" style="--vector-stroke:url(#${gradientId})">${defs}${guide}${shape}<circle class="path-object anim-secondary" cx="110" cy="75" r="8"/></svg>`;
  }

  function chartScene(demo) {
    const bars = `<div class="bars">${[45,82,62,96,72,88].map((h,i)=>`<i class="anim-piece" style="--h:${h}%;--i:${i}"></i>`).join('')}</div>`;
    const line = `<svg class="chart-svg" viewBox="0 0 215 150">${demo.includes('area')?'<path class="area" d="M3 145 L20 120 L55 96 L91 110 L128 54 L165 76 L212 22 L212 145 Z"/>':''}<polyline class="anim-target" points="3,145 20,120 55,96 91,110 128,54 165,76 212,22"/></svg>`;
    const placeholder = '<svg class="chart-svg chart-placeholder" viewBox="0 0 215 150"><path class="anim-target" d="M0 0"/></svg>';
    const dots = Array.from({length:10},(_,i)=>`<span class="chart-dot anim-dot" style="left:${14+i*20}px;top:${25+seeded(i,7)*102}px"></span>`).join('');
    if (demo.includes('pie') || demo.includes('ring') || demo.includes('gauge')) {
      return `<div class="chart-scene chart-radial anim-root"><svg class="chart-svg" viewBox="0 0 215 150"><circle class="radial-track" cx="108" cy="75" r="48"/><circle class="anim-target radial-value" cx="108" cy="75" r="48"/></svg></div>`;
    }
    if (demo.includes('scatter') || demo.includes('point') || demo.includes('network') || demo.includes('encoded')) {
      return `<div class="chart-scene chart-points anim-root">${placeholder}${dots}</div>`;
    }
    if (demo.includes('bar') || demo.includes('ranking') || demo.includes('heatmap')) {
      return `<div class="chart-scene chart-columns anim-root">${bars}${placeholder}</div>`;
    }
    if (demo.includes('counter')) return `<div class="chart-scene chart-counter anim-root">${placeholder}</div>`;
    return `<div class="chart-scene chart-lines anim-root">${line}</div>`;
  }

  const PHYSICS_PATHS = {
    orbit:[[90,0],[160,45],[90,95],[20,45],[90,0]],
    lissajous:[[90,0],[160,75],[20,75],[90,0],[160,35],[20,35],[90,0]],
    noise:[[10,30],[155,5],[60,100],[180,75],[35,50],[10,30]],
  };

  function physicsGuide(demo) {
    const pathKey = ['orbit','lissajous','noise'].find(key => demo.includes(key));
    if (pathKey) {
      const points = PHYSICS_PATHS[pathKey].map(([x,y]) => `${15.5+x},${15.5+y}`).join(' ');
      return `<svg class="physics-route" viewBox="0 0 225 150"><polyline points="${points}"/></svg>`;
    }
    if (demo.includes('bounce') || demo.includes('gravity')) return '<div class="physics-ground"></div>';
    if (demo.includes('spring') || demo.includes('damped') || demo.includes('overshoot') || demo.includes('friction') || demo.includes('inertia')) return '<div class="physics-track"></div>';
    return '';
  }
  function sceneHTML(categoryId, item) {
    const d = item.demo;
    if (categoryId === 1) {
      return `<div class="motion-scene anim-root">${motionGuide(d)}<div class="ghosts">${Array.from({length:5},(_,i)=>`<i style="--g:${i}"></i>`).join('')}</div><div class="orb anim-target"></div></div>`;
    }
    if (categoryId === 2) {
      if (d === 'progress-ring') return `<svg class="svg-demo anim-root" viewBox="0 0 160 160"><defs><linearGradient id="lineGradient" x1="0" x2="1"><stop stop-color="#7c5cff"/><stop offset="1" stop-color="#23d5ab"/></linearGradient></defs><circle class="thin" cx="80" cy="80" r="55"/><circle class="anim-target" cx="80" cy="80" r="55" transform="rotate(-90 80 80)"/></svg>`;
      return `<div class="shape anim-target"><span>${d.includes('progress')?'72%':'MOTION'}</span></div>`;
    }
    if (categoryId === 3) {
      if (['dice-spin','cube-transition'].includes(d)) return `<div class="scene-3d"><div class="cube anim-target">${Array.from({length:6},(_,i)=>`<span>${i+1}</span>`).join('')}</div></div>`;
      return `<div class="scene-3d"><div class="mini-card anim-target"><span>FRONT</span></div></div>`;
    }
    if (categoryId === 4) return `<div class="stack anim-root">${Array.from({length:5},(_,i)=>`<span class="anim-piece" style="width:${95-i*10}%"></span>`).join('')}</div>`;
    if (categoryId === 5) return `<div class="shape anim-target"><span class="text-color-target">COLOR</span></div>`;
    if (categoryId === 6) return `<div class="box-demo anim-target"><span>BOX</span></div>`;
    if (categoryId === 7) return `<div class="mask-demo"><div class="mask-fill anim-target">REVEAL</div></div>`;
    if (categoryId === 8) return `<div class="effect-scene anim-target" data-label="${item.name.toUpperCase()}"><div class="noise-layer"></div><div class="scan-layer"></div></div>`;
    if (categoryId === 9) return vectorScene(d);
    if (categoryId === 10) return `<div class="text-demo anim-root"><div class="letters">${letterMarkup(d.includes('count')||d.includes('rolling')?'1,024':'REMOTION')}</div><div class="subline">KINETIC TYPOGRAPHY</div></div>`;
    if (categoryId === 11) return `<div class="ui-window anim-root" data-ui="${d}"><div class="ui-top"></div><div class="ui-content"><div class="ui-line" style="width:78%"></div><div class="ui-accent anim-target"></div><div class="ui-line" style="width:58%"></div><div class="ui-line" style="width:88%"></div></div><div class="ui-cursor anim-secondary"></div><div class="ui-pop anim-pop">DONE</div></div>`;
    if (categoryId === 12) return chartScene(d);
    if (categoryId === 13) return `<div class="transition-stage anim-root"><div class="scene-a anim-primary">A</div><div class="scene-b anim-target">B</div></div>`;
    if (categoryId === 14) return `<div class="camera-stage"><div class="camera-world anim-target"><div class="cam-layer back"></div><div class="cam-layer mid"></div><div class="cam-layer front"></div></div></div>`;
    if (categoryId === 15) return `<div class="scene-3d"><div class="cube anim-target">${Array.from({length:6},(_,i)=>`<span>${i+1}</span>`).join('')}</div><div class="glow-dot anim-secondary" style="position:absolute"></div></div>`;
    if (categoryId === 16) return `<div class="particle-stage anim-root">${particleMarkup(36,d)}</div>`;
    if (categoryId === 17) return `<div class="effect-scene anim-target" data-label="${item.name.toUpperCase()}"><div class="grid-lines"></div><div class="noise-layer"></div><div class="scan-layer"></div></div>`;
    if (categoryId === 18) return `<div class="media-frame anim-root"><div class="media-image anim-target"></div><div class="media-overlay anim-secondary"></div><div class="media-progress"><i class="anim-progress"></i></div></div>`;
    if (categoryId === 19) return `<div class="audio-stage anim-root">${Array.from({length:24},(_,i)=>`<i class="anim-piece" style="--h:${20+seeded(i,9)*105}px;--i:${i}"></i>`).join('')}<div class="mouth anim-secondary"></div></div>`;
    if (categoryId === 20) return `<div class="physics-stage anim-root" data-physics="${d}">${physicsGuide(d)}<div class="physics-ball anim-target"></div><div class="rope anim-secondary"></div>${Array.from({length:7},(_,i)=>`<span class="physics-ball anim-piece" style="width:15px;height:15px;left:${18+i*9}px;top:${54+i*4}px"></span>`).join('')}</div>`;
    return `<div class="timing-stage anim-root"><div class="timing-lane" data-label="${item.name.toUpperCase()}"><div class="timing-dot anim-target"></div></div><div class="timing-lane" data-label="REFERENCE"><div class="timing-dot anim-secondary"></div></div><div class="timing-lane" data-label="STEPS"><div class="timing-dot anim-piece"></div></div></div>`;
  }

  function animate(card, el, frames, options = {}) {
    if (!el) return null;
    const animation = el.animate(frames, {
      duration: 2800,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out',
      fill: 'both',
      ...options,
    });
    animation.playbackRate = speed;
    if (paused) animation.pause();
    if (!cardAnimations.has(card)) cardAnimations.set(card, []);
    cardAnimations.get(card).push(animation);
    return animation;
  }

  function transformPath(points) { return points.map(([x,y,s=1,r=0]) => ({transform:`translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`})); }
  function setupCardAnimation(card, categoryId, item, index) {
    const d = item.demo;
    const target = $('.anim-target',card), secondary=$('.anim-secondary',card), pieces=$$('.anim-piece',card);
    cardAnimations.set(card, []);

    if (categoryId === 1) {
      const paths = MOTION_PATHS;
      const ghostEls=$$('.ghosts i',card);ghostEls.forEach((g,i)=>g.style.opacity=d==='motion-trail'?String(.08+i*.07):'0');
      let points=paths[d]||paths['bezier'];
      if (d === 'camera-shake') {
        animate(card,$('.motion-scene',card),transformPath([[0,0],[8,-4],[-7,5],[5,-2],[-4,2],[0,0]]),{duration:520,direction:'normal'});
        animate(card,target,[{transform:'scale(.9)'},{transform:'scale(1.12)'},{transform:'scale(.9)'}],{duration:1800});
      } else {
        animate(card,target,transformPath(points),{duration:d==='shake'?650:3200,direction:d==='fall'?'normal':'alternate',easing:d==='fall'?'cubic-bezier(.4,0,1,1)':'ease-in-out'});
      }
      if (d === 'motion-trail') {
        ghostEls.forEach((g,i)=>animate(card,g,transformPath(paths['motion-trail']),{duration:3100,delay:i*90,direction:'alternate'}));
      }
      return;
    }

    if (categoryId === 2) {
      if (d==='progress-ring') {
        target.style.strokeDasharray='345'; target.style.strokeDashoffset='345';
        animate(card,target,[{strokeDashoffset:345},{strokeDashoffset:0},{strokeDashoffset:80}],{duration:3300,direction:'normal'}); return;
      }
      const configs={
        'dimension':[{width:'55px',height:'120px'},{width:'165px',height:'55px'},{width:'104px',height:'104px'}],
        'scale-axes':[{transform:'scale3d(.55,1.35,.7)'},{transform:'scale3d(1.35,.55,1.25)'},{transform:'scale3d(1,1,1)'}],
        'squash':[{transform:'scale(.72,1.3)'},{transform:'scale(1.35,.62)'},{transform:'scale(.92,1.08)'}],
        'pulse':[{transform:'scale(.78)'},{transform:'scale(1.2)'},{transform:'scale(.78)'}],
        'breathing':[{transform:'scale(.92)',filter:'brightness(.9)'},{transform:'scale(1.08)',filter:'brightness(1.22)'},{transform:'scale(.92)',filter:'brightness(.9)'}],
        'zoom':[{transform:'scale(.35)',opacity:.3},{transform:'scale(1.35)',opacity:1},{transform:'scale(.8)',opacity:.8}],
        'asymmetric-scale':[{transform:'scaleX(.55) scaleY(1.25)'},{transform:'scaleX(1.35) scaleY(.7)'},{transform:'scale(1)'}],
        'circle-ellipse':[{borderRadius:'50%',transform:'scale(1)'},{borderRadius:'50%',transform:'scale(1.45,.65)'},{borderRadius:'18%',transform:'scale(.9,1.12)'}],
        'panel-unfold':[{transform:'perspective(600px) rotateX(-82deg) scaleY(.2)',transformOrigin:'top'},{transform:'perspective(600px) rotateX(0) scaleY(1)',transformOrigin:'top'}],
        'accordion':[{height:'24px',transform:'scaleY(.25)'},{height:'130px',transform:'scaleY(1)'},{height:'62px',transform:'scaleY(.55)'}],
        'progress-bar':[{width:'15px',height:'25px',borderRadius:'99px'},{width:'180px',height:'25px',borderRadius:'99px'}],
        'speech-bubble':[{transform:'scale(.15) translateY(35px)',borderRadius:'50%'},{transform:'scale(1.08) translateY(-5px)',borderRadius:'28px'},{transform:'scale(1)',borderRadius:'22px'}],
        'button-press':[{transform:'translateY(0) scale(1)',boxShadow:'0 18px 40px rgba(35,213,171,.25)'},{transform:'translateY(8px) scale(.92)',boxShadow:'0 3px 8px rgba(35,213,171,.1)'},{transform:'translateY(0) scale(1)'}],
      };
      animate(card,target,configs[d]||configs.pulse,{duration:d==='button-press'?1300:2900}); return;
    }

    if (categoryId === 3) {
      const cfg={
        rotate:[{transform:'rotate(0)'},{transform:'rotate(360deg)'}],
        'rotate-3d':[{transform:'rotateX(0) rotateY(0) rotateZ(0)'},{transform:'rotateX(360deg) rotateY(540deg) rotateZ(180deg)'}],
        skew:[{transform:'skew(0)'},{transform:'skewX(24deg) skewY(-12deg)'},{transform:'skewX(-18deg) skewY(10deg)'}],
        'card-flip':[{transform:'rotateY(0)'},{transform:'rotateY(180deg)'},{transform:'rotateY(360deg)'}],
        'coin-spin':[{transform:'rotateY(0) scaleX(1)',borderRadius:'50%'},{transform:'rotateY(900deg) scaleX(.18)',borderRadius:'50%'},{transform:'rotateY(1800deg) scaleX(1)',borderRadius:'50%'}],
        'dice-spin':[{transform:'rotateX(0) rotateY(0)'},{transform:'rotateX(540deg) rotateY(720deg)'}],
        'page-turn':[{transform:'perspective(700px) rotateY(0)',transformOrigin:'left'},{transform:'perspective(700px) rotateY(-168deg)',transformOrigin:'left'}],
        tilt:[{transform:'perspective(650px) rotateX(-15deg) rotateY(-20deg)'},{transform:'perspective(650px) rotateX(16deg) rotateY(22deg)'}],
        perspective:[{transform:'perspective(240px) rotateY(-25deg) translateZ(-40px)'},{transform:'perspective(1000px) rotateY(25deg) translateZ(60px)'}],
        'origin-shift':[{transform:'rotate(-25deg)',transformOrigin:'0% 0%'},{transform:'rotate(25deg)',transformOrigin:'100% 100%'}],
        'axis-shift':[{transform:'rotateX(50deg)',transformOrigin:'center top'},{transform:'rotateY(60deg)',transformOrigin:'left center'},{transform:'rotateZ(35deg)',transformOrigin:'right bottom'}],
        'sign-swing':[{transform:'rotate(-17deg)',transformOrigin:'top center'},{transform:'rotate(17deg)',transformOrigin:'top center'}],
        pendulum:[{transform:'rotate(38deg)',transformOrigin:'top center'},{transform:'rotate(-38deg)',transformOrigin:'top center'}],
        tumble:[{transform:'translateX(-70px) rotate(0)'},{transform:'translateX(70px) rotate(720deg)'}],
        'cube-transition':[{transform:'rotateY(0)'},{transform:'rotateY(90deg)'},{transform:'rotateY(180deg)'}],
        'depth-motion':[{transform:'perspective(600px) translateZ(-220px) scale(.6)',opacity:.4},{transform:'perspective(600px) translateZ(120px) scale(1.2)',opacity:1}],
      };
      animate(card,target,cfg[d]||cfg.rotate,{duration:3300}); return;
    }

    if (categoryId === 4) {
      const all=$$('.anim-piece',card);
      all.forEach((el,i)=>{
        let frames=[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}];
        let options={duration:2600,delay:i*(d==='stagger'?180:45),direction:'normal'};
        if(d==='crossfade') frames=i%2?[{opacity:1},{opacity:0},{opacity:1}]:[{opacity:0},{opacity:1},{opacity:0}];
        if(d==='blink') {frames=[{opacity:1},{opacity:0},{opacity:1},{opacity:0},{opacity:1}];options.duration=900;}
        if(d==='flicker') {frames=[{opacity:1},{opacity:.15},{opacity:.8},{opacity:.05},{opacity:1},{opacity:.3},{opacity:1}];options.duration=1200;}
        if(d==='ghost') frames=[{opacity:.15,filter:'blur(8px)',transform:'translateX(-25px)'},{opacity:.9,filter:'blur(0)',transform:'translateX(0)'},{opacity:.15,filter:'blur(8px)',transform:'translateX(25px)'}];
        if(d==='afterimage') frames=[{opacity:0,transform:'translateX(-50px)'},{opacity:1,transform:'translateX(35px)'},{opacity:0,transform:'translateX(70px)'}];
        if(d==='visibility-range') frames=[{opacity:0,offset:0},{opacity:0,offset:.2},{opacity:1,offset:.21},{opacity:1,offset:.72},{opacity:0,offset:.73},{opacity:0,offset:1}];
        if(d==='char-reveal') frames=[{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'scale(1)'}];
        if(d==='masked-entrance') frames=[{clipPath:'inset(0 100% 0 0)',opacity:1},{clipPath:'inset(0 0 0 0)',opacity:1}];
        if(d==='layer-dissolve') frames=[{opacity:0,filter:'contrast(3) blur(10px)'},{opacity:1,filter:'contrast(1) blur(0)'},{opacity:0,filter:'contrast(3) blur(10px)'}];
        if(d==='blur-entrance') frames=[{opacity:0,filter:'blur(18px)',transform:'translateY(15px)'},{opacity:1,filter:'blur(0)',transform:'translateY(0)'}];
        if(d==='scale-popup') frames=[{opacity:0,transform:'scale(.15)'},{opacity:1,transform:'scale(1.15)'},{opacity:1,transform:'scale(1)'}];
        animate(card,el,frames,options);
      }); return;
    }

    if (categoryId === 5) {
      const text=$('.text-color-target',card);
      const colors=['#7c5cff','#23d5ab','#ff5d8f','#ffd166'];
      let frames=[{backgroundColor:colors[0]},{backgroundColor:colors[1]},{backgroundColor:colors[2]},{backgroundColor:colors[0]}];
      if(d==='text-color'){target.style.background='#182033';animate(card,text,colors.map(color=>({color})),{duration:3000});return;}
      if(d==='border-color'){target.style.background='rgba(124,92,255,.12)';target.style.border='6px solid #7c5cff';frames=colors.map(borderColor=>({borderColor}));}
      if(d==='svg-fill'||d==='svg-stroke'){frames=colors.map(backgroundColor=>({backgroundColor,boxShadow:`0 0 34px ${backgroundColor}`}));}
      if(d==='shadow-color'){frames=colors.map(boxShadow=>({boxShadow:`0 20px 52px ${boxShadow}99`}));}
      if(d==='light-color'){frames=colors.map(color=>({backgroundColor:color,filter:'brightness(1.5)',boxShadow:`0 0 55px ${color}`}));}
      if(d==='alpha-color'){frames=[{opacity:.15},{opacity:1},{opacity:.35}];}
      if(d==='hue-rotate'){frames=[{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(360deg)'}];}
      if(d.includes('gradient')){target.style.background='linear-gradient(135deg,#7c5cff,#23d5ab,#ff5d8f)';target.style.backgroundSize='250% 250%';frames=[{backgroundPosition:'0% 50%',transform:'rotate(0)'},{backgroundPosition:'100% 50%',transform:d==='gradient-angle'?'rotate(180deg)':'rotate(0)'},{backgroundPosition:'0% 50%',transform:'rotate(360deg)'}];}
      if(d==='theme-switch'){frames=[{backgroundColor:'#f4f6ff',color:'#111',filter:'none'},{backgroundColor:'#111827',color:'#fff',filter:'none'}];}
      if(d==='grayscale-color'){frames=[{filter:'grayscale(1)'},{filter:'grayscale(0) saturate(1.5)'}];}
      if(d==='thermal-color'){frames=[{filter:'hue-rotate(0deg) contrast(1.3) saturate(2)'},{filter:'hue-rotate(260deg) contrast(2) saturate(3)'}];}
      if(d==='brand-color'){frames=[{backgroundColor:'#1428a0'},{backgroundColor:'#34c3ff'},{backgroundColor:'#7c5cff'}];}
      animate(card,target,frames,{duration:3300}); return;
    }

    if (categoryId === 6) {
      let frames=[{borderRadius:'2px'},{borderRadius:'52px'},{borderRadius:'16px'}];
      if(d==='border-width') frames=[{borderWidth:'1px'},{borderWidth:'12px'},{borderWidth:'3px'}];
      if(d==='outline') frames=[{outline:'0 solid rgba(124,92,255,0)',outlineOffset:'0px'},{outline:'8px solid rgba(124,92,255,.45)',outlineOffset:'10px'}];
      if(d==='dash-gap'||d==='marching-ants'){target.style.borderStyle='dashed';frames=[{borderWidth:'3px',transform:'rotate(0)'},{borderWidth:'7px',transform:'rotate(360deg)'}];}
      if(d==='round-corners') frames=[{borderRadius:'0'},{borderRadius:'38px'}];
      if(d==='circle-square') frames=[{borderRadius:'50%',transform:'scale(.85)'},{borderRadius:'0',transform:'scale(1.12)'}];
      if(d==='border-draw'){target.style.borderStyle='dashed';frames=[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}];}
      if(d==='box-shadow') frames=[{boxShadow:'0 0 0 rgba(124,92,255,0)'},{boxShadow:'24px 28px 18px rgba(124,92,255,.55)'},{boxShadow:'-18px 12px 45px rgba(35,213,171,.5)'}];
      if(d==='inner-shadow') frames=[{boxShadow:'inset 0 0 0 rgba(0,0,0,0)'},{boxShadow:'inset 0 0 45px rgba(0,0,0,.85)'}];
      if(d==='neon-border'||d==='glow-border') frames=[{boxShadow:'0 0 6px #7c5cff',borderColor:'#7c5cff'},{boxShadow:'0 0 30px #23d5ab,0 0 60px #23d5ab',borderColor:'#23d5ab'}];
      if(d==='spacing') frames=[{padding:'0',letterSpacing:'0'},{padding:'25px',letterSpacing:'9px'}];
      if(d==='layout-ratio') frames=[{width:'70px',height:'130px'},{width:'180px',height:'65px'}];
      if(d==='reorder') frames=[{transform:'translateX(-55px) rotate(-10deg)'},{transform:'translateX(55px) rotate(10deg)'}];
      animate(card,target,frames,{duration:3000}); return;
    }

    if (categoryId === 7) {
      const cfg={
        'clip-inset':[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 0 100%)'}],
        'clip-circle':[{clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)'}],
        'clip-ellipse':[{clipPath:'ellipse(0% 60% at 50% 50%)'},{clipPath:'ellipse(80% 60% at 50% 50%)'}],
        'clip-polygon':[{clipPath:'polygon(50% 50%,50% 50%,50% 50%,50% 50%)'},{clipPath:'polygon(0 0,100% 10%,88% 100%,12% 85%)'}],
        'reveal-left':[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],
        'reveal-center':[{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0)'}],
        iris:[{clipPath:'circle(0 at 50% 50%)'},{clipPath:'circle(80% at 50% 50%)'}],
        'diagonal-wipe':[{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],
        blinds:[{clipPath:'polygon(0 0,100% 0,100% 8%,0 8%,0 18%,100% 18%,100% 26%,0 26%,0 36%,100% 36%,100% 44%,0 44%,0 54%,100% 54%,100% 62%,0 62%,0 72%,100% 72%,100% 80%,0 80%,0 90%,100% 90%,100% 100%,0 100%)',transform:'scaleY(.05)'},{transform:'scaleY(1)'}],
        zipper:[{clipPath:'polygon(50% 0,50% 0,50% 100%,50% 100%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],
        'text-mask':[{clipPath:'inset(45% 0 45% 0)',transform:'scale(1.5)'},{clipPath:'inset(0)',transform:'scale(1)'}],
        'logo-mask':[{clipPath:'polygon(50% 0,60% 38%,100% 50%,60% 62%,50% 100%,40% 62%,0 50%,40% 38%)',transform:'scale(.1)'},{transform:'scale(1)'}],
        'alpha-mask':[{opacity:0},{opacity:1}],
        'luma-mask':[{filter:'brightness(0)',opacity:0},{filter:'brightness(1.5)',opacity:1}],
        'svg-mask':[{clipPath:'circle(10% at 15% 20%)'},{clipPath:'circle(35% at 80% 70%)'},{clipPath:'circle(80% at 50% 50%)'}],
        'mask-combine':[{clipPath:'polygon(0 0,45% 0,45% 45%,0 45%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],
        'liquid-mask':[{borderRadius:'65% 35% 60% 40% / 35% 65% 38% 62%',transform:'scale(.65) rotate(-8deg)'},{borderRadius:'25% 75% 28% 72% / 68% 28% 72% 32%',transform:'scale(1.12) rotate(10deg)'}],
      };
      animate(card,target,cfg[d]||cfg['clip-circle'],{duration:3300}); return;
    }

    if (categoryId === 8 || categoryId === 17) {
      let frames=[{filter:'none',transform:'scale(1)',opacity:1},{filter:'hue-rotate(180deg) saturate(2)',transform:'scale(1.08)',opacity:1},{filter:'none',transform:'scale(1)',opacity:1}];
      const blur=(n)=>[{filter:'blur(0)'},{filter:`blur(${n}px)`},{filter:'blur(0)'}];
      if(d.includes('blur')) frames=blur(d.includes('zoom')?9:7);
      if(d==='progressive-blur'||d==='radial-blur') frames=[{filter:'blur(0)',clipPath:'inset(0 100% 0 0)'},{filter:'blur(8px)',clipPath:'inset(0)'},{filter:'blur(0)',clipPath:'inset(0 0 0 100%)'}];
      if(d==='brightness') frames=[{filter:'brightness(.3)'},{filter:'brightness(1.8)'}];
      if(d==='contrast') frames=[{filter:'contrast(.3)'},{filter:'contrast(2.5)'}];
      if(d==='saturation') frames=[{filter:'saturate(0)'},{filter:'saturate(3)'}];
      if(d==='grayscale') frames=[{filter:'grayscale(0)'},{filter:'grayscale(1)'}];
      if(d==='invert') frames=[{filter:'invert(0)'},{filter:'invert(1)'}];
      if(d.includes('hue')) frames=[{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(360deg)'}];
      if(d==='tint') frames=[{filter:'sepia(0) hue-rotate(0)'},{filter:'sepia(1) hue-rotate(280deg) saturate(2)'}];
      if(d==='duotone') frames=[{filter:'grayscale(1) sepia(1) hue-rotate(190deg)'},{filter:'grayscale(1) sepia(1) hue-rotate(300deg)'}];
      if(d.includes('thermal')) frames=[{filter:'hue-rotate(0) saturate(3) contrast(2)'},{filter:'hue-rotate(280deg) saturate(4) contrast(2.4)'}];
      if(d==='greenscreen') frames=[{opacity:1,filter:'hue-rotate(0)'},{opacity:.25,filter:'hue-rotate(90deg)'},{opacity:1,filter:'hue-rotate(0)'}];
      if(d==='drop-shadow') frames=[{filter:'drop-shadow(0 0 0 transparent)'},{filter:'drop-shadow(18px 22px 12px rgba(0,0,0,.75))'}];
      if(d==='glow'||d==='bloom') frames=[{filter:'brightness(.8)',boxShadow:'0 0 0 transparent'},{filter:'brightness(1.6) saturate(1.7)',boxShadow:'0 0 42px rgba(124,92,255,.9)'}];
      if(d.includes('trail')) frames=[{transform:'translateX(-35px)',filter:'blur(12px)',opacity:.35},{transform:'translateX(35px)',filter:'blur(0)',opacity:1},{transform:'translateX(65px)',filter:'blur(15px)',opacity:.2}];
      if(d.includes('reveal')||d==='venetian') frames=[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'},{clipPath:'inset(0 0 0 100%)'}];
      if(d==='sepia') frames=[{filter:'sepia(0)'},{filter:'sepia(1)'}];
      if(d.includes('chromatic')||d.includes('rgb')) frames=[{filter:'drop-shadow(-8px 0 #ff0055) drop-shadow(8px 0 #00d9ff)'},{filter:'drop-shadow(8px 0 #ff0055) drop-shadow(-8px 0 #00d9ff)'}];
      if(d==='vhs'||d==='shader-vhs'||d==='shader-crt'||d==='scanline') frames=[{transform:'skewX(0) scale(1)',filter:'contrast(1)'},{transform:'skewX(3deg) scale(1.04)',filter:'contrast(1.6) saturate(.6)'},{transform:'skewX(-2deg) scale(1.02)',filter:'contrast(1.2)'}];
      if(d.includes('grain')||d==='shader-noise') frames=[{filter:'contrast(1)'},{filter:'contrast(1.8) brightness(1.2)'},{filter:'contrast(.8)'}];
      if(d.includes('glitch')) frames=[{transform:'translate(0)',clipPath:'inset(0)'},{transform:'translate(-12px,4px)',clipPath:'inset(15% 0 55% 0)'},{transform:'translate(13px,-3px)',clipPath:'inset(62% 0 8% 0)'},{transform:'translate(0)',clipPath:'inset(0)'}];
      if(d.includes('pixel')||d.includes('mosaic')) frames=[{transform:'scale(1)',filter:'blur(0)'},{transform:'scale(.86)',filter:'blur(5px) contrast(2)'},{transform:'scale(1.12)',filter:'blur(0)'}];
      if(d.includes('poster')) frames=[{filter:'contrast(.7) saturate(.4)'},{filter:'contrast(2.2) saturate(2.8)'}];
      if(d==='sharpen') frames=[{filter:'contrast(.8) blur(1px)'},{filter:'contrast(1.7) saturate(1.5)'}];
      if(d.includes('flare')) frames=[{filter:'brightness(.65)'},{filter:'brightness(2.4) saturate(1.8)'},{filter:'brightness(.8)'}];
      if(d==='vignette') frames=[{boxShadow:'inset 0 0 0 rgba(0,0,0,0)'},{boxShadow:'inset 0 0 75px 25px rgba(0,0,0,.9)'}];
      if(d.includes('fisheye')||d.includes('lens')) frames=[{borderRadius:'4%',transform:'scale(1)'},{borderRadius:'50%',transform:'scale(1.25,1.05)'},{borderRadius:'4%',transform:'scale(.95)'}];
      if(d.includes('heat')||d.includes('liquid')||d.includes('surface')||d.includes('ripple')) frames=[{transform:'skewX(-3deg) scale(1.03)',borderRadius:'18% 42% 25% 36%'},{transform:'skewX(4deg) scale(1.08)',borderRadius:'45% 18% 40% 22%'},{transform:'skewX(-2deg) scale(1.02)',borderRadius:'20%'}];
      if(d.includes('kaleido')) frames=[{transform:'rotate(0) scale(1)'},{transform:'rotate(180deg) scale(1.35)'},{transform:'rotate(360deg) scale(1)'}];
      if(d.includes('halftone')) frames=[{filter:'grayscale(0) contrast(1)'},{filter:'grayscale(1) contrast(3)'}];
      if(d==='emboss'||d.includes('edge')) frames=[{filter:'grayscale(1) contrast(.5)'},{filter:'grayscale(1) contrast(4) invert(1)'}];
      if(d.includes('dissolve')||d.includes('burn')||d.includes('melt')) frames=[{clipPath:'inset(0 0 100% 0)',filter:'brightness(1)'},{clipPath:'inset(0)',filter:'brightness(1.8) saturate(2)'},{clipPath:'inset(100% 0 0 0)',filter:'brightness(.5)'}];
      if(d.includes('sort')) frames=[{transform:'skewY(0)'},{transform:'skewY(18deg) translateX(18px)'},{transform:'skewY(-12deg) translateX(-12px)'}];
      if(d.includes('gradient')||d.includes('plasma')||d.includes('lava')||d.includes('fractal')) {target.style.backgroundSize='300% 300%';frames=[{backgroundPosition:'0% 0%',filter:'hue-rotate(0)'},{backgroundPosition:'100% 100%',filter:'hue-rotate(220deg)'},{backgroundPosition:'0% 0%',filter:'hue-rotate(360deg)'}];}
      if(d.includes('tunnel')||d.includes('infinite-zoom')) frames=[{transform:'scale(.4) rotate(0)',filter:'blur(4px)'},{transform:'scale(2.1) rotate(180deg)',filter:'blur(0)'}];
      animate(card,target,frames,{duration:d.includes('glitch')?900:3400,direction:d.includes('dissolve')?'normal':'alternate',easing:d.includes('poster')?'steps(5,end)':'ease-in-out'}); return;
    }

    if (categoryId === 9) {
      const path=$('.main-path',card); path.style.strokeDasharray='420';path.style.strokeDashoffset='420';
      secondary.style.opacity=d==='object-on-path'||d==='path-light'?'1':'0';
      if(d==='stroke-dasharray'){path.style.strokeDasharray='4 18';animate(card,path,[{strokeDashoffset:0},{strokeDashoffset:-160}],{duration:2200,direction:'normal'});}
      else if(d==='stroke-dashoffset'||d==='line-draw'||d==='path-reveal'||d==='handwriting'||d==='check-draw'||d==='svg-map-route'){animate(card,path,[{strokeDashoffset:420},{strokeDashoffset:0},{strokeDashoffset:-420}],{duration:3400,direction:'normal'});}
      else if(d==='object-on-path'||d==='path-light'){animate(card,secondary,transformPath(VECTOR_ROUTE),{duration:3300});animate(card,path,[{strokeDashoffset:420},{strokeDashoffset:0}],{duration:3300});}
      else if(d.includes('morph')) animate(card,path,[{transform:'scale(1,.45) rotate(-8deg)',transformOrigin:'center'},{transform:'scale(.65,1.15) rotate(10deg)',transformOrigin:'center'}],{duration:3000});
      else if(d.includes('stretch')) animate(card,path,[{transform:'scaleX(.55)'},{transform:'scaleX(1.3)'}],{duration:2800});
      else if(d.includes('warp')) animate(card,path,[{transform:'skewX(-22deg) rotate(-5deg)'},{transform:'skewX(22deg) rotate(5deg)'}],{duration:2600});
      else if(d.includes('trim')) animate(card,path,[{strokeDashoffset:420},{strokeDashoffset:210},{strokeDashoffset:0}],{duration:3000});
      else if(d.includes('reverse')) animate(card,path,[{strokeDashoffset:-420},{strokeDashoffset:0},{strokeDashoffset:420}],{duration:3300,direction:'normal'});
      else if(d==='svg-ring') animate(card,path,[{transform:'rotate(0) scale(.65)'},{transform:'rotate(360deg) scale(1.05)'}],{duration:3000});
      else animate(card,path,[{transform:'scale(.8) rotate(-15deg)'},{transform:'scale(1.15) rotate(15deg)'}],{duration:2900});
      return;
    }

    if (categoryId === 10) {
      const letters=$$('.letters span',card); const clockText=$('.letters',card);
      if(d==='count-number'||d==='rolling-number'){
        const a=animate(card,clockText,[{opacity:1},{opacity:1}],{duration:3200,direction:'normal'});
        customUpdaters.push(()=>{if(!a||a.currentTime==null)return;const p=((a.currentTime%3200)/3200);const n=d==='rolling-number'?Math.round(19900+80100*p):Math.round(1024*p);clockText.textContent=d==='rolling-number'?`${n.toLocaleString()}원`:n.toLocaleString();});return;
      }
      letters.forEach((el,i)=>{
        let frames=[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}];let options={duration:1900,delay:i*75};
        if(d==='typewriter') frames=[{opacity:0},{opacity:1},{opacity:1}];
        if(d==='words-in'||d==='lines-in') {options.delay=Math.floor(i/3)*170;frames=[{opacity:0,transform:'translateX(-15px)'},{opacity:1,transform:'translateX(0)'}];}
        if(d==='decode-text'||d==='scramble') frames=[{opacity:.15,transform:'translateY(-12px) rotate(20deg)',filter:'blur(5px)'},{opacity:1,transform:'translateY(0) rotate(0)',filter:'blur(0)'}];
        if(d==='letter-spacing') {clockText.style.letterSpacing='-.06em';if(i===0)animate(card,clockText,[{letterSpacing:'-.08em'},{letterSpacing:'.35em'}],{duration:3000});return;}
        if(d==='line-height') {if(i===0)animate(card,clockText,[{lineHeight:'.7'},{lineHeight:'2'}],{duration:3000});return;}
        if(d==='font-size') {if(i===0)animate(card,clockText,[{fontSize:'16px'},{fontSize:'45px'}],{duration:3000});return;}
        if(d==='font-weight'||d==='variable-font') {if(i===0)animate(card,clockText,[{fontWeight:200,transform:'scaleX(.8)'},{fontWeight:1000,transform:'scaleX(1.12)'}],{duration:3000});return;}
        if(d==='font-slant') frames=[{transform:'skewX(-25deg)'},{transform:'skewX(25deg)'}];
        if(d==='letter-rotate') frames=[{transform:'rotate(-35deg)'},{transform:'rotate(35deg)'}];
        if(d==='letter-wave') frames=[{transform:'translateY(14px)'},{transform:'translateY(-22px)'},{transform:'translateY(14px)'}];
        if(d==='letter-bounce') frames=[{transform:'translateY(0)'},{transform:'translateY(-30px)'},{transform:'translateY(7px)'},{transform:'translateY(0)'}];
        if(d==='letter-color') frames=[{color:'#7c5cff'},{color:'#23d5ab'},{color:'#ff5d8f'},{color:'#ffd166'}];
        if(d==='karaoke'||d==='active-word') frames=[{color:'#fff',textShadow:'none'},{color:'#ffd166',textShadow:'0 0 18px #ffd166'},{color:'#fff',textShadow:'none'}];
        if(d==='underline-draw'||d==='marker-highlight'||d==='word-outline') {clockText.style.padding='8px';if(i===0)animate(card,clockText,[{textDecorationColor:'transparent',boxShadow:'inset 0 -0em rgba(255,209,102,0)'},{textDecorationColor:'#23d5ab',boxShadow:'inset 0 -.55em rgba(255,209,102,.55)'}],{duration:2600});return;}
        if(d==='text-fill-media') frames=[{color:'#7c5cff',filter:'hue-rotate(0)'},{color:'#23d5ab',filter:'hue-rotate(260deg)'}];
        if(d==='text-particles') frames=[{opacity:1,transform:'translate(0) rotate(0)'},{opacity:0,transform:`translate(${(seeded(i,1)-.5)*130}px,${(seeded(i,2)-.5)*100}px) rotate(${seeded(i,3)*360}deg)`}];
        if(d==='text-melt') frames=[{transform:'scaleY(1) translateY(0)',filter:'blur(0)'},{transform:'scaleY(1.8) translateY(25px)',filter:'blur(3px)',opacity:.35}];
        if(d==='text-3d') frames=[{transform:'perspective(500px) rotateY(-70deg)'},{transform:'perspective(500px) rotateY(70deg)'}];
        if(d==='caption-pop') frames=[{opacity:0,transform:'translateY(25px) scale(.6)'},{opacity:1,transform:'translateY(-8px) scale(1.18)'},{opacity:1,transform:'translateY(0) scale(1)'}];
        animate(card,el,frames,options);
      });return;
    }

    if (categoryId === 11) {
      const pop=$('.anim-pop',card);pop.style.right='12px';pop.style.bottom='12px';pop.style.opacity='0';
      const showCursor=d==='ui-cursor'||d==='ui-button'||d==='ui-drag';secondary.style.opacity=showCursor?'1':'0';
      let targetFrames=[{transform:'scale(.8)',opacity:.4},{transform:'scale(1)',opacity:1}];
      let cursorFrames=[{transform:'translate(0,0)'},{transform:'translate(125px,65px)'},{transform:'translate(75px,82px)'}];
      if(d==='ui-button') targetFrames=[{transform:'translateY(0) scale(1)'},{transform:'translateY(4px) scale(.93)'},{transform:'translateY(0) scale(1)'}];
      if(d==='ui-toggle'){target.style.width='68px';target.style.borderRadius='99px';targetFrames=[{background:'#303648'},{background:'#23d5ab'}];}
      if(d==='ui-checkbox'){target.style.width='32px';target.style.height='32px';targetFrames=[{clipPath:'inset(0)',transform:'rotate(0)'},{clipPath:'polygon(14% 52%,36% 75%,86% 18%,100% 31%,37% 100%,0 63%)',transform:'rotate(360deg)'}];}
      if(d==='ui-dropdown'||d==='ui-menu') targetFrames=[{height:'10px',opacity:.35},{height:'95px',opacity:1}];
      if(d==='ui-modal') {target.style.position='absolute';target.style.inset='20px';targetFrames=[{transform:'scale(.4)',opacity:0},{transform:'scale(1.05)',opacity:1},{transform:'scale(1)',opacity:1}];}
      if(d==='ui-tooltip'||d==='ui-toast'||d==='ui-chat'){animate(card,pop,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:2300});}
      if(d==='ui-tabs') targetFrames=[{transform:'translateX(-45px)',width:'48px'},{transform:'translateX(45px)',width:'70px'}];
      if(d.includes('scroll')) targetFrames=[{transform:'translateY(0)'},{transform:'translateY(-85px)'}];
      if(d==='ui-spinner') {target.style.width='55px';target.style.height='55px';target.style.borderRadius='50%';target.style.background='transparent';target.style.border='7px solid rgba(255,255,255,.15)';target.style.borderTopColor='#23d5ab';targetFrames=[{transform:'rotate(0)'},{transform:'rotate(360deg)'}];}
      if(d==='ui-skeleton') targetFrames=[{filter:'brightness(.5)',backgroundPosition:'-100% 0'},{filter:'brightness(1.4)',backgroundPosition:'100% 0'}];
      if(d==='ui-progress') {target.style.height='16px';targetFrames=[{width:'5%'},{width:'100%'}];}
      if(d==='ui-slider') {target.style.height='9px';targetFrames=[{transform:'translateX(-45px)'},{transform:'translateX(45px)'}];}
      if(d==='ui-ripple') targetFrames=[{borderRadius:'50%',transform:'scale(.1)',opacity:1},{borderRadius:'50%',transform:'scale(2.8)',opacity:0}];
      if(d==='ui-screen'||d==='ui-swipe') targetFrames=[{transform:'translateX(-120%)'},{transform:'translateX(0)'},{transform:'translateX(120%)'}];
      if(d==='ui-sort'||d==='ui-drag') targetFrames=[{transform:'translate(-40px,-15px) rotate(-5deg)'},{transform:'translate(45px,20px) rotate(6deg)'}];
      if(d==='ui-device'){target.style.borderRadius='18px';targetFrames=[{transform:'perspective(500px) rotateY(-28deg)'},{transform:'perspective(500px) rotateY(28deg)'}];}
      animate(card,target,targetFrames,{duration:d==='ui-spinner'?1500:2800});if(showCursor)animate(card,secondary,cursorFrames,{duration:3000});return;
    }

    if (categoryId === 12) {
      const bars=$$('.bars i',card),line=$('.anim-target',card),dots=$$('.anim-dot',card);if(line){line.style.strokeDasharray='520';line.style.strokeDashoffset='520';}
      if(d.includes('bar')) bars.forEach((b,i)=>animate(card,b,[{transform:'scaleY(.04)',opacity:.2},{transform:'scaleY(1)',opacity:1}],{duration:2200,delay:i*110}));
      else if(d.includes('line')||d.includes('stock')||d.includes('area')) animate(card,line,[{strokeDashoffset:520},{strokeDashoffset:0}],{duration:3200,direction:'normal'});
      else if(d.includes('pie')||d.includes('ring')||d.includes('gauge')) {line.style.strokeDasharray=d.includes('pie')?'70 18 92 18':d.includes('gauge')?'210 302':'302';animate(card,line,[{strokeDashoffset:302,transform:'rotate(-120deg) scale(.82)',transformOrigin:'center'},{strokeDashoffset:0,transform:'rotate(240deg) scale(1)',transformOrigin:'center'}],{duration:3000});}
      else if(d.includes('counter')) {const a=animate(card,line,[{opacity:1},{opacity:1}],{duration:3000,direction:'normal'});const stage=$('.chart-scene',card);const num=document.createElement('strong');num.style.cssText='position:absolute;inset:0;display:grid;place-items:center;font-size:35px;z-index:6';stage.appendChild(num);customUpdaters.push(()=>{if(a.currentTime==null)return;num.textContent=Math.round(((a.currentTime%3000)/3000)*9840).toLocaleString();});}
      else if(d.includes('scatter')||d.includes('point')||d.includes('network')||d.includes('encoded')) dots.forEach((dot,i)=>animate(card,dot,[{opacity:0,transform:'scale(.1)'},{opacity:1,transform:'scale(1.7)'},{opacity:.65,transform:'scale(1)'}],{duration:1800,delay:i*95}));
      else if(d.includes('ranking')) bars.forEach((b,i)=>animate(card,b,[{transform:`translateX(${(i%2?-1:1)*35}px) scaleY(.55)`},{transform:`translateX(${(i%2?1:-1)*20}px) scaleY(1)`}],{duration:2800,delay:i*70}));
      else if(d.includes('axis')) animate(card,$('.chart-scene',card),[{clipPath:'inset(100% 100% 0 0)'},{clipPath:'inset(0)'}],{duration:2600});
      else if(d.includes('heatmap')) bars.forEach((b,i)=>animate(card,b,[{filter:'hue-rotate(0)',opacity:.3},{filter:`hue-rotate(${i*55}deg)`,opacity:1}],{duration:2400,delay:i*60}));
      else if(d.includes('timeline')||d.includes('sankey')) animate(card,line,[{strokeDashoffset:520},{strokeDashoffset:0}],{duration:3300});
      else animate(card,line,[{transform:'scale(.7)'},{transform:'scale(1.1)'}],{duration:2600});return;
    }

    if (categoryId === 13) {
      const b=target,a=$('.anim-primary',card); let frames=[{opacity:0},{opacity:1},{opacity:0}];
      if(d.includes('slide')) frames=[{transform:'translateX(100%)'},{transform:'translateX(0)'},{transform:'translateX(-100%)'}];
      if(d.includes('wipe')&&!d.includes('clock')) frames=[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'},{clipPath:'inset(0 0 0 100%)'}];
      if(d.includes('flip')||d.includes('book')) frames=[{transform:'rotateY(-180deg)',transformOrigin:'left'},{transform:'rotateY(0)',transformOrigin:'left'}];
      if(d.includes('clock')) frames=[{clipPath:'polygon(50% 50%,50% 0,50% 0,50% 0)'},{clipPath:'polygon(50% 50%,50% 0,100% 0,100% 100%,0 100%,0 0,50% 0)'}];
      if(d.includes('iris')) frames=[{clipPath:'circle(0 at 50% 50%)'},{clipPath:'circle(80% at 50% 50%)'}];
      if(d.includes('zoom')) frames=[{opacity:0,transform:'scale(.35)',filter:'blur(16px)'},{opacity:1,transform:'scale(1)',filter:'blur(0)'},{opacity:0,transform:'scale(1.7)',filter:'blur(14px)'}];
      if(d.includes('film-burn')||d.includes('light-leak')||d.includes('flash')) frames=[{opacity:0,filter:'brightness(1)'},{opacity:1,filter:'brightness(3) saturate(2)'},{opacity:0,filter:'brightness(1)'}];
      if(d.includes('blur')) frames=[{opacity:0,filter:'blur(25px)',transform:'translateX(45px)'},{opacity:1,filter:'blur(0)',transform:'translateX(0)'}];
      if(d.includes('dissolve')||d.includes('particle')||d.includes('dust')) frames=[{opacity:0,filter:'contrast(3) blur(10px)'},{opacity:1,filter:'contrast(1) blur(0)'},{opacity:0,filter:'contrast(3) blur(10px)'}];
      if(d.includes('ripple')||d.includes('warp')) frames=[{borderRadius:'50%',transform:'scale(.05) skewX(-18deg)'},{borderRadius:'0',transform:'scale(1) skewX(0)'}];
      if(d.includes('swap')) {frames=[{transform:'translateX(100%) scale(.7)'},{transform:'translateX(0) scale(1)'},{transform:'translateX(-100%) scale(.7)'}];animate(card,a,[{transform:'translateX(0)'},{transform:'translateX(-100%)'}],{duration:3200});}
      if(d.includes('cube')) frames=[{transform:'rotateY(-90deg) translateZ(100px)',transformOrigin:'left'},{transform:'rotateY(0) translateZ(0)',transformOrigin:'left'}];
      if(d.includes('none')) frames=[{opacity:0,offset:0},{opacity:0,offset:.49},{opacity:1,offset:.5},{opacity:1,offset:1}];
      if(d.includes('custom')) frames=[{clipPath:'polygon(0 0,0 0,0 100%,0 100%)',filter:'hue-rotate(0)'},{clipPath:'polygon(0 0,100% 14%,100% 86%,0 100%)',filter:'hue-rotate(180deg)'},{clipPath:'polygon(100% 0,100% 0,100% 100%,100% 100%)',filter:'hue-rotate(360deg)'}];
      if(d.includes('audio')) frames=[{transform:'scale(.7)',opacity:0},{transform:'scale(1.12)',opacity:1},{transform:'scale(1)',opacity:1},{transform:'scale(1.18)',opacity:.7}];
      animate(card,b,frames,{duration:3500,direction:'normal'});return;
    }

    if (categoryId === 14) {
      let frames=[{transform:'translate3d(0,0,0)'},{transform:'translate3d(0,0,0)'}];
      if(d==='camera-pan') frames=[{transform:'translateX(-45px)'},{transform:'translateX(45px)'}];
      if(d==='camera-tilt') frames=[{transform:'translateY(-35px)'},{transform:'translateY(35px)'}];
      if(d==='camera-roll') frames=[{transform:'rotate(-18deg) scale(1.15)'},{transform:'rotate(18deg) scale(1.15)'}];
      if(d==='camera-zoom'||d==='ken-burns') frames=[{transform:'scale(1) translate(-8px,6px)'},{transform:'scale(1.35) translate(14px,-8px)'}];
      if(d==='camera-dolly') frames=[{transform:'translateZ(-220px) scale(.65)'},{transform:'translateZ(120px) scale(1.22)'}];
      if(d==='camera-orbit') frames=[{transform:'rotateY(-28deg) rotateX(8deg)'},{transform:'rotateY(28deg) rotateX(-8deg)'}];
      if(d==='camera-impact') frames=[{transform:'translate(0)'},{transform:'translate(-10px,5px)'},{transform:'translate(9px,-4px)'},{transform:'translate(0)'}];
      if(d==='camera-handheld') frames=[{transform:'translate(-4px,3px) rotate(-1deg)'},{transform:'translate(5px,-2px) rotate(1.4deg)'},{transform:'translate(-2px,-4px) rotate(.4deg)'}];
      if(d==='parallax'||d==='layer-speed'||d==='depth-layers') frames=[{transform:'perspective(700px) rotateY(-10deg) translateX(-12px)'},{transform:'perspective(700px) rotateY(10deg) translateX(12px)'}];
      if(d==='depth-blur') frames=[{filter:'blur(7px)',transform:'scale(.9)'},{filter:'blur(0)',transform:'scale(1.08)'},{filter:'blur(6px)',transform:'scale(.95)'}];
      if(d==='rack-focus') frames=[{filter:'blur(8px)'},{filter:'blur(0)'},{filter:'blur(5px)'}];
      if(d==='perspective-zoom') frames=[{transform:'perspective(300px) rotateX(24deg) scale(.7)'},{transform:'perspective(900px) rotateX(0) scale(1.25)'}];
      if(d==='infinite-zoom') frames=[{transform:'scale(.35)'},{transform:'scale(2.6)'}];
      if(d==='photo-3d') frames=[{transform:'perspective(700px) rotateX(-12deg) rotateY(-18deg)'},{transform:'perspective(700px) rotateX(12deg) rotateY(18deg)'}];
      if(d==='device-enter') frames=[{transform:'perspective(700px) scale(.2) translateZ(-300px)'},{transform:'perspective(700px) scale(2.4) translateZ(150px)'}];
      animate(card,target,frames,{duration:d.includes('impact')?700:4300});return;
    }

    if (categoryId === 15) {
      secondary.style.opacity=d.includes('light')?'1':'0';
      let frames=[{transform:'rotateX(0) rotateY(0)'},{transform:'rotateX(360deg) rotateY(540deg)'}];
      if(d==='three-transform') frames=[{transform:'translate3d(-45px,-15px,-50px) rotateY(0) scale(.7)'},{transform:'translate3d(45px,15px,80px) rotateY(420deg) scale(1.15)'}];
      if(d.includes('camera')) frames=[{transform:'perspective(350px) rotateY(-35deg) scale(.65)'},{transform:'perspective(1000px) rotateY(35deg) scale(1.15)'}];
      if(d.includes('light')) {animate(card,secondary,transformPath([[-70,-50],[65,-35],[70,45],[-60,45],[-70,-50]]),{duration:3000});frames=[{filter:'brightness(.5)'},{filter:'brightness(1.7) hue-rotate(120deg)'}];}
      if(d.includes('shadow')) frames=[{filter:'drop-shadow(-25px 25px 8px rgba(0,0,0,.75))'},{filter:'drop-shadow(25px 12px 20px rgba(0,0,0,.35))'}];
      if(d.includes('material')||d.includes('texture')) frames=[{filter:'hue-rotate(0) saturate(.5)',opacity:.65},{filter:'hue-rotate(260deg) saturate(2)',opacity:1}];
      if(d.includes('text')) frames=[{transform:'rotateY(-80deg) scale(.8)'},{transform:'rotateY(80deg) scale(1.15)'}];
      if(d.includes('explode')) frames=[{transform:'scale(.25) rotate(0)',filter:'blur(8px)'},{transform:'scale(1.25) rotate(280deg)',filter:'blur(0)'}];
      if(d.includes('morph')) frames=[{transform:'scale3d(.5,1.5,.7) rotateY(0)'},{transform:'scale3d(1.5,.55,1.2) rotateY(180deg)'}];
      if(d.includes('skeleton')) frames=[{transform:'rotateZ(-18deg) rotateX(20deg)'},{transform:'rotateZ(18deg) rotateX(-20deg)'}];
      if(d.includes('product')) frames=[{transform:'rotateY(0)'},{transform:'rotateY(360deg)'}];
      if(d.includes('particles')||d.includes('instancing')) frames=[{transform:'scale(.55) rotate(0)',opacity:.45},{transform:'scale(1.22) rotate(360deg)',opacity:1}];
      if(d.includes('refraction')) frames=[{filter:'blur(0) hue-rotate(0)',transform:'scale(1)'},{filter:'blur(3px) hue-rotate(180deg)',transform:'scale(1.18)'}];
      if(d.includes('dof')) frames=[{filter:'blur(8px)',transform:'translateZ(-100px)'},{filter:'blur(0)',transform:'translateZ(80px)'}];
      if(d.includes('transition')) frames=[{transform:'rotateY(-90deg) translateX(-80px)'},{transform:'rotateY(0) translateX(0)'},{transform:'rotateY(90deg) translateX(80px)'}];
      animate(card,target,frames,{duration:3900});return;
    }

    if (categoryId === 16) {
      const parts=$$('.particle',card);parts.forEach((p,i)=>{
        const r=seeded(i,index+2),x=(seeded(i,3)-.5)*180,y=(seeded(i,4)-.5)*150;let frames=[{transform:'translate(0,0) scale(.4)',opacity:0},{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1},{transform:`translate(${x*1.4}px,${y*1.4}px) scale(.2)`,opacity:0}];
        if(d.includes('snow')) frames=[{transform:'translate(0,-100px) rotate(0)',opacity:.1},{transform:`translate(${x*.25}px,130px) rotate(360deg)`,opacity:1}];
        if(d.includes('rain')) {p.style.borderRadius='2px';p.style.height='18px';p.style.width='2px';frames=[{transform:'translateY(-140px) rotate(12deg)'},{transform:'translateY(150px) rotate(12deg)'}];}
        if(d.includes('dust')||d.includes('fog')||d.includes('cloud')||d.includes('smoke')) {p.style.filter='blur(5px)';frames=[{transform:'translate(-40px,25px) scale(.4)',opacity:.05},{transform:`translate(${x*.5}px,${-50-r*55}px) scale(2.2)`,opacity:.42},{transform:'translate(45px,-75px) scale(3)',opacity:0}];}
        if(d.includes('spark')||d.includes('fire')||d.includes('explosion')) frames=[{transform:'translate(0,60px) scale(.2)',opacity:0},{transform:`translate(${x*.45}px,${-40-r*75}px) scale(1.4)`,opacity:1},{transform:`translate(${x*.75}px,${-100-r*50}px) scale(.1)`,opacity:0}];
        if(d.includes('star')||d.includes('glitter')||d.includes('light')) frames=[{transform:'scale(.1) rotate(0)',opacity:.1},{transform:'scale(1.8) rotate(180deg)',opacity:1},{transform:'scale(.1) rotate(360deg)',opacity:.1}];
        if(d.includes('bubble')) frames=[{transform:'translateY(120px) scale(.4)',opacity:.2},{transform:`translate(${x*.25}px,-130px) scale(1.5)`,opacity:.8}];
        if(d.includes('pollen')) frames=[{transform:'translate(-80px,40px) rotate(0)'},{transform:`translate(${80+r*40}px,${-35+r*80}px) rotate(540deg)`}];
        if(d.includes('liquid')||d.includes('wave')) frames=[{transform:`translate(${x*.2}px,20px) scale(.6)`},{transform:`translate(${x*.35}px,-20px) scale(1.4)`}];
        if(d.includes('flow')||d.includes('noise')) frames=[{transform:`translate(${Math.sin(i)*45}px,${Math.cos(i)*35}px)`},{transform:`translate(${Math.cos(i)*70}px,${Math.sin(i)*55}px)`}];
        if(d.includes('form')) frames=[{transform:`translate(${x}px,${y}px)`,opacity:.2},{transform:`translate(${(i%9-4)*13}px,${(Math.floor(i/9)-2)*18}px)`,opacity:1}];
        if(d.includes('scatter')) frames=[{transform:'translate(0,0)',opacity:1},{transform:`translate(${x}px,${y}px)`,opacity:0}];
        if(d.includes('trail')) frames=[{transform:'translateX(-120px)',opacity:0},{transform:'translateX(120px)',opacity:1},{transform:'translateX(170px)',opacity:0}];
        if(d.includes('leak')) {p.style.width='70px';p.style.height='70px';p.style.filter='blur(18px)';frames=[{transform:'translate(-100px,-80px) scale(.5)',opacity:0},{transform:'translate(70px,40px) scale(1.5)',opacity:.6},{transform:'translate(130px,90px) scale(.7)',opacity:0}];}
        animate(card,p,frames,{duration:2200+seeded(i,5)*2200,delay:seeded(i,6)*900,direction:d.includes('rain')||d.includes('snow')?'normal':'alternate',easing:'linear'});
      });return;
    }

    if (categoryId === 18) {
      const progress=$('.anim-progress',card);secondary.style.cssText='width:72px;height:48px;right:10px;top:10px;opacity:0';
      let frames=[{transform:'scale(1) translate(0,0)'},{transform:'scale(1.32) translate(10px,-8px)'}];
      if(d==='media-crop') frames=[{clipPath:'inset(0)'},{clipPath:'inset(18% 25% 14% 20%)'}];
      if(d==='media-pan-scan') frames=[{transform:'scale(1.2) translate(-18px,8px)'},{transform:'scale(1.2) translate(18px,-8px)'}];
      if(d==='media-zoom') frames=[{transform:'scale(.8)'},{transform:'scale(1.45)'}];
      if(d==='media-trim'||d==='media-scrub') frames=[{filter:'hue-rotate(0)'},{filter:'hue-rotate(130deg)'},{filter:'hue-rotate(260deg)'}];
      if(d==='media-speed') frames=[{transform:'translateX(-10px)'},{transform:'translateX(10px)'}];
      if(d==='media-freeze') frames=[{transform:'scale(1)',filter:'grayscale(0)'},{transform:'scale(1)',filter:'grayscale(1)'},{transform:'scale(1)',filter:'grayscale(1)'},{transform:'scale(1.25)',filter:'grayscale(0)'}];
      if(d==='media-loop') frames=[{transform:'rotate(0) scale(1)'},{transform:'rotate(360deg) scale(1.2)'}];
      if(d==='media-mask') frames=[{clipPath:'circle(10% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)'}];
      if(d==='media-filter') frames=[{filter:'none'},{filter:'grayscale(1) contrast(2) hue-rotate(180deg)'}];
      if(d==='media-pip') {secondary.style.display='block';secondary.style.opacity='1';animate(card,secondary,[{transform:'translate(90px,70px) scale(.35)'},{transform:'translate(0,0) scale(1)'}],{duration:3000});}
      if(d==='media-split'||d==='media-multi') {secondary.style.display='block';secondary.style.opacity='1';secondary.style.inset='0 50% 0 0';secondary.style.width='auto';secondary.style.height='auto';animate(card,secondary,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],{duration:2800});}
      if(d.includes('sequence')||d.includes('gif')||d.includes('animated')) frames=[{filter:'hue-rotate(0)',transform:'translateX(-8px)'},{filter:'hue-rotate(120deg)',transform:'translateX(8px)'},{filter:'hue-rotate(240deg)',transform:'translateX(-8px)'}];
      if(d.includes('lottie')||d.includes('rive')||d.includes('skia')||d.includes('emoji')) frames=[{transform:'scale(.5) rotate(-25deg)'},{transform:'scale(1.25) rotate(25deg)'},{transform:'scale(.85) rotate(0)'}];
      animate(card,target,frames,{duration:d==='media-speed'?1200:3900});animate(card,progress,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:3900,direction:'normal',easing:'linear'});return;
    }

    if (categoryId === 19) {
      const bars=pieces;bars.forEach((b,i)=>animate(card,b,[{transform:'scaleY(.15)',filter:'hue-rotate(0)'},{transform:`scaleY(${.35+seeded(i,5)*1.4})`,filter:`hue-rotate(${i*8}deg)`},{transform:'scaleY(.25)'}],{duration:650+seeded(i,2)*850,delay:i*25}));
      secondary.style.opacity=d.includes('lip')||d.includes('mouth')?'1':'0';
      if(secondary.style.opacity==='1') animate(card,secondary,[{transform:'scaleY(.15) scaleX(1)'},{transform:'scaleY(1.2) scaleX(.7)'},{transform:'scaleY(.3) scaleX(1.15)'}],{duration:850});
      if(d.includes('beat-scale')) animate(card,$('.audio-stage',card),[{transform:'scale(.85)'},{transform:'scale(1.15)'},{transform:'scale(.9)'}],{duration:750});
      if(d.includes('shake')||d.includes('punch')) animate(card,$('.audio-stage',card),[{transform:'translate(0) scale(1)'},{transform:'translate(-8px,3px) scale(1.12)'},{transform:'translate(8px,-3px) scale(1)'},{transform:'translate(0)'}],{duration:650});
      if(d.includes('color')||d.includes('glow')) animate(card,$('.audio-stage',card),[{filter:'hue-rotate(0) drop-shadow(0 0 0 transparent)'},{filter:'hue-rotate(260deg) drop-shadow(0 0 20px #7c5cff)'}],{duration:1200});
      if(d.includes('caption')||d.includes('speaker')) bars.forEach((b,i)=>b.style.opacity=i<12?'1':'.2');
      if(d.includes('cut')) animate(card,$('.audio-stage',card),[{clipPath:'inset(0)'},{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0)'}],{duration:900,easing:'steps(2,end)'});
      if(d.includes('silence')) animate(card,$('.audio-stage',card),[{transform:'scaleY(1)'},{transform:'scaleY(.12)'},{transform:'scaleY(.12)'},{transform:'scaleY(1)'}],{duration:3000});return;
    }

    if (categoryId === 20) {
      const pieceDemo=['collision','follow','flocking','boids','attraction','magnetic','cloth','wave','sine'].some(key=>d.includes(key));
      const hideTarget=['collision','flocking','boids','cloth','wave','sine','pendulum','rope','chain'].some(key=>d.includes(key));
      pieces.forEach(piece=>piece.style.opacity=pieceDemo?'1':'0');
      target.style.opacity=hideTarget?'0':'1';
      let frames=[{transform:'translate(15px,15px)'},{transform:'translate(175px,95px)'}]; secondary.style.opacity='0';
      if(d.includes('spring')) frames=[{transform:'translateX(0)'},{transform:'translateX(190px)'},{transform:'translateX(148px)'},{transform:'translateX(180px)'},{transform:'translateX(168px)'}];
      if(d.includes('damped')) frames=[{transform:'translateX(0)'},{transform:'translateX(190px)'},{transform:'translateX(135px)'},{transform:'translateX(178px)'},{transform:'translateX(164px)'},{transform:'translateX(170px)'}];
      if(d.includes('bounce')) frames=[{transform:'translate(0,0)'},{transform:'translate(45px,105px)'},{transform:'translate(90px,30px)'},{transform:'translate(135px,105px)'},{transform:'translate(180px,70px)'}];
      if(d.includes('overshoot')) frames=[{transform:'translateX(0)'},{transform:'translateX(205px)'},{transform:'translateX(170px)'}];
      if(d.includes('elastic')) frames=[{transform:'scale(.5)'},{transform:'scale(1.6,.7)'},{transform:'scale(.8,1.3)'},{transform:'scale(1)'}];
      if(d.includes('gravity')) frames=[{transform:'translate(90px,-15px)'},{transform:'translate(90px,108px)'}];
      if(d.includes('friction')||d.includes('inertia')) frames=[{transform:'translateX(0)'},{transform:'translateX(110px)'},{transform:'translateX(158px)'},{transform:'translateX(176px)'},{transform:'translateX(181px)'}];
      if(d.includes('pendulum')||d.includes('rope')||d.includes('chain')) {secondary.style.opacity='1';animate(card,secondary,[{transform:'rotate(38deg)'},{transform:'rotate(-38deg)'}],{duration:2200});frames=[{opacity:0},{opacity:0}];}
      if(d.includes('collision')) {pieces.forEach((p,i)=>animate(card,p,[{transform:`translateX(${i<3?0:120}px)`},{transform:`translateX(${i<3?90:30}px)`},{transform:`translateX(${i<3?20:105}px)`}],{duration:1900,delay:i*35}));frames=[{opacity:0},{opacity:0}];}
      if(d.includes('orbit')) frames=transformPath(PHYSICS_PATHS.orbit);
      if(d.includes('follow')) {pieces.slice(0,5).forEach((p,i)=>animate(card,p,transformPath([[0,0],[150,15],[90,90],[10,45],[0,0]]),{duration:3300,delay:i*90}));}
      if(d.includes('flocking')||d.includes('boids')) {pieces.forEach((p,i)=>animate(card,p,[{transform:`translate(${(i-3)*10}px,0)`},{transform:`translate(${60-i*8}px,${(i%2?1:-1)*35}px)`},{transform:`translate(${(i-3)*10}px,0)`}],{duration:2800,delay:i*70}));}
      if(d.includes('attraction')||d.includes('magnetic')) {pieces.forEach((p,i)=>animate(card,p,[{transform:`translate(${(i-3)*26}px,${(i%2?1:-1)*25}px)`},{transform:'translate(70px,-15px)'},{transform:`translate(${(i-3)*26}px,${(i%2?1:-1)*25}px)`}],{duration:2600,delay:i*45}));}
      if(d.includes('cloth')) pieces.forEach((p,i)=>animate(card,p,[{transform:`translateY(${Math.sin(i)*15}px)`},{transform:`translateY(${Math.cos(i)*30}px)`}],{duration:1800,delay:i*90}));
      if(d.includes('wave')||d.includes('sine')) pieces.forEach((p,i)=>animate(card,p,[{transform:'translateY(-30px)'},{transform:'translateY(30px)'}],{duration:1500,delay:i*120}));
      if(d.includes('lissajous')) frames=transformPath(PHYSICS_PATHS.lissajous);
      if(d.includes('noise')) frames=transformPath(PHYSICS_PATHS.noise);
      animate(card,target,frames,{duration:3000,easing:d.includes('gravity')?'cubic-bezier(.45,0,1,1)':'ease-in-out'});return;
    }

    if (categoryId === 21) {
      const ref=secondary,step=pieces[0]; const end=188;
      let easing='linear',duration=2800,direction='alternate',frames=[{transform:'translateX(0)'},{transform:`translateX(${end}px)`}];
      if(d.includes('ease-in')&&!d.includes('out'))easing='cubic-bezier(.55,.05,.8,.5)';
      if(d.includes('ease-out')&&!d.includes('in-out'))easing='cubic-bezier(.16,.84,.44,1)';
      if(d.includes('ease-in-out'))easing='cubic-bezier(.65,0,.35,1)';
      if(d.includes('bezier'))easing='cubic-bezier(.2,.9,.2,1.35)';
      if(d.includes('spring')||d.includes('overshoot'))frames=[{transform:'translateX(0)'},{transform:`translateX(${end+18}px)`},{transform:`translateX(${end-10}px)`},{transform:`translateX(${end}px)`}];
      if(d.includes('bounce'))frames=[{transform:'translate(0,0)'},{transform:`translate(${end*.45}px,-18px)`},{transform:`translate(${end*.7}px,0)`},{transform:`translate(${end*.86}px,-8px)`},{transform:`translate(${end}px,0)`}];
      if(d.includes('elastic'))frames=[{transform:'translateX(0)'},{transform:`translateX(${end+28}px)`},{transform:`translateX(${end-24}px)`},{transform:`translateX(${end+12}px)`},{transform:`translateX(${end}px)`}];
      if(d.includes('delay'))animate(card,target,frames,{duration,delay:900,easing});
      else if(d.includes('stagger')) {$$('.timing-dot',card).forEach((e,i)=>animate(card,e,frames,{duration,delay:i*420,easing}));return;}
      else if(d.includes('sequence')) {$$('.timing-dot',card).forEach((e,i)=>animate(card,e,frames,{duration:1400,delay:i*1400,easing}));return;}
      else if(d.includes('parallel')) {$$('.timing-dot',card).forEach(e=>animate(card,e,frames,{duration,easing}));return;}
      else if(d.includes('loop'))direction='normal';
      else if(d.includes('pingpong'))direction='alternate';
      else if(d.includes('hold'))frames=[{transform:'translateX(0)',offset:0},{transform:`translateX(${end}px)`,offset:.35},{transform:`translateX(${end}px)`,offset:.8},{transform:'translateX(0)',offset:1}];
      else if(d.includes('steps')||d.includes('posterize'))easing='steps(6,end)';
      else if(d.includes('random-delay')) {$$('.timing-dot',card).forEach((e,i)=>animate(card,e,frames,{duration,delay:seeded(i,index)*1200,easing}));return;}
      else if(d.includes('ramp')||d.includes('fast-slow'))frames=[{transform:'translateX(0)',offset:0},{transform:`translateX(${end*.7}px)`,offset:.22},{transform:`translateX(${end}px)`,offset:1}];
      else if(d.includes('multi-ease'))frames=[{transform:'translateX(0)',offset:0,easing:'ease-in'},{transform:`translateX(${end*.5}px)`,offset:.5,easing:'cubic-bezier(.2,.9,.2,1.3)'},{transform:`translateX(${end}px)`,offset:1}];
      animate(card,target,frames,{duration,easing,direction});animate(card,ref,[{transform:'translateX(0)'},{transform:`translateX(${end}px)`}],{duration,easing:'linear'});animate(card,step,[{transform:'translateX(0)'},{transform:`translateX(${end}px)`}],{duration,easing:'steps(6,end)'});return;
    }
  }

  function render() {
    document.title = `${category.title} · Remotion Animation Action Lab`;
    $('#categoryNumber').textContent=`CATEGORY ${formatNo(category.id)} · ${category.english}`;
    $('#categoryTitle').textContent=category.title;
    $('#categoryDescription').textContent=category.description;
    $('#itemCount').textContent=category.items.length;
    $('#heroTags').innerHTML=category.keywords.map(k=>`<span>${k}</span>`).join('');
    const grid=$('#detailGrid'); grid.innerHTML=''; cardAnimations.clear();customUpdaters.length=0;
    category.items.forEach((item,index)=>{
      const card=document.createElement('article');card.className='detail-card';card.dataset.category=String(category.id);card.dataset.demo=item.demo;card.dataset.search=`${item.name} ${item.description} ${item.demo}`.toLowerCase();
      const tags=implementationTags(category.id,item.demo);
      card.innerHTML=`<header class="detail-head"><span class="item-no">${formatNo(index+1)}</span><div><h2>${item.name}</h2><small>${item.demo}</small></div></header><div class="demo-stage" data-demo="${item.demo}">${sceneHTML(category.id,item,index)}</div><div class="detail-body"><p>${item.description}</p><div class="implementation">${tags.map(t=>`<span>${t}</span>`).join('')}</div></div><footer class="detail-foot"><code>${remotionHint(category.id,item.demo)}</code><button class="replay">↻ 다시 보기</button></footer>`;
      grid.appendChild(card);setupCardAnimation(card,category.id,item,index);$('.replay',card).addEventListener('click',()=>replayCard(card));
    });
    updateCounter();
  }

  function replayCard(card) {
    (cardAnimations.get(card)||[]).forEach(a=>{a.cancel();a.play();a.playbackRate=speed;if(paused)a.pause();});
  }
  function playAll(){paused=false;document.body.classList.remove('paused');cardAnimations.forEach(list=>list.forEach(a=>{a.playbackRate=speed;a.play();}));}
  function pauseAll(){paused=true;document.body.classList.add('paused');cardAnimations.forEach(list=>list.forEach(a=>a.pause()));}
  function replayAll(){cardAnimations.forEach((_,card)=>replayCard(card));if(!paused)playAll();}
  function setSpeed(value){speed=value;cardAnimations.forEach(list=>list.forEach(a=>a.playbackRate=value));}
  function updateCounter(){const cards=$$('.detail-card');const shown=cards.filter(c=>!c.classList.contains('is-hidden')).length;$('#counter').textContent=`${shown} / ${cards.length}개 표시`;$('#empty').classList.toggle('show',shown===0);}

  function setupNavigation(){
    const select=$('#categorySelect');select.innerHTML=catalog.map(c=>`<option value="${c.id}" ${c.id===category.id?'selected':''}>${formatNo(c.id)}. ${c.title} (${c.items.length})</option>`).join('');
    select.addEventListener('change',()=>{location.href=`details.html?category=${select.value}`;});
    const prev=catalog[(category.id-2+catalog.length)%catalog.length],next=catalog[category.id%catalog.length];
    $('#prevCategory').href=`details.html?category=${prev.id}`;$('#prevCategory').textContent=`← ${formatNo(prev.id)}. ${prev.title}`;
    $('#nextCategory').href=`details.html?category=${next.id}`;$('#nextCategory').textContent=`${formatNo(next.id)}. ${next.title} →`;
  }

  $('#playAll').addEventListener('click',playAll);$('#pauseAll').addEventListener('click',pauseAll);$('#replayAll').addEventListener('click',replayAll);
  $('#speed').addEventListener('change',e=>setSpeed(Number(e.target.value)));
  $('#search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();$$('.detail-card').forEach(card=>card.classList.toggle('is-hidden',q&&!card.dataset.search.includes(q)));updateCounter();});

  function tick(){customUpdaters.forEach(fn=>{try{fn();}catch{}});requestAnimationFrame(tick);}
  setupNavigation();render();document.body.classList.add('motion-on');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)pauseAll();requestAnimationFrame(tick);
})();
