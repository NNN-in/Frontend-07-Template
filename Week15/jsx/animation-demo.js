import { TimeLine, Animation } from './animation.js';
import { ease } from './ease.js';
let tl = new TimeLine();
tl.start();

const div = document.getElementById('el');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

tl.add(
  new Animation(
    div.style, 
    'transform', 0, 500, 5000, 0,  ease, v=> `translateX(${v}px)` ))

pause.addEventListener('click', () => {
  tl.pause();
})

resume.addEventListener('click', () => {
  tl.resume()
})
