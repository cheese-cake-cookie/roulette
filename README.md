# roulette

### 캔버스 태그를 이용한 룰렛


- CanvasRenderingContext2D.save(): 캔버스의 현재 상태를 스택에 넣어 모든 state를 저장하는 canvas 2D API
  ```
  스택에 저장되는 상태 정보
  - transformation matrix.
  - current clipping region.
  - current dash list.
  - current values of the following attributes: 
  strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled.
  ```
- CanvasRenderingContext2D.restore(): 저장된 스택 중 가장 최근 state를 불러옴. 저장된 state가 없다면 아무 동작도 하지 않는다.


### reference
https://github.com/ddkangfu/wheel/blob/master/src/wheel.js