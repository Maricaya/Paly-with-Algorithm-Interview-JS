// 215 kth largest element in an array
// https://github.com/sisterAn/JavaScript-Algorithms/issues/60
// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/javascriptsi-chong-fang-shi-jie-topkwen-ti-by-user/
function swap (arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}

let findKthLargest = function(nums, k) {
  // 转换为找到 升序数组 第 n - k 位
  return quickSelect(nums, nums.length - k,0, nums.length - 1)
};

let quickSelect = (arr, k, left, right) => {
  if (left >= right) {
    return arr[left]
  }
  // 划分数组
  // 随机一个数的位置，小数在左侧，大数在右侧
  const index = partition(arr, left, right)
  // Top k
  if (k === index) {
    return arr[index]
  } else if (k < index) {
    // Top k 在左边
    return quickSelect(arr, k, left, index-1)
  } else {
    // Top k 在右边
    return quickSelect(arr, k,index+1, right)
  }
}


let partition = (array, start, end) => {
  let j = start
  let index = Math.floor(Math.random()*(end - start + 1) + start)
  swap(array, index, end)
  let pivot = array[end]
  for (let i = start; i <= end; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j)
      j++
    }
  }
  return j - 1
}

console.log(findKthLargest([3,2,1,5,6,4], 2))
