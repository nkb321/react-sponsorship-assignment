import { validate } from "email-validator";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link, useNavigate } from "react-router-dom";
import { submitApplication } from "../api/applicationAPI";
import APP_CONSTANTS from "../app-constants";
import TextInput from "./TextInput";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const options = [
    { value: "gold", label: "Gold" },
    { value: "silver", label: "Silver" },
    { value: "bronze", label: "Bronze" },
  ];

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [level, setLevel] = useState(options[0]);
  const [description, setDescription] = useState("");
  const [futureContact, setFutureContact] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { FIELDNAMES } = APP_CONSTANTS;

  const onSelect = (event) => {
    setLevel(event);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setFutureContact(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (companyName.trim().length < 1 || contactName.trim().length < 1) {
      setSubmitError(
        `${FIELDNAMES.COMPANY_NAME}, ${FIELDNAMES.CONTACT_NAME} cannot be blank.`
      );
      return;
    } else if (!validate(contactEmail)) {
      setSubmitError("Please enter a valid email");
      return;
    } else {
      setSubmitError("");
    }

    const sponsorshipApplication = {
      company_name: companyName,
      contact_name: contactName,
      contact_email: contactEmail,
      sponsorship_level: level.value,
      comments: description,
      contact_about_future_ops: futureContact,
    };

    submitApplication(sponsorshipApplication)
      .then((response) => {
        navigate(`/apps/${response.data.id}`);
      })
      .catch((error) => {
        setSubmitError(error.message);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h3>Apply to Sponsor</h3>
      <form onSubmit={handleSubmit}>
        <TextInput
          fieldName={FIELDNAMES.COMPANY_NAME}
          inputValue={companyName}
          updateValueHandler={setCompanyName}
        />
        <TextInput
          fieldName={FIELDNAMES.CONTACT_NAME}
          inputValue={contactName}
          updateValueHandler={setContactName}
        />
        <TextInput
          fieldName={FIELDNAMES.CONTACT_EMAIL}
          isEmailField
          inputValue={contactEmail}
          updateValueHandler={setContactEmail}
        />
        <div>
          <label className="bold-text">{FIELDNAMES.SPONSORSHIP_LEVEL}</label>
          <Dropdown
            className="select-input input-width"
            controlClassName="select-input-control"
            options={options}
            onChange={onSelect}
            value={level}
          />
        </div>
        <div>
          <label className="bold-text margin-top-15">
            {FIELDNAMES.COMPANY_DESCRIPTION}
          </label>
          <textarea
            className="input-width"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div>
          <input
            className="checkbox-input"
            type={"checkbox"}
            checked={futureContact}
            onChange={handleCheckboxChange}
          />
          {FIELDNAMES.FUTURE_OPPURTUNITIES}
        </div>
        <button className="submit-button">Submit</button>
        <p className="error-message">{submitError.length > 0 && submitError}</p>
      </form>
    </div>
  );
};

export default ApplicationForm;
