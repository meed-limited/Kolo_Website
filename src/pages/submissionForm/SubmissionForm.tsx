import React, { useState, useRef } from "react";

import { ethers } from "ethers";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSigner } from "wagmi";
import * as Yup from "yup";

import { submitProjectAPI } from "../../utils/API_call";
import { submitProposal } from "../../web3/contractCall";
import Frame from "../components/Frame";

const SubmissionForm = () => {
  const uploadBtnRef = useRef<HTMLInputElement | null>(null);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const [showImgInfo, setShowImgInfo] = useState<boolean>(false);
  const [youtubeInfo, setYoutubeInfo] = useState<boolean>(false);

  const navigate = useNavigate();
  const initialValues = {
    email: ""
  };
  const onSubmit = async () => {
    // @Gbenga: replace title with form-data
    const title = "test_API_1";
    const hexTitle = ethers.utils.formatBytes32String(title);
    try {
      if (signer) {
        const result: any = await submitProposal(signer, hexTitle);
        if (!result.success) {
          console.log(result.error);
        }

        const projectId = result.events[0].args.projectId;

        const params = {
          SenderAddress: address,
          ChainId: chain?.name,
          ProjectId: parseInt(projectId.toString()),
          transactionHash: result?.transactionHash,
          // @Gbenga: Add form-data
          ProjectName: "Project 1",
          ProjectCardImage: "image.png",
          ProjectTagLine: "I dont know",
          OrganizationName: "Super Ultra",
          OrganizationWebsite: "superultra.io",
          YoutubeLink: "no-youtube",
          ContactPersonLastname: "David",
          ContactPersonOthernames: "Ultra",
          WalletAddress: "0xc061832e120Bbf1c0BC5A42255DE3d53618Ea5Ab"
        };

        const res = await submitProjectAPI(params);
        console.log(res);
        // Display some kind of popup or notification?
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    // email: Yup.string().email("Invalid Email Format").required("Email is required"),
  });

  const addImg = () => {
    uploadBtnRef.current?.click();
  };
  return (
    <>
      <button onClick={() => onSubmit()}>submit</button>
      <Frame title="Submission Form">
        <div className="product-detail">
          <div className="goBack" onClick={() => navigate(-1)}>
            {"<<<"}
          </div>
          <div className="content">
            <div className="submission-form-header">
              <div className="title">Submission Form</div>
            </div>
            <div className="submission-form ">
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({
                  values,
                  // errors,
                  // touched,
                  handleChange,
                  // isSubmitting,
                  handleBlur,
                  handleSubmit
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <label>
                        Project Card Image{" "}
                        <span onClick={() => setShowImgInfo(!showImgInfo)}>
                          <span className="iconify" data-icon="ant-design:question-circle-outlined"></span>
                        </span>
                      </label>
                      {showImgInfo && (
                        <ul>
                          <li>Make sure your image is both interesting and relevant to your campaign. + </li>
                          <li>
                            This information is what people will see on the Kolo landing page, and they should be
                            compelled to click on it
                          </li>
                        </ul>
                      )}
                      <Form.Control
                        type="file"
                        className="upload"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.email}
                        ref={uploadBtnRef}
                      />
                      <Button className="upload-btn" onClick={addImg}>
                        Upload Cover Photo
                      </Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Organization Name</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Organization Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Project Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Tagline</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="email"
                        placeholder="Project Tagline"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>How much do you need for the project?</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Amount in USDC"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Organization Website</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Organization Website Link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Youtube Link{" "}
                        <span onClick={() => setYoutubeInfo(!youtubeInfo)}>
                          <span className="iconify" data-icon="ant-design:question-circle-outlined"></span>
                        </span>
                      </Form.Label>
                      {youtubeInfo && (
                        <ul>
                          <li>Make a short video (1-3 minutes) that expresses your goals and intentions</li>
                          <li>The first ten seconds of your video count. First impressions are everything</li>
                          <li>Star in the video yourself to make it more personal</li>
                          <li>Give contributors a sneak peek of your project, product, film, etc.</li>
                          <li>Use music to set a tone for the video and the campaign</li>
                          <li>Make sure the video is clear and concise; visuals help</li>
                          <li>Invite your audience to join you on your journey; you are not just asking for money.</li>
                          <li>End with a clear call to action</li>
                          <li>Your video must be uploaded to either YouTube </li>
                          <li>
                            This information is what people will see on the Kolo landing page, and they should be
                            compelled to click on it
                          </li>
                        </ul>
                      )}
                      <Form.Control
                        type="email"
                        placeholder="Youtube Link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <div className="personal-info">Personal information</div>
                    <div className="personal-info-sub">The information below are private and won't be shared</div>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact FullName</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="First Name"
                        className="mb-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <Form.Control
                        type="email"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ethereum Wallet Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Ethereum Wallet Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Button className="submit-btn">Submit</Button>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Frame>
    </>
  );
};

export default SubmissionForm;
