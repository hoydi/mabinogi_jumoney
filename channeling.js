let itemNameList = {
  작물: [
    { "튼튼한 달걀 주머니": [] },
    { "튼튼한 감자 주머니": [] },
    { "튼튼한 옥수수 주머니": [] },
    { "튼튼한 밀 주머니": [] },
    { "튼튼한 보리 주머니": [] },
  ],
  방직: [
    { "튼튼한 양털 주머니": [] },
    { "튼튼한 거미줄 주머니": [] },
    { "튼튼한 가는 실뭉치 주머니": [] },
    { "튼튼한 굵은 실뭉치 주머니": [] },
  ],
  가죽: [
    { "튼튼한 저가형 가죽 주머니": [] },
    { "튼튼한 일반 가죽 주머니": [] },
    { "튼튼한 고급 가죽 주머니": [] },
    { "튼튼한 최고급 가죽 주머니": [] },
  ],
  옷감: [
    { "튼튼한 저가형 옷감 주머니": [] },
    { "튼튼한 일반 옷감 주머니": [] },
    { "튼튼한 고급 옷감 주머니": [] },
    { "튼튼한 최고급 옷감 주머니": [] },
  ],
  실크: [
    { "튼튼한 저가형 실크 주머니": [] },
    { "튼튼한 일반 실크 주머니": [] },
    { "튼튼한 고급 실크 주머니": [] },
    { "튼튼한 최고급 실크 주머니": [] },
  ],
  꽃바구니: [{ "튼튼한 꽃바구니": [] }],
};

let serverObject = { 류트: 42, 하프: 24, 울프: 15, 만돌린: 15 };
// let serverObject = {류트: 42};
// for (let [instrument, value] of Object.entries(instruments)) {
//     console.log(`${instrument}: ${value}`);
// }

////////////////////////////////////////////////////////////// cell 에 클릭이벤트 넣기
document.addEventListener("DOMContentLoaded", function () {
  let content = document.getElementById("content");
  let tooltip = document.getElementById("channeling-tooltip");

  content.addEventListener("click", function (event) {
    let cell = event.target.closest(".cell");
    if (cell) {
      let container = cell.querySelector(".container");
      if (container) {
        let itemName = container.querySelector(".itemName").textContent;
        let colors = Array.from(
          container.querySelectorAll(".bgColor .color-box")
        ).map(function (colorBox) {
          return window.getComputedStyle(colorBox).backgroundColor;
        });

        let locationName = cell
          .closest(".location")
          .querySelector(".location_name").textContent;

        let userConfirmation = confirm(
          `${locationName} ${itemName}${colors.map((color) =>
            color.replace("rgb", "")
          )} 기준으로 채널링하시겠습니까?`
        );

        if (userConfirmation) {
          // 사용자가 확인을 눌렀을 때 실행할 코드
          let fatchData = fetchLocationByServers(
            locationName,
            convertRgbToHex(colors),
            itemName
          );
        }
      }
    }
  });

  // 마우스 오버 시 툴팁 표시
  content.addEventListener("mouseover", function (event) {
    let cell = event.target.closest(".cell");
    if (cell) {
      let container = cell.querySelector(".container");
      if (container) {
        let itemName = container.querySelector(".itemName").textContent;
        let colors = Array.from(
          container.querySelectorAll(".bgColor .color-box")
        ).map(function (colorBox) {
          return window.getComputedStyle(colorBox).backgroundColor;
        });

        let locationName = cell
          .closest(".location")
          .querySelector(".location_name").textContent;

        // 툴팁 내용 설정
        tooltip.innerHTML = `채널링 할 주머니를 클릭하세요`;

        tooltip.style.display = "block"; // 툴팁 보이기
      }
    }
  });

  // 마우스 이동 시 툴팁 위치 업데이트
  content.addEventListener("mousemove", function (event) {
    tooltip.style.left = event.pageX + 10 + "px"; // 마우스 우측에 툴팁 표시
    tooltip.style.top = event.pageY + 10 + "px"; // 마우스 아래에 툴팁 표시
  });

  // 마우스가 cell 밖으로 나가면 툴팁 숨기기
  content.addEventListener("mouseout", function (event) {
    let cell = event.target.closest(".cell");
    if (cell) {
      tooltip.style.display = "none"; // 툴팁 숨기기
    }
  });
});

