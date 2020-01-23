import { piexif } from 'piexifjs';
import { metadataConfig } from "~/config/metadata.config";
import { ExifTags } from '../config/exifTags.config';

const filterTags = (convertedTags) => {
  return Object.keys(convertedTags)
  .filter(key => metadataConfig[key])
  .map(key => ({
    key,
    label: metadataConfig[key].label,
    isEditable: metadataConfig[key].isEditable,
    filter: metadataConfig[key].filter,
    value: convertedTags[key],
    edit: false
  }));
}

const convertTagIdIntoName = (obj) => {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = ExifTags[key];

    return { [newKey]: obj[key] };
  });

  return Object.assign({}, ...keyValues);
}

const flattenObject = (ob) => {
  const toReturn = {};
  
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) == 'object') {
      const flatObject = flattenObject(ob[i]);

      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        
        toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }

  return toReturn;
};

const getExifData = (dataURL) => {
  return piexif.load(dataURL);
}

const convertFileToDataURL = (imgSrc, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', imgSrc);
  xhr.responseType = 'blob';
  xhr.send();
}

export const getExifTags = (imgSrc) => {
  return new Promise((response) => {
    convertFileToDataURL(imgSrc, (dataURL) => {
      const exifDataRaw = getExifData(dataURL);
      const allExifTagsInOneObj = flattenObject(exifDataRaw);
      const convertedTags = convertTagIdIntoName(allExifTagsInOneObj);
      const filteredTags = filterTags(convertedTags);
      response(filteredTags);
    });
  });
}


