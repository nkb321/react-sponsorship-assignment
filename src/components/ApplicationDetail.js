import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApplication } from "../api/applicationAPI";
import APP_CONSTANTS from "../app-constants";
import DisplayText from "./DisplayText";
import { RotatingLines } from "react-loader-spinner";

const ApplicationDetail = () => {
  const applicationId = window.location.pathname.split("/")[2];
  const [hasError, setHasError] = useState(false);
  const [appData, setAppData] = useState(null);

  const { FIELDNAMES } = APP_CONSTANTS;

  useEffect(() => {
    fetchApplication(applicationId)
      .then((response) => {
        setAppData(response.data);
      })
      .catch((error) => {
        setHasError(error.response.status !== 200);
      });
  }, [applicationId]);

  return (
    <div>
      <Link to="/">Home</Link>
      <h3>Your Application</h3>
      {hasError ? (
        <p>{`No application found with id: ${applicationId}`}</p>
      ) : appData ? (
        <div>
          <p className="bold-text">Your application is pending for approval</p>
          <DisplayText label={"Id"} text={appData.id} />
          <DisplayText
            label={FIELDNAMES.COMPANY_NAME}
            text={appData.company_name}
          />
          <DisplayText
            label={FIELDNAMES.CONTACT_NAME}
            text={appData.contact_name}
          />
          <DisplayText
            label={FIELDNAMES.CONTACT_EMAIL}
            text={appData.contact_email}
          />
          <DisplayText
            label={FIELDNAMES.SPONSORSHIP_LEVEL}
            text={appData.sponsorship_level}
          />
          <DisplayText
            label={FIELDNAMES.COMPANY_DESCRIPTION}
            text={appData.comments}
          />
          <div>
            <p className="bold-text margin-top-15">
              {FIELDNAMES.FUTURE_OPPURTUNITIES}
            </p>
            <p>{appData.contact_about_future_ops ? "Yes" : "No"}</p>
          </div>
        </div>
      ) : (
        <div>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
