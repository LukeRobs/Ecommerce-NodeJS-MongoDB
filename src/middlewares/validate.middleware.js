const validate = (Schema) => {
    return (req, res, next) => {
        const { error, value} = Schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        });

        if(error) {
            return res.status(400).json({
                errors: error.details.map((d) => d.message),
            });
        }
        req.body = value;

        next();
    };
};

export default validate;