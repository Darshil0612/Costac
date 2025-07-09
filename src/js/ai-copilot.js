function uploadFile() {
  const fileInput = document.getElementById("excel-file");
  const output = document.getElementById("output");
  const file = fileInput.files[0];
  if (!file) {
    output.innerHTML = "Please upload a file.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  output.innerHTML = "Processing...";

  fetch("http://localhost:5002/api/analyze-excel", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.summary) {
      output.innerHTML = `<pre>${data.summary}</pre>`;
    } else {
      output.innerHTML = `<span style="color:red;">Error: ${data.error}</span>`;
    }
  })
  .catch(err => {
    output.innerHTML = `<span style="color:red;">Request failed</span>`;
    console.error(err);
  });
}
