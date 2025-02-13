# Hand gesture recognition using ML

This repository contains a Convolutional Neural Network (CNN) model for recognizing hand gestures based on the Sign MNIST dataset. The model is trained to classify different hand signs commonly used in sign language.

## Project Overview

Hand gesture recognition is an essential application of computer vision, enabling interaction between humans and machines. In this project, we use a deep learning approach with CNNs to classify images of hand signs accurately.

## Dataset

The dataset used for training and testing is the Sign MNIST dataset, which consists of labeled grayscale images of hand gestures. The dataset is structured as follows:

sign_mnist_train.csv: Training data containing labeled images of hand gestures.

sign_mnist_test.csv: Testing data to evaluate model performance.

## Model Architecture

The CNN model follows a standard deep learning architecture with convolutional layers, pooling layers, and fully connected layers. The key components include:

Convolutional Layers: Extracts spatial features from images.

Max Pooling Layers: Reduces dimensionality while preserving important features.

Fully Connected Layers: Classifies the extracted features into different hand gesture categories.

Activation Functions: Uses ReLU for hidden layers and Softmax for output classification.

## Requirements

To run this project, install the following dependencies:

- pip install tensorflow numpy pandas matplotlib seaborn

## Results

The trained model achieves high accuracy in recognizing hand gestures. The results are visualized using confusion matrices and accuracy plots.
