import {
  CHALLANGE_API,
  AMOUNT_OPTION,
  MEMBERSHIP_FEE,
  RENT_AMOUNT,
  RENT_ERROR,
  RENT_VALIDATION,
  VALIDATION_MESSAGE_RENT,
  POST_CODE,
  POSTCODE_ERROR,
  POSTCODE_VALIDATION,
  VALIDATION_MESSAGE_POSTCODE,
  CREATED_POST
} from "../actions/actions";

export default (
  state = {
    amountOption: "Weekly",
    minimumRentWeekly: 25,
    maximumRentWeekly: 2000,
    minimumRentMonthly: 110,
    maximumRentMonthly: 8660,
    rentAmountValidation: "correct-input",
    postcodeValidation: "correct-input",
    errorMessageRent: "",
    errorMessagePostcode: "",
    isRentValid: false,
    isPostcodeValid: false,
    rentAmount: 0,
    postcode: "",
    createdPost: ""
  },
  action
) => {
  switch (action.type) {
    case CHALLANGE_API: {
      return {
        ...state,
        challangeAPIData: action.data
      };
    }

    case AMOUNT_OPTION: {
      return {
        ...state,
        amountOption: action.amountOption
      };
    }

    case MEMBERSHIP_FEE: {
      return {
        ...state,
        membershipFee: action.membershipFee
      };
    }

    case RENT_AMOUNT: {
      return {
        ...state,
        rentAmount: action.rentAmount
      };
    }

    case RENT_ERROR: {
      return {
        ...state,
        errorMessageRent: action.errorMessageRent
      };
    }

    case RENT_VALIDATION: {
      return {
        ...state,
        isRentValid: action.isRentValid
      };
    }

    case VALIDATION_MESSAGE_RENT: {
      return {
        ...state,
        rentAmountValidation: action.rentAmountValidation
      };
    }

    case POST_CODE: {
      return {
        ...state,
        postcode: action.postcode
      };
    }

    case POSTCODE_ERROR: {
      return {
        ...state,
        errorMessagePostcode: action.errorMessagePostcode
      };
    }

    case POSTCODE_VALIDATION: {
      return {
        ...state,
        postcodeValidation: action.postcodeValidation
      };
    }

    case VALIDATION_MESSAGE_POSTCODE: {
      return {
        ...state,
        isPostcodeValid: action.isPostcodeValid
      };
    }

    case CREATED_POST: {
      return {
        ...state,
        createdPost: action.createdPost
      };
    }

    default:
      return state;
  }
};
