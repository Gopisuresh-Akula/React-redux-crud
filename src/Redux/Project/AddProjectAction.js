import {
  CREATE_Project,
  UPDATE_Project,
  DELETE_Project,
  Add_Project_Feature,
  UPDATE_Project_Feature,
  Delete_Project_Feature,
  UPDATE_Feature_Status
} from "./AddProjectActionsTypes.js";

export const AddProjectAction = (data) => {
  return {
    type: CREATE_Project,
    payload: data,
  };
};
export const updateprojectAction = (data) => {
  return {
    type: UPDATE_Project,
    payload: data,
  };
};
export const DeleteprojectAction = (data) => {
  return {
    type: DELETE_Project,
    payload: data,
  };
};
export const AddproFeaturesAction = (data) => {
  return {
    type: Add_Project_Feature,
    payload: data,
  };
};

export const updateproFeatureAction = (data) => {
  return {
    type: UPDATE_Project_Feature,
    payload: data,
  };
  
};
export const DeleteproFeatureAction = (data) => {
    return {
      type: Delete_Project_Feature,
      payload: data,
    };
}

export const updateFeatureStatusAction = (data) => {
  return {
    type: UPDATE_Feature_Status,
    payload: data,
  };
  
};