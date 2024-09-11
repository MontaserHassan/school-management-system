interface IResponse {
    type: string;
    responseCode: number;
    responseMessage: string;
    data: object;
};


export default IResponse;