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

// 删除销售记录 @DeleteMapping("/delete/{saleId}")
export function deleteSale(saleId: string) {
  return service({
    url: `/sale/delete/${saleId}`,
    method: "delete",
  });
}

// 修改销售记录
export function updateSale(data: object) {
  return service({
    url: "/sale/update",
    method: "post",
    data,
  });
}
