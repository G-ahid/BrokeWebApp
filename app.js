import { api } from "./api.js";

(async () => {
  const status = document.getElementById("server_status");
  try {
    const res = await fetch(api("/health"), {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("backend unreachable");

    const text = await res.text();
    if (text.trim() === "OK") {
      status.innerText = "SERVER UP";
    } else {
      status.innerText = "SERVER DOWN";
    }

  } catch (err) {
    console.error(err);
    status.innerText = "SERVER DOWN";
  }
})();

document.addEventListener("DOMContentLoaded", async () => {
  const messages = document.getElementById("messages");
  const API = await fetch(api("/messages"), {}).then(res => res.json());
  for (const message of API.messages) {
    const div = document.createElement("div");
    div.innerText = message;
    messages.appendChild(div);
  } 
});