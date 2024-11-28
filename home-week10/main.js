document.getElementById("fortune-button").addEventListener("click", function() {
    const li1 = document.getElementById("li1");
    const li2 = document.getElementById("li2");
  
    li1.style.display = "none";
    li2.style.display = "block";
  
    fetch("https://korean-advice-open-api.vercel.app/api/advice")
      .then(response => response.json())
      .then(data => {
        const author = data.author;
        const authorProfile = data.authorProfile;
        const message = data.message;
  
        const quoteElement = document.getElementById("quote");
        quoteElement.innerHTML = `
          <p class="message">"${message}"</p>
          <p class="author">- ${author} (${authorProfile})</p>
        `;
        quoteElement.classList.add("visible");
      })
      .catch(error => {
        console.error("Error fetching quote:", error);
        alert("명언을 가져오는 데 실패했습니다.");
      });
  });
  