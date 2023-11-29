import service from "@/plugins/axios";

// 获取商品列表
export function getProductList(data: object) {
  return service({
    url: "/product/list/page",
    method: "post",
    data,
  });
}
