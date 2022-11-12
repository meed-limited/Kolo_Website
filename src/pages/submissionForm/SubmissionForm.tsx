import React, { useState, useRef } from "react";

import { ethers } from "ethers";
import { Formik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSigner } from "wagmi";
import * as Yup from "yup";

import { submitProjectAPI } from "../../utils/API_call";
import { AMOUNTBUTTONS } from "../../utils/data";
import { convertFileToBase64String } from "../../utils/functions";
import { submitProposal } from "../../web3/contractCall";
import Frame from "../components/Frame";

const SubmissionForm = () => {
  const uploadBtnRef = useRef<HTMLInputElement | null>(null);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const [showImgInfo, setShowImgInfo] = useState<boolean>(false);
  const [youtubeInfo, setYoutubeInfo] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [projectCardImage, setProjectCardImage] = useState<any>("");

  const navigate = useNavigate();
  const initialValues = {
    WalletAddress: "",
    ProjectName: "",
    ProjectTagLine: "",
    OrganizationName: "",
    OrganizationWebsite: "",
    YoutubeLink: "",
    ContactPersonLastname: "",
    ContactPersonOthernames: "",
    AmountRequired: 0,
    DesiredCurrency: ""
  };

  const onSubmit = async (value: any) => {
    const title = value.ProjectName;
    const hexTitle = ethers.utils.formatBytes32String(title);

    try {
      if (signer) {
        const result: any = await submitProposal(signer, hexTitle);
        if (!result.success) {
          console.log(result.error);
        }

        const projectId: number = result.events[0].args.projectId;

        const params = {
          SenderAddress: address as string,
          ProjectId: parseInt(projectId.toString()),
          ProjectName: value.ProjectName,
          ChainId: chain?.name as string,
          transactionHash: result?.transactionHash,
          ProjectCardImage: projectCardImage,
          ProjectTagLine: value.ProjectTagLine,
          AmountRequired: value.AmountRequired,
          DesiredCurrency: selectedCurrency ? selectedCurrency : "USDC",
          OrganizationName: value.OrganizationName,
          OrganizationWebsite: value.OrganizationWebsite,
          YoutubeLink: value.YoutubeLink,
          ContactPersonLastname: value.ContactPersonLastname,
          ContactPersonOthernames: value.ContactPersonOthernames,
          WalletAddress: value.WalletAddress
        };

        const res = await submitProjectAPI(params);
        if (res.success) {
          navigate("/submit-success");
        }
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
                  isSubmitting,
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            convertFileToBase64String(e.target.files[0], setProjectCardImage);
                          }
                        }}
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
                        type="text"
                        name="OrganizationName"
                        placeholder="Organization Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.OrganizationName}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="ProjectName"
                        value={values.ProjectName}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Tagline</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Project Tagline"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ProjectTagLine}
                        name="ProjectTagLine"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>How much do you need for the project?</Form.Label>
                      <div className="amount-form-group">
                        {AMOUNTBUTTONS.map((data: any) => (
                          <button
                            key={data.id}
                            className={selectedCurrency === data.name ? "amount-btn active" : "amount-btn"}
                            onClick={() => setSelectedCurrency(data.name)}
                            type="button"
                          >
                            {data.name}
                          </button>
                        ))}

                        <Form.Control
                          type="number"
                          placeholder="Amount in USDC"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.AmountRequired}
                          name="AmountRequired"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Organization Website</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Organization Website Link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.OrganizationWebsite}
                        name="OrganizationWebsite"
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
                        type="text"
                        placeholder="Youtube Link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.YoutubeLink}
                        name="YoutubeLink"
                      />
                    </Form.Group>
                    <div className="personal-info">Personal information</div>
                    <div className="personal-info-sub">The information below are private and won't be shared</div>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact FullName</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="mb-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ContactPersonOthernames}
                        name="ContactPersonOthernames"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ContactPersonLastname}
                        name="ContactPersonLastname"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ethereum Wallet Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ethereum Wallet Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.WalletAddress}
                        name="WalletAddress"
                      />
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
      </Frame>
    </>
  );
};

export default SubmissionForm;
