import threading

fib_sequence = []
average = 0
n = 0

lock = threading.Lock()

fib_done = threading.Event()

def generate_fibonacci():
    global fib_sequence
    with lock:
        fib_sequence = [0] * n
        if n > 0:
            fib_sequence[0] = 0
        if n > 1:
            fib_sequence[1] = 1
            for i in range(2, n):
                fib_sequence[i] = fib_sequence[i - 1] + fib_sequence[i - 2]
    fib_done.set() 

def calculate_average():
    global average
    fib_done.wait()
    with lock:
        if n > 0:
            average = sum(fib_sequence) / n


def display_result():
    fib_done.wait()
    with lock:
        print(f"Fibonacci sequence (n={n}): {' '.join(map(str, fib_sequence))}")
        print(f"Average of Fibonacci series: {average:.2f}")


if __name__ == "__main__":
    try:
        n = int(input("Enter the number of Fibonacci numbers to generate: "))
        if n <= 0:
            raise ValueError("The number must be positive.")
    except ValueError as e:
        print(f"Invalid input: {e}")
        exit(1)

    fib_thread = threading.Thread(target=generate_fibonacci, name="fibonacci")
    avg_thread = threading.Thread(target=calculate_average, name="average")
    display_thread = threading.Thread(target=display_result, name="display")

    fib_thread.start()
    avg_thread.start()
    display_thread.start()

    fib_thread.join()
    avg_thread.join()
    display_thread.join()
