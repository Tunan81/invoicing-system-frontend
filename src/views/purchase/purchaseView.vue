<template>
  <div id="purchaseView">
    <a-card title="进货列表" :bordered="false">
      <template #extra>
        <a-button type="dashed" status="success" @click="doAdd"
          >新增采购订单
        </a-button>
        <a-input-search
          style="width: 200px; margin-left: 10px"
          placeholder="请输入名称"
        />
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
        style="margin-top: 0"
      >
        <template #purchaseTime="{ record }">
          {{ moment(record.purchaseTime).format("YYYY-MM-DD HH:mm:ss") }}
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
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>{{ isAdding ? "添加" : "修改" }}进货信息</template>
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
import { getPurchaseList, addPurchase, deletePurchase } from "@/api/purchase";
import moment from "moment";
import { Message } from "@arco-design/web-vue";
import { useStore } from "vuex";

const data = ref([]);
const isAdding = ref(true); // 默认为新增操作

const visible = ref(false);
const store = useStore();

/**
 * 总数
 */
const total = ref(0);

/**
 * 采购信息表单
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
  // 设置表单值为当前记录，用于修改操作
  form.value = { ...record };
  isAdding.value = false; // 将操作类型设置为修改
  visible.value = true; // 显示弹框
};

const doDelete = (record: any) => {
  deletePurchase(record.purchaseId).then((res) => {
    if (res.code === 0) {
      Message.success("删除成功");
      getPurchase();
    } else {
      Message.error("删除失败" + res.message);
    }
  });
};

const query = {
  pageNumber: 1,
  pageSize: 10,
};

const getPurchase = async () => {
  const res = await getPurchaseList(query);
  data.value = res.data.records;
  total.value = res.data.total;
};

onMounted(() => {
  getPurchase();
});

const doAdd = () => {
  isAdding.value = true; // 将操作类型设置为新增
  visible.value = true; // 显示弹框
};

const handleOk = () => {
  if (isAdding.value) {
    // 如果是新增操作
    addPurchase(form.value).then((res) => {
      // 处理新增成功与失败逻辑
      if (res.code === 0) {
        Message.success("添加成功");
        getPurchase();
      } else {
        Message.error("添加失败");
      }
    });
  } else {
    // 如果是修改操作
    // 执行更新操作，类似添加操作的处理
    // updatePurchase(form.value).then(...)
  }

  // 清空表单
  form.value = {
    productName: "",
    userId: store.state.user?.loginUser?.id,
    purchaseQuantity: "",
    totalCost: "",
    purchaseTime: "",
  };
  visible.value = false; // 关闭弹框
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
