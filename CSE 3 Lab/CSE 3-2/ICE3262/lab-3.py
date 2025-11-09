import numpy as np
import matplotlib.pyplot as plt

bitstream = '1011001'
bit_duration = 1
fs = 100
t_bit = np.linspace(0, bit_duration, fs)

f0 = 1 
f1 = 2  

def bfski_modulation(bitstream, fs):
    signal = np.array([]) 
    
    for bit in bitstream:
        if bit == '0':
            signal = np.append(signal, np.sin(2 * np.pi * f0 * t_bit))
        else:
            signal = np.append(signal, np.sin(2 * np.pi * f1 * t_bit))
    
    return signal

def bfski_demodulation(signal, fs, bit_duration):
    bitstream_recovered = ''
    num_bits = len(signal) // fs 
    
    for i in range(num_bits):
        segment = signal[i * fs : (i + 1) * fs]
        freq = np.fft.fftfreq(len(segment), 1/fs)
        fft_result = np.fft.fft(segment)
        fft_abs = np.abs(fft_result)
        
        peak_freq = np.abs(freq[np.argmax(fft_abs)])
        
        if peak_freq < (f0 + f1) / 2:
            bitstream_recovered += '0'
        else:
            bitstream_recovered += '1'
    
    return bitstream_recovered

modulated_signal = bfski_modulation(bitstream, fs)

recovered_bitstream = bfski_demodulation(modulated_signal, fs, bit_duration)

plt.figure(figsize=(10, 4))
plt.plot(np.linspace(0, len(modulated_signal) / fs, len(modulated_signal)), modulated_signal)
plt.title('Modulated BFSK Signal')
plt.xlabel('Time [s]')
plt.ylabel('Amplitude')
plt.grid(True)
plt.show()

print(f"Original bitstream: {bitstream}")
print(f"Recovered bitstream: {recovered_bitstream}")
