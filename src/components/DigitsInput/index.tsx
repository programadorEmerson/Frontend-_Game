/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useEffect } from 'react';

import { InputBaseComponentProps, TextField, useTheme } from '@mui/material';

type DigitsInputProps = {
  numberDigits: number;
  isFetching: boolean;
  digitsValue: Record<string, string> | undefined;
  setDigitsValue: (value: Record<string, string> | undefined) => void;
};

type ReturnElementsProps = {
  id: string;
  value: string;
  idNextInput: string;
  nextInput: HTMLElement | null;
  btnSubmit: HTMLElement | null;
};

type FuncProps = {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

const propsInput = {
  maxLength: 1,
  style: {
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '1.7rem',
    fontWeight: 500,
  },
} as InputBaseComponentProps;

const DigitsInput: FC<DigitsInputProps> = ({
  numberDigits,
  isFetching,
  digitsValue,
  setDigitsValue,
}) => {
  const theme = useTheme();

  const returnElements = ({ event }: FuncProps): ReturnElementsProps => {
    const { id, value } = event.target;
    const digit = value.replace(/\D/g, '');
    const numberNextInput = String(Number(id.replace('d', '')) + 1);
    const idNextInput = `d${numberNextInput}`;
    const nextInput = document.getElementById(idNextInput);
    const btnSubmit = document.getElementById(`button-submit`);
    return { id, value: digit, idNextInput, nextInput, btnSubmit };
  };

  const insertDigit = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value, idNextInput, nextInput, btnSubmit } = returnElements({
      event,
    });
    if (value.length === 1) {
      if (nextInput) {
        setDigitsValue({ ...digitsValue, [id]: value, [idNextInput]: '' });
        nextInput.focus();
      } else {
        setDigitsValue({ ...digitsValue, [id]: value });
        btnSubmit && btnSubmit.focus();
      }
    } else {
      setDigitsValue({ ...digitsValue, [id]: '' });
    }
  };

  useEffect(() => {
    const nDigits = Array.from({ length: numberDigits }, (_, i) => `d${i + 1}`);
    const objDigits = nDigits.reduce((acc, curr) => {
      acc[curr] = '';
      return acc;
    }, {} as Record<string, string>);
    setDigitsValue(objDigits);
  }, [numberDigits]);

  return (
    <>
      {digitsValue &&
        Object.entries(digitsValue).map(([key, value]) => (
          <TextField
            id={key}
            key={key}
            label=""
            value={value}
            variant="outlined"
            disabled={isFetching}
            onChange={insertDigit}
            inputProps={{
              ...propsInput,
              color: theme.palette.primary.main,
            }}
            onFocus={(e) => e.target.select()}
          />
        ))}
    </>
  );
};

export default DigitsInput;
