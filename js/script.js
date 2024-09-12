// section01 json

document.addEventListener("DOMContentLoaded", function () {
  fetch("api/sec1.json")
    .then((response) => response.json())
    .then((data) => {
      // 섹션 제목과 설명 설정
      const sec1 = document.querySelector(".sec1");
      sec1.querySelector("h1").textContent = data.sectionTitle;
      sec1.querySelector("span").textContent = data.sectionDescription;

      // 슬라이드 비디오 추가할 컨테이너 선택
      const sliderTrack = document.querySelector(".sliderTrack");

      // 비디오 리스트 생성
      let videoSlides = "";
      data.videos.forEach((video) => {
        videoSlides += `
          <div class="slideStick swiper-slide">
            <div>
              <video
                src="${video.src}"
                controls
                width="100%"
                height="100%"
                title="${video.title}"
              ></video>
            </div>
          </div>
        `;
      });

      // 슬라이드 트랙에 비디오 슬라이드 삽입
      sliderTrack.innerHTML = videoSlides;

      // 슬라이드 요소와 버튼을 선택합니다 (동적으로 추가된 후에 선택)
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
    })
    .catch((error) => console.error("Error loading the JSON file:", error));
});


// section02 json
document.addEventListener("DOMContentLoaded", function () {
  fetch("api/sec2.json")
    .then((response) => response.json())
    .then((data) => {
      // ispDiv 요소 선택
      const ispDiv = document.querySelector(".isp");

      // HTML 내용 저장할 변수
      let htmlContent = "";

      // 4개의 ul을 생성, 각 ul에 4개의 li 추가
      for (let i = 0; i < data.items.length; i += 4) {
        htmlContent += "<ul>";
        for (let j = i; j < i + 4 && j < data.items.length; j++) {
          htmlContent += `
            <li>
              <img src="${data.items[j].src}" alt="${data.items[j].alt}">
            </li>
          `;
        }
        htmlContent += "</ul>";
      }

      // ispDiv에 생성한 HTML 삽입
      ispDiv.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error loading the JSON file:", error));
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
