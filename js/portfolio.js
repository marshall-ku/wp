function m_slider(){const e=document.querySelector(".m_slider");if(!e)return;const t=e.querySelector(".m_slider_wrapper"),n=e.querySelectorAll(".m_thumbnail").length+1,s=e.querySelector(".m_slider_paging_list"),l=[e.getElementsByClassName("m_slider_item")[0].cloneNode(!0),e.getElementsByClassName("m_slider_item")[n-2].cloneNode(!0)],i={x:e.offsetWidth,y:t.scrollHeight};let a=0;if(2===n)return void e.classList.add("single");t.append(l[0]),t.prepend(l[1]),[...e.querySelectorAll(".m_thumbnail")].forEach(e=>{if(0===a||a===n)a++;else{const e=document.createElement("button");e.classList.add("m_thumbnail"),e.dataset.index=a,a++,s.appendChild(e)}});const o=s.getElementsByClassName("m_thumbnail");let r,c=1,d=null,u=null,h=null,m=null,v=!1;function f(e,s,l,a){const o=void 0===a?void 0===l?1===s?0===c?0:i.x*(c-1):c===n?n:i.x*(c+1):i.x*l:a,r=Math.max(.1,Math.min(Math.abs(o-e)/2e3,.8)),d=e=>-.5*(Math.cos(Math.PI*e)-1);let u=performance.now();v=!0,function l(){const i=(performance.now()-u)/(1e3*r),a=d(i);1>i?(window.requestAnimationFrame(l),t.style.transform=`translate3d(-${o+(e-o)*a}px, 0, 0)`):(1===s?c===n&&(c=1):0===c&&(c=n-1),t.style.transform=`translate3d(-${e}px, 0, 0)`,v=!1)}()}function g(t,s,l){[...e.querySelectorAll(".highlight")].forEach(e=>{e.classList.remove("highlight")}),f(i.x*c,t,s,l),o[0===c?n-2:c===n?0:c-1].classList.add("highlight")}function L(){clearInterval(r),r=setInterval(()=>{void 0===o[c]&&(c=0),++c,g(1)},5e3)}function b(e){v||(L(),++c,g(1,void 0,e))}function x(e){v||(L(),--c,g(0,void 0,e))}function E(e){d=`${e.touches?e.touches[0].clientX:e.clientX}`,u=`${e.touches?e.touches[0].clientY:e.clientY}`,h=null,m=null,clearInterval(r)}function _(n){const s=window.innerWidth;null!==d&&null!==u&&d>=20&&d<=s-20&&(h=`${n.touches?n.touches[0].clientX:n.clientX}`,m=`${n.touches?n.touches[0].clientY:n.clientY}`,t.style.transform=`translate3d(-${i.x*c+Math.round(d-h)}px, 0, 0)`),(m>=i.y-100||m<=150||h<=100||h>=s-100||Math.abs(u-m)>50)&&(p(),e.removeEventListener("touchmove",_),e.removeEventListener("mousemove",_))}function p(){const t=h&&d-h,n=m&&u-m,s=Math.abs(t),l=()=>{f(i.x*c,1,void 0,i.x*c),L()};v||(e.classList.remove("grabbing"),s>Math.abs(n)&&s>=50?t>=0?(b(i.x*c+Math.round(t)),d=null,u=null,h=null,currenTY=null):(x(i.x*c+Math.round(t)),d=null,u=null,h=null,currenTY=null):l())}i.x=e.offsetWidth,t.style.transform=`translate3d(-${i.x}px, 0, 0)`,o[0].classList.add("highlight"),"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?(e.addEventListener("touchstart",t=>{const n=t.target;!n.matches("button")&&!n.matches(".side_btn")&&!v&&(E(t),e.addEventListener("touchmove",_))},{passive:!0}),e.addEventListener("touchend",t=>{const n=t.target;!n.matches("button")&&!n.matches(".side_btn")&&!v&&(p(),e.removeEventListener("touchmove",_))},{passive:!0})):(e.addEventListener("mousedown",t=>{const n=t.target;!n.matches("button")&&!n.matches(".side_btn")&&!v&&(E(t),e.classList.add("grabbing"),e.addEventListener("mousemove",_))},{passive:!0}),e.addEventListener("mouseup",t=>{const n=t.target;!n.matches("button")&&!n.matches(".side_btn")&&!v&&(p(),e.removeEventListener("mousemove",_))},{passive:!0})),[...s.querySelectorAll(".m_thumbnail")].forEach(e=>{e.addEventListener("click",()=>{const t=c;v||(e.classList.add("highlight"),g(t>(c=+e.dataset.index)?0:1,t),L())})}),[...e.querySelectorAll(".side_btn")].forEach(e=>{e.classList.contains("m_slider_prev")?e.addEventListener("click",()=>{x()}):e.addEventListener("click",()=>{b()})}),window.addEventListener("focus",()=>{L()}),window.addEventListener("blur",()=>{clearInterval(r)}),window.addEventListener("resize",()=>{i.x=e.offsetWidth,t.style.transform=`translate3d(-${c*i.x}px, 0, 0)`,i.y=t.scrollHeight},{passive:!0}),L()}m_slider();
