export const CHALLANGE_API = "CHALLANGE_API";
export const AMOUNT_OPTION = "AMOUNT_OPTION";
export const MEMBERSHIP_FEE = "MEMBERSHIP_FEE";
export const RENT_AMOUNT = "RENT_AMOUNT";
export const RENT_ERROR = "RENT_ERROR";
export const RENT_VALIDATION = "RENT_VALIDATION";
export const VALIDATION_MESSAGE_RENT = "VALIDATION_MESSAGE_RENT";
export const POST_CODE = "POST_CODE";
export const POSTCODE_ERROR = "POSTCODE_ERROR";
export const POSTCODE_VALIDATION = "POSTCODE_VALIDATION";
export const VALIDATION_MESSAGE_POSTCODE = "VALIDATION_MESSAGE_POSTCODE";
export const CREATED_POST = "CREATED_POST";

export const addChallangeAPI = challangeAPIData => {
  return {
    data: challangeAPIData,
    type: CHALLANGE_API
  };
};

export const setAmountOption = amountOption => {
  return {
    amountOption,
    type: AMOUNT_OPTION
  };
};

export const setMembershipFee = membershipFee => {
  return {
    membershipFee,
    type: MEMBERSHIP_FEE
  };
};

export const setRentAmount = rentAmount => {
  return {
    rentAmount,
    type: RENT_AMOUNT
  };
};

export const setErrorMessageRent = errorMessageRent => {
  return {
    errorMessageRent,
    type: RENT_ERROR
  };
};

export const setIsRentValid = isRentValid => {
  return {
    isRentValid,
    type: RENT_VALIDATION
  };
};

export const setRentAmountValidation = rentAmountValidation => {
  return {
    rentAmountValidation,
    type: VALIDATION_MESSAGE_RENT
  };
};

export const setPostcode = postcode => {
  return {
    postcode,
    type: POST_CODE
  };
};

export const setErrorMessagePostcode = errorMessagePostcode => {
  return {
    errorMessagePostcode,
    type: POSTCODE_ERROR
  };
};

export const setPostcodeValidation = postcodeValidation => {
  return {
    postcodeValidation,
    type: POSTCODE_VALIDATION
  };
};

export const setIsPostcodeValid = isPostcodeValid => {
  return {
    isPostcodeValid,
    type: VALIDATION_MESSAGE_POSTCODE
  };
};

export const setCreatedPost = createdPost => {
  return {
    createdPost,
    type: CREATED_POST
  };
};
