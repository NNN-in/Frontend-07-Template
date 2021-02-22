function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }
  
  for (var prop in element.computedStyle) {
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;
    
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  
  return element.style;
}


function layout(element) {
  if (!element.computedStyle) return;
  
  // 父元素
  var elementStyle = getStyle(element);
  
  if (elementStyle.display !== 'flex') {
    return;
  }
  
  var items = element.children.filter(e => e.type === 'element')
  
  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  });
  
  var style = elementStyle;
  
  ['width', 'height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  })
  
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch'; 
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  var mainSize, mainStart, mainEnd, mainSign, mainBase, 
  crossSize, crossStart, crossEnd, crossSign, crossBase;

  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexWrap === 'wrap-reverse') {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 元素进行
  var isAutoMainSize = false; 

  if (!style[mainSize]) { // auto sizing
    elementStyle[mainSize] = 0;

    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var itemStyle = getStyle(item);

      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void(0))) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }

    isAutoMainSize = true;
  }

  var flexLine = [];
  var flexLines = [flexLine];
  var mainSpace = elementStyle[mainSize]; // 剩余空间
  var crossSpace = 0;

  for (var i = 0; i < items.length; i += 1) {
    var item = items[i];
    var itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    // { flex: xxx }
    if (itemStyle.flex) { // 可伸缩
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];

      if (itemStyle[crossSign] !== null && itemStyle[crossSize] !== (void(0))) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]) // 行高最高的 为一行的高度
      }

      flexLine.push(item);
    } else { 
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }

      if (mainSpace < itemStyle[mainSize]) { // 换行  放不下
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item]; // 创建新行
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else { // 放得下
        flexLine.push(item); 
      }

      if (itemStyle[crossSign] !== null && itemStyle[crossSize] !== (void(0))) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }

      mainSpace -= itemStyle[mainSize];
    }
  }

  flexLine.mainSpace = mainSpace;

  // console.log(items)

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) { // 剩余空间不够，flex元素宽度变成0，剩余元素压缩
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;

    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var itemStyle = getStyle(item);

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else { // 多行
    flexLines.forEach(items => {
      var mainSpace = items.mainSpace;
      var flexTotal = 0;

      for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        var itemStyle = getStyle(item);

        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) {
        var currentMain = mainBase;

        for (var i = 0; i < items.length; i += 1) {
          var item = items[i];
          var itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }

          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else { // no flexible element
        var { justifyContent } = style;
        var currentMain, 
        step; // 间隔

        if (justifyContent === 'flex-start') {
          currentMain = mainBase;
          step = 0;
        }

        if (justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase;
          step = 0
        }

        if (justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase;
          step = 0;
        }

        if (justifyContent === 'space-between') {
          currentMain = mainBase;
          step = mainSpace / (items.length - 1) * mainSign;
        }

        if (justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentMain = mainBase + step / 2;
        }

        for (var i = 0; i < items.length; i += 1) {
          var item = items[i];
          var itemStyle = getStyle(item);

          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }

  // 交叉轴
  var crossSpace;

  if (!style[crossSize]) {
    crossSpace = 0;
    elementStyle[crossSize] = 0;

    for (var i = 0; i < flexLines.length; i += 1) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    } 
  } else {
    crossSpace = style[crossSize];

    for (var i = 0; i < flexLines.length; i += 1) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  var lineSize = style[crossSize] / flexLines.length;
  var step;

  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }

  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }

  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }

  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    crossBase += crossSign * step / 2;
  }

  if (style.alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1);
    crossBase += 0;
  }

  if (style.alignContent === 'stretch') {
    crossBase += 0;
    step = 0;
  }

  flexLines.forEach(items => {
    var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;

      if (item === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
      }

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }

      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * (
          (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) 
            ? itemStyle[crossSize] 
            : lineCrossSize);
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);

      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });

  console.log(items)
  
}


module.exports = layout;




















