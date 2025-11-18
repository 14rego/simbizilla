import { useEffect, useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, handleBlur, updateForm } from "../../features/form/helpers";
import { setGame } from "../../store/slices/game";
import _ from "lodash";
import FormMessages from "../../features/form/FormMessages";
import { setFormMessages, setIsProcessing } from "../../store/slices/ui";
import type { RootState } from "../../store";
import type { Category } from "../../store/models/category";
import type { Location } from "../../store/models/location";
import { monetize } from "../../features/formatting/helpers";
import { initApiPayload } from "../../store/models/form";

const FacilityCreate = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ui = useSelector((state: RootState) => state.ui);

    const game = useSelector((state: RootState) => state.game);
    const [form, setForm] = useState(_.cloneDeep(initApiPayload));
    form.game = game._id;

    const [support, setSupport] = useState({ 
        loading: true,
        categories: [],
        locations: [],
        priceMapLocation: {}
    });
    const getSupport = () => {
        if (support.loading === true) apiGet(`facilities/support`).then((res) => {
            setSupport((prev) => _.merge({}, prev, res.data, { loading: false }));
        });
    };

    useEffect(() => {
        getSupport();
    });

    async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            dispatch(setIsProcessing(true));
            apiPost(`facilities/create`, form).then((res) => {
                if (res.status == 200 && res.data) {
                    dispatch(setGame(res.data));
                    navigate("/play");
                } else {
                    dispatch(setFormMessages(res.errors.map((err: object) => {
                        return {
                            message: Object.keys(err)[0],
                            type: "ERROR"
                        }
                    })));
                }
                dispatch(setIsProcessing(false));
            });
        }
    };

    return (<main>
        <form id="FormCreateFacility" onSubmit={onSubmit} className="max-w-lg mx-auto">
            <fieldset>
                <legend>New Facility</legend>
                <div className="form-control-stack mb-2">
                    <p>Category</p>
                    {support.categories.map((c: Category) => {
                        const isSelected = c._id == form.payload.category;
                        return (<label key={c._id} className="form-radio" aria-selected={isSelected}>
                            <input type="radio" name="category" required value={c._id} checked={isSelected}
                            onChange={(e) => updateForm(setForm, { category: e.target.value })} />
                            <span className="inline-block pl-2">{c.title}</span>
                            <span className="block">{c.description}</span>
                        </label>)
                    })}
                </div>
                <div className="form-control-stack mb-2">
                    <p>Location</p>
                    {support.locations.map((l: Location) => {
                        const isSelected = l._id == form.payload.location;
                        return (<label key={l._id} className="form-radio" aria-selected={isSelected}>
                            <input type="radio" name="location" required value={l._id} checked={isSelected}
                            onChange={(e) => updateForm(setForm, { location: e.target.value })} />
                            <span className="inline-block pl-2">{l.title}</span>
                            <span className="block">{monetize(_.get(support.priceMapLocation, l.level))}</span>
                            <span className="block">{l.description}</span>
                        </label>)
                    })}
                </div>
                <div className="form-control-stack my-2">
                    <label htmlFor="title">Name Your Facility</label>
                    <input id="title" type="text" required autoComplete="off" 
                        onBlur={(e) => handleBlur(e.target)}
                        onChange={(e) => updateForm(setForm, { title: e.target.value })} />
                </div>
            </fieldset>
            <FormMessages />
            <div className="flex justify-between items-start mt-2">
                <button type="submit" disabled={ui.isProcessing} className="btn">Let&rsquo;s GO</button>
            </div>
        </form>
    </main>)
};

export default FacilityCreate;