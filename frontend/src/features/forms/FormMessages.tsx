import { type JSX } from "react";
import type { FormMessage } from "../../store/slices/forms";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const FormMessages = (): JSX.Element => {
  const formMsgs = useSelector((state: RootState) => state.forms.messages);    

  return (<ul aria-live="assertive" className="list-disc">{formMsgs.map((m: FormMessage) => {
    switch (m.type.toLowerCase()) {
      case "error":
        return (
          <li className="text-xs text-red-700">
            <strong>Error:&nbsp;</strong>
            <span>{m.message}</span>
          </li>
        );
      default:
        return (
          <li className="text-xs">
            <span>{m.message}</span>
          </li>
        );
    }
  })}</ul>)
};

export default FormMessages;