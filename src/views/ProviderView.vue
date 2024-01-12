<script setup lang="ts">
import { onMounted, ref } from "vue";
import { addProvider, getProviderList } from "@/api/provider";
import { Message } from "@arco-design/web-vue";

/**
 * 总数
 */
const total = ref(0);

const data = ref([]);
const columns = [
  {
    title: "供应商编号",
    dataIndex: "providerNo",
  },
  {
    title: "供应商名称",
    dataIndex: "providerName",
  },
  {
    title: "供应商联系人",
    dataIndex: "providerPerson",
  },
  {
    title: "联系电话",
    dataIndex: "providerPhone",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
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
  const res = await getProviderList(query);
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

const form = ref();

const doAdd = () => {
  addProvider(form.value).then((res) => {
    if (res.code === 0) {
      Message.success("添加成功");
    } else {
      Message.error("添加失败");
    }
  });
};
</script>

<template>
  <div id="providerView">
    <a-card title="供应商列表" :bordered="false">
      <template #extra>
        <a-input-search :style="{ width: '320px' }" placeholder="请输入名称" />
        <a-button
          style="margin-left: 10px"
          type="dashed"
          status="success"
          @click="doAdd"
          >新增采购商
        </a-button>
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

<style scoped>
#providerView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
