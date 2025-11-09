def rsa_encrypt(M, e, n):
    return pow(M, e, n)

def rsa_decrypt(C, d, n):
    return pow(C, d, n)

# Example
M = 6882326879666683 % 3337  # reduce for demo (RSA works mod n)
e, d, n = 79, 1019, 3337

C = rsa_encrypt(M, e, n)
print("Encrypted Text:", C)

M_decrypted = rsa_decrypt(C, d, n)
print("Decrypted Text:", M_decrypted)
