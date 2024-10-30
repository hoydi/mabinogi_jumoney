const pouchNames = [
    '튼튼한 달걀 주머니', '튼튼한 감자 주머니', '튼튼한 옥수수 주머니', '튼튼한 밀 주머니', '튼튼한 보리 주머니',
    '튼튼한 양털 주머니', '튼튼한 거미줄 주머니', '튼튼한 가는 실뭉치 주머니', '튼튼한 굵은 실뭉치 주머니', '튼튼한 꽃바구니',
    '튼튼한 저가형 가죽 주머니', '튼튼한 일반 가죽 주머니', '튼튼한 고급 가죽 주머니', '튼튼한 최고급 가죽 주머니',
    '튼튼한 저가형 옷감 주머니', '튼튼한 일반 옷감 주머니', '튼튼한 고급 옷감 주머니', '튼튼한 최고급 옷감 주머니',
    '튼튼한 저가형 실크 주머니', '튼튼한 일반 실크 주머니', '튼튼한 고급 실크 주머니', '튼튼한 최고급 실크 주머니'
];

// typeName과 품질에 따른 매핑 설정
const basicTypes = { '달걀': 'egg', '감자': 'potato', '옥수수': 'corn', '밀': 'wheat', '보리': 'barley' };
const textileTypes = { '양털': 'wool', '거미줄': 'cobweb', '가는': 'thinThread', '굵은': 'thickThread', '꽃바구니': 'flower' };
const qualityMap = { '저가형': 'cheap', '일반': 'common', '고급': 'fine', '최고급': 'finest' };

// 색상 문자열을 RGB 객체로 변환하는 함수
function hexStringToRgb(hex) {
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function guichana(name, colorMap) {
    const outgam = hexStringToRgb(colorMap.A); // A의 RGB 값
    const ingam = hexStringToRgb(colorMap.B); // B의 RGB 값
    const roman = hexStringToRgb(colorMap.C); // C의 RGB 값

    drawLayers(name, outgam, ingam, roman);
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// 이미지 로드 함수
function loadImages(sources) {
    return Promise.all(
        sources.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
            });
        })
    );
}

// 투명도를 기준으로 색상 필터와 혼합 효과를 적용하는 함수 (x, y 좌표 추가)
function applyColorAndMultiply(ctx, img, color, blendMode, applyColor = true, x = 0, y = 0) {
    // 새로운 임시 캔버스 생성
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;

    // 임시 캔버스에 이미지 그리기
    tempCtx.drawImage(img, 0, 0);
    const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    // 투명한 부분은 건너뛰고 불투명한 픽셀에만 색상을 적용
    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]; // 투명도 확인
        if (alpha > 0 && applyColor) { // applyColor가 true일 때만 색상 변환
            data[i] = (data[i] * color.r) / 255; // Red
            data[i + 1] = (data[i + 1] * color.g) / 255; // Green
            data[i + 2] = (data[i + 2] * color.b) / 255; // Blue
        }
    }

    // 수정된 데이터를 임시 캔버스에 적용
    tempCtx.putImageData(imgData, 0, 0);

    // 주 캔버스에 혼합 모드를 설정하고 임시 캔버스의 이미지를 (x, y)에 그리기
    ctx.globalCompositeOperation = blendMode;
    ctx.drawImage(tempCanvas, x, y);

    // 기본 혼합 모드로 복귀
    ctx.globalCompositeOperation = "source-over";
}

const accentuatedColor = {
    r: Math.min(255, 0 + 50), // 기본 색상에 추가
    g: Math.min(255, 0 + 50),
    b: Math.min(255, 0 + 50)
};


// 이미지 경로 생성 함수
function getImagePaths(name) {
    let typeName = '';
    let pouchType = '';
    let additionalPaths = [];

    if (basicTypes[name.split(' ')[1]]) {
        pouchType = 'crop';
        typeName = basicTypes[name.split(' ')[1]];
    } else if (textileTypes[name.split(' ')[1]]) {
        pouchType = 'textile';
        typeName = textileTypes[name.split(' ')[1]];
        if (![name.split(' ')[1]].includes('양털')) {
            additionalPaths.push(`./pouch/${pouchType}/open_${typeName}_pattern.png`);
        }

    } else {
        console.log(name)
        const qualityKey = name.split(' ')[1];
        pouchType = name.includes('가죽') ? 'leather' : name.includes('옷감') ? 'fabric' : 'silk';
        typeName = pouchType;
        const quality = qualityMap[qualityKey];
        console.log(quality)
        additionalPaths.push(

            `./pouch/${pouchType}/${quality}_roman1.png`,
            `./pouch/${pouchType}/${quality}_roman2.png`,
            `./pouch/${pouchType}/${quality}_roman3.png`
        );
    }

    // 공통 경로 및 추가 경로 반환
    const basePaths = [
        `./pouch/${pouchType}/open_${typeName}_base.png`,
        `./pouch/${pouchType}/open_${typeName}_in.png`,
        `./pouch/${pouchType}/open_${typeName}_out.png`,
        `./pouch/${pouchType}/open_${typeName}_light.png`,
        `./pouch/mark.png`
    ];

    return basePaths.concat(additionalPaths);
}

