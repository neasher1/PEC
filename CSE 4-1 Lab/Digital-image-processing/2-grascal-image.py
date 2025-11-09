import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.fft import fft2, ifft2, fftshift, ifftshift
from skimage.metrics import peak_signal_noise_ratio as psnr

img = cv2.imread('Lenna.png', cv2.IMREAD_GRAYSCALE)
if img is None:
    raise FileNotFoundError("Image not found. Please check the path.")
img = cv2.resize(img, (512, 512))

mean = 0
std = 25
gaussian_noise = np.random.normal(mean, std, img.shape)
noisy_image = np.clip(img + gaussian_noise, 0, 255).astype(np.uint8)

f_transform = fft2(noisy_image)
f_transform_shifted = fftshift(f_transform)

def butterworth_filter(shape, cutoff, order=4):
    rows, cols = shape
    u = np.arange(rows) - rows // 2
    v = np.arange(cols) - cols // 2
    U, V = np.meshgrid(u, v)
    D = np.sqrt(U**2 + V**2)
    H = 1 / (1 + (D / cutoff)**(2 * order))
    return H

def gaussian_filter_fn(shape, cutoff):
    rows, cols = shape
    u = np.arange(rows) - rows // 2
    v = np.arange(cols) - cols // 2
    U, V = np.meshgrid(u, v)
    D = np.sqrt(U**2 + V**2)
    H = np.exp(-(D**2) / (2 * (cutoff**2)))
    return H

def ideal_low_pass_filter(shape, radius):
    rows, cols = shape
    u = np.arange(rows) - rows // 2
    v = np.arange(cols) - cols // 2
    U, V = np.meshgrid(u, v)
    D = np.sqrt(U**2 + V**2)
    return np.where(D <= radius, 1, 0)

butter_filter = butterworth_filter(img.shape, cutoff=30)
f_butter = f_transform_shifted * butter_filter
butter_img = np.abs(ifft2(ifftshift(f_butter))).astype(np.uint8)

gauss_filter = gaussian_filter_fn(img.shape, cutoff=30)
f_gauss = f_transform_shifted * gauss_filter
gauss_img = np.abs(ifft2(ifftshift(f_gauss))).astype(np.uint8)

psnr_butter = psnr(img, butter_img)
psnr_gauss = psnr(img, gauss_img)
print(f"PSNR (Butterworth): {psnr_butter:.2f} dB")
print(f"PSNR (Gaussian): {psnr_gauss:.2f} dB")

titles = ['Original (Noisy)', 'Butterworth Filtered', 'Gaussian Filtered']
images = [noisy_image, butter_img, gauss_img]

plt.figure(figsize=(15, 5))
for i in range(3):
    plt.subplot(1, 3, i + 1)
    plt.imshow(images[i], cmap='gray')
    plt.title(titles[i])
    plt.axis('off')
plt.tight_layout()
plt.show()

radii = [20, 30, 60]
plt.figure(figsize=(18, 6))
for i, r in enumerate(radii):
    ideal_filter = ideal_low_pass_filter(img.shape, r)
    f_ideal = f_transform_shifted * ideal_filter
    ideal_img = np.abs(ifft2(ifftshift(f_ideal))).astype(np.uint8)

    psnr_ideal = psnr(img, ideal_img)
    plt.subplot(1, len(radii), i + 1)
    plt.imshow(ideal_img, cmap='gray')
    plt.title(f'Ideal LPF (DO={r})\nPSNR: {psnr_ideal:.2f} dB')
    plt.axis('off')
plt.tight_layout()
plt.show()
