def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            base = 'A' if char.isupper() else 'a'
            result += chr((ord(char) - ord(base) + shift) % 26 + ord(base))
        else:
            result += char
    return result

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)

def transposition_encrypt(text, width):
    ciphertext = ""
    for col in range(width):
        pos = col
        while pos < len(text):
            ciphertext += text[pos]
            pos += width
    return ciphertext

def transposition_decrypt(ciphertext, width):
    num_rows = len(ciphertext) // width + (1 if len(ciphertext) % width else 0)
    grid = [''] * num_rows
    col_length = len(ciphertext) // width
    extra = len(ciphertext) % width

    k = 0
    for col in range(width):
        rows_in_col = col_length + (1 if col < extra else 0)
        for row in range(rows_in_col):
            grid[row] += ciphertext[k]
            k += 1
    return ''.join(grid)

plaintext = "Computer Science"
shift = 3
width = 5

caesar = caesar_encrypt(plaintext, shift)
trans = transposition_encrypt(caesar, width)
print("Plaintext:", plaintext)
print("Caesar Cipher:", caesar)
print("Transposition Cipher:", trans)

trans_decrypted = transposition_decrypt(trans, width)
original = caesar_decrypt(trans_decrypted, shift)
print("Decrypted Text:", original)
