import { actionTypes } from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  emp_id: "",
  nid: "",
  first_name: "",
  last_name: "",
  father_name: "",
  mother_name: "",
  gender: "",
  religion: "",
  dob: "",
  marital_status: "",
  blood_group: "",
  passport: "",
  isSpouse: 0,
  spouse_name: "",
  spouse_dob: "",
  isChildren: 0,
  phone_no: "",
  email: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  emergency_contact_relation: "",
  present_address: "",
  permanent_address: "",
  avatar: [],
  childs: [
    {
      id: uuidv4(),
      child_name: "",
      child_dob: "",
    },
  ],
  educations: [
    {
      id: uuidv4(),
      level_of_education: "",
      degree_name: "",
      major: "",
      institute: "",
      cgpa: "",
      passing_year: "",
      file: [],
    },
  ],
  trainings: [
    {
      id: uuidv4(),
      title: "",
      topics: "",
      country: "",
      institute: "",
      year: "",
      duration: "",
      location: "",
      file: [],
    },
  ],
  employment: {
    org_id: "",
    division_id: "",
    branch_id: "",
    department_id: "",
    designation_id: "",
    employee_type_id: "",
    official_phone: "",
    official_email: "",
    tin: "",
    confirmation_date: "",
    date_of_join: "",
    probation_start: "",
    probation_period: "",
    probation_remark: "",
    contract_start: "",
    contract_end: "",
    last_working_date: "",
    skills: [],
    objective: "",
  },
  documents: {
    resume: [],
    noc: [],
    tin: [],
    others: [],
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INPUT:
      if (action.payload.step) {
        return {
          ...state,
          [action.payload.step]: {
            ...state[action.payload.step],
            [action.payload.name]: action.payload.value,
          },
        };
      } else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
      break;

    case actionTypes.ADD_ACADEMIC:
      return {
        ...state,
        educations: [
          ...state.educations,
          {
            id: uuidv4(),
            level_of_education: "",
            degree_name: "",
            major: "",
            institute: "",
            cgpa: "",
            passing_year: "",
            file: [],
          },
        ],
      };
      break;

    case actionTypes.ADD_TRAINING:
      return {
        ...state,
        trainings: [
          ...state.trainings,
          {
            id: uuidv4(),
            title: "",
            topics: "",
            country: "",
            institute: "",
            year: "",
            duration: "",
            location: "",
            file: [],
          },
        ],
      };
      break;

    case actionTypes.ADD_CHILDREN:
      return {
        ...state,
        childs: [
          ...state.childs,
          {
            id: uuidv4(),
            child_name: "",
            child_dob: "",
          },
        ],
      };
      break;

    case actionTypes.REMOVE_ARRAY_INPUT:
      {
        const inputData = { ...state };
        const getStep = action.payload.step
          ? inputData[action.payload.step]
          : inputData;
        getStep[action.payload.name] = getStep[action.payload.name].filter(
          (value) => value.id !== action.payload.value
        );
        return inputData;
      }
      break;

    case actionTypes.ARRAY_INPUT:
      {
        const inputData = { ...state };
        inputData[action.payload.actionName].map((i) => {
          if (action.payload.id === i.id) {
            i[action.payload.name] = action.payload.value;
          }
        });
        return inputData;
      }
      break;

    case actionTypes.EDIT_FORM: {
      const newData = JSON.parse(JSON.stringify(action.payload));
      if (newData?.childs?.length === 0) {
        newData["childs"] = [
          {
            id: uuidv4(),
            child_name: "",
            child_dob: "",
          },
        ];
      }
      if (newData?.educations?.length === 0) {
        newData["educations"] = [
          {
            id: uuidv4(),
            level_of_education: "",
            degree_name: "",
            major: "",
            institute: "",
            cgpa: "",
            passing_year: "",
            file: [],
          },
        ];
      }
      if (newData?.trainings?.length === 0) {
        newData["trainings"] = [
          {
            id: uuidv4(),
            title: "",
            topics: "",
            country: "",
            institute: "",
            year: "",
            duration: "",
            location: "",
            file: [],
          },
        ];
      }
      return newData;
    }

    case actionTypes.BLANK_FORM: {
      return initialState;
    }

    default:
      return state;
  }
};
