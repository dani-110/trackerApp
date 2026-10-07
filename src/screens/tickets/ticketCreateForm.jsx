import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { createUsers } from "../../store/actions/users";
import TextAreaFields from "../../components/textAreaFields";
import { createTickets } from "../../store/actions/tickets";
import { Plus } from "lucide-react";

const TicketCreateForm = (props) => {
  const { setOpen, fetchList } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = useForm({
    defaultValues: {
      senderEmail: "",
      emailSubject: "",
      emailBody: "",
      supportCcEmail: "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    setValue,
    resetField,
    getValues,
    formState: { errors },
  } = defaultValues;

  const submit = () => {
    setIsLoading(true);
    let obj = setDataObject(getValues());
    console.log(obj);
    dispatch(createTickets(obj)).then((res) => {
      console.log(res);
      if (res.payload.status == "201") {
        setOpen(false);
        fetchList({});
      }
      setIsLoading(false);
    });
  };

  return (
    <form style={{ padding: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFields
            fieldName="senderEmail"
            type="text"
            label="Sender Email"
            placeholder="e.g user@example.com"
            control={control}
            rules={{
              required: "Sender Email is required",
            }}
            error={errors?.senderEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="emailSubject"
            type="text"
            label="Email Subject"
            placeholder="e.g. Issue with login"
            control={control}
            rules={{
              required: "Email Subject is required",
            }}
            error={errors?.emailSubject}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFields
            fieldName="emailBody"
            type="text"
            placeholder="e.g. Please provide more details about your issue..."
            label="Email Body"
            control={control}
            rules={{
              required: "Email Body is required",
            }}
            error={errors?.emailBody}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="supportCcEmail"
            type="text"
            label="Support CC Email"
            placeholder="e.g support@example.com"
            control={control}
            rules={{
              required: "Support CC Email is required",
            }}
            error={errors?.supportCcEmail}
          />
        </Grid>
       <Grid item xs={12}>
          <ButtonContainer isSingle>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleSubmit(submit)}
            >
              {isLoading && (
                <CircularProgress
                  size={20}
                  sx={{ marginRight: 1, color: "#fff" }}
                />
              )}
              <Plus size={16} style={{ marginRight: 8 }} />
              Generate Ticket
            </Button>
          </ButtonContainer>
        </Grid>
      </Grid>
    </form>
  );
};

export default TicketCreateForm;
