import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo as CameraPhoto} from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';
import {Platform} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: Photo[] = [];
  private photoStorage = 'photos';
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async loadSaved(){
    const photoList = await Storage.get({key: this.photoStorage});
    this.photos = JSON.parse(photoList.value);
    if (!this.photos) {return this.photos = [];}

    if (!this.platform.is('hybrid')){
      for (const photo of this.photos){
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async addNewToGallery(){
    //Take a Photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    //Save photo and add to collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    this.setPhotoStorage();
  }

  public async deletePicture(photo: Photo, position: number){
    this.photos.splice(position, 1);
    this.setPhotoStorage();

    const filename = photo.filepath
      .substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }

    private async savePicture(cameraPhoto: CameraPhoto){
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')){
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      };
    }
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath, //already loaded in memory
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {

    if (this.platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
      return file.data;
    };

    const res = await fetch(cameraPhoto.webPath);
    const blob = await res.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  private setPhotoStorage(){
    Storage.set({
      key: this.photoStorage,
      value: JSON.stringify(this.photos)
    });
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
