<template>
  <div class="home">
    <h1 style="margin: auto; margin-bottom: 20px">进销存管理系统</h1>
    <div ref="main" style="height: 400px; max-width: 90%; margin: 0 auto"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";

const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  init();
});

function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "水果销售统计",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["香蕉", "苹果", "火龙果", "水蜜桃", "哈密瓜", "西瓜"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>
<style>
.home {
  height: 100%;
  margin: 10px 10px 10px 10px;
}
</style>
