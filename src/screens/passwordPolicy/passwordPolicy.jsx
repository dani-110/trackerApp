import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Check, KeyRound, ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";
import PageHeader from "../../components/pageHeader/pageHeader";
import InputFields from "../../components/InputFields";
import TextAreaFields from "../../components/textAreaFields";
import ButtonContainer from "../../components/buttonContainer";
import ToggleButton from "../../components/toggleButton/toggleButton";
import {
  getPasswordPolicy,
  updatePasswordPolicy,
} from "../../store/actions/passwordPolicy";
import "./passwordPolicy.scss";

const COMPLEXITY_FIELDS = [
  { fieldName: "requireUppercase", label: "Uppercase letters", hint: "At least one A-Z" },
  { fieldName: "requireLowercase", label: "Lowercase letters", hint: "At least one a-z" },
  { fieldName: "requireDigit", label: "Numbers", hint: "At least one 0-9" },
  { fieldName: "requireSpecialChar", label: "Special characters", hint: "At least one symbol" },
];

const getFormValues = (policy = {}) => ({
  minLength: policy.minLength ?? "",
  maxUtf8Bytes: policy.maxUtf8Bytes ?? "",
  ...Object.fromEntries(
    COMPLEXITY_FIELDS.map(({ fieldName }) => [
      fieldName,
      Boolean(policy[fieldName]),
    ]),
  ),
  changeReason: "",
});

