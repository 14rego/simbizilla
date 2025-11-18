import { type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { FormMessage } from "../../store/models/form";

const FormMessages = (): JSX.Element => {
  const formMsgs = useSelector((state: RootState) => state.ui.formMessages);    

  return (<ul aria-live="assertive" className="list-disc ml-5 my-1">{formMsgs.map((m: FormMessage) => {
    switch (m.type.toLowerCase()) {
      case "error":
        return (
          <li className="mb-0.5 text-xs text-red-700" key={m.message}>
            <strong>Error:&nbsp;</strong>
            <span>{m.message}</span>
          </li>
        );
      default:
        return (
          <li className="mb-0.5 text-xs" key={m.message}>
            <span>{m.message}</span>
          </li>
        );
    }
  })}</ul>)
};

export default FormMessages;