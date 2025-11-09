import numpy as np
import matplotlib.pyplot as plt


def diff_manchester_encode(bitstream):
    
    signal = []
    previous_bit = 1 
    
    
    for bit in bitstream:
        if bit == 1:
            
            signal.append(previous_bit)
            signal.append(previous_bit)
        else:
            
            signal.append(1 - previous_bit)
            signal.append(previous_bit)
        
        previous_bit = signal[-1]
    
    return signal

def diff_manchester_decode(encoded_signal):
    decoded_bits = []
    previous_bit = 1  
    
    
    for i in range(0, len(encoded_signal), 2):
        
        if encoded_signal[i + 1] == previous_bit:
            decoded_bits.append(1)
        else:
            decoded_bits.append(0)
        previous_bit = encoded_signal[i + 1]  
    
    return decoded_bits
bitstream = [1, 0, 1, 1, 0, 0, 1]


encoded_signal = diff_manchester_encode(bitstream)


decoded_bits = diff_manchester_decode(encoded_signal)


def plot_signal(encoded_signal):
    
    time = np.linspace(0, len(encoded_signal), len(encoded_signal)*100)
    signal_waveform = np.repeat(encoded_signal, 100)
    
    plt.figure(figsize=(10, 3))
    plt.plot(time, signal_waveform, label="Differential Manchester Encoding", color='b')
    plt.title("Differential Manchester Encoding of Bitstream")
    plt.xlabel("Time")
    plt.ylabel("Signal Level")
    plt.grid(True)
    plt.show()


plot_signal(encoded_signal)


print(f"Original bitstream: {bitstream}")
print(f"Encoded signal: {encoded_signal}")
print(f"Decoded bitstream: {decoded_bits}")