document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("excel-file");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const response = await fetch("http://localhost:5001/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  document.getElementById("output").innerText = data.summary || "Analysis complete.";
  document.querySelector(".chat-section").style.display = "block";
});

document.getElementById("ask-btn").addEventListener("click", async () => {
  const question = document.getElementById("user-question").value;
  const response = await fetch("http://localhost:5001/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();
  const chatBox = document.getElementById("chat-output");
  const p = document.createElement("p");
  p.textContent = "🤖 " + (data.answer || "Sorry, I couldn't understand that.");
  chatBox.appendChild(p);
});
