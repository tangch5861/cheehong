export const characterChapters = {
 intro: {label:'A curious beginning',detail:'Student days',color:'#d4ae72',prop:'wave',era:'young'},
 education: {label:'The computer science graduate',detail:'2009',color:'#507b6b',prop:'book',era:'young'},
 journey: {label:'Ready for the first chapter',detail:'From study to practice',color:'#bd9c73',prop:'bag',era:'young'},
 flextronics: {label:'Building everyday tools',detail:'2008',color:'#8da799',prop:'laptop',era:'young'},
 gistxl: {label:'Designing the interface',detail:'2009',color:'#6f9b8e',prop:'design',era:'young'},
 version2: {label:'Development meets support',detail:'2011',color:'#8f9cba',prop:'support',era:'adult'},
 memolife: {label:'Making learning playable',detail:'2012',color:'#c49367',prop:'game',era:'adult'},
 etiqa: {label:'Connecting systems & people',detail:'2015',color:'#35695d',prop:'systems',era:'adult'},
 skills: {label:'Sharing the toolkit',detail:'Experience in practice',color:'#486b61',prop:'present',era:'mature'},
 projects: {label:'Bringing the work together',detail:'From idea to application',color:'#647b91',prop:'portfolio',era:'mature'},
 contact: {label:'Ready for the next conversation',detail:'The journey continues',color:'#2d5a50',prop:'resume',era:'mature'},
} as const;
export type ChapterId = keyof typeof characterChapters;

