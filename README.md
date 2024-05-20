# ricrypt
A string transformer web-app with file upload &amp; download capabilities.

<img src="ricrypt.png">

To the untrained eye, it might seem like an encryption algorithm, since this specific order of transformations has never been done before, so it's unlikely anyone could "guess" these transformations. However, this "encryption" is still likely to be cracked by an advanced cryptographer, since it is still vulnerable to frequency analysis due to it's root of Vigenere cipher. So, in reality, it is just a fun project I made to do some string transformations.

## The Algorithm

### Filtering the Key:
The key is filtered by the filterKey function to retain only letters and convert them to numbers (0-25 for 'a'-'z', 0-25 for 'A'-'Z').

### Phase 1E (Vigenère Cipher):
Applies a Vigenère cipher to the input string using the filtered key. Each letter in the input is shifted by a corresponding value from the key.

Uppercase letters ('A'-'Z') are shifted within their range.

Lowercase letters ('a'-'z') are shifted within their range.

Non-alphabetic characters are not modified.

### Phase 2E (Manipulations A):
Step 1: Replace all spaces with a random sequence in the format _{digit}{letter}.

Step 2: Invert the case of all alphabetic characters.

Step 3: Reverse the string. *note that this could be considered transposition, but I chose to leave it under manipulations.*

Step 4: Add a $ after every 'm' and 'M'.

Step 5: Replace 'R' with '%&' and 'r' with '%#'.

Step 6: Put parentheses around vowels ('a', 'i', 'o', 'O', 'U').

### Phase 3E (Transposition A):
Step 1: Swap the first half of the string with the second half.

Step 2: Swap the first character with the last character.

### Phase 4E (Manipulations B):
Step 1: Add a ^ between every vowel and the subsequent character.

Step 2: Add a ! between the first and second characters.

Step 3: Append two random digits to the end of the string.

### Phase 5E (Encoding):
Step 1: Encode the string using Base64.

Step 2: Replace '==' at the end of the Base64 string with '<>'.

### Phase 6E (Transposition B):
Step 1: Move a portion of the string (length determined by twice the key length) from the beginning to the end of the string.
