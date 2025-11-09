import socket
import datetime

HOST = '127.0.0.1'
PORT = 12345

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((HOST, PORT))
server_socket.listen(1)

print('Server is listening...')
client_socket, client_address = server_socket.accept()
print('Connected by', client_address)

while True:
    client_message = client_socket.recv(1024).decode().strip()

    if client_message.lower() == 'hi':
        client_socket.sendall(b'Hello\n')
    elif client_message.lower() == 'time':
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        client_socket.sendall(current_time.encode())
    elif client_message.lower() == 'date':
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")
        client_socket.sendall(current_date.encode())
    elif client_message.lower() == 'ip':
        ip_address = socket.gethostbyname(socket.gethostname())
        client_socket.sendall(ip_address.encode())
    else:
        client_socket.sendall(b'Invalid command\n')

    if not client_message:
        break

client_socket.close()
server_socket.close()
