import service from "@/plugins/axios";

// 获取采购列表
export function getPurchaseList(data: object) {
  return service({
    url: "/purchase/list/page",
    method: "post",
    data,
  });
}
