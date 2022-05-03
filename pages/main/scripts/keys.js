'use strict'

export let KEYS = [
	{
		name_eng: '`',
		name_ru: 'ё',
		with_type: 'key-narrow1and5',
		shift_eng: '~',
		code: 'Backquote'
	},
	{
		name_eng: '1',
		name_ru: '1',
		with_type: 'key-standart',
		shift: '!',
		code: 'Digit1',
	},
	{
		name: '2',
		with_type: 'key-standart',
		shift_eng: '@',
		shift_ru: '"',
		code: 'Digit2'
	},
	{
		name: '3',
		with_type: 'key-standart',
		shift_eng: '#',
		shift_ru: '№',
		code: 'Digit3'
	},
	{
		name: '4',
		with_type: 'key-standart',
		shift_eng: '$',
		shift_ru: ';',
		code: 'Digit4'
	},
	{
		name: '5',
		with_type: 'key-standart',
		shift: '%',
		code: 'Digit5'
	},
	{
		name: '6',
		with_type: 'key-standart',
		shift_eng: ':',
		shift_ru: '^',
		code: 'Digit6'
	},
	{
		name: '7',
		with_type: 'key-standart',
		shift_eng: '?',
		shift_ru: '&',
		code: 'Digit7'
	},
	{
		name: '8',
		with_type: 'key-standart',
		shift: '*',
		code: 'Digit8'
	},
	{
		name: '9',
		with_type: 'key-standart',
		shift: '(',
		code: 'Digit9'
	},
	{
		name: '0',
		with_type: 'key-standart',
		shift: ')',
		code: 'Digit0'
	},
	{
		name: '-',
		with_type: 'key-standart',
		shift: '_',
		code: 'Minus'
	},
	{
		name: '=',
		with_type: 'key-standart',
		shift: '+',
		code: 'Equal'
	},
	{
		name: 'Backspace',
		with_type: 'key-wide2',
		code: 'Backspace'
	},
	{
		name: 'Tab',
		with_type: 'key-wide1and5',
		code: 'Tab'
	},
	{
		name_eng: 'q',
		name_ru: 'й',
		with_type: 'key-standart',
		code: 'KeyQ'
	},
	{
		name_eng: 'w',
		name_ru: 'ц',
		with_type: 'key-standart',
		code: 'KeyW'
	},
	{
		name_eng: 'e',
		name_ru: 'у',
		with_type: 'key-standart',
		code: 'KeyE'
	},
	{
		name_eng: 'r',
		name_ru: 'к',
		with_type: 'key-standart',
		code: 'KeyR'
	},
	{
		name_eng: 't',
		name_ru: 'е',
		with_type: 'key-standart',
		code: 'KeyT'
	},
	{
		name_eng: 'y',
		name_ru: 'н',
		with_type: 'key-standart',
		code: 'KeyY'
	},
	{
		name_eng: 'u',
		name_ru: 'г',
		with_type: 'key-standart',
		code: 'KeyU'
	},
	{
		name_eng: 'i',
		name_ru: 'ш',
		with_type: 'key-standart',
		code: 'KeyI'
	},
	{
		name_eng: 'o',
		name_ru: 'щ',
		with_type: 'key-standart',
		code: 'KeyO'
	},
	{
		name_eng: 'p',
		name_ru: 'з',
		with_type: 'key-standart',
		shift_eng: '?',
		shift_ru: '&',
		code: 'KeyP'
	},
	{
		name_eng: '[',
		name_ru: 'х',
		with_type: 'key-standart',
		shift_eng: '{',
		code: 'BracketLeft'
	},
	{
		name_eng: ']',
		name_ru: 'ъ',
		with_type: 'key-standart',
		shift_eng: '}',
		code: 'BracketRight'
	},
	{
		name: '\\',
		with_type: 'key-standart',
		shift_eng: '|',
		shift_ru: '/',
		code: 'Backslash'
	},
	{
		name: 'Caps Lock',
		with_type: 'key-wide2',
		code: 'CapsLock'
	},
	{
		name_eng: 'a',
		name_ru: 'ф',
		with_type: 'key-standart',
		code: 'KeyA'
	},
	{
		name_eng: 's',
		name_ru: 'ы',
		with_type: 'key-standart',
		code: 'KeyS'
	},
	{
		name_eng: 'd',
		name_ru: 'в',
		with_type: 'key-standart',
		code: 'KeyD'
	},
	{
		name_eng: 'f',
		name_ru: 'а',
		with_type: 'key-standart',
		code: 'KeyF'
	},
	{
		name_eng: 'g',
		name_ru: 'п',
		with_type: 'key-standart',
		code: 'KeyG'
	},
	{
		name_eng: 'h',
		name_ru: 'р',
		with_type: 'key-standart',
		code: 'KeyH'
	},
	{
		name_eng: 'j',
		name_ru: 'л',
		with_type: 'key-standart',
		code: 'KeyJ'
	},
	{
		name_eng: 'k',
		name_ru: 'л',
		with_type: 'key-standart',
		code: 'KeyK'
	},
	{
		name_eng: 'l',
		name_ru: 'д',
		with_type: 'key-standart',
		code: 'KeyL'
	},
	{
		name_eng: ';',
		name_ru: 'ж',
		with_type: 'key-standart',
		shift_eng: ':',
		code: 'Semicolon'
	},
	{
		name_eng: "'",
		name_ru: 'э',
		with_type: 'key-standart',
		shift_eng: '"',
		code: 'Quote'
	},
	{
		name: 'Enter',
		with_type: 'key-wide2',
		code: 'Enter'
	},
	{
		name: 'Shift',
		with_type: 'key-wide2',
		code: 'ShiftLeft'
	},
	{
		name_eng: 'z',
		name_ru: 'я',
		with_type: 'key-standart',
		code: 'KeyZ'
	},
	{
		name_eng: 'x',
		name_ru: 'ч',
		with_type: 'key-standart',
		code: 'KeyX'
	},
	{
		name_eng: 'c',
		name_ru: 'с',
		with_type: 'key-standart',
		code: 'KeyC'
	},
	{
		name_eng: 'v',
		name_ru: 'м',
		with_type: 'key-standart',
		code: 'KeyV'
	},
	{
		name_eng: 'b',
		name_ru: 'и',
		with_type: 'key-standart',
		code: 'KeyB'
	},
	{
		name_eng: 'n',
		name_ru: 'т',
		with_type: 'key-standart',
		code: 'KeyN'
	},
	{
		name_eng: 'm',
		name_ru: 'ь',
		with_type: 'key-standart',
		code: 'KeyM'
	},
	{
		name_eng: ',',
		name_ru: 'б',
		with_type: 'key-standart',
		shift_eng: '<',
		code: 'Comma'
	},
	{
		name_eng: '.',
		name_ru: 'ю',
		with_type: 'key-standart',
		shift_eng: '>',
		code: 'Period'

	},
	{
		name_eng: '/',
		name_ru: '.',
		with_type: 'key-standart',
		shift_eng: '?',
		shift_ru: ',',
		code: 'Slash'
	},
	{
		name: '&uarr;',
		with_type: 'key-standart',
		code: 'ArrowUp'
	},
	{
		name: 'Del',
		with_type: 'key-wide2',
		code: 'Delete'
	},
	{
		name: 'Ctrl',
		with_type: 'key-standart',
		code: 'ControlLeft'
	},
	{
		name: 'Win',
		with_type: 'key-standart',
		code: 'MetaLeft'
	},
	{
		name_eng: 'ENG',
		name_ru: 'RU',
		with_type: 'key-standart',
	},
	{
		name: 'Alt',
		with_type: 'key-standart',
		code: 'AltLeft'
	},
	{
		name: 'Space',
		with_type: 'key-wide5',
		code: 'Space'
	},
	{
		name: 'Alt',
		with_type: 'key-standart',
		code: 'AltRight'
	},
	{
		name: 'Ctrl',
		with_type: 'key-standart',
		code: 'ControlRight'
	},
	{
		name: '&larr;',
		with_type: 'key-standart',
		code: 'ArrowLeft'
	},
	{
		name: '&darr;',
		with_type: 'key-standart',
		code: 'ArrowDown'
	},
	{
		name: '&rarr;',
		with_type: 'key-standart',
		code: 'ArrowRight'
	},
	{
		name: 'Shift',
		with_type: 'key-standart',
		code: 'ShiftRight'
	},
];