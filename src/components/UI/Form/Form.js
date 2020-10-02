import React, {Component} from 'react';
import Input from "../Input/Input";

class Form extends Component {
    constructor(props, config) {
        super(props);
        this.state = this.buildState(config);
        this.state.disabledFields = [];
    }

    buildState(config) {
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

    disableField(field) {
        let newDisabledFields = this.state.disabledFields.concat([field]);
        this.setState({disabledFields: newDisabledFields});
    }

    enableField(field) {
        let newDisabledFields = this.state.disabledFields.filter(item => item !== field);
        this.setState({disabledFields: newDisabledFields});
    }

    isFormValid = (updatedFormDetails) => {
        let isValid = true;
        for (const key in updatedFormDetails) {
            if (!this.state.disabledFields.includes(key)) {
                isValid = isValid && updatedFormDetails[key].config.valid && updatedFormDetails[key].touched;
            }
        }
        return isValid;
    }

    onChangeHandler(event, key) {
        let updatedFormDetails = {...this.state.formDetails};
        let keyToChange = {...this.state.formDetails[key]};
        keyToChange.value = event.target.value;
        keyToChange.config.valid = keyToChange.isValid(keyToChange.value);
        keyToChange.touched = true;
        updatedFormDetails[key] = keyToChange;
        let isFormValid = this.isFormValid(updatedFormDetails);
        this.setState({formDetails: updatedFormDetails, isFormValid: isFormValid});
    }

    clearInput(updatedFormDetails, key) {
        let keyToChange = {...this.state.formDetails[key]};
        keyToChange.value = '';
        keyToChange.config.valid = true;
        keyToChange.touched = false;
        updatedFormDetails[key] = keyToChange;
    }

    cleanForm() {
        /**
         * Quick workaround for cleaning the form
         */
        let updatedFormDetails = {...this.state.formDetails};
        for (const key in this.state.formDetails) {
            this.clearInput(updatedFormDetails, key);
        }
        this.setState({formDetails: updatedFormDetails});
    }

    generateForm() {
        let inputs = [];
        for (const key in this.state.formDetails) {
            if (!this.state.disabledFields.includes(key)) {
                let inputElement = (
                    <Input {...this.state.formDetails[key].config}
                           onChange={(event) => this.onChangeHandler(event, key)}
                           value={this.state.formDetails[key].value} key={key}/>
                )
                inputs.push(inputElement);
            }
        }
        return inputs;
    }

}

export default Form;