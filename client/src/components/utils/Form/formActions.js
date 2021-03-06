// import React, { Component } from "react";

export const validate = (element, formdata = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "ຕ້ອງເປັນທີ່ຢູ່ອີເມລທີ່ຖືກຕ້ອງ" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? "ລະຫັດບໍ່ກົງກັນກະລຸນາກວດສອບຄືນ!" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "ຊ່ອງນີ້ວ່າງບໍ່ໄດ້" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };

  // select the element that we want to update
  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;

  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    if (key !== "confirmPassword") {
    if ((formdata[key].value.trim() !== "") && (formdata[key].value.trim() !== []) && (formdata[key].value.trim() !== {})) {
        dataToSubmit[key] = formdata[key].value.trim();
      }
      
    }
  }

  return dataToSubmit;
};

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;

  for (let key in formdata) {
    formIsValid = formdata[key].valid && formIsValid;
    if (key === "gender") {
      formIsValid = true;
    }
  }

  return formIsValid;
};

export const populateOptionFields = (formdata, arrayData = [], field) => {
  if (arrayData) {
    const newArray = [];
    const newFormdata = { ...formdata };

    if (field === "country") {
      arrayData.forEach(item => {
        newArray.push({ key: item._id, value: item.laoName });
      });
    } else if (field === "year") {
      arrayData.forEach(item => {
        newArray.push({ key: item, value: item });
      });
    } else {
      arrayData.forEach(item => {
        newArray.push({ key: item._id, value: item.name });
      });
    }

    

    newFormdata[field].config.options = newArray;

    return newFormdata;
  }
};
