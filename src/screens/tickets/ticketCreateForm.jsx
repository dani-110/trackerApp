import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { LookupsTypes, setDataObject } from "../../utils/Utils";
import TextAreaFields from "../../components/textAreaFields";
import { createTickets } from "../../store/actions/tickets";
import { TicketPlus } from "lucide-react";
import { lookups, ticketsLookups } from "../../store/actions/lookups";
import SelectFields from "../../components/SelectFields";
import DatePickerFields from "../../components/datePickerField";
import DateTimePickerFields from "../../components/dateTimePickerField";
import moment from "moment";

const TicketCreateForm = (props) => {
  const { setOpen, fetchList, type } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsAfterLoading, setTicketsAfterLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [environments, setEnvironments] = useState([])
  const [moduleComponents, setModuleComponents] = useState([])
  const [categories, setCategories] = useState([])
  const [priorities, setPriorities] = useState([])
  const [severities, setSeverities] = useState([])

  const defaultValues = useForm({
    defaultValues: {
      senderEmail: "tracker.demo@qubits.local",
      emailSubject: "",
      emailBody: "",
      supportCcEmail: "",
      productProjectId: "",
      environmentId: "",
      moduleComponentId: "",
      categoryId: "",
      priorityId: "",
      severityId: "",
      dueAt: "",
      stepsToReproduce: "",
      expectedResult: "",
      actualResult: "",
      businessImpact: "",
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

  useEffect(() => {
    if (type == 'Create') {
      fetchAllLookups()
    }
  }, [])

  const fetchAllLookups = () => {
    setTicketsLoading(true);

    Promise.all([
      dispatch(ticketsLookups({ name: LookupsTypes.products })),
      dispatch(ticketsLookups({ name: LookupsTypes.categories })),
      dispatch(ticketsLookups({ name: LookupsTypes.priorities })),
      dispatch(ticketsLookups({ name: LookupsTypes.severities })),
    ])
      .then(([productRes, catRes, priRes, sevRes]) => {
        if (productRes.payload?.status == '200') {
          setProducts(productRes.payload?.data);
        }
        if (catRes.payload?.status == '200') {
          setCategories(catRes.payload?.data);
        }
        if (priRes.payload?.status == '200') {
          setPriorities(priRes.payload?.data);
        }
        if (sevRes.payload?.status == '200') {
          setSeverities(sevRes.payload?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching lookups:", error);
      })
      .finally(() => {
        setTicketsLoading(false);
      });
  };

  useEffect(() => {
    if (watch('productProjectId')) {
      fetchAfterProductLookups()
    }
  }, [watch('productProjectId')])

  const fetchAfterProductLookups = () => {
    setTicketsAfterLoading(true);

    Promise.all([
      dispatch(ticketsLookups({
        name: LookupsTypes.environments, obj: {
          productProjectId: watch('productProjectId')
        }
      })),
      dispatch(ticketsLookups({
        name: LookupsTypes.moduleComponents, obj: {
          productProjectId: watch('productProjectId')
        }
      })),
    ])
      .then(([envRes, modRes,]) => {
        if (envRes.payload?.status == '200') {
          setEnvironments(envRes.payload?.data);
        }
        if (modRes.payload?.status == '200') {
          setModuleComponents(modRes.payload?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching lookups:", error);
      })
      .finally(() => {
        setTicketsAfterLoading(false);
      });
  };

  const submit = () => {
    setIsLoading(true);
    let obj = getValues();
    const formattedDate = watch('dueAt') ? moment(watch('dueAt')).toISOString() : '';
    obj['dueAt'] = formattedDate
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
      {ticketsLoading ?
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="secondary" size={40} />
        </Box>
        : <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputFields
              fieldName="senderEmail"
              type="text"
              label="Sender Email"
              placeholder="e.g user@example.com"
              control={control}
              disabled
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

          {type == 'Create' && <>
            <Grid item xs={12}>
              <SelectFields
                fieldName="productProjectId"
                label="Product"
                control={control}
                options={products.map(({ name, id }) => {
                  return { label: name, value: id };
                })}
              />
            </Grid>
            {ticketsAfterLoading ?
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress color="secondary" size={40} />
              </Box> : <>
                {watch('productProjectId') && <Grid item xs={12}>
                  <SelectFields
                    fieldName="environmentId"
                    label="Environment"
                    control={control}
                    options={environments.map(({ name, id }) => {
                      return { label: name, value: id };
                    })}
                  />
                </Grid>}
                {watch('productProjectId') && <Grid item xs={12}>
                  <SelectFields
                    fieldName="moduleComponentId"
                    label="Module Component"
                    control={control}
                    options={moduleComponents.map(({ name, id }) => {
                      return { label: name, value: id };
                    })}
                  />
                </Grid>}
              </>}
            <Grid item xs={12}>
              <SelectFields
                fieldName="categoryId"
                label="Category"
                control={control}
                options={categories.map(({ name, id }) => {
                  return { label: name, value: id };
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectFields
                fieldName="priorityId"
                label="Priority"
                control={control}
                options={priorities.map(({ name, id }) => {
                  return { label: name, value: id };
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectFields
                fieldName="severityId"
                label="Severity"
                control={control}
                options={severities.map(({ name, id }) => {
                  return { label: name, value: id };
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePickerFields
                fieldName="dueAt"
                type="text"
                label="Due At"
                placeholder="e.g Due At"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="stepsToReproduce"
                type="text"
                label="Steps To Reproduce"
                placeholder="e.g Steps To Reproduce"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="expectedResult"
                type="text"
                label="Expected Result"
                placeholder="e.g Expected Result"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="actualResult"
                type="text"
                label="Actual Result"
                placeholder="e.g Actual Result"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="businessImpact"
                type="text"
                label="Business Impact"
                placeholder="e.g Business Impact"
                control={control}
              />
            </Grid>
          </>}
          <Grid item xs={12}>
            <ButtonContainer>
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
                <TicketPlus size={16} style={{ marginRight: 8 }} />
                Generate Ticket
              </Button>
            </ButtonContainer>
          </Grid>
        </Grid>}
    </form>
  );
};

export default TicketCreateForm;
