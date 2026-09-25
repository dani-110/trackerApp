import moment from "moment";
import publicKey from '../public.pem'
import forge from 'node-forge'

import * as XLSX from "xlsx";
import { api } from "../interfaces/api.interface";
import axios from "axios";

export const validPhone = /[^0-9+()-]|([+-])\1+/g
export const onlyPhone = (str) => {
  if (str.length > 0) {
    str = str?.replace(validPhone, '')
  }
  return str;
}

export const onlyDate = (date) => {
  return date ? moment(date).format('DD-MM-YYYY') : ''
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}
// export const setDataObject = (obj) => {

//   Object.keys(obj).forEach(item => {
//     if (!item.includes('customer') && !item.includes('converted') && !item.includes('created') && !item.includes('account')) {
//       if (item.includes('date') || item.includes('create') || item.includes('from') || item.includes('to')) {
//         if (obj[item] === '' || obj[item] === undefined) {
//           obj[item] = ""
//         } else {
//           if (item.includes('to') && moment(obj[item]).format('YYYYMMDDHHmmss') % 1000000 === 0) {
//             obj[item] = moment(obj[item]).format('YYYYMMDDHHmmss') / 1000000 + '235959'
//           }
//           else {
//             obj[item] = moment(obj[item]).format('YYYYMMDDHHmmss')
//           }
//         }
//       } else if (obj[item] === '' || obj[item] == null) {
//         obj[item] = ""
//       }
//     } else if (obj[item] === '' || obj[item] == null) {
//       obj[item] = ""
//     }
//   })
//   return obj
// }
const isDateField = (key) => {
  const lowerKey = key.toLowerCase();
  const hasDateKeywords = lowerKey.includes('date') || lowerKey.includes('create') || lowerKey.includes('from') || lowerKey.includes('to');
  const hasExcludedKeywords = lowerKey.includes('customer') || lowerKey.includes('converted') || lowerKey.includes('created') || lowerKey.includes('account');

  return hasDateKeywords && !hasExcludedKeywords;
};

const formatTimestamp = (key, value) => {
  if (!value) {
    return "";
  }

  // moment.utc() use karne se GMT string automatically UTC mein normalize ho jayegi
  const parsedDate = moment.utc(value);
  console.log(parsedDate)
  if (!parsedDate.isValid()) {
    return value; // Agar invalid date ho toh original value retain karein
  }

  // const formattedDate = parsedDate.format('YYYYMMDDHHmmss');

  // // If key contains 'to' and time ends in exactly '000000' (midnight in UTC), set to end of day '235959'
  // if (key.includes('to') && formattedDate.endsWith('000000')) {
  //   return formattedDate.slice(0, 8) + '235959';
  // }

  return parsedDate;
};

export const setDataObject = (obj) => {
  Object.keys(obj).forEach(item => {
    // 1. Agar date field hai toh formatting logic chalayein
    if (isDateField(item)) {
      obj[item] = formatTimestamp(item, obj[item]);
    }
    // 2. Agar null/undefined/empty string hai toh standard empty string set karein
    else if (obj[item] === '' || obj[item] == null) {
      obj[item] = "";
    }
  });

  return obj;
};
// export const setSearchDataObject = (obj) => {

//   Object.keys(obj).forEach(item => {
//     if (!item.includes('customer') && !item.includes('converted') && !item.includes('created') && !item.includes('account')) {
//       if (item.includes('date') || item.includes('create') || item.includes('from') || item.includes('to')) {
//         if (obj[item] == '' || obj[item] == undefined) {
//           obj[item] = ""
//         } else {
//           if (item.includes('to') && moment(obj[item]).format('YYYY-MM-DD HH:mm:ss') % 1000000 === 0) {
//             obj[item] = moment(obj[item]).format('YYYY-MM-DD HH:mm:ss') / 1000000 + '235959'
//           }
//           else {
//             obj[item] = moment(obj[item]).format('YYYY-MM-DD HH:mm:ss')
//           }
//         }
//       } else if (obj[item] == '' || obj[item] == null) {
//         obj[item] = ""
//       }
//     } else if (obj[item] == '' || obj[item] == null) {
//       obj[item] = ""
//     }
//   })
//   return obj
// }

const isSearchDateField = (key) => {
  const hasDateKeywords = key.includes('date') || key.includes('create') || key.includes('from') || key.includes('to');
  const hasExcludedKeywords = key.includes('customer') || key.includes('converted') || key.includes('created') || key.includes('account');

  return hasDateKeywords && !hasExcludedKeywords;
};


const formatSearchTimestamp = (key, value) => {
  if (value === '' || value === undefined) {
    return "";
  }

  if (key.includes('to')) {
    const timeCheck = moment(value).format('HHmmss');
    if (Number(timeCheck) === 0) {
      return moment(value).format('YYYY-MM-DD') + ' 23:59:59';
    }
  }

  // 2. Default format
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
};