const PasswordPolicy = () => {
  const dispatch = useDispatch();
  const [activePolicy, setActivePolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: getFormValues(),
  });

  const minLength = watch("minLength");
  const maxUtf8Bytes = watch("maxUtf8Bytes");

  const fetchPolicy = () => {
    setIsLoading(true);

    dispatch(getPasswordPolicy()).then((res) => {
      if (res?.payload?.status == 200) {
        const policy = res.payload.data.policy;
        setActivePolicy(policy);
        reset(getFormValues(policy));
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchPolicy();
    // Load the policy once when this screen opens.
  }, []);

  const formatDate = (value) => {
    return value && moment(value).isValid()
      ? moment(value).format("MMM D, YYYY [at] h:mm A")
      : "—";
  };

  const enabledComplexityRules = activePolicy
    ? COMPLEXITY_FIELDS.filter(({ fieldName }) => activePolicy[fieldName]).map(
        ({ label }) => label,
      )
    : [];

  const activePolicyItems = activePolicy
    ? [
        ["Minimum length", `${activePolicy.minLength} characters`],
        ["Maximum length", `${activePolicy.maxUtf8Bytes} UTF-8 bytes`],
        ["Status", activePolicy.isActive ? "Active" : "Inactive"],
        ["Version", `v${activePolicy.versionNo}`],
        ["Last updated", formatDate(activePolicy.updatedAt)],
        [
          "Required complexity",
          enabledComplexityRules.length
            ? enabledComplexityRules.join(", ")
            : "None",
        ],
      ]
    : [];

  const savePolicy = (values) => {
    const request = {
      minLength: Number(values.minLength),
      maxUtf8Bytes: Number(values.maxUtf8Bytes),
      ...Object.fromEntries(
        COMPLEXITY_FIELDS.map(({ fieldName }) => [fieldName, values[fieldName]]),
      ),
      expectedVersion: activePolicy.versionNo,
      changeReason: values.changeReason.trim(),
    };

    setIsSaving(true);

    dispatch(updatePasswordPolicy(request)).then((res) => {
      if (res?.payload?.status == 200) fetchPolicy();
      setIsSaving(false);
    });
  };

  return (
    <Box className="screenPage passwordPolicyPage">
      <PageHeader
        eyebrow="ADMINISTRATION / SECURITY"
        title="Password policy"
        description="Manage password requirements and keep credential rules consistent."
      />

      {isLoading ? (
        <Box className="passwordPolicyLoading">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="passwordPolicyLayout">
          <Box className="passwordPolicyMainColumn">
          <form onSubmit={handleSubmit(savePolicy)}>
            <Paper
              variant="outlined"
              className="passwordPolicyCard passwordPolicyLengthCard"
            >
              <Box className="passwordPolicyCardHeading">
                <Typography className="passwordPolicySectionTitle">
                  Password length
                </Typography>
                <KeyRound className="passwordPolicyHeadingIcon" size={21} />
              </Box>
              <Typography className="passwordPolicyDescription">
                Set the minimum number of characters and maximum UTF-8 encoded
                byte length.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputFields
                    fieldName="minLength"
                    type="number"
                    label="Minimum characters"
                    control={control}
                    error={errors.minLength}
                    inputProps={{ min: 1 }}
                    rules={{
                      required: "Minimum length is required",
                      min: {
                        value: 1,
                        message: "Minimum length must be at least 1",
                      },
                      validate: (value) =>
                        Number(value) <= Number(maxUtf8Bytes) ||
                        "Minimum length cannot exceed maximum bytes",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputFields
                    fieldName="maxUtf8Bytes"
                    type="number"
                    label="Maximum UTF-8 bytes"
                    control={control}
                    error={errors.maxUtf8Bytes}
                    inputProps={{ min: 1, max: 72 }}
                    rules={{
                      required: "Maximum UTF-8 bytes is required",
                      min: {
                        value: 1,
                        message: "Maximum must be at least 1 byte",
                      },
                      max: {
                        value: 72,
                        message: "Maximum is 72 bytes for bcrypt",
                      },
                      validate: (value) =>
                        Number(minLength) <= Number(value) ||
                        "Maximum bytes cannot be less than minimum length",
                    }}
                  />
                </Grid>
              </Grid>

            </Paper>

            <Paper
              variant="outlined"
              className="passwordPolicyCard passwordPolicyComplexityCard"
            >
              <Box className="passwordPolicyCardHeading">
                <Typography className="passwordPolicySectionTitle">
                  Complexity requirements
                </Typography>
                <ShieldCheck className="passwordPolicyHeadingIcon" size={21} />
              </Box>
              <Typography className="passwordPolicyDescription">
          Enable only the character types your organization requires.
              </Typography>

              {COMPLEXITY_FIELDS.map((item) => (
                <ToggleButton
                  key={item.fieldName}
                  fieldName={item.fieldName}
                  lable={item.label}
                  description={item.hint}
                  control={control}
                  icon={<Check size={16} />}
                />
              ))}
            </Paper>

            <Paper
              variant="outlined"
              className="passwordPolicyCard passwordPolicyReasonCard"
            >
              <Typography className="passwordPolicySectionTitle">
                Change reason
              </Typography>
              <Typography className="passwordPolicyDescription">
                Explain why this password policy is being changed.
              </Typography>

              <TextAreaFields
                fieldName="changeReason"
                label="Reason for change"
                control={control}
                error={errors.changeReason}
                rows={3}
                rules={{
                  required: "A change reason is required",
                  validate: (value) => {
                    const reason = value?.trim() || "";
                    if (reason.length < 3) {
                      return "Enter at least 3 non-space characters";
                    }
                    if (reason.length > 500) {
                      return "The reason cannot exceed 500 characters";
                    }
                    return true;
                  },
                }}
              />
            </Paper>

            <ButtonContainer>
              <Button
                type="button"
                variant="outlined"
                disabled={!isDirty || isSaving || !activePolicy}
                onClick={() => {
                  reset(getFormValues(activePolicy));
                }}
              >
                Discard changes
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={!isDirty || isSaving || !activePolicy}
              >
                {isSaving ? "Saving..." : "Save policy"}
              </Button>
            </ButtonContainer>
          </form>
          </Box>

          {activePolicy && (
            <Paper
              variant="outlined"
              className="passwordPolicyCard passwordPolicyActiveCard"
            >
               
              <Box className="passwordPolicyCardHeading">
                <Typography className="passwordPolicySectionTitle">
                  Active configuration
                </Typography>
                <ShieldCheck className="passwordPolicyHeadingIcon" size={20} />
              </Box>

              <Box className="passwordPolicySummaryList">
                {activePolicyItems.map(([label, value]) => (
                  <Box className="passwordPolicySummaryItem" key={label}>
                    <Typography className="passwordPolicySummaryLabel">
                      {label}
                    </Typography>
                    <Typography className="passwordPolicySummaryValue">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PasswordPolicy;
