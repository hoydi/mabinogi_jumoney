const locations = [
  { location: "티르코네일", npc: "상인 네루" },
  { location: "던바튼", npc: "상인 누누" },
  { location: "카브", npc: "상인 아루" },
  { location: "반호르", npc: "상인 라누" },
  { location: "이멘마하", npc: "상인 메루" },
  { location: "탈틴", npc: "상인 베루" },
  { location: "타라", npc: "상인 에루" },
  { location: "벨바스트", npc: "상인 피루" },
  { location: "스카하", npc: "상인 세누" },
  { location: "켈라베이스", npc: "테일로" },
  { location: "카루", npc: "귀넥" },
  { location: "코르", npc: "리나" },
  { location: "오아시스", npc: "얼리" },
  { location: "필리아", npc: "켄" },
  { location: "발레스", npc: "카디" },
  { location: "페라", npc: "데위" },
  { location: "칼리다", npc: "모락" },
];

// API 요청 URL
const url = "https://open.api.nexon.com/mabinogi/v1/npcshop/list";

// hex 색상을 RGB로 변환하는 함수
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `(${r}, ${g}, ${b})`;
}

let fetchedData = []; // 전체 데이터를 저장할 변수

// RGB 값을 비교하기 위한 헬퍼 함수
function parseRgb(rgbString) {
  const rgbValues = rgbString
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);
  return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
}

// 두 RGB 값이 주어진 오차 범위 내에 있는지 확인
function isWithinTolerance(color1, color2, tolerance) {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
}

// 필터링 로직
function filterData() {
  const outerColorInput = document.getElementById("outerColor").value;
  const romanColorInput = document.getElementById("romanColor").value;
  const innerColorInput = document.getElementById("innerColor").value;
  const tolerance =
    parseInt(document.getElementById("toleranceInput").value, 10) || 10;

  const outerColor = outerColorInput ? parseRgb(outerColorInput) : null;
  const romanColor = romanColorInput ? parseRgb(romanColorInput) : null;
  const innerColor = innerColorInput ? parseRgb(innerColorInput) : null;

  document.querySelectorAll(".cell").forEach((td) => {
    const color1 = td.querySelector(".color-1")
      ? window.getComputedStyle(td.querySelector(".color-1")).backgroundColor
      : null;
    const color2 = td.querySelector(".color-2")
      ? window.getComputedStyle(td.querySelector(".color-2")).backgroundColor
      : null;
    const color3 = td.querySelector(".color-3")
      ? window.getComputedStyle(td.querySelector(".color-3")).backgroundColor
      : null;

    let show = true;

    if (outerColor && color1) {
      const color1Rgb = parseRgb(color1);
      show = show && isWithinTolerance(outerColor, color1Rgb, tolerance);
    }

    if (romanColor && color2) {
      const color2Rgb = parseRgb(color2);
      show = show && isWithinTolerance(romanColor, color2Rgb, tolerance);
    }

    if (innerColor && color3) {
      const color3Rgb = parseRgb(color3);
      show = show && isWithinTolerance(innerColor, color3Rgb, tolerance);
    }

    // 조건에 맞는 td만 보여줍니다
    if (show) {
      td.classList.remove("hidden");
    } else {
      td.classList.add("hidden");
    }
  });
  filterToggle=1;
}

function resetFilterData(){
  document.querySelectorAll(".cell").forEach((td) => {
      td.classList.remove("hidden");
  });
  filterToggle=0;
}
let filterToggle = 0;
// 필터 버튼에 이벤트 리스너 추가
document.getElementById("filterButton").addEventListener("click", function(){
  if (filterToggle!=1){  
  filterData();
}
else {
  resetFilterData();
}

});
document.getElementById("autoFilter").addEventListener("change", function() {
  if (this.checked) {
    // 체크박스가 체크되었을 때 실행할 함수
    filterData();
  }
  else{
    resetFilterData();
  }
});

window.onload = function () {
  const storedApiKey = localStorage.getItem("apiKey");
  if (storedApiKey) {
    document.getElementById("apiKeyInput").value = storedApiKey;
  }

  const storedServer = localStorage.getItem("server");
  const storedChannel = localStorage.getItem("channel");
  if (storedServer) {
    document.getElementById("serverSelect").value = storedServer;
  }
  if (storedChannel) {
    document.getElementById("channelInput").value = storedChannel;
  }

  // locations 배열을 기반으로 locationSelect에 옵션 추가
  const locationSelect = document.getElementById("locationSelect");
  locations.forEach(({ location }) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  });
};

