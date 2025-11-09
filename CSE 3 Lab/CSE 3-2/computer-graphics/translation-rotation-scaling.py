import pygame
import math
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions and settings
screen = pygame.display.set_mode((600, 600))
pygame.display.set_caption("2D Transformations - Translation, Rotation, Scaling")
clock = pygame.time.Clock()

# Colors
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Transformation variables
tx, ty = 300, 300  # Initial translation (center of screen)
angle = 0          # Rotation angle in degrees
scale = 1.0        # Scaling factor

# Define the triangle vertices (relative to the origin)
triangle_vertices = [
    (-50, -50),
    (50, -50),
    (0, 50)
]

def transform_and_draw_triangle(surface, vertices, tx, ty, angle, scale):
    # Calculate transformation
    transformed_vertices = []
    for x, y in vertices:
        # Scale
        x *= scale
        y *= scale

        # Rotate
        x_rot = x * math.cos(math.radians(angle)) - y * math.sin(math.radians(angle))
        y_rot = x * math.sin(math.radians(angle)) + y * math.cos(math.radians(angle))

        # Translate
        x_final = x_rot + tx
        y_final = y_rot + ty

        transformed_vertices.append((x_final, y_final))

    # Draw the triangle with a single color
    pygame.draw.polygon(surface, RED, transformed_vertices, 0)

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            # Translation
            if event.key == pygame.K_w: ty -= 10  # Move up
            if event.key == pygame.K_s: ty += 10  # Move down
            if event.key == pygame.K_a: tx -= 10  # Move left
            if event.key == pygame.K_d: tx += 10  # Move right

            # Rotation
            if event.key == pygame.K_r and not pygame.key.get_mods() & pygame.KMOD_SHIFT:
                angle += 5  # Rotate clockwise
            if event.key == pygame.K_r and pygame.key.get_mods() & pygame.KMOD_SHIFT:
                angle -= 5  # Rotate counterclockwise

            # Scaling
            if event.key == pygame.K_z: scale += 0.1  # Scale up
            if event.key == pygame.K_x: scale -= 0.1  # Scale down
            if scale < 0.1: scale = 0.1  # Prevent negative or zero scale

    # Clear the screen
    screen.fill(BLACK)

    # Draw the transformed triangle
    transform_and_draw_triangle(screen, triangle_vertices, tx, ty, angle, scale)

    # Update the display
    pygame.display.flip()

    # Cap the frame rate
    clock.tick(60)

# Quit Pygame
pygame.quit()
sys.exit()
