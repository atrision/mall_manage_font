<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-25 16:48:53
 * @LastEditors: misuzu 1411498103@qq.com
 * @LastEditTime: 2025-03-05 18:25:28
 * @FilePath: \RuoYi-Vue3-master\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <div class="welcome-container">
          <h1>欢迎使用后台管理系统</h1>
          <p>{{ getCurrentTime() }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="mt20">
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>访问数据</span>
              <el-icon><DataLine /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ visitCount }}</h2>
            <p>今日访问量</p>
            <div class="visit-trend">
              <small>周同比 <span :class="weekGrowth >= 0 ? 'up' : 'down'">{{ weekGrowth }}%</span></small>
              <small>日同比 <span :class="dayGrowth >= 0 ? 'up' : 'down'">{{ dayGrowth }}%</span></small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>用户总数</span>
              <el-icon><User /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ userTotal }}</h2>
            <p>注册用户数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>投放广告</span>
              <el-icon><Picture /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ bannerTotal }}</h2>
            <p>在投广告数量</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>任务进度</span>
              <el-icon><List /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <el-progress :percentage="80" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>商品总数</span>
              <el-icon><Goods /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ productTotal }}</h2>
            <p>在售商品数量</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>订单总数</span>
              <el-icon><List /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ orderTotal }}</h2>
            <p>总订单数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>销售总额</span>
              <el-icon><Money /></el-icon>
            </div>
          </template>
          <div class="card-body">
            <h2>￥{{ totalSales.toFixed(2) }}</h2>
            <p>已完成订单总额</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import { DataLine, User, Picture, List, Goods, Money } from '@element-plus/icons-vue'
import { listProducts } from "@/api/manage/products";
import { listOrders } from "@/api/manage/orders";
import { listUsers } from "@/api/manage/users";
import { listBanners } from "@/api/manage/banners";
import { getVisitStats } from "@/api/system/visit";

const getCurrentTime = () => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
}

const productTotal = ref(0)
const orderTotal = ref(0)
const totalSales = ref(0)
const userTotal = ref(0)
const bannerTotal = ref(0)
const visitCount = ref(0)
const weekGrowth = ref(0)
const dayGrowth = ref(0)

// 获取商品总数
const getProductTotal = async () => {
  try {
    const response = await listProducts({ pageNum: 1, pageSize: 1 })
    productTotal.value = response.total
  } catch (error) {
    console.error('获取商品总数失败:', error)
  }
}

// 获取用户总数
const getUserTotal = async () => {
  try {
    const response = await listUsers({ pageNum: 1, pageSize: 1 })
    userTotal.value = response.total
  } catch (error) {
    console.error('获取用户总数失败:', error)
  }
}

// 获取订单总数和销售总额
const getOrderTotal = async () => {
  try {
    // 获取所有订单数据
    const response = await listOrders({ 
      pageNum: 1, 
      pageSize: 9999,  // 设置较大的页面大小以获取所有数据
      orderStatus: 3   // 3-已完成状态
    })
    orderTotal.value = response.total
    
    // 计算已完成订单的总金额
    totalSales.value = response.rows.reduce((sum, order) => {
      return sum + Number(order.totalAmount)
    }, 0)
  } catch (error) {
    console.error('获取订单数据失败:', error)
  }
}

// 获取广告数量
const getBannerTotal = async () => {
  try {
    const response = await listBanners({ 
      pageNum: 1, 
      pageSize: 1,
      status: 1  // 1-启用状态
    })
    bannerTotal.value = response.total
  } catch (error) {
    console.error('获取广告数量失败:', error)
  }
}

// 获取访问数据
const getVisitData = async () => {
  try {
    const { todayVisits, weekGrowthRate, dayGrowthRate } = await getVisitStats()
    visitCount.value = todayVisits
    weekGrowth.value = weekGrowthRate
    dayGrowth.value = dayGrowthRate
  } catch (error) {
    console.error('获取访问数据失败:', error)
  }
}

// 定时刷新访问数据
let timer = null

onMounted(() => {
  getVisitData() // 首次加载
  // 每30秒更新一次数据
  timer = setInterval(() => {
    getVisitData()
  }, 30000)
  
  getProductTotal()
  getOrderTotal()
  getUserTotal()
  getBannerTotal()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped lang="scss">
.home {
  padding: 20px;
  
  .welcome-container {
    text-align: center;
    padding: 40px 0;
    background: linear-gradient(to right, #1890ff, #36cfc9);
    border-radius: 8px;
    color: white;
    margin-bottom: 20px;

    h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      opacity: 0.8;
    }
  }

  .mt20 {
    margin-top: 20px;
  }

  .el-card {
    margin-bottom: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .el-icon {
        font-size: 20px;
        color: #409EFF;
      }
    }

    .card-body {
      text-align: center;
      
      h2 {
        font-size: 24px;
        color: #303133;
        margin: 10px 0;
        &.sales {
          color: #67C23A;  // 给销售额添加绿色
        }
      }

      p {
        color: #909399;
        font-size: 14px;
      }

      .visit-trend {
        margin-top: 8px;
        font-size: 12px;
        
        small {
          margin-right: 10px;
          
          .up {
            color: #67C23A;
            &::before {
              content: "↑";
            }
          }
          
          .down {
            color: #F56C6C;
            &::before {
              content: "↓";
            }
          }
        }
      }
    }
  }
}
</style>

