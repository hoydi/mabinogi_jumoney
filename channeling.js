let channelingFetchedData = [];

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


// let serverObject = {류트: 42};
// for (let [instrument, value] of Object.entries(instruments)) {
//     console.log(`${instrument}: ${value}`);
// }

const serverSelect = document.getElementById("serverSelect");
const channelInput = document.getElementById("channelInput");

// 서버 선택이 변경될 때마다 호출되는 함수
function updateChannelOptions() {
    const selectedServer = serverSelect.value; // 현재 선택된 서버
    const maxChannels = serverObject[selectedServer]; // 해당 서버의 최대 채널 수

    // 채널 옵션 초기화
    channelInput.innerHTML = ""; // 기존 옵션 제거

    // 새로운 옵션 추가
    for (let i = 1; i <= maxChannels; i++) {
        const option = document.createElement("option");
        option.value = i; // 값은 1부터 maxChannels까지
        option.textContent = i; // 표시되는 텍스트도 동일
        channelInput.appendChild(option); // 옵션을 select에 추가
    }
}

// 초기 옵션 설정
updateChannelOptions();

// 서버 선택이 변경될 때마다 옵션을 업데이트
serverSelect.addEventListener("change", updateChannelOptions);

////////////////////////////////////////////////////////////// cell 에 클릭이벤트 넣기
document.addEventListener("DOMContentLoaded", function () {
    let content = document.getElementById("content");
    let tooltip = document.getElementById("channeling-tooltip");

    content.addEventListener("click", function (event) {
        let cell = event.target.closest(".cell");
        if (cell) {
            let container = cell.querySelector(".container");
            if (container) {
                if (event.target.classList.contains('color-box-color')) {

                    navigator.clipboard.writeText(event.target.textContent)
                        .then(() => {
                            showNotification(`"${event.target.textContent}"가 복사되었습니다.`);
                        })
                        .catch(err => {
                            console.error('복사 실패:', err);
                        });
                } else {
                    let itemName = container.querySelector(".itemName").textContent;
                    let colors = Array.from(
                        container.querySelectorAll(".bgColor .color-box")
                    ).map(function (colorBox) {
                        return window.getComputedStyle(colorBox).backgroundColor;
                    });
                    let imgDiv = container.querySelector(".item-img")

                    let locationName = cell
                        .closest(".location")
                        .querySelector(".location_name").textContent;

                    // let userConfirmation = confirm(
                    //     `${locationName} ${itemName}${colors.map((color) =>
                    //         color.replace("rgb", "")
                    //     )} 기준으로 채널링하시겠습니까?`
                    // );

                    // if (userConfirmation) {
                    // 사용자가 확인을 눌렀을 때 실행할 코드
                    let fatchData = channelingRender(
                        locationName,
                        convertRgbToHex(colors),
                        itemName,
                        imgDiv
                    );
                    // }
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
                if (event.target.classList.contains('color-box-color')) {
                    tooltip.innerHTML = `클릭해서 ${event.target.textContent} 복사`;
                    // console.log(event.target.textContent)
                    tooltip.style.display = "block"; // 툴팁 보이기
                } else {
                    let locationName = cell
                        .closest(".location")
                        .querySelector(".location_name").textContent;

                    // 툴팁 내용 설정
                    tooltip.innerHTML = `채널링 할 주머니를 클릭하세요`;

                    tooltip.style.display = "block"; // 툴팁 보이기
                }


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

    // top-menu 안의 .tooltip에 마우스 오버할 때 툴팁 표시
    let topMenu = document.querySelector("#top-menu");
    topMenu.addEventListener("mouseover", function (event) {
        let tooltipElement = event.target.closest(".tooltip");
        if (tooltipElement) {
            let tooltipText = tooltipElement.querySelector(".tooltiptext");
            if (tooltipText) {
                tooltip.innerHTML = tooltipText.textContent; // 툴팁 텍스트 설정
                // console.log(tooltipText.textContent)
                tooltip.style.display = "block"; // 툴팁 보이기
            }
        }
    });

    // 마우스 이동 시 툴팁 위치 업데이트
    topMenu.addEventListener("mousemove", function (event) {
        tooltip.style.left = event.pageX + 10 + "px"; // 마우스 우측에 툴팁 표시
        tooltip.style.top = event.pageY + 10 + "px"; // 마우스 아래에 툴팁 표시
    });

    // 마우스가 top-menu 밖으로 나가면 툴팁 숨기기
    topMenu.addEventListener("mouseout", function (event) {
        let tooltipElement = event.target.closest(".tooltip");
        if (tooltipElement) {
            tooltip.style.display = "none"; // 툴팁 숨기기
        }
    });

    // 마우스가 전체 문서에서 나갈 때 툴팁 숨기기
    document.addEventListener("mouseout", function (event) {
        if (!topMenu.contains(event.relatedTarget)) {
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
    return Object.values(colors).every((color, index) =>
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

async function fetchLocationByServers(targetLocation, selectedServer) {
    let locationData = locations.find((loc) => loc.location === targetLocation);
    // console.log(`${locationData}, ${locationData.npc}`);
    let apiKey = document.getElementById("apiKeyInput").value;

    let headers = {
        accept: "application/json",
        "x-nxopen-api-key": apiKey,
    };

    for (let [serverName, serverCount] of Object.entries(serverObject)) {
        let isChannelingServerChecked =
            document.getElementById("channelingServer").checked;

        if (isChannelingServerChecked) {
            console.log(
                `체크박스가 체크되었습니다. 선택된 서버: ${selectedServer} 현재서버: ${serverName}`
            );
            if (selectedServer != serverName) {
                continue;
            }
        }

        for (let serverNum = 1; serverNum <= serverCount; serverNum++) {
            if (serverNum === 11) continue;
            try {
                serverNum = serverNum.toString();
                const exists = fetchedData.some(item =>
                    item.serverName == serverName &&
                    item.serverNum == serverNum &&
                    item.location == targetLocation
                );
                if (!exists) {
                    // 비동기 데이터 fetch
                    let items = await fetchLocationData(
                        locationData.npc,
                        serverName,
                        serverNum,
                        headers
                    );
                    let location = targetLocation;
                    fetchedData.push({ serverName, serverNum, location, items });
                } else {
                    console.log('이미 존재하는 값');
                }
            } catch (error) {
                console.log(
                    `Error fetching data for server ${serverName} ${serverNum}:`,
                    error
                );
                displayError(error);
                return;
            }
        }
    }
    // console.log(fetchedData)

}

// 특정 location에 대해 서버별 상점 정보를 가져옴)
async function channelingRender(targetLocation, hexcolor, itemName, imgDiv) {
    let pouchSrc = [];
    let modalPouch = document.getElementById("modal-pouch");
    modalPouch.innerHTML = ``;
    let selectedServer = document.getElementById("serverSelect").value;
    modalBody.innerHTML = `
    <div class="spinner"></div>
    
  `;
    modal.style.display = "flex";
    modal.style.display = "flex"; // 모달 띄우기
    // console.log(`colors : ${hexcolor}`);
    let resultList = [];

    let locationData = locations.find((loc) => loc.location === targetLocation);
    if (!locationData) {
        console.error("해당 location을 찾을 수 없습니다.");
        return;
    }

    let npc = locationData.npc;
    let modalContent = `<div class="modal-header"><div class="modal-left">
  ${imgDiv.innerHTML}</div><div class="modal-right">
  <h2>${targetLocation
        } ${itemName}</h2>`;

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
    modalContent += `</div></div>`;
    modalContent += `</div>`;

    await fetchLocationByServers(targetLocation, selectedServer);



    // 서버 데이터를 가져오고, 모달을 한 번에 업데이트
    for (let [serverName, serverCount] of Object.entries(serverObject)) {
        let isChannelingServerChecked =
            document.getElementById("channelingServer").checked;
        if (isChannelingServerChecked && serverSelect.value != serverName) {
            console.log('컨티뉴')
            continue;
        }

        fetchedData.forEach(data => {
            if (data.serverName == serverName) {
                // 각 데이터의 items 배열을 순회합니다.
                data.items.forEach(item => {
                    // item의 colors A, B, C 값을 hexcolor와 비교합니다.
                    if (item.colors.A.toUpperCase() === hexcolor[0] &&
                        item.colors.B.toUpperCase() === hexcolor[1] &&
                        item.colors.C.toUpperCase() === hexcolor[2]) {
                        if (!pouchSrc.some(src => src[1] === item.itemDisplayName)) {
                            // console.log(item.itemDisplayName, pouchSrc);
                            pouchSrc.push([item.colors, item.itemDisplayName]); // 존재하지 않으면 추가
                        }



                        // itemDisplayName을 가져옵니다.
                        let displayName = item.itemDisplayName;

                        // itemNameList에서 각 카테고리를 순회합니다.
                        Object.values(itemNameList).forEach(category => {
                            category.forEach(obj => {
                                // 카테고리 내의 객체에서 key값이 itemDisplayName과 일치하는지 확인합니다.
                                if (obj.hasOwnProperty(displayName)) {
                                    // 일치하는 경우 serverNum을 추가합니다.
                                    if (!obj[displayName].includes(data.serverNum)) {
                                        obj[displayName].push(data.serverNum);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
        // console.log(itemNameList);
        modalContent += `<div class="serverName"><h2>${serverName}</h2></div>`
        for (const category in itemNameList) {
            if (itemNameList.hasOwnProperty(category)) {
                let itemValuesList = [];
                let imsiContent = "";
                let itemLen = 0;
                // imsiContent += `<div class="category"><h3>${category}</h3></div>`; // 카테고리 제목 추가

                itemNameList[category].forEach(item => {
                    // 객체의 첫 번째 키를 itemName으로 설정
                    const itemName = Object.keys(item)[0];
                    const serverList = item[itemName]; // 아이템의 값인 배열을 serverList로 설정
                    if (serverList.length != 0) {
                        itemLen = 1;
                        // console.log(`itemlen: ${itemLen} - ${category}`)
                        imsiContent += `<div class="chanitems" style="display:flex;"><div class="chanItemName"><p>${itemName}<p></div>`
                        imsiContent += `<div><p>${serverList.join(", ")}</p></div></div>`;
                    }
                });

                if (itemLen) { modalContent += imsiContent; }
                const allItemsFilled = itemNameList[category].every(item => {
                    const itemValues = Object.values(item)[0];  // 객체의 첫 번째 값을 리스트로 추출
                    if (itemValues.length > 0) {
                        itemValuesList.push(itemValues[0]);
                    }
                    return itemValues.length > 0;               // 해당 리스트가 비어있지 않은지 확인
                });
                if (allItemsFilled && category != "꽃바구니") {
                    // console.log('세트');
                    modalContent += `<p class="set-check">${category} 세트 가능! (${itemValuesList.join(', ')})</p>`
                }





            }
        }


        // console.log(Array.from(pouchSrc));
        resetItemNameList();
    }

    modalPouch.innerHTML = '';

    const pouchNames = [
        '튼튼한 달걀 주머니', '튼튼한 감자 주머니', '튼튼한 옥수수 주머니', '튼튼한 밀 주머니', '튼튼한 보리 주머니',
        '튼튼한 양털 주머니', '튼튼한 거미줄 주머니', '튼튼한 가는 실뭉치 주머니', '튼튼한 굵은 실뭉치 주머니',
        '튼튼한 저가형 가죽 주머니', '튼튼한 일반 가죽 주머니', '튼튼한 고급 가죽 주머니', '튼튼한 최고급 가죽 주머니',
        '튼튼한 저가형 옷감 주머니', '튼튼한 일반 옷감 주머니', '튼튼한 고급 옷감 주머니', '튼튼한 최고급 옷감 주머니',
        '튼튼한 저가형 실크 주머니', '튼튼한 일반 실크 주머니', '튼튼한 고급 실크 주머니', '튼튼한 최고급 실크 주머니', '튼튼한 꽃바구니'
    ];

    const sortedPouchData = pouchNames
        .map(name => pouchSrc.find(item => item[1] === name)).filter(item => item !== undefined);


    console.log(sortedPouchData)
    sortedPouchData.forEach(async items => {

        // img 태그 생성
        let img = document.createElement('img');
        let pouchImg = await guichana(items[1], items[0]);
        // console.log(pouchImg)
        img.src = pouchImg.src;
        // img.src = src; // src 속성에 이미지 URL 추가
        img.alt = 'Pouch Image'; // 대체 텍스트 추가 (선택 사항)

        // 생성한 img 태그를 pouchContainer에 추가

        modalPouch.appendChild(img);
    });
    //   resetItemNameList();
    // modalContent += `<div class="serverName"><h2>${serverName}</h2></div>`;

    //   modalContent += `<h3>${category}</h3>`;
    //   modalContent += `<p>${itemName} 서버: ${serverList.join(", ")}</p>`;
    //   modalContent += `<p class="set-check">${category} 세트 가능! (`;
    //   let setServer = [];
    //   itemNameList[category].forEach((item) => {
    //     const itemName = Object.keys(item)[0]; // 항목 이름 가져오기
    //     const itemList = item[itemName]; // 해당 항목의 리스트 가져오기
    //     const firstListItem = itemList[0]; // 리스트의 첫 번째 요소 가져오기
    //     setServer.push(firstListItem);
    //   });

    //   modalContent += `${setServer.join(", ")})</p>`;
    //   modalContent += '<hr style="color:gray;width:100%" />';   


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

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block'; // 알림 보이기

    // 3초 후에 알림 숨기기
    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000);
}