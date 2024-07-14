interface Beneficiary {
    firstName: string;
    lastName: string;
    iban: string;
}

interface State {
    list: Beneficiary[];
}

interface Action {
    type: string;
    payload: Beneficiary;
}

const initialState: State = {
    list: [],
};

const beneficiariesReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'ADD_BENEFICIARY':
            return {
                ...state,
                list: [...state.list, action.payload],
            };
        default:
            return state;
    }
};

export default beneficiariesReducer;
