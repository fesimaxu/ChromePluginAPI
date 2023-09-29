export const sendSuccessfulResponse = (
    res: any,
    statusCode: number,
    data: Record<string, any> | string | null,
    message: string = `video uploaded successfully`
  ) => {
    res.status(statusCode).json({
      message: message,
      status: statusCode,
      data: data,
      success: true,
    });
  };
  
  export const sendErrorResponse = (
    res: any,
    statusCode: number = 500,
    data: any,
    message: string = `error ! request failed`
  ) => {
    console.log("data", data)
    if ((data.code = 11000)) {
  
      return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
      });
    }
  
    return res.status(statusCode).json({
      message: message,
      status: statusCode,
      data: data,
      error: true,
    });
  };
  