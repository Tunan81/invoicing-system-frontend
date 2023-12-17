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

// 删除采购信息 @DeleteMapping("/delete/{purchaseId}")
export function deletePurchase(purchaseId: string) {
  return service({
    url: `/purchase/delete/${purchaseId}`,
    method: "delete",
  });
}
