import mongooseConn from "../db/mongoose.js";
import { Organization } from "../models/organization.js";
import { Employee } from "../models/employee.js";
import { sortGameStartAsc, sortGameStartDesc } from "./dates.js";

// normalize API responses
export const apiData = (res, d, status = 200, err = null) => {
    const r = {
        data: {},
        errors: [],
        ok: null,
        status: 500
    };
    if (status == 500) {
        const e = {};
        e[d] = err;
        r.errors.push(e);
        r.ok = false;
        r.status = 500;
        console.error(err == null ? d : err);
    } else if (d == null) {
        r.errors.push({
            "Not found": "Response empty"
        });
        r.ok = false;
        r.status = 404;
    } else {
        r.data = d;
        r.ok = true;
        r.status = status;
    }
    return res.send(r).status(r.status);
};

// always the same version of the object
export const gameObject = (id) => {
    return mongooseConn().then(async () => {
        const game = await Organization.findById(id)
            .populate([
                { 
                    path: "facilities", 
                    populate: [{
                        path: "employees"
                    },{
                        path: "checkbooks"
                    },{
                        path: "incidents"
                    }]
                },{ 
                    path: "checkbooks"
                },{ 
                    path: "incidents"
                },
            ]);
        game.facilities.sort(sortGameStartDesc).forEach(fac => {
            fac.checkbooks.sort(sortGameStartDesc);
            fac.incidents.sort(sortGameStartDesc);
            fac.employees.sort(sortGameStartAsc);
        });
        game.checkbooks.sort(sortGameStartDesc);
        game.incidents.sort(sortGameStartDesc);
        return game;
    }).catch((err) => {
        console.error(err);
        return null;
    });
};