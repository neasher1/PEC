import numpy as np
import matplotlib.pyplot as plt

x1, y1 = 5, 9
x2, y2 = 12, 16

x = [x1]
y = [y1]
dx = abs(x2 - x1)
dy = abs(y2 - y1)
sx = 1 if x2 > x1 else -1 
sy = 1 if y2 > y1 else -1

p = 2 * dy - dx

if dx > dy:
    while x[-1] != x2:
        if p < 0:
            p += 2 * dy
        else:
            p += 2 * dy - 2 * dx
            y.append(y[-1] + sy)
        x.append(x[-1] + sx)
else:
    p = 2 * dx - dy
    while y[-1] != y2:
        if p < 0:
            p += 2 * dx
        else:
            p += 2 * dx - 2 * dy
            x.append(x[-1] + sx)
        y.append(y[-1] + sy)

x = np.array(x)
y = np.array(y)

print("X coordinates:", x)
print("Y coordinates:", y)

plt.figure(figsize=(8, 6))
plt.plot(x, y, label="Line", color="blue")
plt.scatter(x, y, color="red", label="Pixels")
plt.title("Line Drawing using Bresenham's Algorithm")
plt.xlabel("X")
plt.ylabel("Y")
plt.legend()
plt.grid(True)
plt.show()
