import queryString from "query-string";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "../common/forms/datepicker";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";

const initialFormValues = {
  card_number: "",
  edition_date: null,
};

export default function NewConsumption() {
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const qs = queryString.parse(search);

  useEffect(() => {
    qs.cardNumber && setCardNumber(qs.cardNumber);
    qs.error && setError(qs.error);
  }, []);

  const validationSchema = Yup.object().shape({
    card_number: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "El valor debe ser numérico")
      .min(16, "El número debe contener 16 dígitos")
      .max(16, "El número debe contener 16 dígitos"),
    edition_date: Yup.date().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    //ToDo
    alert(JSON.stringify(values));
  };

  return (
    <>
      <h3> NewConsumption component. Acceso privado</h3>
      {error && (
        <p>
          Ha ocurrido un error con el lector de tarjetas. Introduce el código
          manualmente.
        </p>
      )}
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldValue, isSubmitting, values, isValid }) => (
          <Box
            component={Form}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100" },
            }}
            autoComplete="off"
          >
            <Field
              as={TextField}
              label="Número de tarjeta"
              type="text"
              name="card_number"
              onChange={handleChange}
              value={cardNumber || values.card_number}
              disabled={cardNumber ? true : false}
              fullWidth
              autoComplete="off"
              size="small"
            />
            <ErrorMessage name="card_number" component="div" />
            <DatePicker
              label="Fecha de edición"
              setFieldValue={setFieldValue}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Continuar
            </Button>
          </Box>
        )}
      </Formik>
    </>
  );
}