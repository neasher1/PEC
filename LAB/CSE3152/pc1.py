import socket
import threading

def receive_messages(client_socket):
    while True:
        server_response = client_socket.recv(1024)
        if server_response:
            print('Server response:', server_response.decode())

HOST = '127.0.0.1'
PORT = 12345

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))

receive_thread = threading.Thread(target=receive_messages, args=(client_socket,))
receive_thread.start()

while True:
    message = input("Enter your message: ")
    client_socket.sendall(message.encode())

client_socket.close()
