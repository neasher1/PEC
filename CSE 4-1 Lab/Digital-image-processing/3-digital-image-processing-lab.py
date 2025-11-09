import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import binary_erosion, binary_dilation, binary_opening, binary_closing
import cv2

img = cv2.imread('Lenna.png', cv2.IMREAD_GRAYSCALE)

_, binary_image = cv2.threshold(img, 127, 1, cv2.THRESH_BINARY)

struct_elem = np.ones((3, 3), dtype=np.uint8)

erosion = binary_erosion(binary_image, structure=struct_elem)
dilation = binary_dilation(binary_image, structure=struct_elem)
opening = binary_opening(binary_image, structure=struct_elem)
closing = binary_closing(binary_image, structure=struct_elem)

titles = ['Original Binary', 'Erosion', 'Dilation', 'Opening', 'Closing']
images = [binary_image, erosion, dilation, opening, closing]

plt.figure(figsize=(15, 3))
for i in range(5):
    plt.subplot(1, 5, i + 1)
    plt.imshow(images[i], cmap='gray')
    plt.title(titles[i])
    plt.axis('off')
plt.tight_layout()
plt.show()
