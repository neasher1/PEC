def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) - start + shift) % 26 + start)
        else:
            result += char
    return result

def caesar_decrypt(cipher, shift):
    return caesar_encrypt(cipher, -shift)

def transposition_encrypt(text, width):
    text = text.replace(" ", "")  # remove spaces for simplicity
    ciphertext = ""
    for i in range(width):
        ciphertext += text[i::width]
    return ciphertext

def transposition_decrypt(cipher, width):
    n = len(cipher)
    col = n // width
    rem = n % width
    matrix = [''] * width
    index = 0
    for i in range(width):
        extra = 1 if i < rem else 0
        matrix[i] = cipher[index:index + col + extra]
        index += col + extra

    plaintext = ''
    for i in range(col + 1):
        for j in range(width):
            if i < len(matrix[j]):
                plaintext += matrix[j][i]
    return plaintext

# --- Example ---
plaintext = "Computer Science"
print("Plaintext:", plaintext)

# Step 1: Caesar Cipher
caesar = caesar_encrypt(plaintext, 3)
print("Caesar Cipher:", caesar)

# Step 2: Transposition Cipher (width = 5)
trans_cipher = transposition_encrypt(caesar, 5)
print("Transposition Cipher:", trans_cipher)

# --- Decryption ---
trans_decrypt = transposition_decrypt(trans_cipher, 5)
caesar_decrypt_text = caesar_decrypt(trans_decrypt, 3)
print("Decrypted Text:", caesar_decrypt_text)
