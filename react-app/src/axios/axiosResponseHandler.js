export const axiosLoginResponseHandler = (res, history) => {
  if (res.data.status === 100) {
    history.redirect("/");
  } else {
    return res.data;
  }
};

export const axiosFailureResponseHandler = (err, history) => {
  if (err.response) {
    // Server responded with a status other than 200 range
    if (err.response.status === 404) {
      alert("Error: Page Not Found");
    }
  } else if (err.request) {
    // Request was made but no response
    alert(err.request);
  } else {
    alert(err.message);
  }
};

export const axiosSuccessResponseHandler = (res, history) => {
  if (res.data.status === 100) {
    history.redirect("/");
    return false;
  } else if (res.data.status === 1) {
    alert(res.data.err_mesg);
    return false;
  } else {
    return res.data;
  }
};
