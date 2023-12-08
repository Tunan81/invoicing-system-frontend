<template>
  <div id="purchaseView">
    <a-card title="进货列表" :bordered="false">
      <template #extra>
        <a-button type="dashed" status="success" @click="doAdd"
          >添加进货信息
        </a-button>
        <a-input-search
          style="width: 200px; margin-left: 10px"
          placeholder="Please enter something"
        />
      </template>
      <a-table :columns="columns" :data="data" style="margin-top: 0px">
        <template #purchaseTime="{ record }">
          {{ moment(record.purchaseTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-button status="danger" @click="doDelete(record)">删除</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>添加进货信息</template>
    <a-form :model="form">
      <a-form-item label="商品名称" field="productName">
        <a-input
          v-model="form.productName"
          placeholder="请输入商品名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="采购数量" field="purchaseQuantity">
        <a-input-number
          v-model="form.purchaseQuantity"
          placeholder="请输入采购数量"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="采购总价" field="totalCost">
        <a-input-number
          v-model="form.totalCost"
          placeholder="请输入总价"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="采购时间" field="purchaseTime">
        <a-date-picker v-model="form.purchaseTime" style="width: 200px" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPurchaseList, addPurchase } from "@/api/purchase";
import moment from "moment";
import { Message } from "@arco-design/web-vue";
import { useStore } from "vuex";

const data = ref([]);

const visible = ref(false);
const store = useStore();

/**
 * 采购信息表单s
 */
const form = ref({
  productName: "",
  userId: store.state.user?.loginUser?.id,
  purchaseQuantity: "",
  totalCost: "",
  purchaseTime: "",
});

const columns = [
  {
    title: "产品名称",
    dataIndex: "productName",
  },
  {
    title: "采购人",
    width: 300,
    dataIndex: "userName",
  },
  {
    title: "采购数量",
    dataIndex: "purchaseQuantity",
  },
  {
    title: "采购总价",
    dataIndex: "totalCost",
  },
  {
    title: "采购时间",
    slotName: "purchaseTime",
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

const query = {
  pageNumber: 1,
  pageSize: 10,
};

const getPurchase = async () => {
  const res = await getPurchaseList(query);
  data.value = res.data.records;
};

onMounted(() => {
  getPurchase();
});
const doAdd = () => {
  visible.value = true;
};

const handleOk = () => {
  addPurchase(form.value).then((res) => {
    if (res.code === 0) {
      Message.success("添加成功");
      getPurchase();
    } else {
      Message.error("添加失败");
    }
  });
  visible.value = false;
};

const handleCancel = () => {
  // 清空表单
  form.value = {
    productName: "",
    userId: store.state.user?.loginUser?.id,
    purchaseQuantity: "",
    totalCost: "",
    purchaseTime: "",
  };
  visible.value = false;
};
</script>

<style scoped>
#purchaseView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
