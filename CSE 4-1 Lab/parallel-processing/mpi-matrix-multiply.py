from mpi4py import MPI
import numpy as np
import time

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

def generate_matrices(k, m, n, p):
    A = [np.random.randint(0, 10, size=(m, n)) for _ in range(k)]
    B = [np.random.randint(0, 10, size=(n, p)) for _ in range(k)]
    return A, B

def save_matrix(filename, matrix):
    np.savetxt(filename, matrix, fmt='%d')

if rank == 0:
    k = int(input("Enter value of k: "))
    m = int(input("Enter value of m: "))
    n = int(input("Enter value of n: "))
    p = int(input("Enter value of p: "))

    A, B = generate_matrices(k, m, n, p)

    chunks = [list(range(i, k, size)) for i in range(size)]
else:
    A = None
    B = None
    chunks = None
    m = n = p = k = 0

m = comm.bcast(m if rank == 0 else None, root=0)
n = comm.bcast(n if rank == 0 else None, root=0)
p = comm.bcast(p if rank == 0 else None, root=0)
k = comm.bcast(k if rank == 0 else None, root=0)

chunks = comm.bcast(chunks, root=0)
local_indices = chunks[rank]

local_A = []
local_B = []
if rank == 0:
    for i in local_indices:
        local_A.append(A[i])
        local_B.append(B[i])
else:
    for _ in local_indices:
        local_A.append(np.empty((m, n), dtype=int))
        local_B.append(np.empty((n, p), dtype=int))

for i, idx in enumerate(local_indices):
    if rank == 0:
        for r in range(1, size):
            for j in chunks[r]:
                comm.send(A[j], dest=r, tag=10+j)
                comm.send(B[j], dest=r, tag=20+j)
    else:
        local_A[i] = comm.recv(source=0, tag=10+idx)
        local_B[i] = comm.recv(source=0, tag=20+idx)

comm.Barrier()
start_time = MPI.Wtime()

local_C = [np.dot(local_A[i], local_B[i]) for i in range(len(local_indices))]

comm.Barrier()
end_time = MPI.Wtime()
elapsed_time = end_time - start_time

gathered_C = comm.gather(local_C, root=0)

if rank == 0:
    C = [None] * k
    for i in range(size):
        for j, idx in enumerate(chunks[i]):
            C[idx] = gathered_C[i][j]

    save_matrix("A_0.txt", A[0])
    save_matrix("B_0.txt", B[0])
    save_matrix("C_0.txt", C[0])

    print(f"Execution Time: {elapsed_time:.6f} seconds")
