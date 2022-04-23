const DEFAULT_PREVIEW = 'img/upload-default-image.jpg';

const imageTypes = /\.(png|jp?g)$/i;
const imgUpload = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const setup = () => {
  imgUpload.addEventListener('change', () => {
    const image = imgUpload.files[0];
    const imageFileName = image.name.toLowerCase();
    const isImage = imageTypes.test(imageFileName);

    if (isImage) {
      imgUploadPreview.src = URL.createObjectURL(image);
    }
  });
};

const reset = () => {
  imgUploadPreview.src = DEFAULT_PREVIEW;
};

export {
  setup as setupPreview,
  reset as resetPreview
};
