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
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
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
    <template #title>修改用户信息</template>
    <a-form :model="form">
      <a-form-item label="用户名">
        <a-input v-model="form.userName" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item label="个人简介">
        <a-input v-model="form.userProfile" placeholder="请输入密码"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { deleteUser, getUserList, updateUser } from "@/api/user";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";

const visible = ref(false);

const data = ref([]);

// 新增一个变量，表示当前操作类型，默认为空（即添加用户）
const operationType = ref("");
const form = ref({
  userName: "",
  userProfile: "",
});

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
    slotName: "createTime",
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

const doUpdate = (record) => {
  operationType.value = "edit";
  visible.value = true;
  form.value = { ...record };
};

const handleOk = () => {
  updateUser(form.value).then((res) => {
    if (res.code === 0) {
      message.success("修改成功");
      getUser();
    } else {
      message.error("修改失败" + res.message);
    }
  });
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};
</script>

<style scoped>
#userView {
  margin: 10px 10px 10px 10px;
}

:deep(.arco-card-header-title) {
  flex: none;
}
</style>
