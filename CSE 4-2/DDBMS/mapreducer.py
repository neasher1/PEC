from collections import defaultdict, Counter

text = "mango apple banana apple orange banana apple orange banana mango banana orange"

words = text.split()
mapper_output = [(word, 1) for word in words]
print("Mapper Output:")
print(mapper_output)

shuffle = defaultdict(list)
for word, count in mapper_output:
    shuffle[word].append(count)

reducer_output = {}
for word, counts in shuffle.items():
    reducer_output[word] = sum(counts)

print("\nReducer Output (word counts):")
for word, count in reducer_output.items():
    print(f"{word} : {count}")

top3 = Counter(reducer_output).most_common(3)
print("\nTop-3 most frequent words:")
for word, count in top3:
    print(f"{word} : {count}")
