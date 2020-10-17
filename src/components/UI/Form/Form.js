import React, {useCallback, useMemo, useState} from 'react';
import Input from "../Input/Input";

const buildState = (config) => {
    console.log("Build State for useForm")
    return Object.keys(config).reduce((state, inputKey) => {
        state.formDetails[inputKey] = {
            value: '',
        }
        state.formDetails[inputKey].config = {
            name: config[inputKey].name,
            label: config[inputKey].label,
            placeholder: config[inputKey].placeholder,
            type: config[inputKey].type,
            valid: true,
            inputType: 'input'
        };
        if (config[inputKey].inputType) {
            state.formDetails[inputKey].config.inputType = config[inputKey].inputType;
        }
        state.formDetails[inputKey].isValid = config[inputKey].isValid;
        state.formDetails[inputKey].touched = false;
        if (Array.isArray(config[inputKey].options) && config[inputKey].options.length > 0) {
            state.formDetails[inputKey].value = config[inputKey].options[0];
            state.formDetails[inputKey].config.options = config[inputKey].options;
            state.formDetails[inputKey].touched = true;
        }
        return state;
    }, {formDetails: {}, isFormValid: false});
}

const useForm = (config) => {
    const builtState = useMemo(() => buildState(config), [])
    const [state, setState] = useState(builtState);
    const [disabledFields, setDisabledFields] = useState([]);

    const disableField = (field) => {
        let newDisabledFields = disabledFields.concat([field]);
        setDisabledFields(newDisabledFields);
    }

    const enableField = (field) => {
        let newDisabledFields = disabledFields.filter(item => item !== field);
        setDisabledFields(newDisabledFields);
    }

    const isFormValid = (updatedFormDetails) => {
        let isValid = true;
        for (const key in updatedFormDetails) {
            if (!disabledFields.includes(key)) {
                isValid = isValid && updatedFormDetails[key].config.valid && updatedFormDetails[key].touched;
            }
        }
        return isValid;
    }

    const onChangeHandler = (event, key) => {
        let updatedFormDetails = {...state.formDetails};
        let keyToChange = {...state.formDetails[key]};
        keyToChange.value = event.target.value;
        keyToChange.config.valid = keyToChange.isValid(keyToChange.value);
        keyToChange.touched = true;
        updatedFormDetails[key] = keyToChange;
        let isFormValidNew = isFormValid(updatedFormDetails);
        setState(oldState => ({...oldState, formDetails: updatedFormDetails, isFormValid: isFormValidNew}));
    }

    const clearInput = (updatedFormDetails, key) => {
        let keyToChange = {...state.formDetails[key]};
        keyToChange.value = '';
        keyToChange.config.valid = true;
        keyToChange.touched = false;
        updatedFormDetails[key] = keyToChange;
    }

    const cleanForm = useCallback(() => {
        /**
         * Quick workaround for cleaning the form
         */
        let updatedFormDetails = {...state.formDetails};
        for (const key in state.formDetails) {
            clearInput(updatedFormDetails, key);
        }
        setState(oldState => ({...oldState, formDetails: updatedFormDetails}));
    }, [])

    const generateForm = () => {
        let inputs = [];
        for (const key in state.formDetails) {
            if (!disabledFields.includes(key)) {
                let inputElement = (
                    <Input {...state.formDetails[key].config}
                           onChange={(event) => onChangeHandler(event, key)}
                           value={state.formDetails[key].value} key={key}/>
                )
                inputs.push(inputElement);
            }
        }
        return inputs;
    }
    const JSXForm = useMemo(() => generateForm(), [disabledFields, state])
    return {
        state: state,
        disableField: disableField,
        enableField: enableField,
        JSXForm: JSXForm,
        cleanForm: cleanForm
    }
}

export default useForm;