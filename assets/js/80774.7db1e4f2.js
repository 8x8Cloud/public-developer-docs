(globalThis.webpackChunk_8x8_developer_docs=globalThis.webpackChunk_8x8_developer_docs||[]).push([[80774],{11151:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});const r="tabs"},11599:(e,t,o)=>{"use strict";o.d(t,{_w:()=>r,EX:()=>n});const r=function(e,t){return function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(void 0!==o[e])return o[e];if(e&&e.indexOf(".")>0){for(var r=e.split("."),n=r.length,a=o[r[0]],s=1;null!=a&&s<n;)a=a[r[s]],s+=1;if(void 0!==a)return a}return t}};const n=function(e,t,o){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a="function"==typeof e?e(n):r(e)(n),s="function"==typeof t?t(n):t;return a in s?s[a]:o}}},18426:(e,t)=>{function o(e){let t,o=[];for(let r of e.split(",").map(e=>e.trim()))if(/^-?\d+$/.test(r))o.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,n,a]=t;if(r&&a){r=parseInt(r),a=parseInt(a);const e=r<a?1:-1;"-"!==n&&".."!==n&&"\u2025"!==n||(a+=e);for(let t=r;t!==a;t+=e)o.push(t)}}return o}t.default=o,e.exports=o},34291:(e,t,o)=>{"use strict";o.d(t,{DX:()=>v,J9:()=>f,Li:()=>k,M$:()=>C,Ph:()=>N,_u:()=>p,l8:()=>$,mU:()=>w,wt:()=>g});var r=o(96540),n=o(34164),a=o(18426),s=o.n(a),c=o(89532),i=o(74848);const l=/title=(?<quote>["'])(?<title>.*?)\1/,d=/\{(?<range>[\d,-]+)\}/,u={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},b={...u,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},m=Object.keys(u);function h(e,t){const o=e.map(e=>{const{start:o,end:r}=b[e];return`(?:${o}\\s*(${t.flatMap(e=>[e.line,e.block?.start,e.block?.end].filter(Boolean)).join("|")})\\s*${r})`}).join("|");return new RegExp(`^\\s*(?:${o})\\s*$`)}function g(e){return e?.match(l)?.groups.title??""}function f({showLineNumbers:e,metastring:t}){return"boolean"==typeof e?e?1:void 0:"number"==typeof e?e:function(e){const t=e?.split(" ").find(e=>e.startsWith("showLineNumbers"));if(t){if(t.startsWith("showLineNumbers=")){const e=t.replace("showLineNumbers=","");return parseInt(e,10)}return 1}}(t)}function p(e){return Boolean(e?.includes("showLineNumbers"))}function B(e,t){const{language:o,magicComments:r}=t;if(void 0===o)return{lineClassNames:{},code:e};const n=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return h(["js","jsBlock"],t);case"jsx":case"tsx":return h(["js","jsBlock","jsx"],t);case"html":return h(["js","jsBlock","html"],t);case"python":case"py":case"bash":return h(["bash"],t);case"markdown":case"md":return h(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return h(["tex"],t);case"lua":case"haskell":return h(["lua"],t);case"sql":return h(["lua","jsBlock"],t);case"wasm":return h(["wasm"],t);case"vb":case"vba":case"visual-basic":return h(["vb","rem"],t);case"vbnet":return h(["vbnet","rem"],t);case"batch":return h(["rem"],t);case"basic":return h(["rem","f90"],t);case"fsharp":return h(["js","ml"],t);case"ocaml":case"sml":return h(["ml"],t);case"fortran":return h(["f90"],t);case"cobol":return h(["cobol"],t);default:return h(m,t)}}(o,r),a=e.split(/\r?\n/),c=Object.fromEntries(r.map(e=>[e.className,{start:0,range:""}])),i=Object.fromEntries(r.filter(e=>e.line).map(({className:e,line:t})=>[t,e])),l=Object.fromEntries(r.filter(e=>e.block).map(({className:e,block:t})=>[t.start,e])),d=Object.fromEntries(r.filter(e=>e.block).map(({className:e,block:t})=>[t.end,e]));for(let s=0;s<a.length;){const e=a[s].match(n);if(!e){s+=1;continue}const t=e.slice(1).find(e=>void 0!==e);i[t]?c[i[t]].range+=`${s},`:l[t]?c[l[t]].start=s:d[t]&&(c[d[t]].range+=`${c[d[t]].start}-${s-1},`),a.splice(s,1)}const u={};return Object.entries(c).forEach(([e,{range:t}])=>{s()(t).forEach(t=>{u[t]??=[],u[t].push(e)})}),{code:a.join("\n"),lineClassNames:u}}function k(e,t){const o=e.replace(/\r?\n$/,"");return function(e,{metastring:t,magicComments:o}){if(t&&d.test(t)){const r=t.match(d).groups.range;if(0===o.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${t}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const n=o[0].className,a=s()(r).filter(e=>e>0).map(e=>[e-1,[n]]);return{lineClassNames:Object.fromEntries(a),code:e}}return null}(o,{...t})??B(o,{...t})}function v(e){if(!e)return;const t=e.split(" ").find(e=>e.startsWith("language-"));return t?.replace(/language-/,"")}function w(e){const t=function(e){return t=e.language??v(e.className)??e.defaultLanguage,t?.toLowerCase()??"text";var t}({language:e.language,defaultLanguage:e.defaultLanguage,className:e.className}),{lineClassNames:o,code:r}=k(e.code,{metastring:e.metastring,magicComments:e.magicComments,language:t}),a=function({className:e,language:t}){return(0,n.A)(e,t&&!e?.includes(`language-${t}`)&&`language-${t}`)}({className:e.className,language:t}),s=g(e.metastring)||e.title,c=f({showLineNumbers:e.showLineNumbers,metastring:e.metastring});return{codeInput:e.code,code:r,className:a,language:t,title:s,lineNumbersStart:c,lineClassNames:o}}function C(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},o={};return Object.entries(e.plain).forEach(([e,r])=>{const n=t[e];n&&"string"==typeof r&&(o[n]=r)}),o}const x=(0,r.createContext)(null);function $({metadata:e,wordWrap:t,children:o}){const n=(0,r.useMemo)(()=>({metadata:e,wordWrap:t}),[e,t]);return(0,i.jsx)(x.Provider,{value:n,children:o})}function N(){const e=(0,r.useContext)(x);if(null===e)throw new c.dV("CodeBlockContextProvider");return e}},40826:(e,t,o)=>{"use strict";o.d(t,{Ay:()=>d});var r=o(96540),n=o(48483),a=o(65227),s=o(11151),c=o(82413),i=o(11599);const l=n.Ay.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding: ${({theme:e})=>e.tabsBarPadding};
  white-space: nowrap;
  border-radius: ${({theme:e})=>e.tabsBarBorderRadius};
  border-style: solid;
  border-width: ${({theme:e})=>e.tabsBarBorderTopSize}
    ${({theme:e})=>e.tabsBarBorderRightSize} 0
    ${({theme:e})=>e.tabsBarBorderLeftSize};
  box-sizing: border-box;

  ${e=>{const{theme:t}=e;return t.isClassic?n.AH`
        border-color: ${(0,i.EX)((0,i._w)("color",c.T),{[c.n]:t.tabsBarBorderColorDark,[c.T]:t.tabsBarBorderColorLight})};
        background: ${(0,i.EX)((0,i._w)("color",c.T),{[c.n]:t.tabsBarBackgroundDark,[c.T]:t.tabsBarBackgroundLight})};

        &::after {
          background-color: ${(0,i.EX)((0,i._w)("color",c.T),{[c.n]:t.tabsBarBorderColorDark,[c.T]:t.tabsBarBorderColorLight})};
        }
      `:n.AH`
      border-color: ${t.tabsBarBorderColor};
      background: ${t.tabsBarBackground};

      &::after {
        background: ${t.tabsBarBorderColor};
      }
    `}};

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${({theme:e})=>e.tabsBarBorderBottomSize};

    z-index: 1;
  }
`,d=(0,a.SL)(({theme:e,children:t,forwardedRef:o,color:a=c.T,...s})=>r.createElement(n.NP,{theme:e},r.createElement(l,{role:"tablist",ref:o,color:a,...s},t)),s.A)},54004:(e,t,o)=>{"use strict";o.d(t,{A:()=>u});var r=o(96540),n=o(48483),a=o(65227),s=o(11599),c=o(82413);const i=n.Ay.button.attrs(({isDisabled:e=!1,isActive:t,type:o="button"})=>({disabled:e,"aria-selected":t,type:o}))`
  ${({theme:e,isActive:t})=>n.AH`
      font-family: ${t?e.selectedFontFamily:e.fontFamily};
      font-size: ${t?e.selectedFontSize:e.fontSize};
      font-weight: ${t?e.selectedFontWeight:e.fontWeight};
      line-height: ${t?e.selectedLineHeight:e.lineHeight};
      letter-spacing: ${t?e.selectedLetterSpacing:e.letterSpacing};
    `}
  position: relative;
  display: inline-block;
  margin-bottom: ${({theme:e})=>e.tabGap};
  height: ${({theme:e})=>`calc(${e.tabHeight} - ${e.tabGap})`};
  max-width: ${({theme:e})=>e.tabMaxWidth};
  min-width: ${({theme:e})=>e.tabMinWidth};
  padding: ${({theme:e})=>e.tabPadding};
  border-radius: ${({theme:e})=>e.tabBorderRadius};
  border-width: ${({theme:e})=>e.tabBorderTopSize}
    ${({theme:e})=>e.tabBorderRightSize} 0
    ${({theme:e})=>e.tabBorderLeftSize};
  border-style: solid;
  box-sizing: border-box;
  cursor: ${e=>e.isActive?"pointer":e.isDisabled?"not-allowed":"default"};

  transition-property: border-color, color, background, box-shadow;
  transition-duration: ${({theme:e})=>e.tabTransitionTime};
  transition-timing-function: ease-in;

  ${e=>function(e){const{isActive:t,isDisabled:o,theme:r}=e;return t?r.isClassic?n.AH`
        color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabTextColorDarkActive,[c.T]:r.tabTextColorLightActive})};
        border-color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkActive,[c.T]:r.tabBorderColorLightActive})};
        background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBackgroundDarkActive,[c.T]:r.tabBackgroundLightActive})};

        &::after {
          background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkActive,[c.T]:r.tabBorderColorLightActive})};
        }
      `:n.AH`
      color: ${r.textColorActive};
      border-color: ${r.tabBorderColorActive};
      background: ${r.tabBackgroundActive};

      &::after {
        background: ${r.tabBorderColorActive};
      }
    `:o?r.isClassic?n.AH`
        color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabTextColorDarkDisabled,[c.T]:r.tabTextColorLightDisabled})};
        border-color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkDisabled,[c.T]:r.tabBorderColorLightDisabled})};
        background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBackgroundDarkDisabled,[c.T]:r.tabBackgroundLightDisabled})};

        &::after {
          background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkDisabled,[c.T]:r.tabBorderColorLightDisabled})};
        }
      `:n.AH`
      color: ${r.textColorDisabled};
      border-color: ${r.tabBorderColorDisabled};
      background: ${r.tabBackgroundDisabled};

      &::after {
        background: ${r.tabBorderColorDisabled};
      }
    `:r.isClassic?n.AH`
      color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabTextColorDark,[c.T]:r.tabTextColorLight})};
      border-color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDark,[c.T]:r.tabBorderColorLight})};
      background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBackgroundDark,[c.T]:r.tabBackgroundLight})};

      &::after {
        background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDark,[c.T]:r.tabBorderColorLight})};
      }

      &:hover,
      &:focus {
        color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabTextColorDarkHover,[c.T]:r.tabTextColorLightHover})};
        border-color: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkHover,[c.T]:r.tabBorderColorLightHover})};
        background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBackgroundDarkHover,[c.T]:r.tabBackgroundLightHover})};

        &::after {
          background: ${(0,s.EX)((0,s._w)("color",c.T),{[c.n]:r.tabBorderColorDarkHover,[c.T]:r.tabBorderColorLightHover})};
        }
      }
    `:n.AH`
    color: ${r.textColor};
    border-color: ${r.tabBorderColor};
    background: ${r.tabBackground};

    &::after {
      background: ${r.tabBorderColor};
    }

    &:hover {
      color: ${r.textColorHover};
      border-color: ${r.tabBorderColorHover};
      background: ${r.tabBackgroundHover};

      &::after {
        background: ${r.tabBorderColorHover};
      }
    }

    &:focus-visible {
      color: ${r.textColorFocus};
      background: ${r.tabBackgroundHover};
    }
  `}(e)};
  ${e=>function(e){const{isStretched:t}=e;return t?n.AH`
      align-items: stretch;
      width: 100%;
    `:n.AH`
    flex: none;
    width: auto;
  `}(e)}

  overflow-x: clip;

  &:hover {
    outline: none;
  }

  &:focus-visible {
    outline: ${({theme:e})=>e.tabBorderSizeFocus} solid
      ${({theme:e})=>e.tabBorderColorFocus};
    outline-offset: -${({theme:e})=>e.tabBorderSizeFocus};
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -${({theme:e})=>e.tabGap};
    left: 0;
    width: 100%;
    height: ${({theme:e})=>e.tabBorderBottomSize};
    transition: background ${({theme:e})=>e.tabTransitionTime} ease-in;
    z-index: 2;
  }
`;var l=o(11151);const d=n.Ay.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`,u=(0,a.SL)(({theme:e,children:t,color:o=c.T,value:s,isActive:l,isDisabled:u,isStretched:b,onClick:m,testId:h="TABS",...g})=>{g["aria-controls"]||console.warn("\nOxygen Tab component is missing ariaControls prop, which is required for accessibility references:\n - https://www.w3.org/WAI/ARIA/apg/patterns/tabs/\n - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls\n");return r.createElement(n.NP,{theme:e},r.createElement(i,{role:"tab",color:o,isActive:l,isDisabled:u,isStretched:b,...(0,a.a3)(`${h}_TAB`),...g,onClick:e=>{u&&e.preventDefault(),u||m?.(e,s)}},r.createElement(d,null,t)))},l.A)},78478:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>a});o(96540);var r=o(92303),n=o(74848);function a({children:e,fallback:t}){return(0,r.default)()?(0,n.jsx)(n.Fragment,{children:e?.()}):t??null}},82413:(e,t,o)=>{"use strict";o.d(t,{T:()=>r,n:()=>n});const r="light",n="dark"},90446:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>P});var r=o(96540),n=o(92303),a=o(34164),s=o(26058),c=o(17559),i=o(34291);const l={codeBlockContainer:"codeBlockContainer_Ckt0"};var d=o(74848);function u({as:e,...t}){const o=(0,s.A)(),r=(0,i.M$)(o);return(0,d.jsx)(e,{...t,style:r,className:(0,a.A)(t.className,l.codeBlockContainer,c.G.common.codeBlock)})}const b={codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm"};function m({children:e,className:t}){return(0,d.jsx)(u,{as:"pre",tabIndex:0,className:(0,a.A)(b.codeBlockStandalone,"thin-scrollbar",t),children:(0,d.jsx)("code",{className:b.codeBlockLines,children:e})})}var h=o(6342),g=o(96591);function f({children:e}){return e}var p=o(71765);function B({line:e,token:t,...o}){return(0,d.jsx)("span",{...o})}const k={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function v({line:e,classNames:t,showLineNumbers:o,getLineProps:r,getTokenProps:n}){const s=function(e){const t=1===e.length&&"\n"===e[0].content?e[0]:void 0;return t?[{...t,content:""}]:e}(e),c=r({line:s,className:(0,a.A)(t,o&&k.codeLine)}),i=s.map((e,t)=>{const o=n({token:e});return(0,d.jsx)(B,{...o,line:s,token:e,children:o.children},t)});return(0,d.jsxs)("span",{...c,children:[o?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{className:k.codeLineNumber}),(0,d.jsx)("span",{className:k.codeLineContent,children:i})]}):i,(0,d.jsx)("br",{})]})}const w=r.forwardRef((e,t)=>(0,d.jsx)("pre",{ref:t,tabIndex:0,...e,className:(0,a.A)(e.className,b.codeBlock,"thin-scrollbar")}));function C(e){const{metadata:t}=(0,i.Ph)();return(0,d.jsx)("code",{...e,className:(0,a.A)(e.className,b.codeBlockLines,void 0!==t.lineNumbersStart&&b.codeBlockLinesWithNumbering),style:{...e.style,counterReset:void 0===t.lineNumbersStart?void 0:"line-count "+(t.lineNumbersStart-1)}})}function x({className:e}){const{metadata:t,wordWrap:o}=(0,i.Ph)(),r=(0,s.A)(),{code:n,language:c,lineNumbersStart:l,lineClassNames:u}=t;return(0,d.jsx)(p.Highlight,{theme:r,code:n,language:c,children:({className:t,style:r,tokens:n,getLineProps:s,getTokenProps:c})=>(0,d.jsx)(w,{ref:o.codeBlockRef,className:(0,a.A)(e,t),style:r,children:(0,d.jsx)(C,{children:n.map((e,t)=>(0,d.jsx)(v,{line:e,getLineProps:s,getTokenProps:c,classNames:u[t],showLineNumbers:void 0!==l},t))})})})}var $=o(78478),N=o(21312);function T({className:e,...t}){return(0,d.jsx)("button",{type:"button",...t,className:(0,a.A)("clean-btn",e)})}function A(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function L(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const j={copyButtonCopied:"copyButtonCopied_Vdqa",copyButtonIcons:"copyButtonIcons_IEyt",copyButtonIcon:"copyButtonIcon_TrPX",copyButtonSuccessIcon:"copyButtonSuccessIcon_cVMy"};function y(e){return e?(0,N.translate)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,N.translate)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"})}function E({className:e}){const{copyCode:t,isCopied:o}=function(){const{metadata:{code:e}}=(0,i.Ph)(),[t,o]=(0,r.useState)(!1),n=(0,r.useRef)(void 0),a=(0,r.useCallback)(()=>{navigator.clipboard.writeText(e).then(()=>{o(!0),n.current=window.setTimeout(()=>{o(!1)},1e3)})},[e]);return(0,r.useEffect)(()=>()=>window.clearTimeout(n.current),[]),{copyCode:a,isCopied:t}}();return(0,d.jsx)(T,{"aria-label":y(o),title:(0,N.translate)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,a.A)(e,j.copyButton,o&&j.copyButtonCopied),onClick:t,children:(0,d.jsxs)("span",{className:j.copyButtonIcons,"aria-hidden":"true",children:[(0,d.jsx)(A,{className:j.copyButtonIcon}),(0,d.jsx)(L,{className:j.copyButtonSuccessIcon})]})})}function _(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const S={wordWrapButtonIcon:"wordWrapButtonIcon_b1P5",wordWrapButtonEnabled:"wordWrapButtonEnabled_uzNF"};function D({className:e}){const{wordWrap:t}=(0,i.Ph)();if(!(t.isEnabled||t.isCodeScrollable))return!1;const o=(0,N.translate)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,d.jsx)(T,{onClick:()=>t.toggle(),className:(0,a.A)(e,t.isEnabled&&S.wordWrapButtonEnabled),"aria-label":o,title:o,children:(0,d.jsx)(_,{className:S.wordWrapButtonIcon,"aria-hidden":"true"})})}const H={buttonGroup:"buttonGroup_M5ko"};function W({className:e}){return(0,d.jsx)($.default,{children:()=>(0,d.jsxs)("div",{className:(0,a.A)(e,H.buttonGroup),children:[(0,d.jsx)(D,{}),(0,d.jsx)(E,{})]})})}const z={codeBlockContent:"codeBlockContent_QJqH",codeBlockTitle:"codeBlockTitle_OeMC",codeBlock:"codeBlock_a8dz"};function I({className:e}){const{metadata:t}=(0,i.Ph)();return(0,d.jsxs)(u,{as:"div",className:(0,a.A)(e,t.className),children:[t.title&&(0,d.jsx)("div",{className:z.codeBlockTitle,children:(0,d.jsx)(f,{children:t.title})}),(0,d.jsxs)("div",{className:z.codeBlockContent,children:[(0,d.jsx)(x,{}),(0,d.jsx)(W,{})]})]})}function X(e){const t=function(e){const{prism:t}=(0,h.p)();return(0,i.mU)({code:e.children,className:e.className,metastring:e.metastring,magicComments:t.magicComments,defaultLanguage:t.defaultLanguage,language:e.language,title:e.title,showLineNumbers:e.showLineNumbers})}(e),o=(0,g.f)();return(0,d.jsx)(i.l8,{metadata:t,wordWrap:o,children:(0,d.jsx)(I,{})})}function P({children:e,...t}){const o=(0,n.default)(),a=function(e){return r.Children.toArray(e).some(e=>(0,r.isValidElement)(e))?e:Array.isArray(e)?e.join(""):e}(e),s="string"==typeof a?X:m;return(0,d.jsx)(s,{...t,children:a},String(o))}},96591:(e,t,o)=>{"use strict";o.d(t,{f:()=>c});var r=o(96540),n=o(89532);const a={attributes:!0,characterData:!0,childList:!0,subtree:!0};function s(e,t){const[o,s]=(0,r.useState)(),c=(0,r.useCallback)(()=>{s(e.current?.closest("[role=tabpanel][hidden]"))},[e,s]);(0,r.useEffect)(()=>{c()},[c]),function(e,t,o=a){const s=(0,n._q)(t),c=(0,n.Be)(o);(0,r.useEffect)(()=>{const t=new MutationObserver(s);return e&&t.observe(e,c),()=>t.disconnect()},[e,s,c])}(o,e=>{e.forEach(e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),c())})},{attributes:!0,characterData:!1,childList:!1,subtree:!1})}function c(){const[e,t]=(0,r.useState)(!1),[o,n]=(0,r.useState)(!1),a=(0,r.useRef)(null),c=(0,r.useCallback)(()=>{const o=a.current.querySelector("code");e?o.removeAttribute("style"):(o.style.whiteSpace="pre-wrap",o.style.overflowWrap="anywhere"),t(e=>!e)},[a,e]),i=(0,r.useCallback)(()=>{const{scrollWidth:e,clientWidth:t}=a.current,o=e>t||a.current.querySelector("code").hasAttribute("style");n(o)},[a]);return s(a,i),(0,r.useEffect)(()=>{i()},[e,i]),(0,r.useEffect)(()=>(window.addEventListener("resize",i,{passive:!0}),()=>{window.removeEventListener("resize",i)}),[i]),{codeBlockRef:a,isEnabled:e,isCodeScrollable:o,toggle:c}}}}]);