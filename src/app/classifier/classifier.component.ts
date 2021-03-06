import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.component.html',
  styleUrls: ['./classifier.component.css']
})
export class ClassifierComponent implements OnInit {

  model: any;
  public imagePath;
  imgURL: any;
  public message: string;
  predictions: any;
  lesion_types = new Map<number, string>();
  type_pred: string;
  showSpinner: boolean = false;
  wiki_link: string;


  constructor() { }

  async ngOnInit() {
    this.showSpinner = true
    this.lesion_types.set(0, 'Actinic Keratosis');
    this.lesion_types.set(1, 'Basal Cell Carcinoma');
    this.lesion_types.set(2, 'Benign Keratosis');
    this.lesion_types.set(3, 'Dermatofibroma');
    this.lesion_types.set(4, 'Melanoma');
    this.lesion_types.set(5, 'Melanocytic Nevi');
    this.lesion_types.set(6, 'Vascular Skin Lesion');

    this.model = await tf.loadGraphModel('assets/tf_models/mobilenet_skin_lesion_v1/model.json');
    this.showSpinner = false;
  }

  reset(){
    this.imgURL = null;
    this.type_pred = null;
    this.predictions = null;
    this.imagePath = null;
  }

  openInput(){
    document.getElementById("fileInput").click();
  }

  imgUpload(files: File[]) {
    this.showSpinner = true;
    if (files.length == 0) return;
    var type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this.showSpinner = false;
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.showSpinner = false;
  }

  async classify() {
    this.showSpinner = true;
    // create image object
    var img = new Image();
    img.src = this.imgURL;
    var tensor;
    // Convert image to tensor
    tensor = tf.browser.fromPixels(img);

    // Preprocess
    tensor = tf.image.resizeBilinear(tensor, [224,224]);
    tensor = tf.expandDims(tensor, 0);

    // Inference
    let pred_tensor: tf.Tensor = await this.model.predict(tensor);
    this.predictions = pred_tensor.arraySync();
    this.onehot_2_str_pred(pred_tensor);
    this.set_wiki_link(this.type_pred);
    this.showSpinner = false;
  }

  onehot_2_str_pred(preds: tf.Tensor): void {
    let max_idx: any = tf.argMax(preds,1);
    max_idx = max_idx.arraySync();
    this.type_pred = this.lesion_types.get(max_idx[0]);
  }

  set_wiki_link(str_type) {
    if (str_type == 'Actinic Keratosis') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Actinic_keratosis';
    }
    else if (str_type == 'Basal Cell Carcinoma') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Basal-cell_carcinoma';
    }
    else if (str_type == 'Benign Keratosis') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Seborrheic_keratosis';
    }
    else if (str_type == 'Dermatofibroma') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Dermatofibroma';
    }
    else if (str_type == 'Melanoma') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Melanoma';
    }
    else if (str_type == 'Melanocytic Nevi') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Melanocytic_nevus';
    }
    else if (str_type == 'Vascular Skin Lesion') {
      this.wiki_link = 'https://en.wikipedia.org/wiki/Vascular_anomaly';
    }
    else throw new Error('Prediction type unknown for wiki link');
  }

}
