import React from "react";

import { sha256 } from "ethers/lib/utils";
import { Formik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAccount, useProvider, useSigner } from "wagmi";
import * as Yup from "yup";

import { Identity, VoteForm } from "../../../types";
import { castVote, getAuthToken } from "../../utils/API_call";
import { getTokenBalance, signApproval } from "../../web3/contractCall";

interface VoteModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

const VoteModal: React.FC<VoteModalProps> = ({ isModalOpen, setIsModalOpen, projectId }: VoteModalProps) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const initialValues: VoteForm = {
    Amount: 0
  };

  const onSubmit = async (value: VoteForm) => {
    console.log(value);
    if (provider && signer) {
      try {
        const balance = await getTokenBalance(provider, address as string);
        console.log("Balance: ", balance?.toString());

        const data: any = await signApproval(signer, address as string, 10);
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

          // @Gbenga: projectId needed
          // @Gbenga: Amount Input needed to compare if balance ? > vote amount
          if (Number(balance?.toString()) > value.Amount) {
            const res = await castVote(token.data.token, address as string, projectId, value.Amount, identity);
            console.log("Response: ", res);
          } else {
            // Display an error
          }
        }
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
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VoteModal;
