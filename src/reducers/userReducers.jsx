import {
    CLEAR_ERRORS,
    
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET
    

} from "../constants/userConstants";



export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success, // Assuming action.payload contains success field
                message: action.payload.message, // Assuming action.payload contains message field
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                success: false, // Ensure success is reset if applicable
            }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case REGISTER_USER_RESET:
            return {
                ...state,
                success: false,
                message: null // Reset message after registration reset if needed
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case UPDATE_USER_SUCCESS:
      return {
        ...state,

        loading: false,

        isUpdated: action.payload,
      };
      case UPDATE_USER_RESET:
        return {
          ...state,
  
          isUpdated: false,
        };
        default:
            return state;
    }
}


export const verifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case VERIFY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isVerified: action.payload, // Assuming payload contains the verification result
            };
        case VERIFY_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}