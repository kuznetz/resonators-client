import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../../actions/resonatorCreationActions';
import {Field} from 'redux-form';
import TimePicker from 'material-ui/TimePicker';
import BackButton from './backButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import CheckboxField from '../../FormComponents/CheckboxField';
import StepBase from './stepBase';
import moment from 'moment';
import './schedule.scss';

class EditResonatorSchedule extends Component {
    constructor() {
        super();

        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSelectTime = this.handleSelectTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.resonatorCreated && nextProps.resonatorCreated)
            this.props.onNext();
    }

    handleCreate(formData) {
        this.props.updateCreationStep(formData);
        this.props.createResonator();
    }

    handleUpdate(formData) {
        this.props.updateCreationStep(formData);
        this.props.onNext();
    }

    handleSelectTime(dateTime, changeField) {
        const now = moment();

        //So the server won't immediately send it
        if (dateTime < now)
            dateTime = moment(dateTime).clone().add(1, 'd').toDate();

        changeField(dateTime);
    }

    renderDays() {
        return [0,1,2,3,4,5,6].map(i => (
            <Field
                key={i}
                className='day'
                name={`day${i}`}
                component={CheckboxField}
                style={{width: 'initial'}}
                label={moment().startOf('w').add(i, 'd').format('dddd')}
                iconStyle={{marginRight: 1}}
            />
        ));
    }

    renderDivider() {
        return (
            <Divider style={{marginTop: 20, marginBottom: 20}}/>
        );
    }

    render() {
        return (
            <div className='edit-resonator-schedule row'>
                <div className='col-sm-12'>
                    <div className='subheader'>
                        Days active:
                    </div>
                    <div className='days'>
                        {this.renderDays()}
                    </div>
                    {this.renderDivider()}
                    <Field
                        name='time'
                        label='Sending time'
                        component={
                            ({input: {value, onChange}, meta: {touched, error}}) =>
                            <TimePicker
                                autoOk={true}
                                hintText='Sending Time'
                                onChange={(e, date) => this.handleSelectTime(date, onChange)}
                                value={value}
                                errorText={touched && error}
                            />
                            }
                        />
                        {!this.props.editMode &&
                        <div className='navButton'>
                            <BackButton onTouchTap={this.props.onBack} />
                            {<RaisedButton
                                primary
                                label='Next'
                                onTouchTap={
                                    this.props.handleSubmit(
                                        this.props.resonatorCreated ?
                                            this.handleUpdate :
                                            this.handleCreate
                                    )
                                }
                            />}
                        </div>}
                    </div>
                </div>
        );
    }
}

EditResonatorSchedule = StepBase({
    noNext: true,
    noBack: true,
    validate(formData) {
        let errors = {};

        if (!formData.time)
            errors.time = 'Required';

        return errors;
    }
})(EditResonatorSchedule);

EditResonatorSchedule = connect(state => ({
    resonatorCreated: state.resonatorCreation.resonator
}), dispatch => bindActionCreators({
    createResonator: actions.create,
    updateCreationStep: actions.updateCreationStep
}, dispatch))(EditResonatorSchedule);

export default EditResonatorSchedule;
