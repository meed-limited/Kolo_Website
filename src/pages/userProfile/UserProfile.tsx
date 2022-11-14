import React from 'react';

// import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAccount } from "wagmi";

import { Project } from "../../../types";
import { useUserData } from "../../context/UserContextProvider";
import { PROJECTS } from "../../utils/data";
import Frame from '../components/Frame';
import PrevListBox from '../components/PrevListBox';


const UserProfile = () => {
    const navigate = useNavigate()
    const { address } = useAccount();
    const { tokenBalance } = useUserData();

  return (
    <Frame title="Profile">
        <div className="product-detail">
            <div className="goBack" onClick={() => navigate(-1)}>
                {"<<<"}
            </div>
            <div className="content">
                <div className="header-wrapper">
                    <div className="header">
                        <div className="title">User Profile</div>
                    </div>
                </div>
                <div className='user-details'>
                    <div className='user-content-wrapper'>
                        <img src="assets/images/userbtn.svg" />
                        <div className='user-frame vote-detail'>
                            <img src='assets/images/profile-project.png' />
                            <div className='divider'></div>
                            <div className='vote'>
                                <img src="assets/images/vote-icon.png" />
                                <div className='vote-content'>
                                    <div className="period">1/11/-7/11 period</div>
                                    <div className="vote-prefix">You Have Voted</div>
                                    <div className="project-name">PJ Name</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='user-content-wrapper'>
                        <div className="balance">Balance</div>
                        <div className='user-frame balance-detail'>
                            <div className="connected-wallet-section">
                                <div className='icon'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ marginRight: "5px" }}
                                        width="16"
                                        height="16"
                                        fill="white"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                                    </svg>
                                </div>
                                <div className="details-wrapper">
                                    <div className="title">Connected Wallet</div>
                                    <div className="address">{address}</div>
                                </div>
                            </div>
                            <div className="kol-wallet-section">
                                <div className="icon">
                                    <img src='assets/images/Kol.png' />
                                </div>
                                <div className='kol-wallet-details'>
                                    <div className="balance">{tokenBalance ? tokenBalance : "0000"}</div>
                                    <div className="kol-currency">KOL</div>
                                </div>
                            </div>
                            {/* <div className="wallet-divider">
                                <Button variant="secondary"> 
                                    <svg 
                                        width="24" 
                                        height="24" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ marginRight: "5px" }}
                                    >
                                        <path d="M8.99005 21.5011C7.33005 21.5011 5.66005 20.8711 4.39005 19.6011C1.86005 17.0611 1.86005 12.9411 4.39005 10.4111C4.68005 10.1211 5.16005 10.1211 5.45005 10.4111C5.74005 10.7011 5.74005 11.1811 5.45005 11.4711C4.51343 12.4091 3.98736 13.6805 3.98736 15.0061C3.98736 16.3317 4.51343 17.6031 5.45005 18.5411C6.38808 19.4777 7.65948 20.0038 8.98505 20.0038C10.3106 20.0038 11.582 19.4777 12.5201 18.5411C13.4601 17.6011 13.9801 16.3411 13.9801 15.0011C13.9801 13.6711 13.4601 12.4111 12.5201 11.4611C12.3806 11.32 12.3024 11.1295 12.3024 10.9311C12.3024 10.7327 12.3806 10.5422 12.5201 10.4011C12.8101 10.1111 13.2901 10.1111 13.5801 10.4011C14.1856 11.0038 14.6654 11.7208 14.9916 12.5105C15.3178 13.3001 15.4838 14.1467 15.4801 15.0011C15.4801 16.7411 14.8001 18.3711 13.5801 19.6011C12.9791 20.2063 12.2639 20.6859 11.4759 21.0121C10.6879 21.3383 9.84289 21.5045 8.99005 21.5011Z" fill="white"/>
                                        <path d="M19.068 14.1578C18.878 14.1578 18.688 14.0878 18.538 13.9378C18.3985 13.7967 18.3203 13.6062 18.3203 13.4078C18.3203 13.2094 18.3985 13.0189 18.538 12.8778C20.588 10.8278 20.588 7.49779 18.538 5.45779C16.488 3.40779 13.158 3.40779 11.118 5.45779C10.629 5.94385 10.2412 6.52195 9.97685 7.15873C9.71253 7.79551 9.57697 8.47834 9.57801 9.16779C9.57801 10.5678 10.128 11.8878 11.118 12.8778C11.408 13.1678 11.408 13.6478 11.118 13.9378C10.828 14.2278 10.348 14.2278 10.058 13.9378C9.42965 13.3126 8.93121 12.5693 8.59139 11.7506C8.25157 10.932 8.07709 10.0542 8.07801 9.16779C8.07801 7.36779 8.77801 5.66779 10.058 4.39779C12.688 1.76779 16.968 1.76779 19.608 4.39779C22.238 7.02779 22.238 11.3178 19.608 13.9478C19.458 14.0878 19.258 14.1578 19.068 14.1578Z" fill="white"/>
                                    </svg>
                                    <span>Show on BscScan</span>
                                </Button>
                            </div> */}
                            <div className="diver"></div>
                            <div className='wallet-detail-footer'>
                                <div className="point"><span>00/10</span> point</div>
                                <div className="earn">to earn next Kol </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prev-vote-section">
                    <div className="title">Previously Voted</div>
                    <div className="prev-projects">
                    {PROJECTS.Projects.map((data: Project) => (
                        <PrevListBox
                            imagePath={data.image}
                            title={data.title}
                            objective={data.objective}
                            backer={data.backers}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </Frame>
  )
}

export default UserProfile