import service from "@/plugins/axios";

export function getProviderList(data: object) {
  return service({
    url: "/provider/list/page",
    method: "POST",
    data,
  });
}

export function addProvider(data: object) {
  return service({
    url: "/provider/add",
    method: "POST",
    data,
  });
}

export function deleteProvider(ProviderId: string) {
  return service({
    url: `/Provider/delete/${ProviderId}`,
    method: "delete",
  });
}

// 修改采购信息
export function updateProvider(data: object) {
  return service({
    url: "/Provider/update",
    method: "post",
    data,
  });
}
