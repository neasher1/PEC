import numpy as np
import matplotlib.pyplot as plt
import math 

def bezier_curve(t, control_points):
    n = len(control_points) - 1  
    curve = np.zeros((len(t), 2))

    for i in range(n + 1):
        binomial_coeff = math.comb(n, i)
        curve += binomial_coeff * ((1 - t) ** (n - i))[:, np.newaxis] * (t ** i)[:, np.newaxis] * control_points[i]

    return curve

control_points = np.array([[0, 0], [1, 2], [3, 3], [4, 0]])

t = np.linspace(0, 1, 100)

curve = bezier_curve(t, control_points)

plt.figure(figsize=(8, 6))
plt.plot(curve[:, 0], curve[:, 1], label="Bezier Curve", color="blue")
plt.scatter(control_points[:, 0], control_points[:, 1], color="red", label="Control Points")
plt.plot(control_points[:, 0], control_points[:, 1], linestyle="--", color="gray", label="Control Polygon")

for i, point in enumerate(control_points):
    plt.text(point[0], point[1], f"P{i}", fontsize=12, color="black")

plt.title("Bezier Curve and Control Points")
plt.xlabel("X")
plt.ylabel("Y")
plt.legend()
plt.grid(True)
plt.show()