export const setSearchDataObject = (obj) => {
  Object.keys(obj).forEach(item => {
    if (isSearchDateField(item)) {
      obj[item] = formatSearchTimestamp(item, obj[item]);
    }
    else if (obj[item] === '' || obj[item] == null) {
      obj[item] = "";
    }
  });

  return obj;
};

export const setDataObjectONOFF = (obj) => {
  Object.keys(obj).forEach(item => {
    if (!obj[item]) {
      obj[item] = 0
    } else {
      obj[item] = 1
    }
  })
  return obj
}

export const setDateOnUpdateList = (date) => {
  if (date) {
    const year = date?.split('').slice(0, 4).join('')
    const month = date?.split('').slice(4, 6).join('')
    const day = date?.split('').slice(6, 8).join('')
    const hour = date?.split('').slice(8, 10).join('')
    const min = date?.split('').slice(10, 12).join('')
    const sec = date?.split('').slice(12, 14).join('')
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  } else {
    return ''
  }
}

export const filterName = (list, id) => {
  return list?.length > 0 && list?.find(val => val?.id == id)?.name || ""
}
export const filterLabel = (list, id) => {
  return list?.length > 0 && list?.find(val => val?.value == parseInt(id))?.label || ""
}

export const fetchPublicKey = async (pass) => {
  const response = await fetch(publicKey);
  const text = await response.text();
  const key = forge.pki.publicKeyFromPem(text);
  const encrypted = key.encrypt(pass, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);

};
export const findPermission = (permissions, list) => {
  let foundPermission = null;
  list?.forEach((e, i) => {
    if (i == 0) {
      foundPermission = permissions?.find(val => val.PAGEPERMISSION.trim() == e)
    } else {
      foundPermission = foundPermission?.Children?.find(val => val.PAGEPERMISSION.trim() == e)
    }
  })

  return foundPermission?.Children?.filter(e => e.ISENABLE == 1).map(e => e.PAGEPERMISSION) || [];
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


export const downloadBase64File = (base64Data, defaultFileName) => {
  // Extract the MIME type and base64 data from the string
  const [mimePart, dataPart] = base64Data.split(',');
  const mimeType = mimePart.split(':')[1]?.split(';')[0] || 'application/octet-stream'; // Extract the MIME type, e.g., 'image/png'

  const fileName = defaultFileName;

  // Decode the base64 string to binary data
  const binaryString = atob(dataPart);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a blob from the binary data
  const blob = new Blob([bytes], { type: mimeType });

  // Create a download link and trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName; // Use the constructed file name with extension

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const downloadJSON = (jsonData) => {
  // Convert JSON data to string
  const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print JSON with 2 spaces

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: 'text/csv' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an <a> element to simulate download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.csv'; // Filename for the download
  document.body.appendChild(link);

  // Programmatically trigger a click on the link to start download
  link.click();

  // Clean up and remove the link
  document.body.removeChild(link);
};

export const downloadExcel = (jsonData) => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};

export const download = async (filename, filemodule) => {
  if (filename) {
    const url = api.filedownload().url
    const method = api.filedownload().method
    const requestBody = {
      filename: filename,
      filemodule: filemodule ? filemodule : 'Json'
    };
    const response = await axios[method](url, requestBody, {
      responseType: 'blob',
    })
    const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
    const downloadUrl = window.URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', requestBody.filename);
    document.body.appendChild(link);
    link.click()
  } else {
  }
}

export const digitalTabSelect = (value) => {
  switch (value) {
    case '101':
      return 0;
    case '102':
      return 1;
    case '103':
      return 2;
    default:
      return 0;
  }
}


export const formatPrice = (v) => {
  if (v === null || v === undefined || v === '') return "0"

  return Number(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export const alphaRegex = /^[A-Za-z ]*$/
export const alphaCapsRegex = /^[A-Z ]*$/
export const numberRegex = /^\d*$/
export const emailRegex = /^[a-zA-Z0-9@._+-]*$/
export const idRegex = /^[\d-]*$/
export const decimalRegex = /^[\d.]*$/
export const phoneRegex = /^[\d+]*$/
export const alphanumericRegex = /^[a-zA-Z0-9 ]*$/
export const alphaCapsnumericRegex = /^[A-Z0-9 ]*$/
export const alphaSpecialCharRegex = /^[a-zA-Z!@#$%^&*(),.?":{}|<>]+$/
export const capsAlphaNumericDash = /^[A-Z0-9-]*$/
export const numberWithForwardSlashAndPointRegex = /^[0-9/.]*$/
export const numberWithPointRegex = /^[0-9.]*$/
export const alphanumericWithPointRegex = /^[a-zA-Z0-9.]*$/
export const numberWithHifenRegex = /^[0-9-]*$/
export const twoDigitsAfterDecimal = /^(\d+(\.\d{0,2})?)?$/
export const locationRegex = /^\d*\.?\d*$/
export const ibanRegex = /^PK\d{2}[A-Z]{4}[0-9A-Z]{16}$/