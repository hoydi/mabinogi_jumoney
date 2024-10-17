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
const url = 'https://open.api.nexon.com/mabinogi/v1/npcshop/list';






// hex 색상을 RGB로 변환하는 함수
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `(${r}, ${g}, ${b})`;
}

async function fetchData() {
    const resultList = [];
    let errortext = "";  // 오류 메시지 초기화
    // 사용자 입력값 가져오기
    const serverName = document.getElementById("serverSelect").value;
    const channelNumber = document.getElementById("channelInput").value;
    const apiKey = document.getElementById("apiKeyInput").value; // API 키 입력값

    const headers = {
        'accept': 'application/json',
        'x-nxopen-api-key': apiKey // 입력받은 API 키 사용
    };

    for (const { location, npc } of locations) {
        const params = new URLSearchParams({
            'npc_name': npc,
            'server_name': serverName,
            'channel': channelNumber
        });

        try {
            const response = await fetch(`${url}?${params}`, { headers });
            if (!response.ok) {
                // response.text()를 await로 처리하여 오류 메시지를 가져옵니다.
                errortext = await response.text();  // 오류 메시지 가져오기
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const shops = data.shop.filter(shop => shop.tab_name === '주머니');
            const items = [];

            for (const shop of shops) {
                for (const item of shop.item) {
                    const itemDisplayName = item.item_display_name;
                    const imageUrl = item.image_url;

                    if (imageUrl.includes('item_color=')) {
                        const encodedString = imageUrl.split('item_color=')[1];
                        const decodedString = decodeURIComponent(encodedString);
                        const colors = JSON.parse(decodedString);

                        items.push({ itemDisplayName, colors,imageUrl });
                    }
                }
            }

            resultList.push({ location, items });
        } catch (error) {
            // 오류 메시지를 content에 표시
            const content = document.getElementById("content");
            content.innerHTML = `<div style="color: red;">오류 발생: ${error.message}, ${errortext}</div>`;
            return 0; // 데이터 렌더링을 중단
        }
    }

    return resultList;
}


function renderData(data) {
    const content = document.getElementById("content");
    content.innerHTML = ""; // 이전 데이터 초기화

    data.forEach(({ location, items }) => {
        const locationDiv = document.createElement("div");
        locationDiv.className = "location";
        locationDiv.textContent = location;
        content.appendChild(locationDiv);

        const table = document.createElement("table");
        let row = document.createElement("tr");

        items.forEach(({ itemDisplayName, colors }) => {
            const cell = document.createElement("td");
            cell.innerHTML = `<div>${itemDisplayName}</div>`;
            cell.style.paddingLeft = "10px"; // 왼쪽 패딩 추가
            cell.style.textAlign = "left"; // 텍스트 왼쪽 정렬
            let index = 1;
        
            for (const [colorName, colorValue] of Object.entries(colors)) {
                const colorBox = document.createElement("div");
                colorBox.className = `color-box color-${index}`;
                colorBox.style.backgroundColor = colorValue;
        
                // colorBox 추가
                cell.appendChild(colorBox);
        
                // 색상 정보 텍스트 추가
                const colorText = document.createElement("div");
                colorText.textContent = hexToRgb(colorValue);
                cell.appendChild(colorText);
        
                index++; // 인덱스 증가
            }
        
            row.appendChild(cell);
        
            if (row.children.length % 6 === 0) {
                table.appendChild(row);
                row = document.createElement("tr"); // 새 줄 시작
            }
        });

        table.appendChild(row);
        content.appendChild(table);
    });
}

// 버튼 클릭 시 데이터 가져오기 및 렌더링
document.getElementById("fetchButton").addEventListener("click", async () => {
    const data = await fetchData();
    if (data) {
        renderData(data);
    }
});
