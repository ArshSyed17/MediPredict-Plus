import { useState, useCallback } from 'react';

/**
 * Custom hook for form management
 */
export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (validate) {
      const fieldErrors = validate({ ...values, [name]: fieldValue });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  }, [values, validate]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (validate) {
      const fieldErrors = validate(values);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).every((key) => !errors[key]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    isValid,
    setValues,
  };
};

export default useForm;
