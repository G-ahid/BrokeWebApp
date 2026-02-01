async function getAPI() {
  const res = await fetch("./api.json", { cache: "no-store" });
  if (!res.ok) throw new Error("api.json fetch failed");
  const data = await res.json();
  return data.api;
}

(async () => {
  try {
    const API = await getAPI();

    const res = await fetch(`${API}/health`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("backend unreachable");

    const text = await res.text();

    if (text.trim() === "OK") {
      document.body.innerText = "SERVER UP";
    } else {
      document.body.innerText = "SERVER DOWN";
    }

  } catch (err) {
    console.error(err);
    document.body.innerText = "SERVER DOWN";
  }
})();
