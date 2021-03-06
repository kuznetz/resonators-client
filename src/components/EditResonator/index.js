import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {actions} from '../../actions/resonatorCreationActions';
import BasicStep from './Steps/basic';
import ScheduleStep from './Steps/schedule';
import ActivationStep from './Steps/activation';
import MediaStep from './Steps/media';
import CriteriaStep from './Steps/Criteria';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Stepper, StepLabel, StepContent, Step
} from 'material-ui/Stepper';
import './index.scss';

class EditResonator extends Component {
    static propTypes = {
        editMode: React.PropTypes.bool
    }

    static defaultProps = {
        editMode: true
    }

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            noCreationStep: props.resonator,
            maxCompletedStep: null
        };

        this.steps = [
            this.renderBasic.bind(this),
            this.renderSchedule.bind(this),
            this.renderMedia.bind(this),
            this.renderCriteria.bind(this),
            this.renderFinal.bind(this)
        ];

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.updateActiveStep = this.updateActiveStep.bind(this);
        this.handleFinalUpdate = this.handleFinalUpdate.bind(this);
    }

    componentDidMount() {
        const {followerId, resonatorId} = this.props.match.params;
        this.props.reset({followerId, resonatorId});
    }

    handleNext() {
        this.updateActiveStep(this.state.activeStep + 1);
    }

    handleBack() {
        this.updateActiveStep(this.state.activeStep - 1);
    }

    handleFinalUpdate() {
        this.props.updateFinal();
    }

    updateActiveStep(activeStep) {
        this.setState({
            activeStep,
            maxCompletedStep: Math.max(this.state.maxCompletedStep, activeStep - 1)
        })
    }

    renderBasic() {
        return {
            label: 'Basic',
            content: <BasicStep
                editMode={this.props.editMode}
                onNext={this.handleNext}
            />
        };
    }

    renderActivation() {
        return {
            label: 'Activation',
            content: <ActivationStep
                    editMode={this.props.editMode}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                />
        };
    }

    renderSchedule() {
        return {
            label: 'Schedule',
            content: <ScheduleStep
                editMode={this.props.editMode}
                onNext={this.handleNext}
                onBack={this.handleBack}
            />
        };
    }

    renderMedia() {
        return {
            label: 'Media',
            content: <MediaStep
                editMode={this.props.editMode}
                onNext={this.handleNext}
                onBack={this.handleBack}
            />
        };
    }

    renderCriteria() {
        return {
            label: 'Criteria',
            content: <CriteriaStep
                editMode={this.props.editMode}
                onNext={this.handleNext}
                onBack={this.handleBack}
            />
        };
    }

    renderFinal() {
        return {
            label: 'Final',
            content: <div className='finalUpdateStep'>
                        <ActivationStep/>
                        <RaisedButton
                            primary={true}
                            label='Submit'
                            onTouchTap={this.handleFinalUpdate} />
                        {this.props.showSpinnerFinalUpdate &&
                         <CircularProgress size={30} thickness={3}/>}
                     </div>
        };
    }

    renderStep(idx, {label, content}) {
        let activeProp = this.props.editMode ? {active: true} : null;

        return (
            <Step key={idx} completed={idx <= this.state.maxCompletedStep}>
                <StepLabel>
                    {label}
                </StepLabel>
                <StepContent {...activeProp}>
                    {content}
                </StepContent>
            </Step>
        );
    }

    render() {
        return (
            <div className='row edit-resonator'>
                <div className='col-xs-8 col-sm-8 col-sm-offset-2'>
                    <Subheader>
                        {this.props.editMode ? 'Edit Resonator' : 'Create Resonator'}
                    </Subheader>
                    <Stepper
                        linear={false}
                        activeStep={this.state.activeStep}
                        orientation='vertical'>
                        {this.steps.map((step, idx) => this.renderStep(idx, step()))}
                    </Stepper>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resonator: state.resonatorCreation.resonator,
        editMode: state.resonatorCreation.editMode,
        showSpinnerFinalUpdate: state.resonatorCreation.showSpinnerFinalUpdate
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateFinal: actions.updateFinal,
        reset: actions.reset,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditResonator);
