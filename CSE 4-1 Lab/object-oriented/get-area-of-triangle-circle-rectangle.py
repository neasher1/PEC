import math

class Shape:
    def getArea(self):
        raise NotImplementedError("Must override getArea() in subclass")

class Circle(Shape):
    def __init__(self, radius=2.0):
        self.radius = radius

    def getArea(self):
        return math.pi * self.radius * self.radius

class Rectangle(Shape):
    def __init__(self, width=2.0, height=1.5):
        self.width = width
        self.height = height

    def getArea(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, a=1.0, b=1.0, c=1.0):
        self.a = a
        self.b = b
        self.c = c

    def getArea(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

class ShapeFactory:
    def createShape(self, shapeType):
        shapeType = shapeType.lower()
        if shapeType == "circle":
            return Circle()
        elif shapeType == "rectangle":
            return Rectangle()
        elif shapeType == "triangle":
            return Triangle()
        else:
            raise ValueError("Unknown shape type")

if __name__ == "__main__":
    factory = ShapeFactory()

    shapes = ["circle", "rectangle", "triangle"]

    for shapeName in shapes:
        shape = factory.createShape(shapeName)
        print(f"{shapeName.title()} Area: {shape.getArea():.2f}")
