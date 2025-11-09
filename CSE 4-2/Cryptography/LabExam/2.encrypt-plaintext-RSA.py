def rsa_encrypt_int(M, e, n):
    return pow(M, e, n)

def rsa_decrypt_int(C, d, n):
    return pow(C, d, n)

M = 6882326879666683
e = 79
d = 1019
n = 3337

C = rsa_encrypt_int(M, e, n)
M_prime = rsa_decrypt_int(C, d, n)

print("M                    =", M)
print("Encrypted C          =", C)
print("Decrypted M          =", M_prime)
