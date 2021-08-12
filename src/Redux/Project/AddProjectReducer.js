import {
  CREATE_Project,
  RETRIEVE_ProjectS,
  UPDATE_Project,
  DELETE_Project,
  Add_Project_Feature,
  Delete_Project_Feature,
  UPDATE_Project_Feature,
  UPDATE_Feature_Status,
} from "./AddProjectActionsTypes";

const initialState = [];

const ProjectReducer = (Projects = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_Project:
      return [...Projects, payload];

    case RETRIEVE_ProjectS:
      return payload;

    case UPDATE_Project:
      return Projects.map((Project) => {
        if (Project.id === payload.id) {
          return {
            ...Project,
            ...payload,
          };
        } else {
          return Project;
        }
      });
    case Add_Project_Feature:
      return Projects.map((Project) => {
        if (Project.id === payload.id) {
          const feature = !Project.feature
            ? [].concat(payload.feature)
            : Project.feature.concat(payload.feature);
          return {
            ...Project,
            feature,
          };
        } else {
          return Project;
        }
      });
    case UPDATE_Feature_Status:
      return Projects.map((Project) => {
        if (Project.id === payload.id) {
          console.log("payload", payload);
          const index = Project.feature.findIndex(
            (item) => payload.feature.id === item.id
          );
          const newArray = [...Project.feature]; //making a new array
          newArray[index].complete = true;
          return {
            ...Project, //copying the orignal state
            feature: newArray, //reassingning todos to new array
          };
        } else {
          return Project;
        }
      });

    case UPDATE_Project_Feature:
      return Projects.map((Project) => {
        if (Project.id === payload.id) {
          console.log("payload", payload);
          const index = Project.feature.findIndex(
            (item) => payload.feature.id === item.id
          );
          const newArray = [...Project.feature]; //making a new array
          newArray[index].FeatureName = payload.feature.FeatureName;
          return {
            ...Project, //copying the orignal state
            feature: newArray, //reassingning todos to new array
          };
        } else {
          return Project;
        }
      });

    case DELETE_Project:
      return Projects.filter(({ id }) => id !== payload.id);
    case Delete_Project_Feature:
      return Projects.map((Project) => {
        if (Project.id === payload.id) {
          return {
            ...Project,
            feature: Project.feature.filter(
              (item) => payload.feature.id !== item.id
            ),
          };
        } else {
          return Project;
        }
      });

    default:
      return Projects;
  }
};

export default ProjectReducer;
