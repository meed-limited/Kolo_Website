import React, { useState } from "react";

import { ethers } from "ethers";
import { sha256 } from "ethers/lib/utils";
import { Formik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSigner } from "wagmi";
import * as Yup from "yup";

import { Identity, VoteForm } from "../../../types";
import { useUserData } from "../../context/UserContextProvider";
import { castVote, getAuthToken } from "../../utils/API_call";
import { signApproval } from "../../web3/contractCall";

interface VoteModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

const VoteModal: React.FC<VoteModalProps> = ({ isModalOpen, setIsModalOpen, projectId }: VoteModalProps) => {
  const { address, tokenBalance } = useUserData();
  const { data: signer } = useSigner();
  const [error, setError] = useState<string>("");

  const initialValues: VoteForm = {
    Amount: 0
  };

  const onSubmit = async (value: VoteForm) => {
    setError("");
    if (signer) {
      try {
        const amoutToBN = ethers.utils.parseUnits(value.Amount.toString(), 18);

        if (Number(tokenBalance < value.Amount)) {
          setError("Insufficient balance.");
          return;
        }

        const data: any = await signApproval(signer, address as string, amoutToBN.toString());
        if (data.success) {
          const identity: Identity = {
            Deadline: data.data.deadline,
            Rsig: data.data.r,
            Ssig: data.data.s,
            Vsig: data.data.v
          };

          // Hash the user address to generate a unique objectId per user
          // Should be fetched from Moralis DB in the future
          const objectId = sha256(address as string);
          const token = await getAuthToken(address as string, objectId);

          const res = await castVote(token.data.token, address as string, projectId, amoutToBN.toString(), identity);
          console.log("Response: ", res);
          if (!res.success) setError(res.message);
        } else setError(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validationSchema = Yup.object({
    Amount: Yup.number().required("Vote Amount is required")
  });
  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered className="connect-modal">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-wrapper">
          <div className="wallets">
            <div className="title">Vote</div>
            <div className="form">
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, isSubmitting, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        name="Amount"
                        placeholder="Amount of Vote"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Amount}
                      />
                      <small className="form-text text-danger2">
                        <b>{errors.Amount && touched.Amount && errors.Amount}</b>
                      </small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button className="submit-btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : "Submit"}
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
              {error && <span className="errorMsg">{error}</span>}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VoteModal;
