import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploadProgress: number | null = null;
  storedImageUrl: string | null = null;

  cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dhnbtvsh5/image/upload';
  cloudinaryUploadPreset = 'Harsha';

  userData = {
    name: '',
    age: '',
    gender: '',
    phone: ''
  };
  isSubmitted = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load stored profile image
    this.storedImageUrl = localStorage.getItem('profileImage') || null;

    // Load stored user details
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
      this.userData = JSON.parse(storedDetails);
      this.isSubmitted = true; // Show details if they exist
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    this.http.post<any>(this.cloudinaryUploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event: any) => {
      if (event.type === 1 && event.total) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      }
      if (event.body && event.body.secure_url) {
        this.storedImageUrl = event.body.secure_url;
        localStorage.setItem('profileImage', this.storedImageUrl || '');
        this.uploadProgress = null;
        this.selectedFile = null;
        this.imagePreview = null;
      }
    }, (error) => {
      console.error('Upload error:', error);
      this.uploadProgress = null;
    });
  }

  removeProfilePicture() {
    localStorage.removeItem('profileImage');
    this.storedImageUrl = null;
  }

  submitForm() {
    localStorage.setItem('userDetails', JSON.stringify(this.userData));
    this.isSubmitted = true;
  }

  editDetails() {
    this.isSubmitted = false;
  }
}
