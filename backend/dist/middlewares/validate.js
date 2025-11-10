"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            const errors = error.errors?.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({
                ok: false,
                msg: "Validation failed",
                errors,
            });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map