import { Component, createElement } from './framework';
import Carousel from './Carousel';
import { Button } from './Button';
import { List } from './List';
const imgs = [
  {
    img: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    url: 'https://www.baidu.com',
    title: 'title'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    url: 'https://www.baidu.com',
    title: 'title'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    url: 'https://www.baidu.com',
    title: 'title'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    url: 'https://www.baidu.com',
    title: 'title'
  }
]

// const a = <Carousel src={imgs} onChange={ e => console.log(e.detail.position)} onClick={e => window.location.href = e.detail.data.url}></Carousel>;

// a.mountTo(document.body);


// let tl = new TimeLine();
// tl.add(new Animation({}, 'a', 0, 100, 1000, null))
// tl.start();

let a = <List data={imgs}>
  {
    record => 
    <div>
      <img src={record.img} />
      <a href={record.url}>{record.title}</a>
    </div>
  }
</List>
a.mountTo(document.body)


