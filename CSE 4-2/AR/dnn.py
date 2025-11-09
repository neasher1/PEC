import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

# Step 1: Generate data
X = np.linspace(-15, 15, 1000).reshape(-1, 1)
y = 5*X**3 - 8*X**2 - 7*X + 5

# Step 2: Normalize X and y to [-1, 1]
scaler_X = MinMaxScaler(feature_range=(-1, 1))
scaler_y = MinMaxScaler(feature_range=(-1, 1))
X_scaled = scaler_X.fit_transform(X)
y_scaled = scaler_y.fit_transform(y)

# Step 3: Split into train/val/test
X_temp, X_test, y_temp, y_test = train_test_split(X_scaled, y_scaled, test_size=0.08, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.08/(1-0.08), random_state=42)

# Step 4: Build DNN model
model = models.Sequential([
    layers.Dense(32, activation='relu', input_shape=(1,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(128, activation='relu'),
    layers.Dense(1)
])

model.summary()  # Displays number of parameters

# Step 5: Compile and Train
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
history = model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=100, verbose=1)

# Step 6: Evaluate and Predict
pred = model.predict(X_test)
y_pred = scaler_y.inverse_transform(pred)
y_true = scaler_y.inverse_transform(y_test)

# Step 7: Plot Prediction vs True
plt.figure(figsize=(8,5))
plt.scatter(y_true, y_pred, color='blue')
plt.xlabel("True Values")
plt.ylabel("Predicted Values")
plt.title("Prediction Accuracy: True vs Predicted")
plt.grid(True)
plt.show()
