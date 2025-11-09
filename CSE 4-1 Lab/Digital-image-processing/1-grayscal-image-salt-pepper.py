import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.metrics import peak_signal_noise_ratio as psnr
from scipy.ndimage import uniform_filter

img = cv2.imread('Lenna.png', cv2.IMREAD_GRAYSCALE)
if img is None:
    raise FileNotFoundError("Image not found.")
img = cv2.resize(img, (512, 512))

def add_salt_pepper_noise(image, amount=0.02, salt_vs_pepper=0.5):
    noisy = np.copy(image)
    num_salt = int(amount * image.size * salt_vs_pepper)
    num_pepper = int(amount * image.size * (1.0 - salt_vs_pepper))

    coords_salt = [np.random.randint(0, i, num_salt) for i in image.shape]
    coords_pepper = [np.random.randint(0, i, num_pepper) for i in image.shape]

    noisy[tuple(coords_salt)] = 255
    noisy[tuple(coords_pepper)] = 0
    return noisy

noisy_image = add_salt_pepper_noise(img)

def average_filter(image, ksize):
    return cv2.blur(image, (ksize, ksize))

avg3 = average_filter(noisy_image, 3)
avg5 = average_filter(noisy_image, 5)
avg7 = average_filter(noisy_image, 7)

def harmonic_mean_filter(image, ksize):
    image = image.astype(np.float32) + 1e-5
    out = np.zeros_like(image)
    pad = ksize // 2
    padded = cv2.copyMakeBorder(image, pad, pad, pad, pad, cv2.BORDER_REFLECT)
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            region = padded[i:i+ksize, j:j+ksize]
            out[i, j] = ksize * ksize / np.sum(1.0 / (region + 1e-5))
    return np.clip(out, 0, 255).astype(np.uint8)

harmonic = harmonic_mean_filter(noisy_image, 3)

def geometric_mean_filter(image, ksize):
    image = image.astype(np.float32) + 1
    out = np.zeros_like(image)
    pad = ksize // 2
    padded = cv2.copyMakeBorder(image, pad, pad, pad, pad, cv2.BORDER_REFLECT)
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            region = padded[i:i+ksize, j:j+ksize]
            log_region = np.log(region)
            mean_log = np.mean(log_region)
            out[i, j] = np.exp(mean_log)
    return np.clip(out - 1, 0, 255).astype(np.uint8)

geometric = geometric_mean_filter(noisy_image, 3)

print("PSNR Comparisons:")
print(f"Average Filter 3x3: {psnr(img, avg3):.2f} dB")
print(f"Average Filter 5x5: {psnr(img, avg5):.2f} dB")
print(f"Average Filter 7x7: {psnr(img, avg7):.2f} dB")
print(f"Harmonic Mean Filter: {psnr(img, harmonic):.2f} dB")
print(f"Geometric Mean Filter: {psnr(img, geometric):.2f} dB")

titles = ['Original', 'Salt & Pepper Noise', 'Avg 3x3', 'Avg 5x5', 'Avg 7x7', 'Harmonic Mean', 'Geometric Mean']
images = [img, noisy_image, avg3, avg5, avg7, harmonic, geometric]

plt.figure(figsize=(18, 6))
for i in range(len(images)):
    plt.subplot(2, 4, i + 1)
    plt.imshow(images[i], cmap='gray')
    plt.title(titles[i])
    plt.axis('off')
plt.tight_layout()
plt.show()
