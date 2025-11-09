import tensorflow as tf
from tensorflow.keras import layers, models, callbacks, optimizers
from sklearn.model_selection import train_test_split
import numpy as np
import os

# 1️⃣ Load MNIST dataset
(x_train_full, y_train_full), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# 2️⃣ Filter only even digits (0, 2, 4, 6, 8)
even_indices_train = np.isin(y_train_full, [0, 2, 4, 6, 8])
even_indices_test = np.isin(y_test, [0, 2, 4, 6, 8])

x_train_full = x_train_full[even_indices_train]
y_train_full = y_train_full[even_indices_train]
x_test = x_test[even_indices_test]
y_test = y_test[even_indices_test]

# Normalize pixel values
x_train_full = x_train_full.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Add channel dimension (for CNN)
x_train_full = np.expand_dims(x_train_full, -1)
x_test = np.expand_dims(x_test, -1)

# Convert labels to 0–4 (so 0→0, 2→1, 4→2, 6→3, 8→4)
label_map = {0:0, 2:1, 4:2, 6:3, 8:4}
y_train_full = np.array([label_map[y] for y in y_train_full])
y_test = np.array([label_map[y] for y in y_test])

# 3️⃣ Split dataset
# Train = 85% total, Validation = 15% of train
# Train = 85% of total data, Validation = 15% of total data
X_train, X_val, y_train, y_val = train_test_split(x_train_full, y_train_full, test_size=0.15, random_state=42)

print(f"Train: {X_train.shape}, Val: {X_val.shape}, Test: {x_test.shape}")

# 4️⃣ Build CNN model
def create_model():
    model = models.Sequential([
        layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
        layers.MaxPooling2D((2,2)),
        layers.Conv2D(64, (3,3), activation='relu'),
        layers.MaxPooling2D((2,2)),
        layers.Conv2D(128, (3,3), activation='relu'),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(5, activation='softmax')  # 5 classes
    ])
    return model

model = create_model()
model.summary()

# 5️⃣ Define optimizer
optimizer = optimizers.Adagrad(learning_rate=0.003)

# Compile model
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Directory to save models
os.makedirs('saved_models', exist_ok=True)

# Callback to save best model based on validation loss
checkpoint = callbacks.ModelCheckpoint(
    filepath='saved_models/best_model_epoch_{epoch:02d}_valLoss_{val_loss:.4f}.h5',
    monitor='val_loss',
    save_best_only=True,
    verbose=1
)

# 6️⃣ First Phase — train all layers for 10 epochs
print("\n--- Phase 1: Training all layers (Epochs 1–10) ---")
history1 = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=10,
    batch_size=32,
    callbacks=[checkpoint],
    verbose=1
)

# 7️⃣ Freeze first 3 convolutional layers
for layer in model.layers[:5]:  # 3 conv + 2 pooling
    layer.trainable = False

# Re-compile to apply freezing
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 8️⃣ Second Phase — train remaining layers for 20 more epochs
print("\n--- Phase 2: Training top layers only (Epochs 11–30) ---")
history2 = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=30,
    initial_epoch=10,
    batch_size=32,
    callbacks=[checkpoint],
    verbose=1
)

# 9️⃣ Evaluate final model on test data
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f"\n✅ Final Test Accuracy: {test_acc*100:.2f}%")
