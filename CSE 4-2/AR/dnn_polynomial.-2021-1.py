# dnn_polynomial.py

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# 1️⃣ Generate dataset
np.random.seed(42)
X = np.random.uniform(-10, 10, 3000)  # 3000 random samples between -10 and 10
y = 3 * X**3 - 7 * X**2 - 12 * X + 2  # Polynomial function

# Reshape for neural network (NN expects 2D input)
X = X.reshape(-1, 1)
y = y.reshape(-1, 1)

# 2️⃣ Split data: 90% train, 10% test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.10, random_state=42)

# 3️⃣ Build DNN model
model = Sequential([
    Input(shape=(1,)),            # Input layer
    Dense(32, activation='relu'), # Hidden layer 1
    Dense(64, activation='relu'), # Hidden layer 2
    Dense(128, activation='relu'),# Hidden layer 3
    Dense(1)                      # Output layer (no activation → regression)
])

# Display the model structure
model.summary()

# 4️⃣ Compile model
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# 5️⃣ Train model
history = model.fit(X_train, y_train, epochs=100, batch_size=32, validation_split=0.1, verbose=1)

# 6️⃣ Predict on test data
y_pred = model.predict(X_test)

# 7️⃣ Plot results
plt.figure(figsize=(8, 5))
plt.scatter(X_test, y_test, color='blue', label='True Values', alpha=0.6)
plt.scatter(X_test, y_pred, color='red', label='Predicted Values', alpha=0.6)
plt.title("DNN Prediction vs True Values for Polynomial Function")
plt.xlabel("X values")
plt.ylabel("Y values")
plt.legend()
plt.show()

# 8️⃣ Optional: Plot training curves
plt.figure(figsize=(8, 4))
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title("Training and Validation Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss (MSE)")
plt.legend()
plt.show()
