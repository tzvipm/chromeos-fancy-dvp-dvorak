var contextID = -1;
var lastRemappedKeyEvent = undefined;
var capsDown = false;

// QWERTY -> Dvorak mappings
var dvorak = {
    'q': ";",
    'w': ',',
    'e': '.',
    'r': 'p',
    't': 'y',
    'y': 'f',
    'u': 'g',
    'i': 'c',
    'o': 'r',
    'p': 'l',
    '[': '/',
    ']': '@',
    'a': 'a',
    's': 'o',
    'd': 'e',
    'f': 'u',
    'g': 'i',
    'h': 'd',
    'j': 'h',
    'k': 't',
    'l': 'n',
    ';': 's',
    "'": '-',
    'z': '\'',
    'x': 'q',
    'c': 'j',
    'v': 'k',
    'b': 'x',
    'n': 'b',
    'm': 'm',
    ',': 'w',
    '.': 'v',
    '/': 'z',
    'Q': ':',
    'W': '<',
    'E': '>',
    'R': 'P',
    'T': 'Y',
    'Y': 'F',
    'U': 'G',
    'I': 'C',
    'O': 'R',
    'P': 'L',
    '{': '?',
    '}': '^',
    'A': 'A',
    'S': 'O',
    'D': 'E',
    'F': 'U',
    'G': 'I',
    'H': 'D',
    'J': 'H',
    'K': 'T',
    'L': 'N',
    ':': 'S',
    '"': '_',
    'Z': '"',
    'X': 'Q',
    'C': 'J',
    'V': 'K',
    'B': 'X',
    'N': 'B',
    'M': 'M',
    '<': 'W',
    '>': 'V',
    '?': 'Z',
    '`': '$',
    '1': '&',
    '2': '[',
    '3': '{',
    '4': '}',
    '5': '(',
    '6': '=',
    '7': '*',
    '8': ')',
    '9': '+',
    '0': ']',
    '-': '!',
    '=': '#',
    '~': '~',
    '!': '%',
    '@': '7',
    '#': '5',
    '$': '3',
    '%': '1',
    '^': '9',
    '&': '0',
    '*': '2',
    '(': '4',
    ')': '6',
    '_': '8',
    '+': '`',
}

chrome.input.ime.onFocus.addListener(function (context) {
    contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function (context) {
    contextID = -1;
});

chrome.input.ime.onKeyEvent.addListener(
    function (engineID,
        keyData) {
        var handled = false;

        if (keyData.hasOwnProperty("extensionId")) {
            // It seems like our processed events get fed back into this listener,
            // so we need to exclude those. They should be marked with an extensionId.
            return false;
        }

        if (!keyData.ctrlKey) {
            if (dvorak.hasOwnProperty(keyData.key)) {
                keyData.key = dvorak[keyData.key];
                handled = true;
            }
        }
        if (handled) {
            chrome.input.ime.sendKeyEvents({
                "contextID": contextID,
                "keyData": [keyData]
            });
        }
        return handled;
    });
