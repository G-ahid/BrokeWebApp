async function getAPI(){
    const res = await fetch("./api.json", {cache: "no-store"});
    const data = await res.json();
    return data.api;
}
(async () => {
    const API = await getAPI();
    const res = await fetch(`${API}/health`);
    const text = await res.text();
    if (text == "OK") {
        document.body.innerText = res.text();
    } else {
        document.body.innerText = "SERVER DOWN";
    }
})(); 