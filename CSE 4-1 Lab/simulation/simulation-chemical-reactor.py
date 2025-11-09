import matplotlib.pyplot as plt

A = 100.0
B = 75.0 
C = 0.0

k_forward = 0.002
k_reverse = 0.008

dt = 0.1
total_time = 50.0 
num_steps = int(total_time / dt)

time_points = []
A_concentrations = []
B_concentrations = []
C_concentrations = []

for step in range(num_steps + 1):
    current_time = step * dt
    
    time_points.append(current_time)
    A_concentrations.append(A)
    B_concentrations.append(B)
    C_concentrations.append(C)
    
    forward_rate = k_forward * A * B
    reverse_rate = k_reverse * C
    
    dA = (-forward_rate + reverse_rate) * dt
    dB = (-forward_rate + reverse_rate) * dt
    dC = (forward_rate - reverse_rate) * dt
    
    A += dA
    B += dB
    C += dC

plt.figure(figsize=(10, 6))
plt.plot(time_points, A_concentrations, label='Substance A')
plt.plot(time_points, B_concentrations, label='Substance B')
plt.plot(time_points, C_concentrations, label='Substance C')
plt.xlabel('Time')
plt.ylabel('Concentration (g)')
plt.title('Chemical Reaction Simulation: A + B ⇌ C')
plt.legend()
plt.grid(True)
plt.show()

print(f"Final concentrations after {total_time} time units:")
print(f"A: {A_concentrations[-1]:.2f}g")
print(f"B: {B_concentrations[-1]:.2f}g")
print(f"C: {C_concentrations[-1]:.2f}g")