from mpi4py import MPI
import time
import sys
import string
from collections import Counter

def clean_word(word):
    return word.strip(string.punctuation).lower()

def chunkify(data, num_chunks):
    avg = len(data) // num_chunks
    chunks = []
    for i in range(num_chunks):
        start = i * avg
        end = None if i == num_chunks - 1 else (i + 1) * avg
        chunks.append(data[start:end])
    return chunks

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

start_time = None
words = []

if rank == 0:
    if len(sys.argv) < 2:
        print("Usage: python wordcount_mpi.py <filename>")
        sys.exit(1)

    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        text = f.read()

    start_time = time.time()
    text = text.replace("\n", " ")
    all_words = [clean_word(w) for w in text.split() if clean_word(w)]
    chunks = chunkify(all_words, size)
else:
    chunks = None

# Scatter word chunks
local_words = comm.scatter(chunks, root=0)

# Local count
local_counter = Counter(local_words)

# Gather all word counts
gathered_counters = comm.gather(local_counter, root=0)

if rank == 0:
    # Merge all counters
    final_counter = Counter()
    for c in gathered_counters:
        final_counter.update(c)

    # Sort and get top 10
    top_10 = final_counter.most_common(10)

    end_time = time.time()

    print("\nTop 10 occurring words:")
    for word, count in top_10:
        print(f"{word}: {count}")

    print(f"\nTotal search time: {end_time - start_time:.6f} seconds")
