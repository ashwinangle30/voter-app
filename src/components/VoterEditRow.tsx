import React, { useState, ChangeEvent } from "react";

import { Voter } from "../models/voters";

export type VoterEditRowProps = {
  voter: Voter;
  onSaveVoter: (voter: Voter) => void;
  onCancelVoter: () => void;
  onSelectVoter: (voterId: number) => void;
  isSelected: boolean;
};

export type VoterForm = {
  firstName: string;
  lastName: string;
  address: number;
  city: string;
  email: string;
  phone: string;
  birthDate: string;
};

export const VoterEditRow = (props: VoterEditRowProps) => {
  const [voterForm, setVoterForm] = useState({
    firstName: props.voter.firstName,
    lastName: props.voter.lastName,
    address: props.voter.address,
    city: props.voter.city,
    email: props.voter.email,
    phone: props.voter.phone,
    birthDate: props.voter.birthDate,
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setVoterForm({
      ...voterForm,
      [e.target.name]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const saveVoter = () => {
    props.onSaveVoter({
      ...voterForm,
      id: props.voter.id,
    });
  };

  return (
      <tr>
        <td>{props.voter.id}</td>
        <td>
          <input
              type="text"
              id="firstName-input"
              name="firstName"
              value={voterForm.firstName}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="text"
              id="lastName-input"
              name="lastName"
              value={voterForm.lastName}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="number"
              id="address-input"
              name="address"
              value={voterForm.address}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="text"
              id="city-input"
              name="city"
              value={voterForm.city}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="text"
              id="email-input"
              name="email"
              value={voterForm.email}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="number"
              id="phone-input"
              name="phone"
              value={voterForm.phone}
              onChange={change}
          />
        </td>
        <td>
          <input
              type="text"
              id="birthDate-input"
              name="birthDate"
              value={voterForm.birthDate}
              onChange={change}
          />
        </td>
        <td>
          <button type="button" onClick={saveVoter}>
            Save
          </button>
          <button type="button" onClick={props.onCancelVoter}>
            Cancel
          </button>
        </td>
        <td>
          <input type="checkbox" 
                 checked={props.isSelected}
                 onChange={() => props.onSelectVoter(props.voter.id)}/>
        </td>
      </tr>
  );
};
