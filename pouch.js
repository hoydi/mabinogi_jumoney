const _0x35d007 = _0x56c7; (function (_0x4712e1, _0x16e954) { const _0x445bd1 = _0x56c7, _0x4f1255 = _0x4712e1(); while (!![]) { try { const _0x331373 = parseInt(_0x445bd1(0x119)) / 0x1 + parseInt(_0x445bd1(0xef)) / 0x2 * (-parseInt(_0x445bd1(0xf7)) / 0x3) + parseInt(_0x445bd1(0x10f)) / 0x4 + parseInt(_0x445bd1(0xf9)) / 0x5 * (-parseInt(_0x445bd1(0xda)) / 0x6) + -parseInt(_0x445bd1(0xdb)) / 0x7 + parseInt(_0x445bd1(0x109)) / 0x8 * (parseInt(_0x445bd1(0x10c)) / 0x9) + -parseInt(_0x445bd1(0xed)) / 0xa; if (_0x331373 === _0x16e954) break; else _0x4f1255['push'](_0x4f1255['shift']()); } catch (_0x3d950e) { _0x4f1255['push'](_0x4f1255['shift']()); } } }(_0x49a3, 0xa15a6)); const pouchNames = [_0x35d007(0x115), _0x35d007(0xc9), _0x35d007(0xd4), _0x35d007(0xcc), _0x35d007(0xfc), _0x35d007(0xf4), _0x35d007(0xd7), _0x35d007(0xf2), _0x35d007(0xce), _0x35d007(0x111), _0x35d007(0x114), _0x35d007(0xf5), _0x35d007(0xeb), _0x35d007(0xf3), _0x35d007(0xd2), _0x35d007(0x11a), _0x35d007(0xf8), _0x35d007(0xe8), _0x35d007(0x10a), _0x35d007(0x10e), _0x35d007(0x101), _0x35d007(0xee)], basicTypes = { '달걀': _0x35d007(0x102), '감자': _0x35d007(0xdd), '옥수수': _0x35d007(0xcb), '밀': _0x35d007(0xd3), '보리': _0x35d007(0xf6) }, textileTypes = { '양털': 'wool', '거미줄': _0x35d007(0xd8), '가는': _0x35d007(0xfe), '굵은': 'thickThread', '꽃바구니': 'flower' }, qualityMap = { '저가형': _0x35d007(0xe3), '일반': _0x35d007(0xe1), '고급': _0x35d007(0xe5), '최고급': _0x35d007(0xd5) }; function hexStringToRgb(_0x390f67) { const _0x33e605 = parseInt(_0x390f67, 0x10); return { 'r': _0x33e605 >> 0x10 & 0xff, 'g': _0x33e605 >> 0x8 & 0xff, 'b': _0x33e605 & 0xff }; } function guichana(_0x3b4b25, _0x2a07d1) { const _0x587c3d = hexStringToRgb(_0x2a07d1['A']), _0x279592 = hexStringToRgb(_0x2a07d1['B']), _0x2c8ed8 = hexStringToRgb(_0x2a07d1['C']); return drawLayers(_0x3b4b25, _0x587c3d, _0x279592, _0x2c8ed8); } const canvas = document[_0x35d007(0x105)](_0x35d007(0xde)), ctx = canvas[_0x35d007(0x10d)]('2d'); function loadImages(_0x217d59) { const _0x585d6a = _0x35d007; return Promise['all'](_0x217d59[_0x585d6a(0xca)](_0xb19ffa => { return new Promise(_0x5d2841 => { const _0x4cd702 = _0x56c7, _0x596b4a = new Image(); _0x596b4a['src'] = _0xb19ffa, _0x596b4a[_0x4cd702(0xdc)] = () => _0x5d2841(_0x596b4a); }); })); } function applyColorAndMultiply(_0x491c3f, _0x51e8f1, _0x8b0173, _0x1c1022, _0x3a6d61 = !![], _0x1fcc90 = 0x0, _0x214c36 = 0x0) { const _0x3527b8 = _0x35d007, _0xf048c6 = document[_0x3527b8(0x105)](_0x3527b8(0xde)), _0xa6c7ce = _0xf048c6[_0x3527b8(0x10d)]('2d'); _0xf048c6[_0x3527b8(0x113)] = _0x51e8f1['width'], _0xf048c6[_0x3527b8(0xea)] = _0x51e8f1[_0x3527b8(0xea)], _0xa6c7ce[_0x3527b8(0x110)](_0x51e8f1, 0x0, 0x0); const _0x44bfa7 = _0xa6c7ce['getImageData'](0x0, 0x0, _0x51e8f1[_0x3527b8(0x113)], _0x51e8f1[_0x3527b8(0xea)]), _0x25c4f2 = _0x44bfa7[_0x3527b8(0x103)]; for (let _0x50ae6d = 0x0; _0x50ae6d < _0x25c4f2[_0x3527b8(0xe7)]; _0x50ae6d += 0x4) { const _0x52f6b3 = _0x25c4f2[_0x50ae6d + 0x3]; _0x52f6b3 > 0x0 && _0x3a6d61 && (_0x25c4f2[_0x50ae6d] = _0x25c4f2[_0x50ae6d] * _0x8b0173['r'] / 0xff, _0x25c4f2[_0x50ae6d + 0x1] = _0x25c4f2[_0x50ae6d + 0x1] * _0x8b0173['g'] / 0xff, _0x25c4f2[_0x50ae6d + 0x2] = _0x25c4f2[_0x50ae6d + 0x2] * _0x8b0173['b'] / 0xff); } _0xa6c7ce['putImageData'](_0x44bfa7, 0x0, 0x0), _0x491c3f[_0x3527b8(0x107)] = _0x1c1022, _0x491c3f[_0x3527b8(0x110)](_0xf048c6, _0x1fcc90, _0x214c36), _0x491c3f[_0x3527b8(0x107)] = _0x3527b8(0x11b); } const accentuatedColor = { 'r': Math[_0x35d007(0xd9)](0xff, 0x0 + 0x32), 'g': Math[_0x35d007(0xd9)](0xff, 0x0 + 0x32), 'b': Math[_0x35d007(0xd9)](0xff, 0x0 + 0x32) }; function getImagePaths(_0x55e8c8) { const _0x1feb90 = _0x35d007; let _0x2b8291 = '', _0x3c494a = '', _0x1c02cc = []; if (basicTypes[_0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]]) _0x3c494a = _0x1feb90(0xe4), _0x2b8291 = basicTypes[_0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]]; else { if (textileTypes[_0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]]) _0x3c494a = _0x1feb90(0xf0), _0x2b8291 = textileTypes[_0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]], ![_0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]]['includes']('양털') && _0x1c02cc[_0x1feb90(0x10b)](_0x1feb90(0xfa) + _0x3c494a + _0x1feb90(0xe0) + _0x2b8291 + '_pattern.png'); else { const _0x161152 = _0x55e8c8[_0x1feb90(0xcf)]('\x20')[0x1]; _0x3c494a = _0x55e8c8[_0x1feb90(0xcd)]('가죽') ? _0x1feb90(0xfb) : _0x55e8c8['includes']('옷감') ? _0x1feb90(0x104) : _0x1feb90(0xe6), _0x2b8291 = _0x3c494a; const _0x3575ea = qualityMap[_0x161152]; _0x1c02cc[_0x1feb90(0x10b)](_0x1feb90(0xfa) + _0x3c494a + '/' + _0x3575ea + _0x1feb90(0x118), './pouch/' + _0x3c494a + '/' + _0x3575ea + _0x1feb90(0x106), _0x1feb90(0xfa) + _0x3c494a + '/' + _0x3575ea + _0x1feb90(0xfd)); } } const _0x52924a = [_0x1feb90(0xfa) + _0x3c494a + _0x1feb90(0xe0) + _0x2b8291 + _0x1feb90(0xe9), _0x1feb90(0xfa) + _0x3c494a + '/open_' + _0x2b8291 + _0x1feb90(0xd1), _0x1feb90(0xfa) + _0x3c494a + _0x1feb90(0xe0) + _0x2b8291 + _0x1feb90(0x108), _0x1feb90(0xfa) + _0x3c494a + '/open_' + _0x2b8291 + _0x1feb90(0x117), _0x1feb90(0xd6)]; return _0x52924a[_0x1feb90(0xe2)](_0x1c02cc); } function _0x56c7(_0x28ec43, _0x163595) { const _0x49a338 = _0x49a3(); return _0x56c7 = function (_0x56c711, _0x4b2dcb) { _0x56c711 = _0x56c711 - 0xc9; let _0x3beb60 = _0x49a338[_0x56c711]; return _0x3beb60; }, _0x56c7(_0x28ec43, _0x163595); } const allImagePaths = pouchNames[_0x35d007(0xca)](_0x16f144 => getImagePaths(_0x16f144)); function _0x49a3() { const _0x57d60a = ['multiply', '튼튼한\x20감자\x20주머니', 'map', 'corn', '튼튼한\x20밀\x20주머니', 'includes', '튼튼한\x20굵은\x20실뭉치\x20주머니', 'split', 'src', '_in.png', '튼튼한\x20저가형\x20옷감\x20주머니', 'wheat', '튼튼한\x20옥수수\x20주머니', 'finest', './pouch/mark.png', '튼튼한\x20거미줄\x20주머니', 'cobweb', 'min', '186EjJPzn', '1098454mTQMlg', 'onload', 'potato', 'canvas', 'slice', '/open_', 'common', 'concat', 'cheap', 'crop', 'fine', 'silk', 'length', '튼튼한\x20최고급\x20옷감\x20주머니', '_base.png', 'height', '튼튼한\x20고급\x20가죽\x20주머니', 'image/png', '17289230pczzDr', '튼튼한\x20최고급\x20실크\x20주머니', '102566giJNPh', 'textile', 'color-burn', '튼튼한\x20가는\x20실뭉치\x20주머니', '튼튼한\x20최고급\x20가죽\x20주머니', '튼튼한\x20양털\x20주머니', '튼튼한\x20일반\x20가죽\x20주머니', 'barley', '15BqxjEi', '튼튼한\x20고급\x20옷감\x20주머니', '100005jIuEsg', './pouch/', 'leather', '튼튼한\x20보리\x20주머니', '_roman3.png', 'thinThread', 'screen', 'lighter', '튼튼한\x20고급\x20실크\x20주머니', 'egg', 'data', 'fabric', 'createElement', '_roman2.png', 'globalCompositeOperation', '_out.png', '8kKgzRu', '튼튼한\x20저가형\x20실크\x20주머니', 'push', '10941003zkfPLo', 'getContext', '튼튼한\x20일반\x20실크\x20주머니', '4085520jWWUlE', 'drawImage', '튼튼한\x20꽃바구니', 'toDataURL', 'width', '튼튼한\x20저가형\x20가죽\x20주머니', '튼튼한\x20달걀\x20주머니', 'test', '_light.png', '_roman1.png', '1186146sBPCJy', '튼튼한\x20일반\x20옷감\x20주머니', 'source-over']; _0x49a3 = function () { return _0x57d60a; }; return _0x49a3(); } async function drawLayers(_0x49c491, _0x486ff9, _0x1ef8d9, _0x3adc96) { const _0x45a7ae = _0x35d007, _0x52f541 = getImagePaths(_0x49c491), _0x50e75e = await loadImages(_0x52f541); canvas[_0x45a7ae(0x113)] = _0x50e75e[0x0][_0x45a7ae(0x113)], canvas[_0x45a7ae(0xea)] = _0x50e75e[0x0][_0x45a7ae(0xea)], applyColorAndMultiply(ctx, _0x50e75e[0x0], { 'r': 0x0, 'g': 0x0, 'b': 0x0 }, 'source-over', ![]); if (/달걀|감자|옥수수|밀|보리/[_0x45a7ae(0x116)](_0x49c491)) applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x1ef8d9, _0x45a7ae(0x11b), ![]), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, 'multiply'), applyColorAndMultiply(ctx, _0x50e75e[0x3], { 'r': 0xff, 'g': 0xff, 'b': 0xff }, _0x45a7ae(0x100), ![]); else { if (/거미줄|가는|굵은/['test'](_0x49c491)) { applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x3adc96, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x3adc96, 'multiply'), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, _0x45a7ae(0x11c)); const _0x4bbc2c = _0x50e75e[0x5]; applyColorAndMultiply(ctx, _0x4bbc2c, _0x1ef8d9, _0x45a7ae(0x11c)), applyColorAndMultiply(ctx, _0x50e75e[0x3], { 'r': 0xff, 'g': 0xff, 'b': 0xff }, _0x45a7ae(0x100), ![]); } else { if (/꽃/[_0x45a7ae(0x116)](_0x49c491)) { applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x1ef8d9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x1ef8d9, _0x45a7ae(0x11c)), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, 'multiply'); const _0x1666d0 = _0x50e75e[0x5]; applyColorAndMultiply(ctx, _0x1666d0, _0x3adc96, 'multiply'), applyColorAndMultiply(ctx, _0x50e75e[0x3], { 'r': 0xff, 'g': 0xff, 'b': 0xff }, _0x45a7ae(0x100), ![]); } else applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x1ef8d9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x1], _0x1ef8d9, 'multiply'), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, _0x45a7ae(0xf1)), applyColorAndMultiply(ctx, _0x50e75e[0x2], _0x486ff9, 'multiply'), applyColorAndMultiply(ctx, _0x50e75e[0x3], { 'r': 0xff, 'g': 0xff, 'b': 0xff }, _0x45a7ae(0x100), ![]); } } if (_0x49c491['includes']('가죽') || _0x49c491[_0x45a7ae(0xcd)]('옷감') || _0x49c491[_0x45a7ae(0xcd)]('실크')) { const _0x54c029 = _0x50e75e[_0x45a7ae(0xdf)](0x5, 0x8); applyColorAndMultiply(ctx, _0x54c029[0x2], _0x3adc96, 'source-over'), applyColorAndMultiply(ctx, _0x54c029[0x1], { 'r': 0x0, 'g': 0x0, 'b': 0x0 }, _0x45a7ae(0xff), ![]), applyColorAndMultiply(ctx, _0x54c029[0x0], { 'r': 0x0, 'g': 0x0, 'b': 0x0 }, 'color-burn', ![]), applyColorAndMultiply(ctx, _0x54c029[0x0], { 'r': 0x0, 'g': 0x0, 'b': 0x0 }, _0x45a7ae(0x11c), ![]), applyColorAndMultiply(ctx, _0x54c029[0x0], _0x3adc96, 'color-dodge', ![]); } const _0x1cc6c2 = _0x50e75e[0x4]; applyColorAndMultiply(ctx, _0x1cc6c2, { 'r': 0xff, 'g': 0xff, 'b': 0xff }, _0x45a7ae(0x11b), ![], 0x0, canvas[_0x45a7ae(0xea)] - _0x1cc6c2['height']); const _0xc50f4e = document['createElement']('img'); return _0xc50f4e[_0x45a7ae(0xd0)] = canvas[_0x45a7ae(0x112)](_0x45a7ae(0xec)), _0xc50f4e; }