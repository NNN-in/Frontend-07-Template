export class Dispatcher {
  constructor(element) {
    this.element = element;
  }

  dispatch(type, properties) {
    let event = new Event(type);

    for (let name in properties) {
      event[name] = properties[name]
    }

    this.element.dispatchEvent(event)
  }
}

// listen => recognize => dispatch
// new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(element, recognize) {
    let isListeningMouse = false;
    let contexts = new Map();

    element.addEventListener('mousedown', e => {
      let context = Object.create(null);
      contexts.set('mouse' + (1 << e.button), context);
      recognize.start(e, context);
    
      let mousemove = e => {
        // 掩码
        let button = 1;
        while (button <= e.buttons) {
          if (button & e.buttons) {
    
            // !!!!
            let key;
            if (button === 2)
              key = 4;
            else if (button === 4)
              key = 2;
            else 
              key = button;
    
            let context = contexts.get('mouse' + key);
    
            recognize.move(e, context);
          }
          button = button << 1;
        }
      }
    
      let mouseup = e => {
        let context = contexts.get('mouse' + (1 << e.button));
        recognize.end(e, context);
        contexts.delete(contexts.get('mouse' + (1 << e.button)));
    
        if (e.buttons === 0) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          isListeningMouse = false;
        }
      }
    
      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
      }
    });


    element.addEventListener('touchstart', e => {
      for (let touch of e.changeTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recognize.start(touch, context)
      }
    })

    element.addEventListener('touchmove', e => {
      for (let touch of e.changeTouches) {
        const context = contexts.get(touch.identifier)
        recognize.move(touch, context)
      }
    })

    element.addEventListener('touchend', e=> {
      for (let touch of e.changeTouches) {
        const context = contexts.get(touch.identifier)
        recognize.end(touch, context)
        contexts.delete(touch.identifier)
      }
    })

    // 比如alert打断
    element.addEventListener('touchcancel', e => {
      for (let touch of e.changeTouches) {
        const context = contexts.get(touch.identifier)
        recognize.cancel(touch, context)
        contexts.delete(touch.identifier)
      }
    })
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(point, context) {
    context.startX = point.clientX, context.startY = point.clientY;
  
    this.dispatcher.dispatch('start', {
      clientX: point.clientX,
      clientY: point.clientY
    })

    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]
  
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
  
    context.handler = setTimeout(() => {
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      context.handler = null;
  
      this.dispatcher.dispatch('press', {})
    }, 500);
  }
  
  move(point, context) {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
  
    if (!context.isPan && (dx ** 2 + dy ** 2 > 100)) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);

      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });

      clearTimeout(context.handler);
    }
  
    if (context.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }
  
    context.points = context.points.filter(point => Date.now() - point.t < 500)
  
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }
  
  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {})
      clearTimeout(context.handler)
    }
    if (context.isPress) {
      this.dispatcher.dispatch('pressend', {})
    }
    
    context.points = context.points.filter(point => Date.now() - point.t < 500);
  
    let d, v;
  
    if (!context.points.length) {
      v = 0;
    } else {
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
      v = d / (Date.now() - context.points[0].t);
    }
  
    if (v > 1.5) { // 像素每毫秒
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isFlick) {
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
    }
    
    this.dispatcher.dispatch('end', {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical,
      isFlick: context.isFlick,
      velocity: v
    });
  }
  
  cancel(point, context) {
    clearTimeout(context.handler)
    this.dispatcher.dispatch('cancel', {})
  }
}

export function enableGesture (element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}