//rgb 를 hex로
function convertRgbToHex(rgbStrings) {
  return rgbStrings.map((rgbStr) => {
    let matches = rgbStr.match(/\d+/g); // rgb(숫자, 숫자, 숫자)에서 숫자 추출
    if (matches && matches.length === 3) {
      let [r, g, b] = matches.map(Number); // 문자열을 숫자로 변환
      return `${[r, g, b]
        .map((x) => x.toString(16).padStart(2, "0").toUpperCase())
        .join("")}`; // 헥사 코드로 변환
    }
    return null; // 유효하지 않은 입력일 경우 null 반환
  });
}

// 색상 비교 함수
function compareColors(colors, hexColors) {
  // colors 객체의 값들을 소문자로 변환하여 hexColors 배열과 비교
  return Object.values(colors).every((color,index) =>
    color.toLowerCase() === hexColors[index].toLowerCase()
  );
}

//아이템리스트 리셋
function resetItemNameList() {
  itemNameList = {
    작물: [
      { "튼튼한 달걀 주머니": [] },
      { "튼튼한 감자 주머니": [] },
      { "튼튼한 옥수수 주머니": [] },
      { "튼튼한 밀 주머니": [] },
      { "튼튼한 보리 주머니": [] },
    ],
    방직: [
      { "튼튼한 양털 주머니": [] },
      { "튼튼한 거미줄 주머니": [] },
      { "튼튼한 가는 실뭉치 주머니": [] },
      { "튼튼한 굵은 실뭉치 주머니": [] },
    ],
    가죽: [
      { "튼튼한 저가형 가죽 주머니": [] },
      { "튼튼한 일반 가죽 주머니": [] },
      { "튼튼한 고급 가죽 주머니": [] },
      { "튼튼한 최고급 가죽 주머니": [] },
    ],
    옷감: [
      { "튼튼한 저가형 옷감 주머니": [] },
      { "튼튼한 일반 옷감 주머니": [] },
      { "튼튼한 고급 옷감 주머니": [] },
      { "튼튼한 최고급 옷감 주머니": [] },
    ],
    실크: [
      { "튼튼한 저가형 실크 주머니": [] },
      { "튼튼한 일반 실크 주머니": [] },
      { "튼튼한 고급 실크 주머니": [] },
      { "튼튼한 최고급 실크 주머니": [] },
    ],
    꽃바구니: [{ "튼튼한 꽃바구니": [] }],
  };
}

