user_private_key = 5
user_public_key = 10
receiver_public_key = 47


def sign_message(message, private_key):
    signature = pow(sum(ord(c) for c in message), private_key, 97)
    return signature

def encrypt_message(message, public_key):
    return ''.join(chr((ord(c) + public_key) % 256) for c in message)

def decrypt_message(cipher, public_key):
    return ''.join(chr((ord(c) - public_key) % 256) for c in cipher)

message = "authentication and confidentiality"
print("Original Message:", message)

signature = sign_message(message, user_private_key)
print("Digital Signature:", signature)

encrypted_msg = encrypt_message(message, receiver_public_key)
print("Encrypted Message:", encrypted_msg)

decrypted_msg = decrypt_message(encrypted_msg, receiver_public_key)
print("Decrypted Message:", decrypted_msg)

verify_signature = sign_message(decrypted_msg, user_private_key)
print("Signature Verified:", verify_signature == signature)