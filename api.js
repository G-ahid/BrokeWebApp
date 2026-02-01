export { api }

async function _getAPI() {
  const res = await fetch("./api.json", { cache: "no-store" });
  if (!res.ok) throw new Error("api.json fetch failed");
  const data = await res.json();
  return data.api;
}

async function api(url) {
    return `${await _getAPI()}${url}`;
}