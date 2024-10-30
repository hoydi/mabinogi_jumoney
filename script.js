const locations = [
    { location: '티르코네일', npc: '상인 네루' },
    { location: '던바튼', npc: '상인 누누' },
    { location: '카브', npc: '상인 아루' },
    { location: '반호르', npc: '상인 라누' },
    { location: '이멘마하', npc: '상인 메루' },
    { location: '탈틴', npc: '상인 베루' },
    { location: '타라', npc: '상인 에루' },
    { location: '벨바스트', npc: '상인 피루' },
    { location: '스카하', npc: '상인 세누' },
    { location: '켈라베이스', npc: '테일로' },
    { location: '카루', npc: '귀넥' },
    { location: '코르', npc: '리나' },
    { location: '오아시스', npc: '얼리' },
    { location: '필리아', npc: '켄' },
    { location: '발레스', npc: '카디' },
    { location: '페라', npc: '데위' },
    { location: '칼리다', npc: '모락' },
  ]
  let serverObject = { 류트: 42, 하프: 24, 울프: 15, 만돌린: 15 };
  const url = 'https://open.api.nexon.com/mabinogi/v1/npcshop/list'; // API 요청 URL
  
  function hexToRgb(hex) {
    // hex 색상을 RGB로 변환하는 함수
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `(${r}, ${g}, ${b})`;
  }
  
  let fetchedData = []; // 전체 데이터를 저장할 변수
  
  function isWithinTolerance(colorA, colorB, tolerance) {
    //필터링
    const rDiff = Math.abs(colorB.r - colorA.r);
    const gDiff = Math.abs(colorB.g - colorA.g);
    const bDiff = Math.abs(colorB.b - colorA.b);
    return rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance;
  }
  
  function parseRgb(rgbString) {
    // RGB 값을 비교하기 위한 헬퍼 함수
    const rgbValues = rgbString
      .replace(/[^0-9]/g, ' ')
      .trim()
      .split(/\s+/)
      .map(Number);
    if (
      rgbValues.length !== 3 ||
      rgbValues.some((value) => isNaN(value) || value === undefined)
    ) {
      return null;
    }
    return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
  }
  let filterToggle = 0;
  
  
  function filterData() {
    const tolerance = parseInt(document.getElementById('toleranceInput').value, 10) || 10;
  
    const inputGroups = document.querySelectorAll('#filterAbove .filterInput');
    const colors = Array.from(inputGroups)
      .map(group => {
        const logicalOperatorElem = group.querySelector('.filterAndOr');
        const logicalOperator = logicalOperatorElem ? logicalOperatorElem.value : 'and'; // 기본값
        const select = group.querySelector('.filterType').value;
        const colorInput = group.querySelector('.colorInput').value;
  
        // colorInput 값이 유효한지 검사
        const color = colorInput ? parseRgb(colorInput) : null;
        return color ? { logicalOperator, type: select, color } : null;
      })
      .filter(item => item !== null); // 유효하지 않은 group은 제외
  
    document.querySelectorAll('.cell').forEach((td) => {
      const color1 = td.querySelector('.A') ? window.getComputedStyle(td.querySelector('.A')).backgroundColor : null;
      const color2 = td.querySelector('.B') ? window.getComputedStyle(td.querySelector('.B')).backgroundColor : null;
      const color3 = td.querySelector('.C') ? window.getComputedStyle(td.querySelector('.C')).backgroundColor : null;
  
      let show = true;
  
      colors.forEach((item, index) => {
        const { type, color, logicalOperator } = item;
        if (color) {
          let isMatch;
  
          if (type === 'anywhere') {
            // anywhere일 경우, 세 가지 색상 중 하나라도 일치하면 true
            isMatch = [color1, color2, color3].some(targetColor =>
              targetColor && isWithinTolerance(color, parseRgb(targetColor), tolerance)
            );
          } else {
            // anywhere가 아닌 경우, 해당 type의 color와 비교
            const targetColor = type === 'outer' ? color1 : type === 'roman' ? color2 : type === 'inner' ? color3 : null;
            isMatch = targetColor && isWithinTolerance(color, parseRgb(targetColor), tolerance);
          }
  
          if (index === 0) {
            show = isMatch;
          } else if (logicalOperator === 'and') {
            show = show && isMatch;
          } else if (logicalOperator === 'or') {
            show = show || isMatch;
          }
        }
      });
  
      if (show) {
        td.classList.remove('hidden');
      } else {
        td.classList.add('hidden');
      }
    });
  
    const locations = document.querySelectorAll('.location');
  
    locations.forEach((content) => {
      const cells = content.querySelectorAll('.table .cell');
      const allCellsHidden = Array.from(cells).every((cell) => cell.classList.contains('hidden'));
  
      if (allCellsHidden) {
        content.classList.add('hidden');
      }
    });
    filterToggle = 1;
  }
  
  
  function resetFilterData() {
    document.querySelectorAll('#content > .location').forEach((self) => {
      self.classList.remove('hidden');
    });
    document.querySelectorAll('.cell').forEach((td) => {
      td.classList.remove('hidden');
    });
  
    filterToggle = 0;
  }
  
  // 필터 버튼에 이벤트 리스너 추가
  document.getElementById('filterButton').addEventListener('click', function () {
    // console.log(filterToggle)
    if (filterToggle != 1) {
      // console.log('필터링합니다');
      filterData();
    } else {
      resetFilterData();
    }
  });
  document.getElementById('autoFilter').addEventListener('change', function () {
    if (this.checked) {
      // 체크박스가 체크되었을 때 실행할 함수
      filterData();
    } else {
      resetFilterData();
    }
  });
  
  window.onload = function () {
    // console.log('온로드');
  
    // 로컬 스토리지에서 API 키 가져오기
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      document.getElementById('apiKeyInput').value = storedApiKey; // 가져온 키를 입력 필드에 설정
    }
  
    // 로컬 스토리지에서 서버 및 채널 값 가져오기
    const storedServer = localStorage.getItem('server');
    const storedChannel = localStorage.getItem('channel');
    if (storedServer) {
      document.getElementById('serverSelect').value = storedServer; // 서버 선택 설정
    }
    if (storedChannel) {
      const maxChannels = serverObject[storedServer]; // 해당 서버의 최대 채널 수
  
      // 채널 옵션 초기화
      channelInput.innerHTML = ""; // 기존 옵션 제거
  
      // 새로운 옵션 추가
      for (let i = 1; i <= maxChannels; i++) {
        const option = document.createElement("option");
        option.value = i; // 값은 1부터 maxChannels까지
        option.textContent = i; // 표시되는 텍스트도 동일
        channelInput.appendChild(option); // 옵션을 select에 추가
      }
      document.getElementById('channelInput').value = storedChannel; // 채널 입력 설정
    }
  
    // locations 배열을 기반으로 locationSelect에 옵션 추가
    const locationSelect = document.getElementById('locationSelect');
    locations.forEach(({ location }) => {
      const option = document.createElement('option');
      option.value = location;
      option.textContent = location;
      locationSelect.appendChild(option);
    });
  
    // RGB 색상 및 오차 범위 값 가져오기
    // const anywhereColor = localStorage.getItem('anywhereColor');
    // const storedOuterColor = localStorage.getItem('outerColor');
    // const storedRomanColor = localStorage.getItem('romanColor');
    // const storedInnerColor = localStorage.getItem('innerColor');
    const storedTolerance = localStorage.getItem('tolerance');
  
    // if (anywhereColor) {
    //   document.getElementById('anywhereColor').value = anywhereColor; // anywhereColor를 올바르게 설정
    // }
    // if (storedOuterColor) {
    //   document.getElementById('outerColor').value = storedOuterColor;
    // }
    // if (storedRomanColor) {
    //   document.getElementById('romanColor').value = storedRomanColor;
    // }
    // if (storedInnerColor) {
    //   document.getElementById('innerColor').value = storedInnerColor;
    // }
    if (storedTolerance) {
      document.getElementById('toleranceInput').value = storedTolerance;
    }
  };
  
  document.getElementById('apiKeyInput').addEventListener('input', function () {
    const apiKey = this.value;
    localStorage.setItem('apiKey', apiKey);
  });
  
  document.getElementById('serverSelect').addEventListener('change', function () {
    const server = this.value;
    localStorage.setItem('server', server);
  });
  
  document.getElementById('channelInput').addEventListener('input', function () {
    const channel = this.value;
    localStorage.setItem('channel', channel);
  });
  
  //////////////////////////////////////
  
  //api 호출
  async function fetchData() {
  
    const resultList = [];
    let serverName = document.getElementById('serverSelect').value;
    let channelNumber = document.getElementById('channelInput').value;
    if (channelNumber > serverObject[serverName]) {
      channelNumber = String(serverObject[serverName]);
      document.getElementById('channelInput').value = String(serverObject[serverName]);
    }
    const locationSelect = document.getElementById('locationSelect').value;
    const apiKey = document.getElementById('apiKeyInput').value;
  
    const headers = {
      accept: 'application/json',
      'x-nxopen-api-key': apiKey,
    };
  
    let alreadyExist = 0;
    fetchedData.forEach((data) => {
      if (
        data.serverNum === channelNumber &&
        data.serverName == serverName &&
        data.location == locationSelect
      ) {
        resultList.push(data);
        alreadyExist = 1;
      }
    });
  
    if (!alreadyExist) {
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingOverlay.style.display = 'flex'; // display를 flex로 설정
  
      // console.log('fetch 시작');
  
      for (const { location, npc } of locations) {
        if (locationSelect == '전체' || locationSelect == location) {
          const fetchWithRetry = async (
            npc,
            serverName,
            channelNumber,
            headers,
            retries = 10,
          ) => {
            for (let attempt = 0; attempt < retries; attempt++) {
              try {
                const items = await fetchLocationData(
                  npc,
                  serverName,
                  channelNumber,
                  headers,
                );
                return items; // 성공 시 아이템 반환
              } catch (error) {
                displayError(error, attempt + 1);
  
                console.log(
                  `Attempt ${attempt + 1} failed: ${error.message
                  }`,
                );
                if (attempt < retries - 1) {
                  console.log('Retrying in 1 minute...');
                  await new Promise((resolve) =>
                    setTimeout(resolve, 60000),
                  ); // 1분 대기
                } else {
                  console.log('Max retries reached. Exiting...');
                  throw error; // 재시도 최대 횟수 초과 시 오류 발생
                }
              }
            }
          };
  
          try {
            const items = await fetchWithRetry(
              npc,
              serverName,
              channelNumber,
              headers,
              10,
            );
            let serverNum = channelNumber;
            const exists = fetchedData.some(
              (item) =>
                item.serverName == serverName &&
                item.serverNum == channelNumber &&
                item.location == location,
            );
  
            if (!exists) {
              resultList.push({
                serverName,
                serverNum,
                location,
                items,
              });
              fetchedData.push({
                serverName,
                serverNum,
                location,
                items,
              });
            } else {
              resultList.push({
                serverName,
                serverNum,
                location,
                items,
              });
            }
          } catch (error) {
            console.log(error);
            displayError(error, 0);
            return 0;
          }
        }
      }
    }
  
    return resultList;
  }
  
  async function fetchLocationData(npc, serverName, channelNumber, headers) {
    const params = new URLSearchParams({
      npc_name: npc,
      server_name: serverName,
      channel: channelNumber,
    });
  
    const response = await fetch(`${url}?${params}`, { headers });
    if (!response.ok) {
      const errortext = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errortext}`);
    }
  
    const data = await response.json();
    return processShops(data.shop);
  }
  
  function processShops(shops) {
    const items = [];
  
    const filteredShops = shops.filter((shop) => shop.tab_name === '주머니');
    for (const shop of filteredShops) {
      for (const item of shop.item) {
        const itemDisplayName = item.item_display_name;
        const imageUrl = item.image_url;
  
        //"image_url": "https://open.api.nexon.com/static/mabinogi/img/1d34c4779a0fd31b62ac98881726142e?q=4b4549555b525d5887464e4c5a4f48564a8a50425e4648534a4e844350574c484e555e8f4c434f4543454d4b884849585f525d484d"
        if (imageUrl.includes('img')) {
          const selectedColors = findColorData(imageUrl);
          items.push({
            itemDisplayName,
            colors: selectedColors,
            imageUrl,
          });
          // console.log(`item colors: ${JSON.stringify(selectedColors)} `)
        }
      }
    }
  
    return items;
  }
  
  // function extractColors(imageUrl) {
  
  //   const encodedString = imageUrl.split("item_color=")[1];
  //   const decodedString = decodeURIComponent(encodedString);
  //   const colors = JSON.parse(decodedString);
  
  //   // 필요한 색상만 선택
  //   const selectedColors = {};
  //   const colorKeys = ["color_01", "color_02", "color_03"];
  
  //   colorKeys.forEach((key) => {
  //     if (colors[key]) {
  //       selectedColors[key] = colors[key].replace("#", "").toLowerCase();
  //     }
  //   });
  
  //   return selectedColors;
  
  // }
  let decodeData; // 외부에서 접근 가능한 decodeData 변수
  
  // decode.json 파일 불러오기 함수
  async function loadDecodeData() {
    try {
      const response = await fetch('combined_result.json'); // JSON 파일 경로
      decodeData = await response.json(); // JSON 데이터를 전역 변수에 할당
      // console.log("Loaded decodeData:", decodeData['A']["1"]["upper"]["5A"]); // 데이터 로딩 후 로그 출력
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }
  
  // async 함수로 초기화 후 사용
  async function initialize() {
    await loadDecodeData(); // decodeData 로드 완료
  }
  
  initialize();
  // extractColors 함수
  function extractColors(url) {
    const queryString = url.split('?q=')[1];
  
    // 18자리씩 분리 후 변환
    const blocks = queryString
      .match(/.{1,18}/g)
      .map((block) =>
        block.length === 18 ? block.slice(4, -2) : block.slice(4),
      )
      .map((block) => block.match(/.{1,4}/g));
  
    // 첫 3개 블록만 반환
    return blocks.slice(0, 3);
  }
  
  // decode.json에서 색상 데이터 찾기 함수
  function findColorData(url) {
    function rgbToHex(rgbObj) {
      const hexObj = {};
      for (const key in rgbObj) {
        hexObj[key] = rgbObj[key]
          .map((value) =>
            (value !== null ? value : 0x11)
              .toString(16)
              .padStart(2, '0'),
          )
          .join('')
          .toString();
      }
      return hexObj;
    }
  
    const blocks = extractColors(url);
    const result = { A: [], B: [], C: [] };
  
    const keys = ['A', 'B', 'C'];
    blocks.forEach((block, blockIdx) => {
      block.forEach((code, idx) => {
        //block=4b54,4f52,4c49 blockIdx=0 code=4b54 idx=0
        // console.log(`block=${block} blockIdx=${blockIdx} code=${code} idx=${idx}`)
  
        const key = keys[blockIdx];
        const data =
          decodeData[key]?.[idx + 1]?.['upper']?.[
          code.slice(0, 2).toUpperCase()
          ] *
          16 +
          decodeData[key]?.[idx + 1]?.['lower']?.[
          code.slice(2).toUpperCase()
          ];
  
        // console.log(`cod=${code}, codeslice=${code.slice(0, 2).toUpperCase()} key=${key} idx=${idx+1} data=${(decodeData[key]?.[idx + 1]?.['upper']?.[code.slice(0, 2).toUpperCase()])}`)
        result[key].push(data !== undefined ? data : null);
      });
    });
    // console.log(`findColorData: ${JSON.stringify(rgbToHex(result))}`);
  
    return rgbToHex(result);
  }
  
  function displayError(error, attempt) {
    const content = document.getElementById('content');
    const jsonString = error.message.substring(error.message.indexOf('{'));
    const errorObject = JSON.parse(jsonString);
  
    let message = "";
  
    switch (errorObject.error.name) {
      case "OPENAPI00001":
        message = "내부 서버 오류 - 서버 내부 오류";
        break;
      case "OPENAPI00002":
        message = "접근 거부 - 권한 없는 접근";
        break;
      case "OPENAPI00003":
        message = "잘못된 식별자";
        break;
      case "OPENAPI00004":
        message = "누락되었거나 잘못된 매개변수";
        break;
      case "OPENAPI00005":
        message = "잘못된 API 키";
        break;
      case "OPENAPI00006":
        message = "잘못된 게임 또는 API 경로";
        break;
      case "OPENAPI00007":
        message = "요청 과다 - API 호출 한도 초과";
        break;
      case "OPENAPI00009":
        message = `데이터 준비 중 - 1분 후 자동으로 다시 시도합니다. ${attempt}번째 시도중...`;
        break;
      case "OPENAPI00010":
        message = "서비스 점검 중";
        break;
      case "OPENAPI00011":
        message = "API 점검 중";
        break;
      default:
        message = "알 수 없는 오류 - 다시 시도해 주세요.";
    }
  
    content.innerHTML = `<div style="color: red;">${message}</div>`;
  }
  ////////////////////////////////////
  
  // API 정보 배치 렌더링
  async function renderData(filteredData) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // 기존 내용을 초기화
  
    for (const { location, items } of filteredData) {
      const locationDiv = document.createElement('div');
      locationDiv.className = 'location';
      locationDiv.innerHTML = `<div class="location_name">${location}<div>`;
      content.appendChild(locationDiv);
  
      const table = document.createElement('div');
      table.className = 'table'; // 테이블 클래스 추가
  
      for (const { itemDisplayName, colors, imageUrl } of items) {
        const cell = document.createElement('div');
        cell.className = 'cell';
  
        // 왼쪽과 오른쪽을 나누기 위한 div 생성
        const container = document.createElement('div');
        container.className = 'container';
        const upDiv = document.createElement('div');
        upDiv.className = 'itemName';
        const downDiv = document.createElement('div');
        downDiv.className = 'itemDetail';
  
        const leftDiv = document.createElement('div');
        leftDiv.className = 'bgColor';
  
        upDiv.innerHTML = `${itemDisplayName}`;
  
        for (const [colorName, colorValue] of Object.entries(colors)) {
          const leftInDiv = document.createElement('div');
          leftInDiv.className = 'color-box-box';
          const colorBox = document.createElement('div');
          colorBox.className = `color-box ${colorName}`;
          colorBox.style.backgroundColor = '#' + colorValue;
          colorBox.style.width = '20px';
          colorBox.style.height = '20px';
          leftInDiv.appendChild(colorBox);
          leftInDiv.innerHTML += `<p class="color-box-color">${hexToRgb(
            '#' + colorValue,
          )}</p><br>`;
          leftDiv.appendChild(leftInDiv);
        }
  
        const [hex1, hex2, hex3] = Object.values(colors).slice(0, 3);
        mabibase_color = [hex1, hex2, hex3]
          .map((hex) => `0x${hex}`)
          .join('%2C');
  
        const rightDiv = document.createElement('div');
        rightDiv.style.flex = '1';
        rightDiv.className = 'item-img';
        rightDiv.style.display = 'flex';
        rightDiv.style.justifyContent = 'center';
        rightDiv.style.alignItems = 'center';
  
        const img = document.createElement('img');
        let pouchImg = await guichana(itemDisplayName, colors);
        img.src = pouchImg.src;
  
        img.onerror = function () {
          img.src = 'no_image.png';
        };
  
        img.alt = itemDisplayName;
        img.style.height = '56px';
        img.style.objectFit = 'contain';
        img.style.paddingBottom = '3px';
  
        const img0 = document.createElement('img');
        img0.src = imageUrl;
        img0.style.maxWidth = '64px';
  
        rightDiv.appendChild(img0);
        rightDiv.appendChild(img);
  
        downDiv.appendChild(leftDiv);
        downDiv.appendChild(rightDiv);
        container.appendChild(upDiv);
        container.appendChild(downDiv);
  
        cell.appendChild(container);
        table.appendChild(cell);
      }
      locationDiv.appendChild(table);
    }
    const cells = document.querySelectorAll('.cell');
    // new ChannelingHandler(cells);
  }
  
  
  // locationSelect 변경 시 필터링된 데이터 렌더링
  document.getElementById('locationSelect').addEventListener('change', () => {
    // console.log('교역소변경');
    lastNextResetTime = null;
    document.getElementById('fetchButton').dispatchEvent(new Event('click'));
  });
  
  document.getElementById('autoFetchCheckbox').addEventListener('change', (event) => {
    if (event.target.checked) {
      // console.log('자동실행체크');
      if (Notification.permission !== 'granted') {
        // console.log('Notification permission not granted.');
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // console.log('Notification permission granted.');
            // 여기에 알림 전송 코드 추가 가능
          } else {
            // console.log('Notification permission denied.');
          }
        });
      }
    }
    document.getElementById('fetchButton').dispatchEvent(new Event('click'));
  });
  
  //채널바꾸면 lastNextResetTime null 만들어서 fetch 되게
  document.getElementById('channelInput').addEventListener('change', function () {
    // console.log('채널변경')
    // let server = document.getElementById("serverSelect").value;
    // let channel = document.getElementById("channelInput").value;
    // const selectedLocation = document.getElementById("locationSelect").value;
    // const filteredData =
    //   selectedLocation === "전체"
    //     ? fetchedData.filter(({ serverNum, serverName }) => server == serverName && channel == serverNum)
    //     : fetchedData.filter(({ location, serverNum, serverName }) => location === selectedLocation && server == serverName && channel == serverNum); // 선택된 위치에 해당하는 데이터만 필터링
  
    // renderData(filteredData);
    lastNextResetTime = null; // 값이 변경될 때 lastNextResetTime을 null로 설정
    document.getElementById('fetchButton').dispatchEvent(new Event('click'));
  });
  
  // 버튼 클릭 시 데이터 가져오기 및 렌더링
  document.getElementById('fetchButton').addEventListener('click', async () => {
    const serverName = document.getElementById('serverSelect').value;
    const channelNumber = document.getElementById('channelInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
  
    // 빈 값 체크
    if (!serverName || !channelNumber || !apiKey) {
      alert('빈 값이 있으면 검색이 되지 않습니다.');
  
      // 빈값인 첫 번째 입력란에 포커스
      if (!serverName) {
        document.getElementById('serverSelect').focus();
      } else if (!channelNumber) {
        document.getElementById('channelInput').focus();
      } else if (!apiKey) {
        document.getElementById('apiKeyInput').focus();
      }
  
      return; // 함수 종료
    }
    if (
      lastNextResetTime &&
      lastNextResetTime.getTime() === nextResetTime.getTime()
    ) {
      // console.log("아직 시간 안바뀜");
      // console.log(lastNextResetTime);
      return;
    }
  
    const data = await fetchData();
    if (data) {
      await renderData(data);
      if (document.getElementById('autoFilter').checked) {
        // console.log("자동필터링 실행");
        filterData();
      }
  
      lastNextResetTime = nextResetTime;
  
    }
    document.getElementById('loadingOverlay').style.display = 'none';
  });
  
  //////////////////////////////
  
  // API 키 입력 필드에 이벤트 리스너 추가
  document.getElementById('apiKeyInput').addEventListener('input', function () {
    const apiKey = this.value; // 입력값 가져오기
    localStorage.setItem('apiKey', apiKey); // 로컬 스토리지에 저장
  });
  
  // 서버 선택 필드에 이벤트 리스너 추가
  document.getElementById('serverSelect').addEventListener('change', function () {
    const server = this.value; // 선택한 서버 가져오기
    localStorage.setItem('server', server); // 로컬 스토리지에 저장
    lastNextResetTime = null;
    // console.log('null');
    document.getElementById('fetchButton').dispatchEvent(new Event('click'));
  });
  
  // 채널 입력 필드에 이벤트 리스너 추가
  document.getElementById('channelInput').addEventListener('input', function () {
    const channel = this.value; // 입력값 가져오기
    localStorage.setItem('channel', channel); // 로컬 스토리지에 저장
  });
  
  // RGB 색상 입력 필드에 이벤트 리스너 추가
  // document.getElementById('anywhereColor').addEventListener('input', function () {
  //   const anywhereColor = this.value; // 입력값 가져오기
  //   localStorage.setItem('anywhereColor', anywhereColor); // 로컬 스토리지에 저장
  // });
  
  // document.getElementById('outerColor').addEventListener('input', function () {
  //   const outerColor = this.value; // 입력값 가져오기
  //   localStorage.setItem('outerColor', outerColor); // 로컬 스토리지에 저장
  // });
  
  // document.getElementById('romanColor').addEventListener('input', function () {
  //   const romanColor = this.value; // 입력값 가져오기
  //   localStorage.setItem('romanColor', romanColor); // 로컬 스토리지에 저장
  // });
  
  // document.getElementById('innerColor').addEventListener('input', function () {
  //   const innerColor = this.value; // 입력값 가져오기
  //   localStorage.setItem('innerColor', innerColor); // 로컬 스토리지에 저장
  // });
  
  // 오차 범위 입력 필드에 이벤트 리스너 추가
  document
    .getElementById('toleranceInput')
    .addEventListener('input', function () {
      const tolerance = this.value; // 입력값 가져오기
      localStorage.setItem('tolerance', tolerance); // 로컬 스토리지에 저장
    });
  
  ////////////////////////////
  const totalMinutesInDay = 24 * 60; // 24시간을 분으로 변환
  const intervalMinutes = 36; // 초기화 간격 36분
  const totalIntervals = totalMinutesInDay / intervalMinutes; // 36분으로 나눈 시간 조각의 수
  
  let previousResetTime = null; // 이전 초기화 시간
  let timerId = null; // 타이머 ID
  let nextResetTime = null; // 글로벌 변수로 nextResetTime 선언
  let lastNextResetTime = null;
  let resetTime = null; // 1타임 전 시간을 저장할 변수
  
  function updateNextResetTime() {
    const currentTime = new Date();
  
    // 현재 시간을 분으로 변환
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
  
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
  
    // 1타임 전 시간을 계산
    resetTime = new Date(nextResetTime);
    resetTime.setMinutes(resetTime.getMinutes() - intervalMinutes); // 36분 전
  
    // 초 단위로 업데이트
    const secondsRemaining = Math.ceil((nextResetTime - currentTime) / 1000);
  
    // 시간 변경 시 함수 호출
    if (
      previousResetTime &&
      previousResetTime.getTime() !== nextResetTime.getTime()
    ) {
      console.log('시간 바뀜'); // 시간 변경 메시지
      fetchedData = [];
      // console.log(fetchData);
  
      // 체크박스가 체크되어 있을 때만 fetchData 실행
      if (document.getElementById('autoFetchCheckbox').checked) {
        if (timerId) {
          clearTimeout(timerId); // 이전 타이머 정리
        }
        timerId = setTimeout(async () => {
          const data = await fetchData(); // 데이터를 가져오는 함수
          if (data) {
            await renderData(data); // 가져온 데이터를 렌더링하는 함수
            if (document.getElementById('autoFilter').checked) {
              // console.log('자동필터링 실행');
              filterData();
            }
  
            windowNotification('주머니 업데이트');
          }
          document.getElementById('loadingOverlay').style.display = 'none';
        }, 1 * 30 * 1000); // 30초 후
      }
    }
  
    // 현재 초기화 시간을 이전 시간으로 저장
    previousResetTime = nextResetTime;
  
    // 결과를 표시
    document.getElementById(
      'next-time',
    ).innerHTML = `[${resetTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })} ~ ${nextResetTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}] <span id="secondsRemaining">⌛${secondsRemaining}초</span> 후 초기화`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateNextResetTime();
    setInterval(updateNextResetTime, 1000);
  });
  ////////////////////////////
  
  //윈도우 알림 띄우기
  function windowNotification(msg) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showWindowNotification(msg);
        }
      });
    } else {
      showWindowNotification(msg);
      console.log(msg);
    }
  }
  
  function showWindowNotification(msg) {
    let notification = new Notification('주머니 상점 정보', {
      body: msg,
      icon: './favicon.ico',
    });
  
    notification.onclick = () => {
      window.focus();
    };
  }
  
  // ChannelingHandler 클래스 정의
  // class ChannelingHandler {
  //   constructor(cells) {
  //     this.cells = cells;
  //     this.init();
  //   }
  
  //   init() {
  //     this.cells.forEach((cell) => {
  //       cell.addEventListener("click", () => this.handleCellClick(cell));
  //     });
  //   }
  
  //   handleCellClick(cell) {
  //     const itemName = this.getItemName(cell);
  //     const rgbCodes = this.getRGBCode(cell); // RGB 코드 가져오기
  //     const confirmationMessage = `${itemName}를 기준으로 채널링할까요?\nRGB Codes: ${rgbCodes.join(', ')}`;
  
  //     if (this.confirmAction(confirmationMessage)) {
  //       this.logCompletion(itemName);
  //     }
  //   }
  
  //   getItemName(cell) {
  //     return cell.querySelector(".container .itemName").textContent;
  //   }
  //   //rgb 코드 리스트
  //   getRGBCode(cell) {
  //     const colorBoxes = cell.querySelectorAll('.color-box'); // color-box 요소 선택
  //     const rgbCodes = Array.from(colorBoxes).map(box => {
  //       const bgColor = window.getComputedStyle(box).backgroundColor; // 배경색 가져오기
  //       return bgColor; // RGB 값 반환
  //     });
  //     return rgbCodes; // 배열로 반환
  //   }
  
  //   confirmAction(message) {
  //     return confirm(message);
  //   }
  
  //   logCompletion(itemName, rgbCodes) {
  
  //     console.log(`${itemName} 순회완료`);
  //   }
  // }
  