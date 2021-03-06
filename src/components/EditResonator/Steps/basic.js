import React, {Component} from 'react';
import {Field} from 'redux-form';
import TextField from '../../FormComponents/TextField';
import StepBase from './stepBase';

class EditResonatorBasic extends Component {
    render() {
        return (
            <div>
                <Field name='title'
                    placeholder='Title'
                    type='text'
                    multiLine
                    component={TextField} />

                <Field name='description'
                    placeholder='Description'
                    type='text'
                    multiLine
                    component={TextField} />

                <Field name='link'
                    placeholder='Link'
                    type='text'
                    multiLine
                    component={TextField} />
            </div>
        );
    }
}

export default StepBase({
    noBack: true,
    validate(formData) {
        let errors = {};

        if (!formData.title)
            errors.title = 'Required';

        if (!formData.description)
            errors.description = 'Required';

        return errors;
    }
})(EditResonatorBasic);
