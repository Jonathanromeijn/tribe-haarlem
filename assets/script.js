document.addEventListener('DOMContentLoaded',function(){
var b=document.querySelector('.burger'),n=document.querySelector('.nav-links');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')});
n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false')})})}
document.querySelectorAll('.faq-item').forEach(function(i){var q=i.querySelector('.faq-q');if(!q)return;
q.addEventListener('click',function(){var o=i.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(x){if(x!==i)x.classList.remove('open')});i.classList.toggle('open',!o)})});

var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* auto-swipe slider */
document.querySelectorAll('[data-slider]').forEach(function(s){
var track=s.querySelector('.slides'),dots=s.querySelectorAll('.dot'),count=track.children.length,i=0,timer=null,resume=null;
function go(k){i=(k+count)%count;track.scrollTo({left:i*track.clientWidth,behavior:'smooth'})}
function start(){if(reduce||timer)return;timer=setInterval(function(){go(i+1)},4200)}
function stop(){clearInterval(timer);timer=null;clearTimeout(resume)}
function later(){stop();resume=setTimeout(start,6000)}
track.addEventListener('scroll',function(){var k=Math.round(track.scrollLeft/track.clientWidth);i=k;dots.forEach(function(d,x){d.classList.toggle('on',x===k)})},{passive:true});
dots.forEach(function(d,x){d.addEventListener('click',function(){go(x);later()})});
s.addEventListener('touchstart',stop,{passive:true});s.addEventListener('touchend',later,{passive:true});
s.addEventListener('mouseenter',stop);s.addEventListener('mouseleave',start);
document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
start();
});

/* zacht inschuiven bij scrollen */
if('IntersectionObserver' in window&&!reduce){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.section-head,.offer-card,.photo-card,.strip>*,.two-col>*,.price-card,.step,.job-card,.info-card,.callout,.faq-cat').forEach(function(el){el.classList.add('pre');io.observe(el)});
}
});
