const locationSelect = document.getElementById("locationSelect");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

  // < 버튼 클릭 이벤트
  prevBtn.addEventListener("click", () => {
    let currentIndex = locationSelect.selectedIndex; // 현재 선택된 인덱스
    let newIndex = currentIndex === 0 ? locationSelect.options.length - 1 : currentIndex - 1; // 첫 번째일 때 마지막으로 돌아감
    locationSelect.selectedIndex = newIndex;
    locationSelect.dispatchEvent(new Event("change"));
  });

  // > 버튼 클릭 이벤트
  nextBtn.addEventListener("click", () => {
    let currentIndex = locationSelect.selectedIndex; // 현재 선택된 인덱스
    let newIndex = currentIndex === locationSelect.options.length - 1 ? 0 : currentIndex + 1; // 마지막일 때 처음으로 돌아감
    locationSelect.selectedIndex = newIndex;
    locationSelect.dispatchEvent(new Event("change"));
  });