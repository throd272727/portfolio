document.addEventListener("DOMContentLoaded", function () {
  // 슬라이드 요소와 버튼을 선택합니다
  const slides = document.querySelectorAll(".slideStick");
  const nextButton = document.querySelector("#right");
  const prevButton = document.querySelector("#left");
  let currentIndex = 0;

  // 슬라이드를 표시하는 함수를 정의합니다
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? "block" : "none";
    });
  }

  // 다음 버튼 클릭 시
  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  });

  // 이전 버튼 클릭 시
  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  });

  // 페이지 로드 시 첫 슬라이드를 표시합니다
  updateSlides();
});

// section04 json
document.addEventListener("DOMContentLoaded", function () {
  fetch("api/sec4.json")
    .then((response) => response.json())
    .then((data) => {
      // 섹션 제목과 설명 설정
      const section = document.querySelector(".sec4");
      section.querySelector("h1").textContent = data.sectionTitle;
      section.querySelector("p").textContent = data.sectionDescription;

      // 항목들 추가
      const wnsContainer = section.querySelector(".wns");

      // 비디오 ID로부터 썸네일 URL을 생성하는 함수
      function getThumbnailUrl(videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }

      data.items.forEach((item) => {
        const wnDiv = document.createElement("div");
        wnDiv.classList.add("wn");

        wnDiv.innerHTML = `
            <div class="win">
              <img src="${getThumbnailUrl(item.videoId)}" alt="썸네일 이미지" />
              <div class="wininfo">
                <span>${item.title}</span>
                <p>${item.date}</p>
              </div>
              <p>${item.description}</p>
            </div>
            <div class="sec4Bt">
              <a href="${item.link}" target="_blank" class="button ${
          item.buttonClass
        }">
                <p>Watch on YouTube</p>
              </a>
            </div>
          `;

        wnsContainer.appendChild(wnDiv);
      });
    })
    .catch((error) => console.error("Error loading the JSON file:", error));
});
