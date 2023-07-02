export const fetchVochers = async () => {
    setLoad(true);
    const { response, error } = await getVouchers();
    setLoad(false);
    if (error) {
      return setToast({open: true, msg: "something went wrong", type: "error"});
    }
    if (response && response?.length) {
      setTableData(response);
      localStorage.setItem("vouchers", JSON.stringify(response))

    }
  };