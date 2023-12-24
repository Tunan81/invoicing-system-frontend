<template>
  <div id="saleView">
    <a-card title="销售列表" :bordered="false">
      <template #extra>
        <a-button type="dashed" status="success" @click="doAdd"
          >添加销售信息
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
        @page-change="onPageChange"
        style="margin-top: 0px"
      >
        <template #saleDate="{ record }">
          {{ moment(record.saleDate).format("YYYY-MM-DD HH:mm:ss") }}
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
    <template #title>添加销售信息</template>
    <a-form :model="form">
      <a-form-item label="商品名称" field="productName">
        <a-input
          v-model="form.productName"
          placeholder="请输入商品名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="销售数量" field="saleQuantity">
        <a-input-number
          v-model="form.saleQuantity"
          placeholder="请输入销售数量"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="销售总价" field="saleTotal">
        <a-input-number
          v-model="form.saleTotal"
          placeholder="请输入总价"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="销售时间" field="saleDate">
        <a-date-picker v-model="form.saleDate" style="width: 200px" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal
    v-model:visible="updateVisible"
    @ok="handleUpdate"
    @cancel="handleUpdateCancel"
  >
    <template #title>修改销售信息</template>
    <a-form :model="updateForm">
      <a-form-item label="商品名称" field="productName">
        <a-input
          v-model="updateForm.productName"
          placeholder="请输入商品名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="销售数量" field="saleQuantity">
        <a-input-number
          v-model="updateForm.saleQuantity"
          placeholder="请输入销售数量"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="销售总价" field="saleTotal">
        <a-input-number
          v-model="updateForm.saleTotal"
          placeholder="请输入总价"
          class="input-demo"
          :min="0"
        />
      </a-form-item>
      <a-form-item label="销售时间" field="saleDate">
        <a-date-picker v-model="updateForm.saleDate" style="width: 200px" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { addSale, deleteSale, getSaleList, updateSale } from "@/api/sale";
import moment from "moment";
import { useStore } from "vuex";
import { Message } from "@arco-design/web-vue";

const store = useStore();
const data = ref([]);
const visible = ref(false);

// 新增更新销售信息相关的数据
const updateVisible = ref(false);
const updateForm = ref({
  saleId: null,
  productName: "",
  saleQuantity: 0,
  saleTotal: 0,
  saleDate: "",
});

// 修改doUpdate方法以显示修改销售信息的弹窗
const doUpdate = (record: any) => {
  updateForm.value = {
    saleId: record.saleId,
    productName: record.productName,
    saleQuantity: record.saleQuantity,
    saleTotal: record.saleTotal,
    saleDate: record.saleDate,
  };
  updateVisible.value = true;
};

// 处理更新销售信息的确认事件
const handleUpdate = () => {
  // 调用更新销售信息的接口
  updateSale(updateForm.value).then((res) => {
    if (res.code === 0) {
      Message.success("更新成功");
      getSale();
      updateVisible.value = false;
    } else {
      Message.error("更新失败" + res.message);
    }
  });
};

// 处理取消更新销售信息的事件
const handleUpdateCancel = () => {
  // 关闭弹窗并清空表单数据
  updateVisible.value = false;
  updateForm.value = {
    saleId: null,
    productName: "",
    saleQuantity: 0,
    saleTotal: 0,
    saleDate: "",
  };
};

/**
 * 总数
 */
const total = ref(0);
const form = ref({
  productName: "",
  userName: store.state.user?.loginUser?.userName,
  userId: store.state.user?.loginUser?.id,
  saleQuantity: 0,
  saleTotal: 0,
  saleDate: "",
});

const columns = [
  {
    title: "产品名称",
    dataIndex: "productName",
  },
  {
    title: "销售人",
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
    slotName: "saleDate",
  },
  {
    title: "操作",
    width: 200,
    slotName: "optional",
  },
];

const doDelete = (record: any) => {
  deleteSale(record.saleId).then((res) => {
    if (res.code === 0) {
      Message.success("删除成功");
      getSale();
    } else {
      Message.error("删除失败" + res.message);
    }
  });
};

const query = ref({
  pageNumber: 1,
  pageSize: 10,
});

const getSale = async () => {
  const res = await getSaleList(query);
  data.value = res.data.records;
  total.value = res.data.total;
};

onMounted(() => {
  getSale();
});

const doAdd = () => {
  visible.value = true;
};

const handleOk = () => {
  addSale(form.value).then((res) => {
    if (res.code === 0) {
      Message.success("添加成功");
      getSale();
    } else {
      Message.error("添加失败" + res.message);
    }
  });
  visible.value = false;
};

const handleCancel = () => {
  form.value = {
    productName: "",
    userName: store.state.user?.loginUser?.userName,
    userId: store.state.user?.loginUser?.id,
    saleQuantity: 0,
    saleTotal: 0,
    saleDate: "",
  };
  visible.value = false;
};
const onPageChange = (page: number) => {
  query.value = {
    ...query.value,
    pageNumber: page,
  };
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
