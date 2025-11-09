import pygame
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions and settings
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Bézier Curve Drawing")
clock = pygame.time.Clock()

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Control points for the Bézier curve
# control_points = [(150, 450), (300, 100), (500, 100), (650, 450)]
control_points = [(100, 300), (200, 100), (400, 500), (600, 200)]


# Function to calculate a point on the Bézier curve using de Casteljau's algorithm
def calculate_bezier_point(points, t):
    while len(points) > 1:
        points = [
            (
                (1 - t) * points[i][0] + t * points[i + 1][0],  # X coordinate
                (1 - t) * points[i][1] + t * points[i + 1][1]   # Y coordinate
            )
            for i in range(len(points) - 1)
        ]
    return points[0]

# Function to draw the Bézier curve
def draw_bezier_curve(surface, points, num_segments=100):
    bezier_points = []
    for t in [i / num_segments for i in range(num_segments + 1)]:
        bezier_points.append(calculate_bezier_point(points[:], t))
    pygame.draw.lines(surface, BLACK, False, bezier_points, 2)

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Clear the screen
    screen.fill(WHITE)

    # Draw control points
    for point in control_points:
        pygame.draw.circle(screen, RED, point, 5)

    # Draw lines connecting control points
    for i in range(len(control_points) - 1):
        pygame.draw.line(screen, BLUE, control_points[i], control_points[i + 1], 1)

    # Draw the Bézier curve
    draw_bezier_curve(screen, control_points)

    # Update the display
    pygame.display.flip()
    clock.tick(60)

# Quit Pygame
pygame.quit()
sys.exit()
