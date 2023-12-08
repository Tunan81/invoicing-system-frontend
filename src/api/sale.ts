import service from "@/plugins/axios";

// 获取销售列表
export function getSaleList(data: object) {
  return service({
    url: "/sale/list/page",
    method: "post",
    data,
  });
}

// 添加销售记录
export function addSale(data: object) {
  return service({
    url: "/sale/add",
    method: "post",
    data,
  });
}
