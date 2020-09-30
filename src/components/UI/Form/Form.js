import React, {Component, Fragment} from 'react';
import styles from "./Form.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

class Form extends Component {
    constructor(props, config) {
        super(props);
        this.state = this.buildState(config);
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

    isFormValid = (updatedFormDetails) => {
        let isValid = true;
        for (const key in updatedFormDetails) {
            isValid = isValid && updatedFormDetails[key].config.valid && updatedFormDetails[key].touched;
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

    generateForm = () => {
        let inputs = [];
        for (const key in this.state.formDetails) {
            let inputElement = (
                <Input {...this.state.formDetails[key].config}
                       onChange={(event) => this.onChangeHandler(event, key)}
                       value={this.state.formDetails[key].value} key={key}/>
            )
            inputs.push(inputElement);
        }
        return inputs;
    }
    submitHandler = async (event) => {
        return null
    }

    render() {
        let generatedForm = this.generateForm();
        let content = (
            <form className={styles.formContainer} onSubmit={this.submitHandler}>
                <h2>Enter your details:</h2>
                {generatedForm}
                <Button type={'ok'} text={'Login'} disabled={!this.state.isFormValid}/>
            </form>
        )
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }
}

export default Form;