/** Original reusable SVG. Clothing and props are illustrative, not a literal portrait. */
export function Character({chapterId}:{chapterId:ChapterId}) {
 const c=characterChapters[chapterId];
 const young=c.era==='young', mature=c.era==='mature';
 const formal=chapterId==='etiqa'||mature;
 const scale=young?.97:1;
 const right=c.prop==='wave'?'M112 112L136 91L136 64':c.prop==='present'?'M112 112L139 125L161 98':'M112 112L132 142L142 155';
 const left=c.prop==='resume'?'M66 112L40 134L12 128':c.prop==='design'?'M66 112L45 137L34 116':'M66 112L48 141L43 160';
 return <svg className={`person person--${chapterId}`} viewBox="0 0 180 250" aria-hidden="true" data-character={chapterId}>
 <ellipse cx="90" cy="233" rx="55" ry="7" fill="#183f3212"/>
 <g className="person-body" style={{transform:`translate(${young?3:0}px, ${young?7:0}px) scale(${scale})`}}>
  {c.prop==='book'&&<g fill="#c09b68" stroke="#263e38" strokeWidth="2.5"><rect x="50" y="106" width="76" height="59" rx="16"/><path d="M58 116Q35 124 48 151" fill="none"/></g>}
  <g fill="none" stroke="#263e38" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"><path d={formal?'M76 165L74 219L57 224M105 165L111 219L128 224':'M76 165L67 218L51 223M105 165L116 218L132 223'}/><path className="arm-left" d={left}/><path className="arm-right" d={right}/></g>
  <path className="shirt" d={formal?'M65 104L79 99H101L114 104L121 165L94 174L89 162L84 174L59 165Z':'M66 104Q90 96 113 104L119 163Q89 174 61 163Z'} fill={c.color} stroke="#263e38" strokeWidth="3"/>
  {formal?<g><path d="M79 101L90 143L102 101" fill="#f8f4e9"/><path d="M77 102L71 126L82 125L90 145M104 102L110 126L100 125L90 145" fill="none" stroke="#aec5b5" strokeWidth="2"/>{chapterId==='contact'&&<path d="M88 112L85 136L90 145L95 136L92 112" fill="#c7a66b"/>}</g>:<path d={chapterId==='memolife'?'M76 103Q90 124 104 103M77 110L74 134M102 110L105 134':'M78 102L89 115L103 102'} fill="none" stroke="#e9eadb" strokeWidth="2.5"/>}
  {chapterId==='flextronics'&&<g><path d="M76 103L89 136L103 103" fill="none" stroke="#e9e6d7" strokeWidth="2"/><rect x="82" y="132" width="17" height="22" rx="2" fill="#f7f5ee"/><circle cx="90" cy="139" r="3" fill="#8da799"/><path d="M86 147H95" stroke="#6d8176"/></g>}
  <path d="M81 87V103Q90 110 99 103V87" fill="#eccba9" stroke="#263e38" strokeWidth="2.5"/>
  <g className="head"><path d={young?'M59 62C57 22 122 22 122 62C122 105 60 106 59 62Z':'M59 60C59 23 121 23 122 60L119 80Q91 111 63 80Z'} fill="#f2d3b2" stroke="#263e38" strokeWidth="3"/>
   <path d={young?'M59 56Q50 29 78 28L87 21L94 29Q116 22 123 52Q106 37 92 44Q75 34 59 56':'M59 56Q53 29 83 29Q112 23 122 53L109 43Q89 49 75 42Z'} fill="#263e38"/>
   {mature&&<path d="M62 49L65 57M114 45L119 54" stroke="#a1b1a6" strokeWidth="4" strokeLinecap="round"/>}
   <g className="eyes" fill="#263e38"><ellipse cx="79" cy="65" rx="2.3" ry="3.5"/><ellipse cx="102" cy="65" rx="2.3" ry="3.5"/></g>
   <path d="M83 78Q91 87 101 77" stroke="#263e38" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
   {mature&&<g stroke="#263e38" strokeWidth="1.7" fill="none"><rect x="69" y="57" width="19" height="17" rx="5"/><rect x="94" y="57" width="19" height="17" rx="5"/><path d="M88 63H94"/></g>}
   {c.prop==='book'&&<g fill="#285e51" stroke="#263e38" strokeWidth="2"><path d="M65 40V51Q90 61 115 50V40"/><path d="M47 33L90 15L133 33L90 49Z"/><path d="M132 34V63" stroke="#c09b68" strokeWidth="3"/></g>}
   {c.prop==='support'&&<g fill="none" stroke="#344759" strokeWidth="4"><path d="M55 64V55C55 15 127 15 127 55V64M128 67V78L109 84"/><rect x="52" y="57" width="8" height="19" rx="3" fill="#e3e8ee"/><rect x="122" y="57" width="8" height="19" rx="3" fill="#e3e8ee"/><path d="M107 84H102" strokeWidth="5"/></g>}
  </g>
  <g className="chapter-prop" key={c.prop} stroke="#263e38" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
   {c.prop==='book'&&<g><path d="M112 138L144 133L150 173L118 179Z" fill="#f8f4e9"/><path d="M119 138L125 177M125 147L140 144M127 156L142 153" fill="none" stroke="#b28b57"/></g>}
   {c.prop==='bag'&&<g><rect x="120" y="149" width="40" height="34" rx="4" fill="#ad8b63"/><path d="M132 149V142H149V149M120 161H160" fill="none"/></g>}
   {(c.prop==='laptop'||c.prop==='support')&&<g><rect x="86" y="143" width="70" height="43" rx="4" fill="#e0e7df"/><path d="M82 188H161" strokeWidth="4"/><path d="M110 155L103 163L110 171M132 155L139 163L132 171M124 153L118 173" fill="none" stroke="#477b6b"/></g>}
   {c.prop==='design'&&<g><rect x="95" y="129" width="68" height="60" rx="4" fill="#fbf8ef"/><path d="M95 141H163"/><rect x="102" y="148" width="22" height="20" rx="2" fill="#bcd3c2"/><path d="M132 149H155M132 157H149M103 177H155" fill="none" stroke="#8c9f8c"/><path d="M34 119L28 97L32 92L38 116Z" fill="#c7a06a"/></g>}
   {c.prop==='game'&&<g><rect x="81" y="137" width="84" height="54" rx="6" fill="#f8f2df"/><path d="M81 148H165"/><path d="M94 177H151M108 165H119M138 160H150" stroke="#719181"/><path d="M101 157V167M96 162H106" stroke="#b78c58"/><circle cx="147" cy="174" r="3" fill="#c39962"/><path d="M126 165L130 169L126 173L122 169Z" fill="#719181"/></g>}
   {(c.prop==='systems'||c.prop==='present')&&<g><path d="M132 181V212M118 213H148" fill="none"/><rect x="101" y="113" width="67" height="69" rx="4" fill="#f5f5e9"/><g fill="#a8c3b3"><rect x="126" y="125" width="17" height="12" rx="2"/><rect x="109" y="158" width="17" height="12" rx="2"/><rect x="145" y="158" width="17" height="12" rx="2"/></g><path d="M134 137V147H117V158M134 147H153V158" fill="none" stroke="#668e7a"/></g>}
   {c.prop==='portfolio'&&<g><path d="M91 141H111L118 147H164V189H91Z" fill="#b4c7ba"/><rect x="101" y="131" width="55" height="45" rx="3" fill="#f7f5ee"/><path d="M109 143H148M109 152H136" stroke="#719181"/><path d="M88 157H166L160 190H94Z" fill="#d2b789"/></g>}
   {c.prop==='resume'&&<g><path d="M117 132H149L161 144V190H117Z" fill="#f7f5ee"/><path d="M149 132V145H161M125 161H150M125 169H150M125 177H144" fill="none" stroke="#789181"/><text x="125" y="154" fontFamily="Arial,sans-serif" fontSize="8" stroke="none" fill="#266758">CV</text></g>}
  </g>
 </g></svg>;
}

export function ChapterPortrait({chapterId}:{chapterId:ChapterId}) {
 const c=characterChapters[chapterId];
 return <figure className={`chapter-portrait portrait--${chapterId}`}><div className="portrait-art"><Character chapterId={chapterId}/></div><figcaption><span>{c.detail}</span><strong>{c.label}</strong></figcaption></figure>;
}
