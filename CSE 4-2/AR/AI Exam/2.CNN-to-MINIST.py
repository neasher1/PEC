import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, precision_score, recall_score
import numpy as np
import matplotlib.pyplot as plt

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

selected_digits = [0, 1, 3, 6, 8]
train_filter = np.isin(y_train, selected_digits)
test_filter = np.isin(y_test, selected_digits)

x_train, y_train = x_train[train_filter], y_train[train_filter]
x_test, y_test = x_test[test_filter], y_test[test_filter]

x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0
x_train = np.expand_dims(tf.image.resize(x_train[..., np.newaxis], [32, 32]), -1)
x_test = np.expand_dims(tf.image.resize(x_test[..., np.newaxis], [32, 32]), -1)

x_train, x_test = np.array(x_train), np.array(x_test)

label_map = {digit: idx for idx, digit in enumerate(selected_digits)}
y_train = np.array([label_map[y] for y in y_train])
y_test = np.array([label_map[y] for y in y_test])

X_train, X_val, y_train, y_val = train_test_split(
    x_train, y_train, test_size=0.15, random_state=42
)

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 1)),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),

    layers.Flatten(),
    layers.Dense(32, activation='relu'),
    layers.Dense(16, activation='relu'),
    layers.Dense(8, activation='relu'),
    layers.Dense(5, activation='softmax')
])

optimizer = tf.keras.optimizers.Adam(learning_rate=0.002)
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    "best_model.h5", monitor='val_loss', save_best_only=True, verbose=1
)

print("\nTraining first 2 epochs (full network)...")
model.fit(X_train, y_train, epochs=2, batch_size=16, validation_data=(X_val, y_val), callbacks=[checkpoint])

model.layers[0].trainable = False
model.layers[2].trainable = False
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

print("\nTraining next 3 epochs (freeze first two conv layers)...")
model.fit(X_train, y_train, epochs=3, batch_size=16, validation_data=(X_val, y_val), callbacks=[checkpoint])

best_model = tf.keras.models.load_model("best_model.h5")

y_pred = best_model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)

acc = accuracy_score(y_test, y_pred_classes)
prec = precision_score(y_test, y_pred_classes, average='macro')
rec = recall_score(y_test, y_pred_classes, average='macro')

print(f"\nModel Performance:")
print(f"Accuracy : {acc*100:.2f}%")
print(f"Precision: {prec*100:.2f}%")
print(f"Recall   : {rec*100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, y_pred_classes, target_names=[str(d) for d in selected_digits]))

idx = np.random.randint(0, len(x_test))
sample_image = x_test[idx]
plt.imshow(sample_image.reshape(32, 32), cmap='gray')
plt.title("Sample Test Image")
plt.axis('off')
plt.show()

prediction = best_model.predict(sample_image.reshape(1, 32, 32, 1))
pred_class = np.argmax(prediction)
pred_digit = selected_digits[pred_class]

print(f"Predicted Digit: {pred_digit}")
print(f"Actual Digit: {selected_digits[y_test[idx]]}")
