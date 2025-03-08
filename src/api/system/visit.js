import request from '@/utils/request'

// 模拟访问统计数据API

// 模拟访问统计数据
export function getVisitStats() {
  // 返回一个 Promise，模拟异步请求
  return new Promise((resolve) => {
    // 生成随机数据
    const mockData = {
      todayVisits: Math.floor(Math.random() * 1000) + 500, // 500-1500 之间的随机数
      weekGrowthRate: (Math.random() * 20 - 10).toFixed(1), // -10 到 +10 之间的随机数
      dayGrowthRate: (Math.random() * 20 - 10).toFixed(1)   // -10 到 +10 之间的随机数
    }
    
    // 模拟网络延迟
    setTimeout(() => {
      resolve(mockData)
    }, 300)
  })
} 