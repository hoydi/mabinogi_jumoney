const itemNameList= ['튼튼한 달걀 주머니', '튼튼한 감자 주머니', '튼튼한 옥수수 주머니', '튼튼한 밀 주머니', '튼튼한 보리 주머니', '튼튼한 양털 주머니', '튼튼한 거미줄 주머니', '튼튼한 가는 실뭉치 주머니', '튼튼한 굵은 실뭉치 주머니', '튼튼한 저가형 가죽 주머니', '튼튼한 일반 가죽 주머니', '튼튼한 고급 가죽 주머니', '튼튼한 최고급 가죽 주머니', '튼튼한 저가형 옷감 주머니', '튼튼한 일반 옷감 주머니', '튼튼한 고급 옷감 주머니', '튼튼한 최고급 옷감 주머니', '튼튼한 저가형 실크 주머니', '튼튼한 일반 실크 주머니', '튼튼한 고급 실크 주머니', '튼튼한 최고급 실크 주머니', '튼튼한 꽃바구니']

const serverObject = {류트: 42,하프: 24,울프: 15,만돌린: 15};
// for (const [instrument, value] of Object.entries(instruments)) {
//     console.log(`${instrument}: ${value}`);
// }

////////////////////////////////////////////////////////////// cell 에 클릭이벤트 넣기
document.addEventListener('DOMContentLoaded', function() {
    // #content 내의 .cell 요소에 클릭 이벤트 리스너 추가
    const content = document.getElementById('content');
    
    content.addEventListener('click', function(event) {
        // 클릭한 요소가 .cell인지 확인
        const cell = event.target.closest('.cell');
        if (cell) {
            // 클릭한 .cell 내의 .container 찾기
            const container = cell.querySelector('.container');
            if (container) {
                // 아이템 이름 가져오기
                const itemName = container.querySelector('.itemName').textContent;

                // 색상 수집
                const colors = Array.from(container.querySelectorAll('.bgColor .color-box')).map(function(colorBox) {
                    return window.getComputedStyle(colorBox).backgroundColor;
                });

                // 선택한 .cell이 포함된 .location에서 .location_name의 텍스트 가져오기
                const locationName = cell.closest('.location').querySelector('.location_name').textContent;

                // 수집된 정보 출력 (또는 다른 처리)
                alert(`${locationName} ${itemName}${colors.map(color => color.replace('rgb', ''))} 기준으로 채널링하시겠습니까?`)
                // console.log('Item Name:', itemName);
                // console.log('Colors:', colors);
                // console.log('Location Name:', locationName);
                fetchLocationByServers(locationName);
            }
        }
    });
});



// 새로 추가된 함수 (특정 location에 대해 서버별 상점 정보를 가져옴)
async function fetchLocationByServers(targetLocation) {
    const resultList = [];
    const apiKey = document.getElementById("apiKeyInput").value;
  
    const headers = {
      accept: "application/json",
      "x-nxopen-api-key": apiKey,
    };
  
    // locations에서 targetLocation과 일치하는 location을 찾음
    const locationData = locations.find(loc => loc.location === targetLocation);
    if (!locationData) {
      console.error("해당 location을 찾을 수 없습니다.");
      return;
    }
  
    const npc = locationData.npc; // 해당 location의 NPC 이름
    const items = await fetchLocationData('상인 네루', '류트', '3', headers);
    console.log(`fetchlocationbyserver 실험완료`);
    
    Object.values(items[1].colors).forEach(color => {
        const rgb = hexToRgb(`#${color}`);
        console.log(rgb); // 변환된 RGB 값 출력
      });
    // serverObject에 해당하는 서버 이름 및 개수 가져오기
    // for (const [serverName, serverCount] of Object.entries(serverObject)) {
    //   for (let serverNum = 1; serverNum <= serverCount; serverNum++) {
    //     if (serverNum === 11) continue; // 11번 서버는 건너뜀
    //     console.log(`npc:${npc}, serverName:${serverName}, serverNum:${serverNum}`)
    //     // try {
    //     //   const items = await fetchLocationData(npc, serverName, serverNum, headers);
    //     //   resultList.push({ serverName, serverNum, items });
    //     // } catch (error) {
    //     //   console.error(`Error fetching data for server ${serverName} ${serverNum}:`, error);
    //     //   displayError(error);
    //     // }
    //   }
    // }
  
    // fetchedData = resultList; // 받아온 데이터를 저장
    // return resultList;
  }