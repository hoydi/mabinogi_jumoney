let str = ['(100,200,300)','40.50.60','6/2/4','(500, 300, 200)']


// RGB 값을 비교하기 위한 헬퍼 함수
function parseRgb(rgbString) {
    const rgbValues = rgbString
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);

    // 유효한 숫자 검사를 진행합니다
    if (
        rgbValues.length !== 3 ||
        rgbValues.some(value => isNaN(value) || value === undefined)
    ) {
        return null;
    }

    return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
}


function parseRgbVer2(rgbString) {
  const rgbValues = rgbString
    .replace(/[^0-9]/g, " ") // 숫자가 아닌 모든 문자를 공백으로 바꿉니다
    .trim() // 문자열 양 끝의 공백을 제거합니다
    .split(/\s+/) // 공백을 기준으로 분할합니다
    .map(Number);

  // 유효한 숫자 검사를 진행합니다
  if (
    rgbValues.length !== 3 ||
    rgbValues.some(value => isNaN(value) || value === undefined)
  ) {
    return null;
  }

  return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
}


str.forEach(rgbString => {
  const result1 = parseRgb(rgbString);
  const result2 = parseRgb2(rgbString);
  
  console.log(`parseRgb = ${JSON.stringify(result1)}`);
  console.log(`parseRgb2 = ${JSON.stringify(result2)}`);
});