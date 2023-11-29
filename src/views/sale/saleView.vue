<template>
  <div id="saleView">
    <a-card title="销售列表" :bordered="false">
      <template #extra>
        <a-input-search
          :style="{ width: '320px' }"
          placeholder="Please enter something"
        />
      </template>
      <a-table :columns="columns" :data="data" style="margin-top: 0px">
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-button status="danger" @click="doDelete(record)">删除</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const data = ref([]);

const columns = [
  {
    title: "产品名称",
    dataIndex: "productName",
  },
  {
    title: "销售人",
    width: 300,
    dataIndex: "userName",
  },
  {
    title: "销售数量",
    dataIndex: "saleQuantity",
  },
  {
    title: "销售总价",
    dataIndex: "saleTotal",
  },
  {
    title: "销售时间",
    dataIndex: "saleDate",
  },
  {
    title: "操作",
    width: 200,
    slotName: "optional",
  },
];

const doUpdate = (record: any) => {
  console.log(record);
};
const doDelete = (record: any) => {
  console.log(record);
};
</script>

<style scoped>
#saleView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
