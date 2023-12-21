<template>
  <div id="productView">
    <a-card title="产品列表" :bordered="false">
      <template #extra>
        <a-input-search :style="{ width: '320px' }" placeholder="请输入名称" />
      </template>
      <a-table
        :columns="columns"
        :data="data"
        :page-position="{
          showTotal: true,
          pageSize: query.pageSize,
          current: query.pageNumber,
          total,
        }"
        @page-change="onPageChange"
        style="margin-top: 0px"
      >
        <template #stockQuantity="{ record }">
          <a-tag v-if="record.stockQuantity >= 100" color="green">
            {{ record.stockQuantity }}
          </a-tag>
          <a-tag v-else-if="record.stockQuantity >= 10" color="orange">
            {{ record.stockQuantity }}
          </a-tag>
          <a-tag v-else color="red">
            {{ record.stockQuantity }}
          </a-tag>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-popconfirm
              content="确认删除吗?"
              type="error"
              @ok="doDelete(record)"
            >
              <a-button status="danger"> 删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { getProductList } from "@/api/product";

/**
 * 总数
 */
const total = ref(0);

const data = ref([]);
const columns = [
  {
    title: "产品名称",
    dataIndex: "productName",
  },
  {
    title: "产品描述",
    width: 300,
    dataIndex: "productDescription",
  },
  {
    title: "产品进价",
    dataIndex: "purchasePrice",
  },
  {
    title: "销售价格",
    dataIndex: "salePrice",
  },
  {
    title: "产品库存",
    dataIndex: "stockQuantity",
    slotName: "stockQuantity",
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
const query = ref({
  pageSize: 10,
  pageNumber: 1,
});

const getProduct = async () => {
  const res = await getProductList(query);
  data.value = res.data.records;
  total.value = res.data.total;
};

onMounted(() => {
  getProduct();
});

const onPageChange = (page: number) => {
  query.value = {
    ...query.value,
    pageNumber: page,
  };
};
</script>

<style scoped>
#productView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
