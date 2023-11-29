<template>
  <div id="userView">
    <a-card title="用户列表" :bordered="false">
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
<script setup>
import { onMounted, ref } from "vue";
import { deleteUser, getSaleList, getUserList } from "@/api/user";
import axios from "axios";
import message from "@arco-design/web-vue/es/message";

const show = ref(true);

const data = ref([]);

const columns = [
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "用户简介",
    width: 300,
    dataIndex: "userProfile",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
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
const query = {
  pageNumber: 1,
  pageSize: 10,
};
const getUser = async () => {
  const res = await getUserList(query);
  data.value = res.data.records;
};

const doDelete = async (record) => {
  const data = {
    id: record.id,
  };
  deleteUser(data).then((res) => {
    if (res.code === 0) {
      message.success("删除成功");
      getUser();
    } else {
      message.error("删除失败" + res.message);
    }
  });
};

onMounted(() => {
  getUser();
});
</script>

<style scoped>
#userView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
