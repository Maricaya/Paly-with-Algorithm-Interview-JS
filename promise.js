const promiseAll = function (promiseArrays) {
  //在Promise类上添加一个all方法，接受一个传进来的promise数组
  return new Promise((resolve, reject) => { //返回一个新的Promise
    let arr = []; //定义一个空数组存放结果
    let count = 0;
    for (let i = 0; i < promiseArrays.length; i++) { //循环遍历数组
      promiseArrays[i].then((data) => {
        handleData(i, data); //将结果和索引传入handleData函数
      }, reject)
    }

    function handleData(index, data) { //处理数据函数
      arr[index] = data;
      count++;
      if (count === promiseArrays.length) { //当i等于传递的数组的长度时
        resolve(arr); //执行resolve,并将结果放入
      }
    }
  })
}

const allSettled = (promiseList) => {
  const handlePromise = (promise) =>
    promise.then(
      value => ({status: 'fulfilled', value}),
      reason => ({status: 'rejected', reason})
    )
  return promiseAll(promiseList.map(handlePromise))
}

// 并行
const race = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    promise.then(resolve, reject)
  })
})
// https://github.com/Maricaya/binary-tree/blob/master/%E5%AE%9E%E7%8E%B0%E7%B1%BB/promise%E5%B9%B6%E8%A1%8C%E6%94%B9%E4%B8%BA%E4%B8%B2%E8%A1%8C.js
// 并行改为串行，reduce、async await

// finally 只是不管成功还是失败都会执行而已（不是最后执行）
// https://www.bookstack.cn/read/es6-3rd/spilt.5.docs-promise.md
Promise.prototype._finally = function (onFinally) {
  // 第一步获取构建函数，这里constructor就是获取，为什么用这个呢？
  // 主要是以前的promise实现有第三方的存在
  let P = this.constructor;
  return this.then(
    // 为什么需要Promise.resolve(callback()).then(() => value)
    // 因为callback如果是个异步操作，返回promise, 等 callback执行完再接着执行
    value  => P.resolve(onFinally()).then(() => value),
    reason => P.resolve(onFinally()).then(() => { throw reason })
  );
};

// =================== 下面是测试 ===================
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('定时器1')
  }, 3000)
});

let promise2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('定时器2')
  }, 2000);
})

let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('定时器3')
  }, 1000);
})

promiseAll([promise2, promise1]).then(res => {
  console.log(res)
})
allSettled([promise2, promise1, promise3]).then(res => {
  console.log(res)
})
race([promise2, promise1]).then(res => {
  console.log(res)
})
promise2.finally(res => {
  console.log('不管成功失败，这里都会搞事情')
})
promise2._finally(res => {
  console.log('_finally', res)
})