// 특정 location에 대해 서버별 상점 정보를 가져옴)
async function fetchLocationByServers(targetLocation, hexcolor, itemName) {
  let selectedServer = document.getElementById("serverSelect").value;
  modalBody.innerHTML = `
    <div class="spinner"></div>
    
  `;
  modal.style.display = "flex";
  modal.style.display = "flex"; // 모달 띄우기
  console.log(`colors : ${hexcolor}`);
  let resultList = [];
  let apiKey = document.getElementById("apiKeyInput").value;

  let headers = {
    accept: "application/json",
    "x-nxopen-api-key": apiKey,
  };

  let locationData = locations.find((loc) => loc.location === targetLocation);
  if (!locationData) {
    console.error("해당 location을 찾을 수 없습니다.");
    return;
  }

  let npc = locationData.npc;
  let modalContent = `<h2>${selectedServer} ${
    document.getElementById("channelInput").value
  } 채널 ${itemName}</h2>`;

  // 미리 색상 관련 HTML을 준비
  modalContent += `<div class="modal-color">`;
  hexcolor.forEach((color, index) => {
    let rgbColor = hexToRgb(`#${color}`);
    modalContent += `
      <div class="modal-color-div">
        <div class="color-box color_0${index + 1}" 
             style="background-color: #${color}; width: 20px; height: 20px; margin:0;"></div>
        <p style="margin:0;">${rgbColor}</p>
      </div>
    `;
  });
  modalContent += `</div>`;

  // 서버 데이터를 가져오고, 모달을 한 번에 업데이트
  for (let [serverName, serverCount] of Object.entries(serverObject)) {
    let isChannelingServerChecked =
      document.getElementById("channelingServer").checked;

    if (isChannelingServerChecked) {
      // 체크된 경우 serverSelect의 value를 읽어옴

      // 선택된 서버 이름을 출력하거나 다른 작업을 수행
      console.log(
        `체크박스가 체크되었습니다. 선택된 서버: ${selectedServer} 현재서버: ${serverName}`
      );
      if (selectedServer != serverName) {
        continue;
      }
    }

    resetItemNameList();
    modalContent += `<div class="serverName"><h2>${serverName}</h2></div>`;

    for (let serverNum = 1; serverNum <= serverCount; serverNum++) {
      if (serverNum === 11) continue;

      try {
        // 비동기 데이터 fetch
        let items = await fetchLocationData(
          npc,
          serverName,
          serverNum,
          headers
        );

        items.forEach((item) => {
          if (compareColors(item.colors, hexcolor)) {
            Object.keys(itemNameList).forEach((category) => {
              itemNameList[category].forEach((entry) => {
                let itemName = Object.keys(entry)[0];
                if (item.itemDisplayName === itemName) {
                  entry[item.itemDisplayName].push(serverNum); // 서버 번호 추가
                }
              });
            });
          }
        });
      } catch (error) {
        console.error(
          `Error fetching data for server ${serverName} ${serverNum}:`,
          error
        );
        displayError(error);
      }
    }

    // 각 카테고리별로 모달에 데이터 추가
    Object.keys(itemNameList).forEach((category) => {
      let nonEmptyItems = itemNameList[category].filter((entry) => {
        let itemName = Object.keys(entry)[0];
        return entry[itemName].length > 0;
      });

      if (nonEmptyItems.length > 0) {
        modalContent += `<h3>${category}</h3>`;
        nonEmptyItems.forEach((entry) => {
          let itemName = Object.keys(entry)[0];
          let serverList = entry[itemName];
          modalContent += `<p>${itemName} 서버: ${serverList.join(", ")}</p>`;
        });
      }

      let allItemsHaveServers = itemNameList[category].every((entry) => {
        let itemName = Object.keys(entry)[0];
        return entry[itemName].length > 0;
      });

      if (allItemsHaveServers) {
        modalContent += `<p class="set-check">${category} 세트 가능! (`;
        let setServer = [];
        itemNameList[category].forEach((item) => {
          const itemName = Object.keys(item)[0]; // 항목 이름 가져오기
          const itemList = item[itemName]; // 해당 항목의 리스트 가져오기
          const firstListItem = itemList[0]; // 리스트의 첫 번째 요소 가져오기
          setServer.push(firstListItem);
        });

        modalContent += `${setServer.join(", ")})</p>`;
      }
    });
    modalContent += '<hr style="color:gray;width:100%" />';
  }

  // 모든 데이터가 처리된 후 모달에 한 번에 업데이트
  showModal(modalContent);
  return resultList;
}

// 모달 관련 변수
let modal = document.getElementById("modal");
let modalClose = document.getElementById("modal-close");
let modalBody = document.getElementById("modal-body");

// 모달 닫기
modalClose.addEventListener("click", function () {
  modalBody.innerHTML = "";
  modal.style.display = "none"; // 모달 숨기기
});

// 페이지 클릭 외부에서 모달 닫기
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modalBody.innerHTML = "";
    modal.style.display = "none"; // 모달 숨기기
  }
});

// 아이템리스트 출력 함수
function showModal(content) {
  modalBody.innerHTML = "";
  modalBody.innerHTML = content; // 모달에 내용 넣기
}

document
  .querySelector(".question-button")
  .addEventListener("click", function () {
    // 이미지 URL (여기서 URL을 원하는 이미지로 설정하세요)
    let imageUrl = "howToGetAPIKey.png"; // 이미지 URL

    // 모달 본문에 이미지 추가
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<img src="${imageUrl}" alt="Key Generation Method" style="width:100%;max-width:100%;">`;

    // 모달 창을 표시
    document.getElementById("modal").style.display = "flex";
  });

// 특정 서버만 채널링할건지 체크 확인
document
  .getElementById("channelingServer")
  .addEventListener("change", function () {
    // 체크박스가 체크되었을 때
    if (this.checked) {
      // serverSelect의 value 값을 읽어옴
      let selectedServer = document.getElementById("serverSelect").value;

      // 선택된 서버 이름 출력 (또는 원하는 동작 수행)
      console.log("Selected Server:", selectedServer);

      // 필터링 등의 추가 동작을 수행할 수 있습니다.
      // applyServerFilter(selectedServer);
    }
  });

document.getElementById("serverSelect").addEventListener("change", function () {
  // serverSelect에서 선택된 값을 가져오기
  const selectedServer = this.value;

  // tooltiptext를 업데이트
  const tooltipText = document.getElementById("channelingTooltipText");
  tooltipText.textContent = `체크시 ${selectedServer} 서버만 채널링합니다`;
});
