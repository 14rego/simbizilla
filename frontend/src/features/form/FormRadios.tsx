import { type Dispatch, type JSX, type SetStateAction } from "react";
import type { ApiPayload } from "../../store/slices/ui";
import { updateForm } from "./helpers";
import _ from "lodash";

type RadioProps = {
    name: string,
    options: unknown[],
    selected: string,
    set: Dispatch<SetStateAction<ApiPayload>>,
};

const FormRadios = (props: RadioProps): JSX.Element => {
    return (
        <div>
            {props.options.map((opt) => {
                const isSelected = opt._id == props.selected;
                const ky = _.set({}, props.name, opt._id);
                return (
                    <label key={opt._id} className={isSelected ? "bg-red-800" : "bg-blue-800"} aria-selected={isSelected}
                        onClick={updateForm(props.set, ky)} >
                        <input type="radio" name={props.name} required 
                            value={opt._id}
                            />
                        <span>{opt.title}</span>
                    </label>
                );
            })}
        </div>
    )
    ;
};

export default FormRadios;