document.getElementById("apiKeyInput").addEventListener("input", function () {
  const apiKey = this.value;
  localStorage.setItem("apiKey", apiKey);
});

document.getElementById("serverSelect").addEventListener("change", function () {
  const server = this.value;
  localStorage.setItem("server", server);
});

document.getElementById("channelInput").addEventListener("input", function () {
  const channel = this.value;
  localStorage.setItem("channel", channel);
});

//api 호출
async function fetchData() {
  const resultList = [];
  let errortext = "";
  const serverName = document.getElementById("serverSelect").value;
  const channelNumber = document.getElementById("channelInput").value;
  const apiKey = document.getElementById("apiKeyInput").value;

  const headers = {
    accept: "application/json",
    "x-nxopen-api-key": apiKey,
  };

  for (const { location, npc } of locations) {
    const params = new URLSearchParams({
      npc_name: npc,
      server_name: serverName,
      channel: channelNumber,
    });

    try {
      const response = await fetch(`${url}?${params}`, { headers });
      if (!response.ok) {
        errortext = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const shops = data.shop.filter((shop) => shop.tab_name === "주머니");
      const items = [];

      for (const shop of shops) {
        for (const item of shop.item) {
          const itemDisplayName = item.item_display_name;
          const imageUrl = item.image_url;

          if (imageUrl.includes("item_color=")) {
            const encodedString = imageUrl.split("item_color=")[1];
            const decodedString = decodeURIComponent(encodedString);
            const colors = JSON.parse(decodedString);

            // 필요한 색상만 선택
            const selectedColors = {};
            const colorKeys = ["color_01", "color_02", "color_03"];

            colorKeys.forEach((key) => {
              if (colors[key]) {
                selectedColors[key] = colors[key];
              }
            });

            // items에 추가
            items.push({ itemDisplayName, colors: selectedColors, imageUrl });
          }
        }
      }

      resultList.push({ location, items });
    } catch (error) {
      const content = document.getElementById("content");
      content.innerHTML = `<div style="color: red;">오류 발생: ${error.message}, ${errortext}</div>`;
      return 0;
    }
  }

  fetchedData = resultList; // 받아온 데이터를 저장
  return resultList;
}

// API 정보 배치 렌더링
function renderData(filteredData) {
  const content = document.getElementById("content");
  content.innerHTML = ""; // 기존 내용을 초기화

  filteredData.forEach(({ location, items }) => {
    const locationDiv = document.createElement("div");
    locationDiv.className = "location";
    locationDiv.textContent = location;
    content.appendChild(locationDiv);

    const table = document.createElement("div");
    table.className = "table"; // 테이블 클래스 추가
    let row = document.createElement("div");
    row.className = "row"; // row 클래스 추가

    items.forEach(({ itemDisplayName, colors, imageUrl }) => {
      const cell = document.createElement("div");
      cell.className = "cell"; // cell 클래스 추가

      // 왼쪽과 오른쪽을 나누기 위한 div 생성
      const container = document.createElement("div");
      container.className = "container";
      const upDiv = document.createElement("div");
      const downDiv = document.createElement("div");
      // downDiv.style.display = "flex"; // 수평 배치

      // 왼쪽 부분: 색상 박스
      const leftDiv = document.createElement("div");
      leftDiv.style.flex = "1"; // 왼쪽 div가 1배 비율
      upDiv.innerHTML = `<div>${itemDisplayName}</div>`; // 아이템 이름 추가

      let index = 1;
      for (const [colorName, colorValue] of Object.entries(colors)) {
        const colorBox = document.createElement("div");
        colorBox.className = `color-box color-${index}`;
        colorBox.style.backgroundColor = colorValue;
        colorBox.style.width = "20px"; // 색상 박스의 너비
        colorBox.style.height = "20px"; // 색상 박스의 높이
        // colorBox.style.display = "inline-block"; // 색상 박스를 가로로 나열
        leftDiv.appendChild(colorBox);
        leftDiv.innerHTML += `${hexToRgb(colorValue)}<br>`;
        index++;
      }

      // 오른쪽 부분: 이미지
      const rightDiv = document.createElement("div");
      rightDiv.style.flex = "1"; // 오른쪽 div가 1배 비율
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = itemDisplayName; // 이미지 설명
      img.style.maxWidth = "100%"; // 이미지의 최대 너비를 100%로 설정
      img.style.height = "auto"; // 자동 높이 조절

      rightDiv.appendChild(img);

      // 왼쪽과 오른쪽 div를 container에 추가
      downDiv.appendChild(leftDiv);
      downDiv.appendChild(rightDiv);
      container.appendChild(upDiv);
      container.appendChild(downDiv);

      cell.appendChild(container);
      row.appendChild(cell);

      // 행에 6개의 셀이 추가되면 새 행 생성
      if (row.children.length % 6 === 0) {
        table.appendChild(row);
        row = document.createElement("div");
        row.className = "row"; // 새 행 클래스 추가
      }
    });

    // 남은 셀이 있을 경우 마지막 행에 추가
    if (row.children.length > 0) {
      table.appendChild(row);
    }

    content.appendChild(table);
  });
}

// locationSelect 변경 시 필터링된 데이터 렌더링
document.getElementById("locationSelect").addEventListener("change", () => {
  const selectedLocation = document.getElementById("locationSelect").value;
  const filteredData =
    selectedLocation === "전체"
      ? fetchedData // 전체 선택 시 모든 데이터 표시
      : fetchedData.filter(({ location }) => location === selectedLocation); // 선택된 위치에 해당하는 데이터만 필터링

  renderData(filteredData);
});

// 버튼 클릭 시 데이터 가져오기 및 렌더링
document.getElementById("fetchButton").addEventListener("click", async () => {
  
  if (lastNextResetTime && lastNextResetTime.getTime() === nextResetTime.getTime()) {
    console.log('아직 시간 안바뀜');
    return;
  }

  const data = await fetchData();
  if (data) {
    
    renderData(data);
    if(document.getElementById("autoFilter").checked){
      console.log('자동필터링 실행');
      filterData()
    }
    lastNextResetTime = nextResetTime;
  }

});

//////////////////////////////

// 페이지가 로드될 때 실행
window.onload = function () {
  // 로컬 스토리지에서 API 키 가져오기
  const storedApiKey = localStorage.getItem("apiKey");
  if (storedApiKey) {
    document.getElementById("apiKeyInput").value = storedApiKey; // 가져온 키를 입력 필드에 설정
  }

  // 로컬 스토리지에서 서버 및 채널 값 가져오기
  const storedServer = localStorage.getItem("server");
  const storedChannel = localStorage.getItem("channel");
  if (storedServer) {
    document.getElementById("serverSelect").value = storedServer; // 서버 선택 설정
  }
  if (storedChannel) {
    document.getElementById("channelInput").value = storedChannel; // 채널 입력 설정
  }

  // RGB 색상 및 오차 범위 값 가져오기
  const storedOuterColor = localStorage.getItem("outerColor");
  const storedRomanColor = localStorage.getItem("romanColor");
  const storedInnerColor = localStorage.getItem("innerColor");
  const storedTolerance = localStorage.getItem("tolerance");

  if (storedOuterColor) {
    document.getElementById("outerColor").value = storedOuterColor;
  }
  if (storedRomanColor) {
    document.getElementById("romanColor").value = storedRomanColor;
  }
  if (storedInnerColor) {
    document.getElementById("innerColor").value = storedInnerColor;
  }
  if (storedTolerance) {
    document.getElementById("toleranceInput").value = storedTolerance;
  }
};

// API 키 입력 필드에 이벤트 리스너 추가
document.getElementById("apiKeyInput").addEventListener("input", function () {
  const apiKey = this.value; // 입력값 가져오기
  localStorage.setItem("apiKey", apiKey); // 로컬 스토리지에 저장
});

// 서버 선택 필드에 이벤트 리스너 추가
document.getElementById("serverSelect").addEventListener("change", function () {
  const server = this.value; // 선택한 서버 가져오기
  localStorage.setItem("server", server); // 로컬 스토리지에 저장
});

// 채널 입력 필드에 이벤트 리스너 추가
document.getElementById("channelInput").addEventListener("input", function () {
  const channel = this.value; // 입력값 가져오기
  localStorage.setItem("channel", channel); // 로컬 스토리지에 저장
});

// RGB 색상 입력 필드에 이벤트 리스너 추가
document.getElementById("outerColor").addEventListener("input", function () {
  const outerColor = this.value; // 입력값 가져오기
  localStorage.setItem("outerColor", outerColor); // 로컬 스토리지에 저장
});

document.getElementById("romanColor").addEventListener("input", function () {
  const romanColor = this.value; // 입력값 가져오기
  localStorage.setItem("romanColor", romanColor); // 로컬 스토리지에 저장
});

document.getElementById("innerColor").addEventListener("input", function () {
  const innerColor = this.value; // 입력값 가져오기
  localStorage.setItem("innerColor", innerColor); // 로컬 스토리지에 저장
});

// 오차 범위 입력 필드에 이벤트 리스너 추가
document.getElementById("toleranceInput").addEventListener("input", function () {
  const tolerance = this.value; // 입력값 가져오기
  localStorage.setItem("tolerance", tolerance); // 로컬 스토리지에 저장
});


////////////////////////////
const totalMinutesInDay = 24 * 60; // 24시간을 분으로 변환
const intervalMinutes = 36; // 초기화 간격 36분
const totalIntervals = totalMinutesInDay / intervalMinutes; // 36분으로 나눈 시간 조각의 수

let previousResetTime = null; // 이전 초기화 시간
let timerId = null; // 타이머 ID
let nextResetTime = null; // 글로벌 변수로 nextResetTime 선언
let lastNextResetTime = null; 

function updateNextResetTime() {
  const currentTime = new Date();

  // 현재 시간을 분으로 변환
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // 현재 간격
  const currentInterval = Math.floor(currentMinutes / intervalMinutes);
  const nextInterval = (currentInterval + 1) % totalIntervals;

  // 다음 초기화 시간 계산
  const nextResetMinutes = nextInterval * intervalMinutes;
  const nextResetHours = Math.floor(nextResetMinutes / 60);
  const nextResetMinutesRemainder = nextResetMinutes % 60;

  nextResetTime = new Date(); // 글로벌 변수에 현재 nextResetTime 할당
  nextResetTime.setHours(nextResetHours, nextResetMinutesRemainder, 0, 0);

  // 남은 시간 계산
  const timeRemaining = nextResetTime - currentTime;

  // 만약 현재 시간이 다음 초기화 시간보다 늦다면 다음 날로 설정
  if (timeRemaining < 0) {
    nextResetTime.setDate(nextResetTime.getDate() + 1);
  }

  // 초 단위로 업데이트
  const secondsRemaining = Math.ceil((nextResetTime - currentTime) / 1000);

  // 시간 변경 시 함수 호출
  if (previousResetTime && previousResetTime.getTime() !== nextResetTime.getTime()) {
    console.log("시간 바뀜"); // 시간 변경 메시지

    // 체크박스가 체크되어 있을 때만 fetchData 실행
    if (document.getElementById("autoFetchCheckbox").checked) {
      // 10분 후에 fetchData 실행
      if (timerId) {
        clearTimeout(timerId); // 이전 타이머 정리
      }
      timerId = setTimeout(async () => {
        const data = await fetchData(); // 데이터를 가져오는 함수
        if (data) {
          renderData(data); // 가져온 데이터를 렌더링하는 함수
          if (document.getElementById("autoFilter").checked) {
            console.log('자동필터링 실행');
            filterData();
          }
          notification("주머니 업데이트");
        }
      }, 10 * 60 * 1000); // 10분 후
    }
  }

  // 현재 초기화 시간을 이전 시간으로 저장
  previousResetTime = nextResetTime;

  // 결과를 표시
  document.getElementById(
    "next_time"
  ).innerText = `다음 초기화 시간: ${nextResetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} (남은 시간: ${secondsRemaining}초)`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateNextResetTime();
  setInterval(updateNextResetTime, 1000);
});

////////////////////////////


//윈도우 알림 띄우기
function notification(msg){
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showNotification(msg);
        }
    });
} else {
    showNotification(msg);
}
}

function showNotification(msg) {
  const notification = new Notification("제목", {
      body: msg
      // icon: "아이콘 URL" // 선택 사항
  });

  notification.onclick = () => {
      window.focus();
  };
}