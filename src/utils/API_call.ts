export const submitProjectAPI = async (params: any): Promise<any> => {
  const response = await fetch("https://kolo-bpnvacqhoq-uc.a.run.app/api/v1/kolohack/projects/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      WalletAddress: params.WalletAddress,
      ChainId: params.ChainId,
      ProjectId: params.ProjectId,
      transactionHash: params.transactionHash,
      ProjectName: params.ProjectName,
      ProjectCardImage: params.ProjectCardImage,
      ProjectTagLine: params.ProjectTagLine,
      OrganizationName: params.OrganizationName,
      OrganizationWebsite: params.OrganizationWebsite,
      YoutubeLink: params.YoutubeLink,
      ContactPersonLastname: params.ContactPersonLastname,
      ContactPersonOthernames: params.ContactPersonOthernames,
      SenderAddress: params.SenderAddress
    })
  });
  const body = await response.json();
  return body;
};

export const getAuthToken = async (address: string): Promise<any> => {
  try {
    const response = await fetch("https://kolo-bpnvacqhoq-uc.a.run.app/api/v1/kolohack/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        WalletAddress: address,
        ObjectId: "plop"
      })
    });
    const body = await response.json();
    if (response.status !== 200) {
      console.log({ success: false, data: body.data, message: body.message });
      return undefined;
    }
    return body;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
