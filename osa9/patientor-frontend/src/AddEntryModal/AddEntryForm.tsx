import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, SelectField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Diagnosis, EntryType, HealhtCheckRating } from "../types";


export type EntryFormValues = {
  type: EntryType;
  description: string;
  date: string;
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>;
  healthCheckRating?: HealhtCheckRating;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  dischargeDate?: string;
  dischargeCriteria?: string;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions = [
  { value: EntryType.HealthCheck, label: "Health check"},
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare"},
  { value: EntryType.Hospital, label: "Hospital"}
];


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: HealhtCheckRating.Healthy,
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
        dischargeDate: '',
        dischargeCriteria: '',
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type === EntryType.HealthCheck && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {({ values, setFieldValue, setFieldTouched, dirty, isValid, handleSubmit }) => {
        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <SelectField 
              label="Type"
              name="type"
              options={entryTypeOptions}
            /> 
            <Field 
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field 
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field 
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.HealthCheck &&
              <Field
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {values.type === EntryType.OccupationalHealthcare &&
              <>
                <Field
                  label="Employer"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </>
            }
            {values.type === EntryType.Hospital &&
              <>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};


export default AddEntryForm;