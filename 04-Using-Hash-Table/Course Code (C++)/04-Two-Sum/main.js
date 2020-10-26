// 一个使用查找表的经典问题
// 1. two sum
// 放入查找表，将所有元素放入查找表，之后对于每一个元素a，
// 查找 target - a 是否存在
function twoSum(nums, target) {
    const record = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (record[complement] >= 0) {
            return [i, record[complement]]
        }
        record[nums[i]] = i
    }
    console.log(record)
}

console.log(twoSum([2, 7, 11, 15], 9))

function twoSum1(nums, target) {
    // nums.sort((a, b) => a - b)
    // let l = 0, r = nums.length-1
    // while (l< r) {
    //     if (nums[l] + nums[r] < target) {
    //         l++
    //     } else if (nums[l] + nums[r] > target) {
    //         r--
    //     } else {
    //         return [l, r]
    //     }
    // }
}
console.log(twoSum1([3, 3], 6))
// 练习题 15. 3sum
function sum3(nums, target) {
    // nums.sort((a, b) => a - b)
    // const result = []
    // for (let i = 0; i < nums.length - 2; i++) {
    //     if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
    //     let l = i+1, r = nums.length-1
    //     while (l< r) {
    //         let sum = nums[l] + nums[r] + nums[i]
    //         if (sum < target) {
    //             l++
    //         } else if (sum > target) {
    //             r--
    //         } else {
    //             result.push([nums[i],nums[l],nums[r]])
    //             // 去重
    //             while (l<r && nums[l] === nums[l+1]) { l++ }
    //             while (l<r && nums[r] === nums[r-1]) { r-- }
    //             l++;r--;
    //         }
    //     }
    // }
    // return result
}
// console.log(sum3([-1,0,1,2,-1,-4], 0))
// 18. 4sum
const fourSum = function (nums, target) {
    const result = []
    for (let i = 0; i < nums.length-3; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue
        const threeResult = sum3(nums.slice(i+1), target - nums[i])
        threeResult.map(item => {
            result.push([nums[i], ...item])
        })
    }
    return result
}
fourSum([1,0,-1,0,-2,2],  0)
// 16. 3sum closest
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b)
    const result = []
    let abs = Infinity
    for (let i = 0; i < nums.length - 2; i++) {
        // if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
        let l = i+1, r = nums.length-1
        while (l< r) {
            let sum = nums[l] + nums[r] + nums[i]
            if (Math.abs(sum - target) <  abs ) {
                abs = sum
            }
            if (sum < target) {
                l++
            } else if (sum > target) {
                r--
            } else {
                result.push([nums[i],nums[l],nums[r]])
                // 去重
                // while (l<r && nums[l] === nums[l+1]) { l++ }
                // while (l<r && nums[r] === nums[r-1]) { r-- }
                l++;r--;
                return abs
            }
        }
    }
    return result
}

