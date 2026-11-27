"use strict";(globalThis.webpackChunk_8x8_developer_docs=globalThis.webpackChunk_8x8_developer_docs||[]).push([[43044],{11151:(e,t,o)=>{o.d(t,{A:()=>r});const r="tabs"},11599:(e,t,o)=>{o.d(t,{_w:()=>r,EX:()=>a});const r=function(e,t){return function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(void 0!==o[e])return o[e];if(e&&e.indexOf(".")>0){for(var r=e.split("."),a=r.length,n=o[r[0]],i=1;null!=n&&i<a;)n=n[r[i]],i+=1;if(void 0!==n)return n}return t}};const a=function(e,t,o){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n="function"==typeof e?e(a):r(e)(a),i="function"==typeof t?t(a):t;return n in i?i[n]:o}}},28453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>l});var r=o(96540);const a={},n=r.createContext(a);function i(e){const t=r.useContext(n);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(n.Provider,{value:t},e.children)}},34178:(e,t,o)=>{o.d(t,{A:()=>a});var r=o(96540);const a=(0,o(40798).A)(r.createElement("g",null,r.createElement("path",{d:"M19.7197 3.2197a.75.75 0 0 1 1.0606 1.0607L13.8107 11.25H17.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75V6.75a.75.75 0 0 1 1.5 0v3.4393l6.9697-6.9696Z"}),r.createElement("path",{d:"M6.75 3C4.679 3 3 4.679 3 6.75v10.5C3 19.3211 4.679 21 6.75 21h10.5c2.0711 0 3.75-1.6789 3.75-3.75v-4.5a.75.75 0 0 0-1.5 0v4.5c0 1.2426-1.0074 2.25-2.25 2.25H6.75c-1.2426 0-2.25-1.0074-2.25-2.25V6.75c0-1.2426 1.0074-2.25 2.25-2.25h4.5a.75.75 0 0 0 0-1.5h-4.5Z"})),"ContractIcon")},38696:(e,t,o)=>{o.d(t,{A:()=>a});var r=o(96540);const a=(0,o(40798).A)(r.createElement("g",null,r.createElement("path",{d:"M14.1967 3.75a.75.75 0 0 1 .75-.75H20.25a.75.75 0 0 1 .75.75v5.3033a.75.75 0 0 1-1.5 0V5.5606l-6.8163 6.8162c-.2441.2441-.6794.2045-.9723-.0884-.2928-.2929-.3324-.7282-.0883-.9722L18.4393 4.5h-3.4926a.75.75 0 0 1-.75-.75Z"}),r.createElement("path",{d:"M6.75 3C4.679 3 3 4.679 3 6.75v10.5C3 19.3211 4.679 21 6.75 21h10.5c2.0711 0 3.75-1.6789 3.75-3.75v-4.5625a.75.75 0 0 0-1.5 0V17.25c0 1.2426-1.0074 2.25-2.25 2.25H6.75c-1.2426 0-2.25-1.0074-2.25-2.25V6.75c0-1.2426 1.0074-2.25 2.25-2.25h4.5625a.75.75 0 0 0 0-1.5H6.75Z"})),"ExpandIcon")},40826:(e,t,o)=>{o.d(t,{Ay:()=>s});var r=o(96540),a=o(48483),n=o(65227),i=o(11151),l=o(82413),d=o(11599);const c=a.Ay.div`
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

  ${e=>{const{theme:t}=e;return t.isClassic?a.AH`
        border-color: ${(0,d.EX)((0,d._w)("color",l.T),{[l.n]:t.tabsBarBorderColorDark,[l.T]:t.tabsBarBorderColorLight})};
        background: ${(0,d.EX)((0,d._w)("color",l.T),{[l.n]:t.tabsBarBackgroundDark,[l.T]:t.tabsBarBackgroundLight})};

        &::after {
          background-color: ${(0,d.EX)((0,d._w)("color",l.T),{[l.n]:t.tabsBarBorderColorDark,[l.T]:t.tabsBarBorderColorLight})};
        }
      `:a.AH`
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
`,s=(0,n.SL)(({theme:e,children:t,forwardedRef:o,color:n=l.T,...i})=>r.createElement(a.NP,{theme:e},r.createElement(c,{role:"tablist",ref:o,color:n,...i},t)),i.A)},51770:(e,t,o)=>{o.d(t,{Ay:()=>C});var r=o(96540),a=o(68842);const n=(0,o(40798).A)(r.createElement("g",null,r.createElement("path",{fillRule:"evenodd",d:"M20.0303 16.2803a.75.75 0 0 1-1.0606 0L12 9.3107l-6.9697 6.9696a.75.75 0 0 1-1.0606-1.0606l7.5-7.5a.75.75 0 0 1 1.0606 0l7.5 7.5a.75.75 0 0 1 0 1.0606Z",clipRule:"evenodd"})),"ArrowUpIcon");var i=o(84013),l=o(65227),d=o(48483);const c=d.Ay.div`
  border-bottom: 1px solid ${({theme:e})=>e.ui01};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,s=d.AH`
  all: unset;

  box-sizing: border-box;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  gap: ${({theme:e})=>e.spacing04};

  padding: 0 ${({theme:e})=>e.spacing05};
  background-color: ${({theme:e})=>e.ui06};

  color: ${({theme:e})=>e.textColor01};
  ${({theme:e})=>({...e.bodyBold01})};
`,b=d.Ay.button`
  ${s}

  cursor: ${({isNotClickable:e})=>e?"initial":"pointer"};

  &:focus-visible {
    box-shadow: 0 0 0 2px inset ${({theme:e})=>e.focus01};
  }

  ${({theme:e,isNotClickable:t})=>!t&&`&:hover {\n        background-color: ${e.ui05};\n     }`}
`,h=d.Ay.div`
  ${s}

  cursor: default;
`,u=d.Ay.div`
  display: grid;
  grid-template-rows: ${({isExpanded:e})=>e?"1fr":"0fr"};
  ${({hasFixedHeight:e,height:t,isExpanded:o})=>e?`\n    height: ${o?`${t}px`:"0"};\n    transition: grid-template-rows 150ms cubic-bezier(0.2, 0, 1, 0.9),\n                height 150ms cubic-bezier(0.2, 0, 1, 0.9);\n  `:"\n    transition: grid-template-rows 150ms cubic-bezier(0.2, 0, 1, 0.9);\n  "}
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    transition: unset;
  }
`,g=d.Ay.div`
  box-sizing: border-box;
  ${({hasFixedHeight:e})=>e&&"height: 100%;"};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,m=d.Ay.div`
  overflow: hidden;

  /* show scrollbars after animation completes */
  ${({isContentScrollable:e,hasFixedHeight:t,isExpanded:o})=>e&&t&&o?"\n      @media not all and (prefers-reduced-motion: reduce) {\n        @keyframes showScrollbar {\n          0%, 99% {\n            overflow: hidden;\n          }\n          100% {\n            overflow-y: auto;\n          }\n        }\n\n        /* 150ms for transition in ContentContainer plus small delay */\n        animation: showScrollbar 170ms forwards;\n      }\n\n      /* skip animation for reduced motion preference */\n      @media (prefers-reduced-motion: reduce) {\n        overflow-y: auto;\n      }\n\n      scrollbar-gutter: stable;\n    ":""}

  ${({hasPadding:e,theme:t})=>e&&`\n    padding: ${t.spacing03} ${t.spacing05} ${t.spacing05};\n  `}
`,p=d.Ay.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`,v="\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n",$=d.Ay.div`
  flex-grow: 4;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing02};
  min-width: 0;
`,f=d.Ay.div`
  min-width: 0;
  ${v}
`,A=d.Ay.div`
  color: ${({theme:e})=>e.textColor02};
  ${({theme:e})=>({...e.label01})}
  ${v}
`,k=d.Ay.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 4px;
`;const C=function({children:e=null,testId:t="ACCORDION",title:o,text:d="",iconLeft:s=null,contentAfterTitle:v=null,isExpanded:C=!1,id:x,forcedHeight:w=0,shouldCloseOnActiveClick:B,isContentScrollable:E=!1,onChange:T,hasPadding:y=!0,expandTrigger:D="header",translations:H,..._}){const S=!B&&C,I=C?n:i.A,L=!!w,z={expand:"Expand",collapse:"Collapse",...H},X={onClick:(0,r.useCallback)(()=>{T?.(x,!C)},[T,C,x]),isNotClickable:S},F=`${t}_CONTENT_PANEL`,R=r.createElement(I,{size:20,...(0,l.a3)(`${t}_ICON_RIGHT`)}),N=r.createElement(p,null,"arrow"===D?r.createElement(a.A,{...X,"aria-expanded":C,"aria-controls":F,"aria-label":`${C?z.collapse:z.expand} ${o}`,...(0,l.a3)(`${t}_ARROW_BUTTON`)},R):R),P=r.createElement(r.Fragment,null,r.isValidElement(s)&&r.createElement(p,null,r.cloneElement(s,{size:20,...(0,l.a3)(`${t}_ICON_LEFT`)})),r.createElement($,null,r.createElement(f,{title:o,...(0,l.a3)(`${t}_TEXT`)},o),v&&r.createElement(k,{...(0,l.a3)(`${t}_CONTENT_AFTER_TITLE`)},v)),d&&r.createElement(A,{title:d,...(0,l.a3)(`${t}_TEXT_SECONDARY`)},d),N),O={...(0,l.a3)(`${t}_HEADER`),..."header"===D&&{"aria-expanded":C,"aria-controls":F}};return r.createElement(c,{...(0,l.a3)(t)},"header"===D?r.createElement(b,{...O,...X},P):r.createElement(h,{...O},P),r.createElement(u,{isExpanded:C,hasFixedHeight:L,height:w,id:F,"aria-labelledby":`${t}_HEADER`,...!C&&{inert:""},...(0,l.a3)(`${t}_CONTENT`),..._},r.createElement(g,{hasFixedHeight:L},r.createElement(m,{isContentScrollable:E,hasFixedHeight:L,hasPadding:y,isExpanded:C},e))))}},54004:(e,t,o)=>{o.d(t,{A:()=>b});var r=o(96540),a=o(48483),n=o(65227),i=o(11599),l=o(82413);const d=a.Ay.button.attrs(({isDisabled:e=!1,isActive:t,type:o="button"})=>({disabled:e,"aria-selected":t,type:o}))`
  ${({theme:e,isActive:t})=>a.AH`
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

  ${e=>function(e){const{isActive:t,isDisabled:o,theme:r}=e;return t?r.isClassic?a.AH`
        color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabTextColorDarkActive,[l.T]:r.tabTextColorLightActive})};
        border-color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkActive,[l.T]:r.tabBorderColorLightActive})};
        background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBackgroundDarkActive,[l.T]:r.tabBackgroundLightActive})};

        &::after {
          background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkActive,[l.T]:r.tabBorderColorLightActive})};
        }
      `:a.AH`
      color: ${r.textColorActive};
      border-color: ${r.tabBorderColorActive};
      background: ${r.tabBackgroundActive};

      &::after {
        background: ${r.tabBorderColorActive};
      }
    `:o?r.isClassic?a.AH`
        color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabTextColorDarkDisabled,[l.T]:r.tabTextColorLightDisabled})};
        border-color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkDisabled,[l.T]:r.tabBorderColorLightDisabled})};
        background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBackgroundDarkDisabled,[l.T]:r.tabBackgroundLightDisabled})};

        &::after {
          background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkDisabled,[l.T]:r.tabBorderColorLightDisabled})};
        }
      `:a.AH`
      color: ${r.textColorDisabled};
      border-color: ${r.tabBorderColorDisabled};
      background: ${r.tabBackgroundDisabled};

      &::after {
        background: ${r.tabBorderColorDisabled};
      }
    `:r.isClassic?a.AH`
      color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabTextColorDark,[l.T]:r.tabTextColorLight})};
      border-color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDark,[l.T]:r.tabBorderColorLight})};
      background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBackgroundDark,[l.T]:r.tabBackgroundLight})};

      &::after {
        background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDark,[l.T]:r.tabBorderColorLight})};
      }

      &:hover,
      &:focus {
        color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabTextColorDarkHover,[l.T]:r.tabTextColorLightHover})};
        border-color: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkHover,[l.T]:r.tabBorderColorLightHover})};
        background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBackgroundDarkHover,[l.T]:r.tabBackgroundLightHover})};

        &::after {
          background: ${(0,i.EX)((0,i._w)("color",l.T),{[l.n]:r.tabBorderColorDarkHover,[l.T]:r.tabBorderColorLightHover})};
        }
      }
    `:a.AH`
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
  ${e=>function(e){const{isStretched:t}=e;return t?a.AH`
      align-items: stretch;
      width: 100%;
    `:a.AH`
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
`;var c=o(11151);const s=a.Ay.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`,b=(0,n.SL)(({theme:e,children:t,color:o=l.T,value:i,isActive:c,isDisabled:b,isStretched:h,onClick:u,testId:g="TABS",...m})=>{m["aria-controls"]||console.warn("\nOxygen Tab component is missing ariaControls prop, which is required for accessibility references:\n - https://www.w3.org/WAI/ARIA/apg/patterns/tabs/\n - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls\n");return r.createElement(a.NP,{theme:e},r.createElement(d,{role:"tab",color:o,isActive:c,isDisabled:b,isStretched:h,...(0,n.a3)(`${g}_TAB`),...m,onClick:e=>{b&&e.preventDefault(),b||u?.(e,i)}},r.createElement(s,null,t)))},c.A)},68842:(e,t,o)=>{o.d(t,{A:()=>s});var r=o(96540),a=o(48483),n=o(65227),i=o(68921);const l=({isActive:e,isInverted:t,isDisabled:o,theme:r})=>o?r.colorDisabled:e&&t?r.color:e?r.colorSelected:t?r.colorInverted:r.color,d=a.Ay.button`
  background: ${e=>e.isActive?e["aria-disabled"]?e.theme.backgroundSelectedDisabled:e.isInverted?e.theme.backgroundActive:e.theme.backgroundActiveSelected:"transparent"};
  ${({$iconButtonSize:e})=>e&&`height: ${e}px`};
  ${({$iconButtonSize:e})=>e&&`width: ${e}px`};
  border: 2px solid transparent;
  border-radius: 6px;
  display: flex;
  align-self: baseline;
  align-items: center;
  justify-content: center;
  outline: none;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: ${e=>e["aria-disabled"]?"not-allowed":"pointer"};
  ${e=>!e["aria-disabled"]&&`\n    &:hover {\n      background: ${(e=>e.isActive&&!e.isInverted||!e.isActive&&e.isInverted?e.theme.backgroundSelectedHover:e.theme.backgroundHover)(e)};\n    }\n    &:active {\n      background: ${(e=>e.isActive&&e.isInverted||!e.isActive&&!e.isInverted?e.theme.backgroundActive:e.theme.backgroundActiveSelected)(e)};\n    }\n  `}
  &:focus-visible {
    border-color: ${({theme:e,isInverted:t})=>t?e.borderFocusInverted:e.borderFocus};
    box-shadow: ${({theme:e,isInverted:t})=>`0 0 0 2px ${t?e.shadowFocusInverted:e.shadowFocus} inset`};
  }
`,c={small2XIconXs:[20,16],smallXIconS:[24,20],default:[28,24],smallIconM:[32,24],smallIconS:[32,20],smallIconXs:[32,16],mediumIconL:[40,32],mediumIconM:[40,24],mediumIconS:[40,20],largeIconL:[48,32],largeIconM:[48,24]},s=(0,n.SL)(({children:e,size:t="default",isDisabled:o,theme:s,forwardedRef:b,testId:h="iconButton",onClick:u,onKeyDown:g,...m})=>{const p={...o&&{"aria-disabled":!0}},v="default"===t?"":c[t][0].toString(),$=e=>{const r={color:l({isActive:m.isActive,isInverted:m.isInverted,isDisabled:o,theme:s}),size:c[t][1]};return e.props?.size&&(r.size=e.props.size),r};return r.createElement(a.NP,{theme:s},r.createElement(d,{type:"button",onClick:e=>{if(o)return e.preventDefault(),void e.stopPropagation();u&&u(e)},onKeyDown:e=>{if(((0,i.L8)(e)||(0,i.FP)(e))&&o)return e.preventDefault(),void e.stopPropagation();g&&g(e)},...(0,n.a3)(h),...m,...p,ref:b,$iconButtonSize:v},r.Children.map(e||null,e=>r.isValidElement(e)?r.cloneElement(e,{...$(e)}):e)))},"iconButton")},82413:(e,t,o)=>{o.d(t,{T:()=>r,n:()=>a});const r="light",a="dark"},84013:(e,t,o)=>{o.d(t,{A:()=>a});var r=o(96540);const a=(0,o(40798).A)(r.createElement("g",null,r.createElement("path",{fillRule:"evenodd",d:"M3.9697 7.7197a.75.75 0 0 1 1.0606 0L12 14.6893l6.9697-6.9696a.75.75 0 0 1 1.0606 1.0607l-7.5 7.4999a.75.75 0 0 1-1.0606 0l-7.5-7.5a.75.75 0 0 1 0-1.0606Z",clipRule:"evenodd"})),"ArrowDownIcon")}}]);