// pouchNames에 따라 이미지 경로 생성
const allImagePaths = pouchNames.map(name => getImagePaths(name));
console.log(allImagePaths);













// 모든 이미지 레이어를 그리는 함수
async function drawLayers(pouchName, outgam, ingam, roman) {
    // pouchName을 사용하여 이미지 경로 배열을 가져옴
    const imageSources = getImagePaths(pouchName);

    // 이미지 로드
    const images = await loadImages(imageSources);

    // 캔버스 크기를 첫 번째 이미지 크기로 설정
    canvas.width = images[0].width;
    canvas.height = images[0].height;

    // 이미지 레이어 처리
    applyColorAndMultiply(ctx, images[0], { r: 0, g: 0, b: 0 }, "source-over", false); // base

    if (/달걀|감자|옥수수|밀|보리/.test(pouchName)) {


        applyColorAndMultiply(ctx, images[1], ingam, "source-over", false); //in
        applyColorAndMultiply(ctx, images[2], outgam, "color-burn");                       // out
        applyColorAndMultiply(ctx, images[2], outgam, "multiply");                         // out
        applyColorAndMultiply(ctx, images[3], { r: 255, g: 255, b: 255 }, "lighter", false); // light
    }
    else if (/거미줄|가는|굵은/.test(pouchName)) {

        applyColorAndMultiply(ctx, images[1], roman, "color-burn"); //in
        applyColorAndMultiply(ctx, images[1], roman, "multiply"); // in
        applyColorAndMultiply(ctx, images[2], outgam, "color-burn");                       // out
        applyColorAndMultiply(ctx, images[2], outgam, "multiply");                         // out
        const pattern = images[5];

        applyColorAndMultiply(ctx, pattern, ingam, "multiply");                     // pattern
        applyColorAndMultiply(ctx, images[3], { r: 255, g: 255, b: 255 }, "lighter", false); // light
    }
    else if (/꽃/.test(pouchName)) {
        applyColorAndMultiply(ctx, images[1], ingam, "color-burn"); //in
        applyColorAndMultiply(ctx, images[1], ingam, "multiply"); // in
        applyColorAndMultiply(ctx, images[2], outgam, "color-burn");                       // out
        applyColorAndMultiply(ctx, images[2], outgam, "multiply");                         // out
        const pattern = images[5];

        applyColorAndMultiply(ctx, pattern, roman, "multiply");                     // pattern
        applyColorAndMultiply(ctx, images[3], { r: 255, g: 255, b: 255 }, "lighter", false); // light

    }
    else {
        applyColorAndMultiply(ctx, images[1], ingam, "color-burn"); //in
        applyColorAndMultiply(ctx, images[1], ingam, "multiply"); // in
        applyColorAndMultiply(ctx, images[2], outgam, "color-burn");                       // out
        applyColorAndMultiply(ctx, images[2], outgam, "multiply");                         // out
        applyColorAndMultiply(ctx, images[3], { r: 255, g: 255, b: 255 }, "lighter", false); // light
    }




    // 추가 레이어 (패턴 및 로만)
    if (pouchName.includes("가죽") || pouchName.includes("옷감") || pouchName.includes("실크")) {
        const romans = images.slice(5, 8); // 로만 이미지를 배열에서 가져옴
        applyColorAndMultiply(ctx, romans[2], roman, "source-over");                    // roman3
        applyColorAndMultiply(ctx, romans[1], { r: 0, g: 0, b: 0 }, "screen", false);   // roman2
        applyColorAndMultiply(ctx, romans[0], { r: 0, g: 0, b: 0 }, "color-burn", false); // roman1
        applyColorAndMultiply(ctx, romans[0], { r: 0, g: 0, b: 0 }, "multiply", false); // roman1
        applyColorAndMultiply(ctx, romans[0], roman, "color-dodge", false);              // roman1
    }
    // mark 이미지는 마지막에 위치하므로 해당 이미지를 사용하여 표시
    const markImage = images[4];
    applyColorAndMultiply(ctx, markImage, { r: 255, g: 255, b: 255 }, "source-over", false, 0, canvas.height - markImage.height); // mark


    // 최종 이미지 캔버스를 data URL로 변환하여 img 요소에 추가
    const imgElement = document.createElement("img");
    imgElement.src = canvas.toDataURL("image/png");

}

