const COLORS = ['#e6e6e6', '#fff'];
// const COLORS = ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32'];
const WINNING_NUMBER = 4; // 당첨 상품 id
const SLOTS = [
  { id: 1, name: '1캐시', cash: 1 },
  { id: 2, name: '100캐시', cash: 100 },
  { id: 3, name: '500캐시', cash: 500 },
  { id: 4, name: '700캐시', cash: 700 },
  { id: 5, name: '1,000캐시', cash: 1000 },
  { id: 6, name: '3,000캐시', cash: 3000 },
  // { id: 7, name: '7000캐시', cash: 7000 },
  // { id: 8, name: '8000캐시', cash: 8000 },
  // { id: 9, name: '9000캐시', cash: 9000 },
  // { id: 10, name: '10000캐시', cash: 10000 },
  // { id: 11, name: '10000캐시', cash: 11000 },
  // { id: 12, name: '10000캐시', cash: 12000 },
];
const winnerItemIndex = SLOTS.findIndex(slot => slot.id == WINNING_NUMBER);
const degreeOfPointer = -90; // 캔버스 대지 0도를 기준으로 pointer의 위치
const degreeOfSlot = 360 / SLOTS.length;
const rotateCount = 7;
let rotateAnimationRequest = null;
let rotateDegree = 0; // 룰렛 drawing 기준 degree
let currentTime = 0;

// dom element
const $roulette = document.getElementById('roulette');
const $startButton = $roulette.querySelector('.actions > .button');
const $canvas = document.getElementById('canvas');

const ctx = $canvas.getContext('2d');

$canvas.width = $canvas.clientWidth;
$canvas.height = $canvas.clientHeight;

// event
$startButton.addEventListener('click', () => {
  window.requestAnimationFrame(rotateRoullete);
});

// functions
const renderItem = (index, item) => {
  const startDegree = index * degreeOfSlot + rotateDegree + degreeOfPointer; // pointer 위치를 0도로 산정하기 위해 시계 반대방향으로 90도 회전한 부분부터 item을 그린다.
  const endDegree = (index + 1) * degreeOfSlot + rotateDegree + degreeOfPointer;
  const centerDegree = startDegree + degreeOfSlot / 2;
  const text = ctx.measureText(item.name);

  ctx.fillStyle = COLORS[index % 2];
  ctx.strokeStyle = COLORS[index % 2];
  ctx.beginPath();
  ctx.arc($canvas.width / 2, $canvas.height / 2, $canvas.width / 2, degreeToRadian(startDegree), degreeToRadian(endDegree));
  ctx.lineTo($canvas.width / 2, $canvas.height / 2);
  ctx.stroke();
  ctx.fill();
  ctx.save();

  const textRadius = $canvas.width / 2 - 40;

  ctx.translate($canvas.width / 2 + Math.cos(degreeToRadian((centerDegree))) * textRadius, $canvas.height / 2 + Math.sin(degreeToRadian((centerDegree))) * textRadius);
  ctx.rotate(degreeToRadian(centerDegree + 90));
  ctx.font = '18px Apple SD Gothic Neo';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'black';
  ctx.fillText(item.name, ctx.measureText(item.name).width / 2 * -1, 0);
  ctx.restore();
}

const renderItems = () => {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  SLOTS.forEach((slot, index) => { renderItem(index, slot) });
}

const degreeToRadian = (degree) => {
  if (degree == 0) return 0;

  return Math.PI * degree / 180;
}

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

/**
 * t: current time (or frame)
 * b: start value
 * c: change between the beginning and destination of the property
 * d: duration (time or frame)
*/
const easeInOutCirc = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  t -= 2;
  return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
}

const rotateRoullete = () => {
  // 총 회전 각도에서 당첨 slot 각도만큼 '덜' 돌아야 당첨 slot에 멈출 수 있다.
  const rotateTo = rotateCount * 360 - getRandomArbitrary(winnerItemIndex * degreeOfSlot, (winnerItemIndex + 1) * degreeOfSlot);

  if (rotateDegree >= rotateTo) {
    window.cancelAnimationFrame(rotateAnimationRequest);
    rotateAnimationRequest = null;
    return;
  }

  currentTime += 1;
  rotateDegree += easeInOutCirc(currentTime, 0, rotateTo - rotateDegree, 800);
  renderItems();
  rotateAnimationRequest = window.requestAnimationFrame(rotateRoullete);
};

renderItems();