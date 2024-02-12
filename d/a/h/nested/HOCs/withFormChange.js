import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

const withFormChange = (WrappedComponent, queryKey, queryFn) => {
  return (props) => {
    const [form, setForm] = useState();
    const [changedFields, setChangedFields] = useState({});
    const [saved, setSaved] = useState(false);

    const { isLoading, isSuccess, isError } = useQuery({
      queryKey,
      queryFn,
      onSettled: (res) => {
        if (res) {
          setForm(res);
        }
      },
    });

    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
      setChangedFields((prevChangedFields) => ({
        ...prevChangedFields,
        [name]: true,
      }));
      setSaved(false);
    };

    const handleFormSave = () => {
      const isValid = Object.values(form).every(
        (value) => typeof value === "string" && value.trim() !== ""
      );
      if (isValid) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      }
    };

    useEffect(() => {
      // Apply styles to TextField components
      const textFields = document.querySelectorAll(
        `.${props.formIdentifier} .MuiOutlinedInput-input`
      );
      textFields.forEach((input) => {
        const fieldName = input.getAttribute("name");
        if (fieldName) {
          const textField = input
            .closest(`.${props.formIdentifier} .MuiInputBase-root`)
            .querySelector(".MuiOutlinedInput-notchedOutline");
          if (textField) {
            if (
              props.requiredFields &&
              props.requiredFields.includes(fieldName)
            ) {
              textField.style.borderColor = form[fieldName] ? "green" : "red";
            } else {
              textField.style.borderColor = changedFields[fieldName]
                ? "yellow"
                : "";
            }
          }
        }
      });

      // Apply styles to Select components
      const selectFields = document.querySelectorAll(
        `.${props.formIdentifier} .MuiSelect-nativeInput`
      );
      selectFields.forEach((input) => {
        const fieldName = input.getAttribute("name");
        if (fieldName) {
          const textField = input
            .closest(`.${props.formIdentifier} .MuiInputBase-root`)
            .querySelector(".MuiOutlinedInput-notchedOutline");
          if (textField) {
            textField.style.borderColor = changedFields[fieldName]
              ? "yellow"
              : "";
          }
        }
      });
    }, [changedFields, form, props.formIdentifier, props.requiredFields]);

    return (
      <div className={props.formIdentifier}>
        {isSuccess && (
          <WrappedComponent
            {...props}
            formData={form}
            isLoading={isLoading}
            handleFormChange={handleFormChange}
            handleFormSave={handleFormSave}
            saved={saved}
          />
        )}
        {isLoading && "Loading..."}
        {isError && "Error"}
      </div>
    );
  };
};

export default withFormChange;
