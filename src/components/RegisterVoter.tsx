import React, { useState, ChangeEvent } from "react";

import { NewVoter } from "../models/voters";

export type RegisterVoterProps = {
  onSubmitVoter: (newVoter: NewVoter) => void;
};

export function RegisterVoter(props: RegisterVoterProps) {
  const [voterForm, setRegisterVoter] = useState({
    firstName: "First",
    lastName: "Last",
    address: "123 A St",
    city: "City",
    email: "email@example.com",
    phone: "8888675309",
    birthDate: "1900-01-01",
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterVoter({
      ...voterForm,
      [e.target.name]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitVoter = () => {
    props.onSubmitVoter({
      ...voterForm,
    });

    setRegisterVoter({
      firstName: "First",
      lastName: "Last",
      address: "123 A St",
      city: "City",
      email: "email@example.com",
      phone: "8888675309",
      birthDate: "1900-01-01",
    });
  };

  return (
      <form>
        Register Voter
        <div>
          <label htmlFor="firstName-input">First name</label>
          <input
              type="text"
              id="firstName-input"
              name="firstName"
              value={voterForm.firstName}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="lastName-input">Last name</label>
          <input
              type="text"
              id="lastName-input"
              name="lastName"
              value={voterForm.lastName}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="address-input">Address</label>
          <input
              type="text"
              id="address-input"
              name="address"
              value={voterForm.address}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="city-input">County/City</label>
          <input
              type="text"
              id="city-input"
              name="city"
              value={voterForm.city}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="email-input">Email</label>
          <input
              type="text"
              id="email-input"
              name="email"
              value={voterForm.email}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="phone-input">Phone</label>
          <input
              type="number"
              id="phone-input"
              name="phone"
              value={voterForm.phone}
              onChange={change}
          />
        </div>
        <div>
          <label htmlFor="birthDate-input">Birth date (YYYY-MM-DD)</label>
          <input
              type="text"
              id="birthDate-input"
              name="birthDate"
              value={voterForm.birthDate}
              onChange={change}
          />
        </div>
        <button type="button" onClick={submitVoter}>
          Complete Registration
        </button>
      </form>
  );
}
