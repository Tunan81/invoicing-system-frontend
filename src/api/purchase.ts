import service from "@/plugins/axios";

// 获取采购列表
export function getPurchaseList(data: object) {
  return service({
    url: "/purchase/list/page",
    method: "post",
    data,
  });
}

// 添加采购信息
export function addPurchase(data: object) {
  return service({
    url: "/purchase/add",
    method: "post",
    data,
  });
}
