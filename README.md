# Pigmented Skin Lesion Classifier Web-App

 [https://hamptonjc.github.io/skin-lesion-classifier-web-app/](https://hamptonjc.github.io/skin-lesion-classifier-web-app/)

This web-app uses a Mobilenet neural network to classify images of skin lesions (i.e. moles).

## Training
The network was developed in Python with Tensorflow.

The training process is available in a Colab notebook -> [link](https://tinyurl.com/skin-lesion)

The network started from a pretrained Mobilenet. The architecture was modified to fit the problem. The network was trained on the HAM10000 dataset ->[link](https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000)

## Web-App
The network was converted into a TensorflowJS model. The web-app was developed with Angular & Angular Material.
