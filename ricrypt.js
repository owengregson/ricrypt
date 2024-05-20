document.addEventListener("DOMContentLoaded", function () {
	var ricrypt = new Ricrypt();
	ricrypt.init();
});
function Ricrypt() { // I know please dont judge me
	this.init = function () {
		this.addEventListeners();
	};
	this.addEventListeners = function () {
		var self = this;
		var encryptButton = document.getElementById("encrypt-button");
		var decryptButton = document.getElementById("decrypt-button");
		encryptButton.addEventListener("click", function () {
			self.encrypt();
		});
		decryptButton.addEventListener("click", function () {
			self.decrypt();
		});
	};
	this.adjustTextareaHeight = function (textarea) {
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	};
	this.encrypt = function () {
		var input = document.getElementById("inputText");
		var output = document.getElementById("output");
		var key = window.acK;
		var encrypted = fullCrypt(input.value, key);
		output.value = encrypted.toString();
		this.adjustTextareaHeight(output);
	};
	this.decrypt = function () {
		var input = document.getElementById("inputText");
		var output = document.getElementById("output");
		var key = window.acK;
		var decrypted = fullDecrypt(input.value, key);
		output.value = decrypted.toString();
	};
	function fullCrypt(input, key) {
		const filteredKey = filterKey(key);
		let final = input;
		final = phase1(final, filteredKey);
		final = phase2E(final);
		final = phase3E(final);
		final = phase4E(final);
		final = phase5E(final, filteredKey);
		final = phase2E(final);
		return final;
	}
	function fullDecrypt(input, key) {
		const filteredKey = filterKey(key).map((k) => 26 - k);
		let final = input;
		let failed = false;
		try {
			final = phase2D(final);
		} catch (e) {
			failed = true;
		}
		try {
			final = phase5D(final, filteredKey);
		} catch (e) {
			failed = true;
		}
		try {
			final = phase4D(final);
		} catch (e) {
			failed = true;
		}
		try {
			final = phase3D(final);
		} catch (e) {
			failed = true;
		}
		try {
			final = phase2D(final);
		} catch (e) {
			failed = true;
		}
		try {
			final = phase1(final, filteredKey);
		} catch (e) {
			failed = true;
		}
		if (failed) final = "Decryption failed!";
		return final;
	}
	function phase1(input, key) {
		let output = "";
		let j = 0;
		for (const ch of input) {
			const cc = ch.codePointAt(0);
			if (isUppercase(cc)) {
				output += String.fromCodePoint(
					((cc - 65 + key[j % key.length]) % 26) + 65
				);
				j++;
			} else if (isLowercase(cc)) {
				output += String.fromCodePoint(
					((cc - 97 + key[j % key.length]) % 26) + 97
				);
				j++;
			} else {
				output += ch;
			}
		}
		return output;
	}
	function phase2E(input) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}
		function getRandomLetter() {
			const letters = "abc";
			return letters[Math.floor(Math.random() * letters.length)];
		}

		let step1 = input.replace(
			/ /g,
			() => `_${getRandomInt(10)}${getRandomLetter()}`
		);
		console.log("Step 1:", step1);

		let step2 = step1
			.split("")
			.map((ch) => {
				if (ch >= "a" && ch <= "z") {
					return ch.toUpperCase();
				} else if (ch >= "A" && ch <= "Z") {
					return ch.toLowerCase();
				} else {
					return ch;
				}
			})
			.join("");
		console.log("Step 2:", step2);

		let step3 = step2.split("").reverse().join("");
		console.log("Step 3:", step3);

		let step4 = step3.replace(/m/g, "m$").replace(/M/g, "M$");
		console.log("Step 4:", step4);

		let step5 = step4.replace(/R/g, "%&").replace(/r/g, "%#");
		console.log("Step 5:", step5);

		let step6 = step5
			.replace(/a/g, "(a)")
			.replace(/i/g, "(i)")
			.replace(/o/g, "(o)")
			.replace(/O/g, "(O)")
			.replace(/U/g, "(U)");
		console.log("Step 6:", step6);
		return step6;
	}
	function phase2D(input) {
		let step6 = input
			.replace(/\(a\)/g, "a")
			.replace(/\(i\)/g, "i")
			.replace(/\(o\)/g, "o")
			.replace(/\(O\)/g, "O")
			.replace(/\(U\)/g, "U");
		console.log("Step 6:", step6);

		let step5 = step6.replace(/%&/g, "R").replace(/%#/g, "r");
		console.log("Step 5:", step5);

		let step4 = step5.replace(/m\$/g, "m").replace(/M\$/g, "M");
		console.log("Step 4:", step4);

		let step3 = step4.split("").reverse().join("");
		console.log("Step 3:", step3);

		let step2 = step3
			.split("")
			.map((ch) => {
				if (ch >= "a" && ch <= "z") {
					return ch.toUpperCase();
				} else if (ch >= "A" && ch <= "Z") {
					return ch.toLowerCase();
				} else {
					return ch;
				}
			})
			.join("");
		console.log("Step 2:", step2);

		let step1 = step2.replace(/_\d[a-c]/g, " ");
		console.log("Step 1:", step1);
		return step1;
	}
	function phase3E(input) {
		let midpoint = Math.floor(input.length / 2);
		let step1;
		if (input.length % 2 === 0) {
			step1 = input.slice(midpoint) + input.slice(0, midpoint);
		} else {
			step1 =
				input.slice(midpoint + 1) +
				input[midpoint] +
				input.slice(0, midpoint);
		}
		console.log("Step 1:", step1);

		let step2 =
			step1.length > 1
				? step1[step1.length - 1] + step1.slice(1, -1) + step1[0]
				: step1;
		console.log("Step 2:", step2);

		let step3 = step2.replace(/([aeiouAEIOU])/g, "$1^");
		console.log("Step 3:", step3);

		let step4 = step3.length > 1 ? step3[0] + "!" + step3.slice(1) : step3;
		console.log("Step 4:", step4);

		function getRandomDigit() {
			return Math.floor(Math.random() * 10);
		}
		let step5 = step4 + getRandomDigit() + getRandomDigit();
		console.log("Step 5:", step5);
		return step5;
	}
	function phase3D(input) {
		let step5 = input.slice(0, -2);
		console.log("Step 5:", step5);

		let step4 = step5.length > 2 ? step5[0] + step5.slice(2) : step5;
		console.log("Step 4:", step4);

		let step3 = step4.replace(/([aeiouAEIOU])\^/g, "$1");
		console.log("Step 3:", step3);

		let step2 =
			step3.length > 1
				? step3[step3.length - 1] + step3.slice(1, -1) + step3[0]
				: step3;
		console.log("Step 2:", step2);

		let midpoint = Math.floor(step2.length / 2);
		let step1;
		if (step2.length % 2 === 0) {
			step1 = step2.slice(midpoint) + step2.slice(0, midpoint);
		} else {
			step1 =
				step2.slice(-midpoint) +
				step2[midpoint] +
				step2.slice(0, -midpoint - 1);
		}
		console.log("Step 1:", step1);
		return step1;
	}
	function phase4E(input) {
		let result = window.btoa(input);
		result = result.replace("==", "<>");
		return result;
	}
	function phase4D(input) {
		let result = input.replace("<>", "==");
		result = window.atob(result);
		return result;
	}
	function phase5E(input, key) {
		const slideLength = key.length * 2;
		const slidePart = input.slice(0, slideLength);
		const remainingPart = input.slice(slideLength);
		return remainingPart + slidePart;
	}
	function phase5D(input, key) {
		const slideLength = key.length * 2;
		const slidePart = input.slice(-slideLength);
		const remainingPart = input.slice(0, -slideLength);
		return slidePart + remainingPart;
	}
	function filterKey(key) {
		let result = [];
		for (const ch of key) {
			const cc = ch.codePointAt(0);
			if (isLetter(cc)) result.push((cc - 65) % 32);
		}
		return result;
	}
	function isLetter(c) {
		return isUppercase(c) || isLowercase(c);
	}
	function isUppercase(c) {
		return 65 <= c && c <= 90;
	}
	function isLowercase(c) {
		return 97 <= c && c <= 122;
	}
}
let ack = "";
function handleKeyInput(event) {
	const input = event.target;
	const inputValue = input.value;
	const lastChar = inputValue.charAt(inputValue.length - 1);

	ack += lastChar;

	input.value = "*".repeat(inputValue.length);

	event.stopPropagation();
}
