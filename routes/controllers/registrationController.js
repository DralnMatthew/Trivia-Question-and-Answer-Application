import {bcrypt, validasaur} from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getRegisterData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password")
  };
};

const registerUser = async ({ request, response, render, params }) => {
  const registerData = await getRegisterData(request);

  const [passes, errors] = await validasaur.validate(
      registerData,
      registerValidationRules,
  );

  if (!passes) {
    //console.log(errors);
    registerData.validationErrors = errors;
    render("partials/registration.eta", registerData);
  } else {
    await userService.addUser(
        registerData.email,
        await bcrypt.hash(registerData.password),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("partials/registration.eta");
};

export { registerUser, showRegistrationForm };