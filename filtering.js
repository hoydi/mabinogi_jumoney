document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 필터링 입력값 불러오기
    const storedInputs = JSON.parse(localStorage.getItem('filterInputs')) || [];

    // 첫 번째 입력값을 가져와서 기존 .filterInput에 넣기
    if (storedInputs.length > 0) {
        const firstInput = storedInputs.shift(); // 첫 번째 값을 꺼냄
        const firstFilterInput = document.querySelector('.filterInput');

        // 기존 .filterInput에 값 설정
        if (firstFilterInput) {
            firstFilterInput.querySelector('.filterType').value = firstInput.filterType;
            firstFilterInput.querySelector('.colorInput').value = firstInput.colorInput;

            // 기존 .filterInput에 대한 이벤트 리스너 추가
            firstFilterInput.querySelector('.filterType').addEventListener('change', saveToLocalStorage);
            firstFilterInput.querySelector('.colorInput').addEventListener('input', saveToLocalStorage);
        }
    }

    // 나머지 입력값을 추가
    storedInputs.forEach(input => {
        addInputGroup(input.filterType, input.colorInput, input.filterAndOr);
    });
});


document.getElementById('addInputButton').addEventListener('click', () => {
    const newInputGroup = addInputGroup();
    saveToLocalStorage();
});

function addInputGroup(filterType = 'anywhere', colorInput = '', filterAndOr = 'and') {
    const newInputGroup = document.createElement('div');
    newInputGroup.classList.add('tooltip', 'filterInput');
    newInputGroup.innerHTML = `
        <label for="filterType"></label>
        <select class="filterType">
            <option value="anywhere" ${filterType === 'anywhere' ? 'selected' : ''}>전체</option>
            <option value="outer" ${filterType === 'outer' ? 'selected' : ''}>겉감</option>
            <option value="roman" ${filterType === 'roman' ? 'selected' : ''}>로마자</option>
            <option value="inner" ${filterType === 'inner' ? 'selected' : ''}>안감</option>
        </select>
        <input type="text" class="colorInput" placeholder="예: 0, 255, 0" value="${colorInput}" />
        <span class="tooltiptext">필터링 RGB값 예시 - (0,0,0) | 0/0/0 | 0.0.0 | 0 0 0</span>
        <select class="filterAndOr">
            <option value="and" ${filterAndOr === 'and' ? 'selected' : ''}>AND</option>
            <option value="or" ${filterAndOr === 'or' ? 'selected' : ''}>OR</option>
        </select>
        <button class="filterDeleteButton">삭제</button>
    `;

    newInputGroup.querySelector('.filterDeleteButton').addEventListener('click', () => {
        newInputGroup.remove(); // 해당 요소 삭제
        saveToLocalStorage(); // 삭제 후 로컬 스토리지 업데이트
    });

    document.getElementById('filterAbove').appendChild(newInputGroup);

    // 값이 변경될 때마다 로컬 스토리지 업데이트
    newInputGroup.querySelector('.filterType').addEventListener('change', saveToLocalStorage);
    newInputGroup.querySelector('.colorInput').addEventListener('input', saveToLocalStorage);
    newInputGroup.querySelector('.filterAndOr').addEventListener('change', saveToLocalStorage);

    return newInputGroup;
}

function saveToLocalStorage() {
    const filterInputs = Array.from(document.querySelectorAll('.filterInput')).map(inputGroup => {
        const filterType = inputGroup.querySelector('.filterType').value;
        const colorInput = inputGroup.querySelector('.colorInput').value;

        // filterAndOr가 존재하는지 체크
        const filterAndOrElement = inputGroup.querySelector('.filterAndOr');
        const filterAndOr = filterAndOrElement ? filterAndOrElement.value : 'and'; // 기본값 설정

        return { filterType, colorInput, filterAndOr };
    });
    localStorage.setItem('filterInputs', JSON.stringify(filterInputs));
}
