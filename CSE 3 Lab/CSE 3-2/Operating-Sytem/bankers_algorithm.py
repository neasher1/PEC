# Function to check if the system is in a safe state
def is_safe_state(processes, available, max_need, allocation):
    n = len(processes)  # Number of processes
    m = len(available)  # Number of resource types
    
    # Work and finish vectors
    work = available[:]
    finish = [False] * n
    safe_sequence = []

    # Try to find a safe sequence
    while len(safe_sequence) < n:
        progress = False
        for i in range(n):
            if not finish[i]:
                # Check if process can be completed
                need = [max_need[i][j] - allocation[i][j] for j in range(m)]
                if all(need[j] <= work[j] for j in range(m)):
                    # Process can complete, so add resources back to work
                    work = [work[j] + allocation[i][j] for j in range(m)]
                    finish[i] = True
                    safe_sequence.append(processes[i])
                    progress = True
                    break
        if not progress:
            # If no process can make progress, the system is in an unsafe state
            return False, []
    
    return True, safe_sequence

# Function to simulate the Banker's algorithm
def bankers_algorithm(processes, available, max_need, allocation):
    print("Banker's Algorithm for Deadlock Avoidance")
    
    # Check if the system is in a safe state and find the safe sequence
    safe, safe_sequence = is_safe_state(processes, available, max_need, allocation)
    
    if safe:
        print("System is in a safe state.")
        print("Safe Sequence:", safe_sequence)
    else:
        print("System is in an unsafe state. No safe sequence exists.")

# Input: Number of processes and resource types
processes = ['P0', 'P1', 'P2', 'P3', 'P4']

# Available resources
available = [3, 3, 2]  # Example: 3 instances of resource 1, 3 of resource 2, 2 of resource 3

# Maximum resource needs for each process
max_need = [
    [7, 5, 3],  # P0
    [3, 2, 2],  # P1
    [9, 0, 2],  # P2
    [2, 2, 2],  # P3
    [4, 3, 3]   # P4
]

# Resources already allocated to each process
allocation = [
    [0, 1, 0],  # P0
    [2, 0, 0],  # P1
    [3, 0, 2],  # P2
    [2, 1, 1],  # P3
    [0, 0, 2]   # P4
]

# Run the Banker's Algorithm
bankers_algorithm(processes, available, max_need, allocation)
