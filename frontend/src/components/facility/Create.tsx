import { useEffect, useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, handleBlur, updateForm } from "../../helpers/form";
import { setGame } from "../../store/slices/game";
import _ from "lodash";
import FormMessages from "../../features/form/FormMessages";
import { setFormMessages, setIsProcessing } from "../../store/slices/ui";
import type { RootState } from "../../store";
import type { Category } from "../../store/models/category";
import type { Location } from "../../store/models/location";
import { djsIncrement, monetize } from "../../helpers/format";
import { typedApiPayload } from "../../store/models/form";
import { type CostMap } from "../../store/models/checkbook";

const FacilityCreate = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ui = useSelector((state: RootState) => state.ui);

    const game = useSelector((state: RootState) => state.game);
    const [form, setForm] = useState(typedApiPayload({
        category: "",
        location: "",
        title: ""
    }));
    form.game = game._id;

    const [support, setSupport] = useState<{
        loading: boolean,
        categories: Category[],
        locations: Location[],
        costMap: CostMap[]
    }>({ 
        loading: true,
        categories: [],
        locations: [],
        costMap: []
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
                    <p className="form-group-label">Category</p>
                    <div className="md:grid grid-cols-2 gap-2">
                        {support.categories.map((c: Category) => {
                            const isSelected = c._id == form.payload.category;
                            return (<label key={c._id} className="form-radio" aria-selected={isSelected}>
                                <input type="radio" name="category" required value={c._id} checked={isSelected}
                                onChange={(e) => updateForm(setForm, { category: e.target.value })} />
                                <span className="radio-title">{c.title}</span>
                                <span className="radio-more">{c.description}</span>
                            </label>)
                        })}
                    </div>
                </div>
                <div className="form-control-stack mb-2">
                    <p className="form-group-label">Location</p>
                    {support.locations.map((l: Location) => {
                        const isSelected = l._id == form.payload.location;
                        const costs = support.costMap.find(m => m.id == l.level);
                        const costInit = costs?.init || 0;
                        const costIter = costs?.iter || 0; 
                        return (<label key={l._id} className="form-radio" aria-selected={isSelected}>
                            <input type="radio" name="location" required value={l._id} checked={isSelected}
                            disabled={costInit > game.balance}
                            onChange={(e) => updateForm(setForm, { location: e.target.value })} />
                            <span className="radio-title">{l.title}</span>
                            <span className="radio-more">{monetize(costInit)} then {monetize(costIter)}/{djsIncrement}</span>
                            <span className="radio-more">{l.description}</span>
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