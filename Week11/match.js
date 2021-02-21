// 因为没带电脑在ipad敲的可能不对，明天回去后会再修改😂

function matchSelector(selectorItem, element) {
  const reg = selectorItem.match(/(#|.)\w+/g);
  const className = element.className ? element.className.splite(' ') : [];
  const id = element.id;
  
  let m = true;
  
  reg.forEach(item => {
    const type = item.charAt(0);
    const name = item.slice(1);
    
    if (type === '.') {
      if (className.indexOf(name) === -1) {
        m = false;
      }
    } else if (type === '#') {
      if (id !== name) m = false;
    } else {
      if (element.tagName.toLowerCase() !== item) {
        m = false;
      }
    }
  });
  
  return m;
}

function match(selector, element) {
  const selectorArr = selector.split(' ').reverse();
  let parent = element;
  let m = true;
  
  selectorArr.forEach((sel, index) => {
    if (index === 0) {
      if (!matchSelector(sel, element)) {
        m = false;
      }
    } else if (m) {
      
      let mp = false;
      
      while(parent) {
        if (matchSelector(sel, parent)) {
          mp = true;
          break;
        } else {
          parent = element.parentElement;
        }
      }
      
      if (!mp) {
        m = false;
      }
    }
  })  



  return m;
}


match('div #id.class', document.getElementById('id'));


