import React from "react";

export type Props = {
  step: number;
  setStepAction: React.Dispatch<React.SetStateAction<number>>;
  setSuccessAction: React.Dispatch<React.SetStateAction<boolean>>;
}